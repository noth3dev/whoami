-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Drop existing tables if they exist (to ensure a fresh start)
DROP TABLE IF EXISTS tech_stack;
DROP TABLE IF EXISTS blog_posts;
DROP TABLE IF EXISTS experiences;
DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS admin_secrets;

-- 3. Projects Table
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  title TEXT NOT NULL,
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

-- 4. Experiences Table
CREATE TABLE experiences (
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

-- 5. Blog Posts Table
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE,
  date TEXT,
  excerpt TEXT,
  content TEXT, -- Markdown content
  tags TEXT[],
  published BOOLEAN DEFAULT FALSE,
  image TEXT,
  category TEXT
);

-- 6. Tech Stack Table
CREATE TABLE tech_stack (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  category TEXT NOT NULL,
  name TEXT NOT NULL,
  icon TEXT, -- URL to icon
  is_learning BOOLEAN DEFAULT FALSE,
  display_order INTEGER DEFAULT 0
);

-- 7. Admin Secrets Table
CREATE TABLE admin_secrets (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

-- 8. Enable RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE tech_stack ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_secrets ENABLE ROW LEVEL SECURITY;

-- 9. Create public read Policies
CREATE POLICY "Allow public read projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Allow public read experiences" ON experiences FOR SELECT USING (true);
CREATE POLICY "Allow public read blog_posts" ON blog_posts FOR SELECT USING (true);
CREATE POLICY "Allow public read tech_stack" ON tech_stack FOR SELECT USING (true);

-- 10. Admin Secrets Policy (No public access by default, only service_role)
-- No additional policy needed as RLS is enabled and no PUBLIC policy exists.

-- 11. Initial Tech Stack Data
INSERT INTO tech_stack (category, name, icon, is_learning, display_order) VALUES
('Languages', 'C', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg', false, 0),
('Languages', 'Python', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', false, 1),
('Languages', 'C++', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg', false, 2),
('Languages', 'JavaScript', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', false, 3),
('Languages', 'TypeScript', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', false, 4),
('Frontend', 'React', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', false, 100),
('Frontend', 'Next.js', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg', false, 101),
('Frontend', 'Tailwind', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg', false, 102),
('Frontend', 'HTML5', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', false, 103),
('Frontend', 'CSS3', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', false, 104),
('Frontend', 'Flutter', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg', false, 105),
('Backend & Database', 'Node.js', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', false, 200),
('Backend & Database', 'FastAPI', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg', false, 201),
('Backend & Database', 'Supabase', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg', false, 202),
('Backend & Database', 'PostgreSQL', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', false, 203),
('Backend & Database', 'MongoDB', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', false, 204),
('AI & ML', 'TensorFlow', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg', false, 300),
('AI & ML', 'PyTorch', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg', false, 301),
('AI & ML', 'Pandas', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg', false, 302),
('AI & ML', 'NumPy', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg', false, 303),
('AI & ML', 'Jupyter', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg', false, 304),
('Tools', 'Git', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', false, 400),
('Tools', 'GitHub', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', false, 401),
('Tools', 'Docker', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', false, 402),
('Tools', 'Figma', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg', false, 403),
('Tools', 'Vercel', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg', false, 404),
('Tools', 'VS Code', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg', false, 405),
('Else', 'Arduino', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-original.svg', false, 500),
('Else', 'Raspberry Pi', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/raspberrypi/raspberrypi-original.svg', false, 501),
('Else', 'Premiere Pro', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/premierepro/premierepro-original.svg', false, 502),
('Else', 'Photoshop', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-original.svg', false, 503),
('Learning', 'Rust', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-original.svg', true, 1000),
('Learning', 'Go', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg', true, 1001);
