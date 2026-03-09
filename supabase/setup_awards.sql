-- Create awards table
CREATE TABLE IF NOT EXISTS awards (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    organization TEXT NOT NULL,
    date TEXT NOT NULL,
    description TEXT,
    link TEXT,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE awards ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Public awards are viewable by everyone" ON awards
    FOR SELECT USING (true);

CREATE POLICY "Admins can do everything with awards" ON awards
    FOR ALL USING (auth.role() = 'authenticated');
