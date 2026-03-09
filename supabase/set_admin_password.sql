-- 1. Insert admin password (if not already set)
-- Replace 'your-admin-password' with your desired password
INSERT INTO admin_secrets (key, value) 
VALUES ('admin_password', 'your-admin-password')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- 2. Verify settings
-- The 'admin_secrets' table has RLS enabled but no public policies.
-- Our /api routes now use the SERVICE_ROLE_KEY via supabaseAdmin to bypass RLS.
