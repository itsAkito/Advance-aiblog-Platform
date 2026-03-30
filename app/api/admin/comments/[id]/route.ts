import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { createClient } from '@/utils/supabase/server';
import { logActivity } from '@/lib/activity-log';

async function verifyAdmin(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (userId) {
      const supabase = await createClient();
      const { data: profile } = await supabase
        .from('profiles')
        .select('id, role')
        .eq('id', userId)
        .maybeSingle();
      if (profile?.role === 'admin') return userId;
    }
  } catch {
    // continue to cookie fallback
  }

  try {
    const adminSessionToken = request.cookies.get('admin_session_token')?.value;
    if (adminSessionToken) {
      const adminEmail = (process.env.ADMIN_EMAIL || process.env.NEXT_PUBLIC_ADMIN_EMAIL || '').toLowerCase();
      const decoded = Buffer.from(adminSessionToken, 'base64').toString('utf8');
      const [email] = decoded.split(':');
      if (email?.toLowerCase() === adminEmail) {
        return email;
      }
    }
  } catch {
    // ignore and return null
  }

  return null;
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const adminUserId = await verifyAdmin(request);
    if (!adminUserId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const supabase = await createClient();

    const { data: existingComment, error: existingError } = await supabase
      .from('comments')
      .select('id, content, user_id, guest_name')
      .eq('id', id)
      .maybeSingle();

    if (existingError || !existingComment) {
      return NextResponse.json({ error: 'Comment not found' }, { status: 404 });
    }

    const { error } = await supabase.from('comments').delete().eq('id', id);
    if (error) {
      return NextResponse.json({ error: error.message || 'Failed to delete comment' }, { status: 500 });
    }

    await logActivity({
      userId: adminUserId,
      activityType: 'admin_action',
      entityType: 'comment',
      entityId: id,
      metadata: {
        action: 'comment_deleted',
        userId: existingComment.user_id || null,
        guestName: existingComment.guest_name || null,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Comment deleted by admin',
      commentId: id,
      deletedBy: adminUserId,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
