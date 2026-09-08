import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://utxzpcrhvcnohrpxhvti.supabase.co';
const supabaseKey = 'sb_publishable_XyW-Nln665K3lp5_ipiKSA_0EOb9TtO';
export const supabase = createClient(supabaseUrl, supabaseKey);
