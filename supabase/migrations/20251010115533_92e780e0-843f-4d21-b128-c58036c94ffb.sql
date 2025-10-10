-- Remove 14-day profile update restriction artifacts
-- 1) Drop any enforcement triggers if they exist
DROP TRIGGER IF EXISTS enforce_profile_update_interval ON public.profiles;
DROP TRIGGER IF EXISTS prevent_frequent_profile_updates ON public.profiles;
DROP TRIGGER IF EXISTS profiles_update_throttle ON public.profiles;

-- 2) Drop any helper/validation functions if they exist
DROP FUNCTION IF EXISTS public.enforce_profile_update_interval();
DROP FUNCTION IF EXISTS public.prevent_frequent_profile_updates();
DROP FUNCTION IF EXISTS public.profiles_update_throttle();

-- 3) Remove the flag/column tracking last update time
ALTER TABLE public.profiles DROP COLUMN IF EXISTS last_profile_update;