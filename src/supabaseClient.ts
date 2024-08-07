import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://hnrexwejmbvzseypfsfa.supabase.co";
const supabase_API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhucmV4d2VqbWJ2enNleXBmc2ZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMwMjkyODEsImV4cCI6MjAzODYwNTI4MX0.vjtXCU8ss525Xz_KBaiM786UoMrtEP3nwUz3WAeJlzU";

const supabase = createClient(supabaseUrl, supabase_API_KEY);

export default supabase;
