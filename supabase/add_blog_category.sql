-- Add category column to blog_posts table
ALTER TABLE blog_posts
ADD COLUMN IF NOT EXISTS category TEXT;

-- Optional: set a default category for existing posts
-- UPDATE blog_posts SET category = 'General' WHERE category IS NULL;
