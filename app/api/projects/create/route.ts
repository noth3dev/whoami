import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

export async function POST(request: Request) {
    try {
        let data = {};
        try {
            const json = await request.json();
            data = json.data || {};
        } catch (e) { }

        const authHeader = request.headers.get('Authorization');
        console.log("[API/Project/Create] Request headers auth exists:", !!authHeader);

        if (!authHeader) {
            console.error("[API/Project/Create] No auth header provided");
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const token = authHeader.replace('Bearer ', '');
        const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token);

        if (authError || !user) {
            console.error("[API/Project/Create] Auth error or no user:", authError?.message || "No user found");
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        console.log("[API/Project/Create] Authenticated as:", user.email);

        const projectData = {
            title: 'Untitled Project',
            featured: false,
            year: new Date().getFullYear().toString(),
            ...data
        };
        console.log("[API/Project/Create] Inserting data:", projectData);

        const { data: insertedData, error } = await supabaseAdmin
            .from('projects')
            .insert([projectData])
            .select()
            .single();

        if (error) {
            console.error("[API/Project/Create] Supabase Insert Error:", error);
            return NextResponse.json({ message: error.message }, { status: 500 });
        }

        console.log("[API/Project/Create] Successfully created project ID:", insertedData.id);
        return NextResponse.json({ message: 'Project created successfully', id: insertedData.id });
    } catch (error: any) {
        console.error("[API/Project/Create] Global Error Catch:", error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
