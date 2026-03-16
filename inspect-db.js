
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function inspectTable() {
    try {
        console.log('Inspecting blog_posts table structure directly via RPC/Query...');
        
        // Try to get columns from information_schema
        const { data, error } = await supabase
            .from('blog_posts')
            .select('*')
            .limit(1);

        if (error) {
            console.error('Error selecting from blog_posts:', error);
        } else if (data && data.length > 0) {
            console.log('Columns found:', Object.keys(data[0]));
        } else {
            console.log('Table is empty, trying to insert a dummy row to discover columns...');
            const { error: insertError, data: insertData } = await supabase
                .from('blog_posts')
                .insert([{ title: 'Temp' }])
                .select();
            if (insertError) {
                console.error('Insert error (column discovery):', insertError);
            } else if (insertData) {
                console.log('Columns from insert return:', Object.keys(insertData[0]));
                // Cleanup
                await supabase.from('blog_posts').delete().eq('id', insertData[0].id);
            }
        }
    } catch (e) {
        console.error('Crash:', e);
    }
}

inspectTable();
