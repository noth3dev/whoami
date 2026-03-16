
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkColumns() {
    const { data, error } = await supabase.from('projects').select('*').limit(1);
    if (error) {
        console.error('Error:', JSON.stringify(error, null, 2));
        return;
    }
    if (data && data.length > 0) {
        console.log('COLUMNS_START');
        Object.keys(data[0]).forEach(k => console.log(k));
        console.log('COLUMNS_END');
    } else {
        console.log('EMPTY_TABLE');
    }
}

checkColumns();
