-- Create a 'media' bucket for images, videos, etc.
-- Note: This requires the storage extension (usually enabled by default in Supabase)

-- 1. Insert bucket into storage.buckets
INSERT INTO storage.buckets (id, name, public)
VALUES ('media', 'media', true)
ON CONFLICT (id) DO NOTHING;

-- 2. Allow public access to read files in the 'media' bucket
-- This policy allows anyone (even non-authenticated) to view the media
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'media' );

-- 3. Allow authenticated users to upload files to the 'media' bucket
-- (In your case, you'll be authenticated as the admin)
CREATE POLICY "Admin Upload"ㅌ
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'media' AND auth.role() = 'authenticated' );

-- 4. Allow authenticated users to delete/update files in the 'media' bucket
CREATE POLICY "Admin Delete"
ON storage.objects FOR DELETE
USING ( bucket_id = 'media' AND auth.role() = 'authenticated' );

CREATE POLICY "Admin Update"
ON storage.objects FOR UPDATE
USING ( bucket_id = 'media' AND auth.role() = 'authenticated' );
