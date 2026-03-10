import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

export async function POST(request: Request) {
    try {
        let data = {};
        try {
            const json = await request.json();
            data = json.data || {};
        } catch (e) {
            // No body provided, use defaults
        }

        const authHeader = request.headers.get('Authorization');
        console.log("[API/Blog/Create] Request headers auth exists:", !!authHeader);

        if (!authHeader) {
            console.error("[API/Blog/Create] No auth header provided");
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        const token = authHeader.replace('Bearer ', '');
        const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token);

        if (authError || !user) {
            console.error("[API/Blog/Create] Auth error or no user:", authError?.message || "No user found");
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        console.log("[API/Blog/Create] Authenticated as:", user.email);

        // Insert blog post
        const insertData = {
            title: 'Untitled',
            published: false,
            date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
            ...data
        };
        console.log("[API/Blog/Create] Inserting data:", insertData);

        const { data: insertedData, error } = await supabaseAdmin
            .from('blog_posts')
            .insert([insertData])
            .select()
            .single();

        if (error) {
            console.error("[API/Blog/Create] Supabase Insert Error:", error);
            throw error;
        }

        console.log("[API/Blog/Create] Successfully created post ID:", insertedData.id);
        return NextResponse.json({ success: true, id: insertedData.id });
    } catch (error: any) {
        console.error("[API/Blog/Create] Global Error Catch:", error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
