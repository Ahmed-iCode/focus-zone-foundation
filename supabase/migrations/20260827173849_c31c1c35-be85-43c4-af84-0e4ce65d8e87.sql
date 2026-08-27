CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  base_username text;
  final_username text;
  suffix int := 0;
BEGIN
  base_username := trim(coalesce(NEW.raw_user_meta_data ->> 'username', split_part(NEW.email, '@', 1)));
  IF base_username = '' THEN
    base_username := 'user';
  END IF;

  final_username := base_username;
  WHILE EXISTS (SELECT 1 FROM public.profiles p WHERE lower(p.username) = lower(final_username)) LOOP
    suffix := suffix + 1;
    final_username := base_username || suffix::text;
  END LOOP;

  INSERT INTO public.profiles (id, username, timezone)
  VALUES (
    NEW.id,
    final_username,
    coalesce(nullif(NEW.raw_user_meta_data ->> 'timezone', ''), 'UTC')
  )
  ON CONFLICT (id) DO NOTHING;

  -- Every account starts with one default area so it never has zero areas.
  INSERT INTO public.areas (user_id, name, display_order)
  SELECT NEW.id, 'General', 0
  WHERE NOT EXISTS (
    SELECT 1 FROM public.areas a WHERE a.user_id = NEW.id
  );

  RETURN NEW;
END;
$function$;