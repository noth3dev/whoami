import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = (supabaseUrl && supabaseAnonKey)
    ? createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
            autoRefreshToken: true,
            persistSession: true,
            detectSessionInUrl: true,
        }
    })
    : null as any;

// Call this when you detect an invalid refresh token error
export async function clearInvalidSession() {
    try {
        await supabase.auth.signOut({ scope: 'local' });
    } catch {
        // If signOut also fails, manually clear storage
        if (typeof window !== 'undefined') {
            const keys = Object.keys(localStorage).filter(k => k.startsWith('sb-'));
            keys.forEach(k => localStorage.removeItem(k));
        }
    }
}

// Safe getSession that handles stale refresh tokens
export async function getSession() {
    try {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
            if (
                error.message?.includes('Refresh Token Not Found') ||
                error.message?.includes('Invalid Refresh Token') ||
                error.status === 400
            ) {
                await clearInvalidSession();
                return null;
            }
            return null;
        }
        return data.session;
    } catch {
        return null;
    }
}

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
