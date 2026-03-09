-- Completely remove slug column from projects table
ALTER TABLE projects DROP COLUMN IF EXISTS slug;

-- Completely remove slug column from blog_posts table
ALTER TABLE blog_posts DROP COLUMN IF EXISTS slug;
