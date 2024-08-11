import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://cbrmibqjgvogbdxtpxmv.supabase.co";
const supabase_API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNicm1pYnFqZ3ZvZ2JkeHRweG12Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMzOTEzNjksImV4cCI6MjAzODk2NzM2OX0.CCgaR3OsjoK6FCePC1UyCYMnITHoLR-W8RfSGrtEJEg";

const supabase = createClient(supabaseUrl, supabase_API_KEY);

export default supabase;
