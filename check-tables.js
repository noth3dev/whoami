
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkTables() {
    const { data: tables, error } = await supabase.rpc('get_tables'); // This might not work if RPC is not there
    
    // Alternative: try to select from information_schema
    const { data, error: infoError } = await supabase.from('blog_posts').select('id').limit(1);
    
    if (infoError) {
        console.error('Error fetching from blog_posts:', infoError);
    } else {
        console.log('blog_posts exists.');
    }

    const { data: pData, error: pError } = await supabase.from('projects').select('id').limit(1);
    if (pError) {
        console.error('Error fetching from projects:', pError);
    } else {
        console.log('projects exists.');
    }
}

checkTables();
