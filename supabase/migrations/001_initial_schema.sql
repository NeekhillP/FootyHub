-- FootyHub Milestone 1: Users & profile auto-creation

CREATE TYPE user_role AS ENUM ('user', 'premium', 'admin');

CREATE TABLE public.users (
  id                 uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email              text UNIQUE NOT NULL,
  username           text UNIQUE NOT NULL,
  avatar_url         text,
  bio                text CHECK (char_length(bio) <= 300),
  role               user_role NOT NULL DEFAULT 'user',
  favorite_club_id   text,
  favorite_club_name text,
  created_at         timestamptz NOT NULL DEFAULT now(),
  updated_at         timestamptz NOT NULL DEFAULT now()
);

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  base_username text;
  final_username text;
  suffix int := 0;
BEGIN
  base_username := lower(regexp_replace(
    COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1)),
    '[^a-zA-Z0-9_]',
    '',
    'g'
  ));

  IF base_username = '' THEN
    base_username := 'user';
  END IF;

  final_username := base_username;

  WHILE EXISTS (SELECT 1 FROM public.users WHERE username = final_username) LOOP
    suffix := suffix + 1;
    final_username := base_username || suffix::text;
  END LOOP;

  INSERT INTO public.users (id, email, username)
  VALUES (NEW.id, NEW.email, final_username);

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Favorite tables (RLS-ready for later milestones)
CREATE TABLE public.favorite_players (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  player_id    text NOT NULL,
  player_name  text NOT NULL,
  player_photo text,
  club_name    text,
  created_at   timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, player_id)
);

CREATE TABLE public.favorite_clubs (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  club_id     text NOT NULL,
  club_name   text NOT NULL,
  club_logo   text,
  created_at  timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, club_id)
);
