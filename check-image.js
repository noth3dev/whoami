
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkImageColumn() {
    try {
        console.log('Testing select image from blog_posts...');
        const { data, error } = await supabase.from('blog_posts').select('image').limit(1);
        
        if (error) {
            console.error('Column check error:', error);
        } else {
            console.log('Success! image column is accessible.');
        }
    } catch (e) {
        console.error('Script crash:', e);
    }
}

checkImageColumn();
