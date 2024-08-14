import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabase_API_KEY = import.meta.env.VITE_SUPABASE_API_KEY;

const supabase = createClient(supabaseUrl, supabase_API_KEY);

export default supabase;
