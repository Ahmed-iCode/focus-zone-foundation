-- Case-insensitive uniqueness for usernames
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_username_key;
CREATE UNIQUE INDEX IF NOT EXISTS profiles_username_lower_idx ON public.profiles (lower(username));

-- Lifetime XP cannot be negative (current_points may be negative)
ALTER TABLE public.profiles
  ADD CONSTRAINT profiles_lifetime_xp_check CHECK (lifetime_xp >= 0);

-- Case-insensitive uniqueness for area names per user
ALTER TABLE public.areas DROP CONSTRAINT IF EXISTS areas_user_name_unique;
CREATE UNIQUE INDEX IF NOT EXISTS areas_user_name_lower_idx ON public.areas (user_id, lower(name));

-- Keep updated_at current
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER profiles_set_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER areas_set_updated_at BEFORE UPDATE ON public.areas
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER tasks_set_updated_at BEFORE UPDATE ON public.tasks
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();