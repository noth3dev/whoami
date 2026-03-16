-- Run this in your Supabase SQL Editor
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS grid_size TEXT DEFAULT '1x1';
