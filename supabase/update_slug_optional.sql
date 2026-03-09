-- Make slug optional in projects table
ALTER TABLE projects ALTER COLUMN slug DROP NOT NULL;

-- Make slug optional in blog_posts table
ALTER TABLE blog_posts ALTER COLUMN slug DROP NOT NULL;
