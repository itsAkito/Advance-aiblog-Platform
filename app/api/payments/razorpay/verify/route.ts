import crypto from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderId, paymentId, signature, userId, planId, amount, currency = 'INR' } = body;

    if (!orderId || !paymentId || !signature) {
      return NextResponse.json({ error: 'orderId, paymentId and signature are required' }, { status: 400 });
    }

    const secret = process.env.RAZORPAY_KEY_SECRET;
    if (!secret) {
      return NextResponse.json({ error: 'Razorpay is not configured' }, { status: 503 });
    }

    // ── Idempotency check ───────────────────────────────────────────────────
    // Return success immediately if this orderId was already verified.
    // This prevents double-processing on retries or network replays.
    const supabase = await createClient();
    const { data: existing } = await supabase
      .from('processed_payments')
      .select('order_id, payment_id, verified_at')
      .eq('order_id', orderId)
      .maybeSingle();

    if (existing) {
      return NextResponse.json({
        valid: true,
        idempotent: true,
        message: 'Payment already verified',
        verifiedAt: existing.verified_at,
      });
    }

    // ── Signature verification ───────────────────────────────────────────────
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(`${orderId}|${paymentId}`)
      .digest('hex');

    // Constant-time comparison to prevent timing attacks
    const sigBuffer = Buffer.from(signature, 'hex');
    const expectedBuffer = Buffer.from(expectedSignature, 'hex');
    const isValid =
      sigBuffer.length === expectedBuffer.length &&
      crypto.timingSafeEqual(sigBuffer, expectedBuffer);

    if (!isValid) {
      return NextResponse.json({ valid: false, error: 'Invalid payment signature' }, { status: 400 });
    }

    // ── Record the verified payment (idempotency store) ───────────────────────
    await supabase.from('processed_payments').insert({
      order_id: orderId,
      payment_id: paymentId,
      user_id: userId ?? null,
      amount: amount ?? null,
      currency,
      plan_id: planId ?? null,
    });

    return NextResponse.json({ valid: true, idempotent: false });
  } catch (error) {
    console.error('Razorpay verify error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

