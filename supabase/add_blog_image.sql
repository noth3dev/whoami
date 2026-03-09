-- Add image column to blog_posts
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS image TEXT;
