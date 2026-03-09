import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function uploadMedia(file: File): Promise<string | null> {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { data, error } = await supabase.storage
        .from('media')
        .upload(filePath, file);

    if (error) {
        console.error('Error uploading media:', error);
        return null;
    }

    const { data: { publicUrl } } = supabase.storage
        .from('media')
        .getPublicUrl(filePath);

    return publicUrl;
}
