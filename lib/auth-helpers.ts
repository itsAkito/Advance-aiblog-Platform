import { NextRequest } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { auth } from '@clerk/nextjs/server';

/**
 * Get authenticated user ID from either Clerk or OTP session
 */
export async function getAuthUserId(request?: NextRequest): Promise<string | null> {
  try {
    // First try Clerk
    const { userId } = await auth();
    if (userId) return userId;
  } catch {}

  // Fall back to OTP session — query DB directly (avoids unreliable internal HTTP)
  if (request) {
    try {
      const sessionToken =
        request.cookies.get('otp_session_token')?.value;

      if (sessionToken && sessionToken !== 'true') {
        const supabase = await createClient();
        const { data: session } = await supabase
          .from('otp_sessions')
          .select('user_id, expires_at, is_active')
          .eq('session_token', sessionToken)
          .eq('is_active', true)
          .maybeSingle();

        if (session && new Date(session.expires_at) > new Date()) {
          return session.user_id as string;
        }
      }
    } catch {}
  }

  return null;
}

/**
 * Verify if user is admin (checks Clerk or OTP auth)
 */
export async function verifyAdminWithOTP(request?: NextRequest): Promise<string | null> {
  try {
    const userId = await getAuthUserId(request);
    if (!userId) return null;

    const supabase = await createClient();
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', userId)
      .single();

    if (profile?.role === 'admin') {
      return userId;
    }
  } catch {}

  return null;
}
