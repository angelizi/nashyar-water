-- Add address and last_profile_update columns to profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS address TEXT,
ADD COLUMN IF NOT EXISTS last_profile_update TIMESTAMP WITH TIME ZONE DEFAULT NOW();