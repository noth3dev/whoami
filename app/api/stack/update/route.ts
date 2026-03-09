import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

export async function POST(request: Request) {
    try {
        const { id, data } = await request.json();
        const authHeader = request.headers.get('Authorization');

        if (!authHeader) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const token = authHeader.replace('Bearer ', '');
        const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token);

        if (authError || !user) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const { error } = await supabaseAdmin
            .from('tech_stack')
            .update(data)
            .eq('id', id);

        if (error) {
            return NextResponse.json({ message: error.message }, { status: 500 });
        }

        return NextResponse.json({ message: 'Tech stack item updated' });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
