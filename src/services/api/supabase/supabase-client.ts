import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hofpmasnyehsdzzsmklx.supabase.co';
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhvZnBtYXNueWVoc2R6enNta2x4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5ODU2OTk4MywiZXhwIjoyMDE0MTQ1OTgzfQ.mcraGkuBrJpW2B2b5YgamWwNbrBSa6JoJwh0BOThvGE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
