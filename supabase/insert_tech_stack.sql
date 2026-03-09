-- Clean up existing stack if needed (optional)
-- TRUNCATE tech_stack;

-- Insert Tech Stack Data
INSERT INTO tech_stack (category, name, icon, is_learning, display_order) VALUES
-- Languages (0xx)
('Languages', 'C', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg', false, 0),
('Languages', 'Python', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', false, 1),
('Languages', 'C++', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg', false, 2),
('Languages', 'JavaScript', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', false, 3),
('Languages', 'TypeScript', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', false, 4),

-- Frontend (1xx)
('Frontend', 'React', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', false, 100),
('Frontend', 'Next.js', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg', false, 101),
('Frontend', 'Tailwind', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg', false, 102),
('Frontend', 'HTML5', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', false, 103),
('Frontend', 'CSS3', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', false, 104),
('Frontend', 'Flutter', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg', false, 105),

-- Backend & Database (2xx)
('Backend & Database', 'Node.js', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', false, 200),
('Backend & Database', 'FastAPI', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg', false, 201),
('Backend & Database', 'Supabase', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg', false, 202),
('Backend & Database', 'PostgreSQL', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', false, 203),
('Backend & Database', 'MongoDB', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', false, 204),

-- AI & ML (3xx)
('AI & ML', 'TensorFlow', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg', false, 300),
('AI & ML', 'PyTorch', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg', false, 301),
('AI & ML', 'Pandas', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg', false, 302),
('AI & ML', 'NumPy', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg', false, 303),
('AI & ML', 'Jupyter', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg', false, 304),

-- Tools (4xx)
('Tools', 'Git', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', false, 400),
('Tools', 'GitHub', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', false, 401),
('Tools', 'Docker', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', false, 402),
('Tools', 'Figma', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg', false, 403),
('Tools', 'Vercel', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg', false, 404),
('Tools', 'VS Code', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg', false, 405),

-- Else (5xx)
('Else', 'Arduino', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-original.svg', false, 500),
('Else', 'Raspberry Pi', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/raspberrypi/raspberrypi-original.svg', false, 501),
('Else', 'Premiere Pro', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/premierepro/premierepro-original.svg', false, 502),
('Else', 'Photoshop', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-original.svg', false, 503),

-- Learning (10xx)
('Learning', 'Rust', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-original.svg', true, 1000),
('Learning', 'Go', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg', true, 1001);
