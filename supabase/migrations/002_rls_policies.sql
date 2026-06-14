-- FootyHub Milestone 1: Row Level Security policies

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorite_players ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorite_clubs ENABLE ROW LEVEL SECURITY;

-- Users: read own profile
CREATE POLICY "users_read_own" ON public.users
  FOR SELECT USING (auth.uid() = id);

-- Users: update own profile
CREATE POLICY "users_update_own" ON public.users
  FOR UPDATE USING (auth.uid() = id);

-- Admins: read all users
CREATE POLICY "admin_read_all_users" ON public.users
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Favorite players: users own their data
CREATE POLICY "own_favorite_players_select" ON public.favorite_players
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "own_favorite_players_insert" ON public.favorite_players
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "own_favorite_players_delete" ON public.favorite_players
  FOR DELETE USING (auth.uid() = user_id);

-- Favorite clubs: users own their data
CREATE POLICY "own_favorite_clubs_select" ON public.favorite_clubs
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "own_favorite_clubs_insert" ON public.favorite_clubs
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "own_favorite_clubs_delete" ON public.favorite_clubs
  FOR DELETE USING (auth.uid() = user_id);
