import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

export async function POST(request: Request) {
    try {
        const { data } = await request.json();
        const authHeader = request.headers.get('Authorization');

        if (!authHeader) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const token = authHeader.replace('Bearer ', '');
        const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token);

        if (authError || !user) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const { data: insertedData, error } = await supabaseAdmin
            .from('projects')
            .insert([data || {
                title: 'Untitled Project',
                featured: false,
                year: new Date().getFullYear().toString()
            }])
            .select()
            .single();

        if (error) {
            return NextResponse.json({ message: error.message }, { status: 500 });
        }

        return NextResponse.json({ message: 'Project created successfully', id: insertedData.id });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
