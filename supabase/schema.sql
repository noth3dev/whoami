-- Projects Table
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE,
  category TEXT,
  year TEXT,
  description TEXT,
  image TEXT,
  tags TEXT[],
  featured BOOLEAN DEFAULT FALSE,
  content TEXT, -- Markdown content
  client TEXT,
  role TEXT,
  duration TEXT,
  link TEXT,
  legacy BOOLEAN DEFAULT FALSE
);

-- Experiences Table
CREATE TABLE IF NOT EXISTS experiences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  year TEXT,
  role TEXT,
  company TEXT,
  description TEXT,
  achievements TEXT[],
  duration TEXT,
  details TEXT
);

-- Blog Posts Table
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE,
  date TEXT,
  excerpt TEXT,
  content TEXT, -- Markdown content
  tags TEXT[],
  published BOOLEAN DEFAULT FALSE
);

-- Enable RLS (Optional but recommended)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Create public read Policies
CREATE POLICY "Allow public read projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Allow public read experiences" ON experiences FOR SELECT USING (true);
CREATE POLICY "Allow public read blog_posts" ON blog_posts FOR SELECT USING (true);

-- Admin Secrets Table
CREATE TABLE IF NOT EXISTS admin_secrets (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

-- Insert a default password key (User should change 'your-password' in Supabase)
-- INSERT INTO admin_secrets (key, value) VALUES ('admin_password', 'your-password');

-- RLS for admin_secrets (Only service_role or authenticated with specific role should read this)
ALTER TABLE admin_secrets ENABLE ROW LEVEL SECURITY;
-- By default, no one can read it unless explicitly allowed.
-- Tech Stack Table
CREATE TABLE IF NOT EXISTS tech_stack (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  category TEXT NOT NULL,
  name TEXT NOT NULL,
  icon TEXT, -- URL to icon
  is_learning BOOLEAN DEFAULT FALSE,
  display_order INTEGER DEFAULT 0
);

-- Enable RLS
ALTER TABLE tech_stack ENABLE ROW LEVEL SECURITY;

-- Create public read Policy
CREATE POLICY "Allow public read tech_stack" ON tech_stack FOR SELECT USING (true);
