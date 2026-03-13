import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qjlohknunckhxthieujx.supabase.co'
const supabaseKey = 'sb_publishable_A5XGgdDh_arOMgyfjZcLFg_RGypyQOV'

export const supabase = createClient(supabaseUrl, supabaseKey)
