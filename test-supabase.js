
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');

// Load .env.local
dotenv.config({ path: path.join(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log('URL:', supabaseUrl);
console.log('Service Key starts with:', supabaseServiceKey ? supabaseServiceKey.substring(0, 10) + '...' : 'MISSING');

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing env vars');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function test() {
    try {
        console.log('Testing insert into blog_posts...');
        const { data: insertData, error: insertError } = await supabase.from('blog_posts').insert({
            title: 'Test Post',
            content: 'Test content',
            published: false
        }).select().single();

        if (insertError) {
            console.error('Insert error:', insertError);
        } else {
            console.log('Insert success! ID:', insertData.id);
            // Delete it afterwards
            await supabase.from('blog_posts').delete().eq('id', insertData.id);
            console.log('Cleanup: Deleted test post');
        }

    } catch (e) {
        console.error('Crash error:', e);
    }
}

test();
