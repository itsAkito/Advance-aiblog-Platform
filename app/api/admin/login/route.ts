import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Get admin credentials from environment
    const adminEmail = process.env.ADMIN_EMAIL || process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'admin@gmail.com';
    const adminPassword = process.env.ADMIN_PASSWORD || process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123';

    // Simple credential check (for development)
    if (email.toLowerCase() === adminEmail.toLowerCase() && password === adminPassword) {
      const response = NextResponse.json(
        {
          message: 'Admin login successful',
          admin: {
            email: adminEmail,
            role: 'admin',
          },
        },
        { status: 200 }
      );

      const tokenPayload = `${adminEmail}:${Date.now()}`;
      const token = Buffer.from(tokenPayload).toString('base64');

      response.cookies.set('admin_session_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 8,
      });

      return response;
    }

    return NextResponse.json(
      { error: 'Invalid admin credentials' },
      { status: 401 }
    );
  } catch (error) {
    console.error('Admin login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
