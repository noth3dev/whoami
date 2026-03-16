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

        // Filter data to only include valid columns
        // NOTE: 'image' and 'slug' are temporarily removed until added to the DB
        const allowedColumns = ['title', 'date', 'excerpt', 'content', 'tags', 'published', 'category'];
        const filteredData = Object.keys(data)
            .filter(key => allowedColumns.includes(key))
            .reduce((obj: any, key) => {
                obj[key] = data[key];
                return obj;
            }, {});

        const { error } = await supabaseAdmin
            .from('blog_posts')
            .update(filteredData)
            .eq('id', id);

        if (error) {
            console.error("[API/Blog/Update] Supabase Error:", error);
            return NextResponse.json({ message: error.message }, { status: 500 });
        }

        return NextResponse.json({ message: 'Blog post updated successfully' });
    } catch (error: any) {
        console.error("[API/Blog/Update] Global Error:", error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
