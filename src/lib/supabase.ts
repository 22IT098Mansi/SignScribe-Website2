
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://your-supabase-project-url.supabase.co';
const supabaseAnonKey = 'your-supabase-anon-key';

// Important: Replace these placeholder values with your actual Supabase URL and anon key
// You'll need to create a Supabase project and get these values from the dashboard
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Video = {
  id: string;
  title: string;
  description: string;
  url: string;
  thumbnail: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: number;
  created_at: string;
};

export type User = {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  created_at: string;
};
