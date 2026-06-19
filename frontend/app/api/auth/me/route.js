import { getSession } from '@/lib/auth';
import { query } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
    const session = await getSession();

    if (!session) {
        return NextResponse.json(
            { authenticated: false },
            { status: 401 }
        );
    }

    let superAdmin = false;
    if (session.role === 'admin') {
        const { rows } = await query('SELECT super_admin FROM users WHERE id = $1', [session.id]);
        superAdmin = rows[0]?.super_admin === true;
    }

    return NextResponse.json({
        authenticated: true,
        user: {
            id: session.id,
            name: session.name,
            email: session.email,
            role: session.role,
            superAdmin,
        },
    });
}
