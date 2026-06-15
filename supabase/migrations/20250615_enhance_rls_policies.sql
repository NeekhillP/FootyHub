-- Security hardening: strengthen RLS and prevent role escalation

BEGIN;

CREATE OR REPLACE FUNCTION public.is_admin_user(p_user_id uuid DEFAULT auth.uid())
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM public.users
    WHERE id = p_user_id
      AND role = 'admin'
  );
END;
$$;

CREATE OR REPLACE FUNCTION public.current_user_role(p_user_id uuid DEFAULT auth.uid())
RETURNS public.user_role
LANGUAGE plpgsql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
DECLARE
  role_value public.user_role;
BEGIN
  SELECT role INTO role_value
  FROM public.users
  WHERE id = p_user_id;

  RETURN COALESCE(role_value, 'user'::public.user_role);
END;
$$;

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorite_players ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorite_clubs ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.users FORCE ROW LEVEL SECURITY;
ALTER TABLE public.favorite_players FORCE ROW LEVEL SECURITY;
ALTER TABLE public.favorite_clubs FORCE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "users_read_own" ON public.users;
DROP POLICY IF EXISTS "users_update_own" ON public.users;
DROP POLICY IF EXISTS "admin_read_all_users" ON public.users;
DROP POLICY IF EXISTS "users_allow_self_select" ON public.users;
DROP POLICY IF EXISTS "users_allow_admin_select" ON public.users;
DROP POLICY IF EXISTS "users_allow_self_update" ON public.users;
DROP POLICY IF EXISTS "users_allow_admin_update" ON public.users;
DROP POLICY IF EXISTS "users_deny_non_owner_reads" ON public.users;
DROP POLICY IF EXISTS "users_deny_role_escalation" ON public.users;
DROP POLICY IF EXISTS "users_deny_direct_insert" ON public.users;
DROP POLICY IF EXISTS "users_deny_direct_delete" ON public.users;

CREATE POLICY "users_allow_self_select"
  ON public.users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "users_allow_admin_select"
  ON public.users
  FOR SELECT
  TO authenticated
  USING (public.is_admin_user());

CREATE POLICY "users_deny_non_owner_reads"
  ON public.users
  AS RESTRICTIVE
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id OR public.is_admin_user());

CREATE POLICY "users_allow_self_update"
  ON public.users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "users_allow_admin_update"
  ON public.users
  FOR UPDATE
  TO authenticated
  USING (public.is_admin_user())
  WITH CHECK (public.is_admin_user());

CREATE POLICY "users_deny_role_escalation"
  ON public.users
  AS RESTRICTIVE
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (public.is_admin_user() OR role = public.current_user_role());

CREATE POLICY "users_deny_direct_insert"
  ON public.users
  AS RESTRICTIVE
  FOR INSERT
  TO authenticated
  WITH CHECK (false);

CREATE POLICY "users_deny_direct_delete"
  ON public.users
  AS RESTRICTIVE
  FOR DELETE
  TO authenticated
  USING (false);

DROP POLICY IF EXISTS "own_favorite_players_select" ON public.favorite_players;
DROP POLICY IF EXISTS "own_favorite_players_insert" ON public.favorite_players;
DROP POLICY IF EXISTS "own_favorite_players_delete" ON public.favorite_players;
DROP POLICY IF EXISTS "favorite_players_admin_select" ON public.favorite_players;
DROP POLICY IF EXISTS "favorite_players_deny_update" ON public.favorite_players;

CREATE POLICY "own_favorite_players_select"
  ON public.favorite_players
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "favorite_players_admin_select"
  ON public.favorite_players
  FOR SELECT
  TO authenticated
  USING (public.is_admin_user());

CREATE POLICY "own_favorite_players_insert"
  ON public.favorite_players
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "own_favorite_players_delete"
  ON public.favorite_players
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "favorite_players_deny_update"
  ON public.favorite_players
  AS RESTRICTIVE
  FOR UPDATE
  TO authenticated
  USING (false)
  WITH CHECK (false);

DROP POLICY IF EXISTS "own_favorite_clubs_select" ON public.favorite_clubs;
DROP POLICY IF EXISTS "own_favorite_clubs_insert" ON public.favorite_clubs;
DROP POLICY IF EXISTS "own_favorite_clubs_delete" ON public.favorite_clubs;
DROP POLICY IF EXISTS "favorite_clubs_admin_select" ON public.favorite_clubs;
DROP POLICY IF EXISTS "favorite_clubs_deny_update" ON public.favorite_clubs;

CREATE POLICY "own_favorite_clubs_select"
  ON public.favorite_clubs
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "favorite_clubs_admin_select"
  ON public.favorite_clubs
  FOR SELECT
  TO authenticated
  USING (public.is_admin_user());

CREATE POLICY "own_favorite_clubs_insert"
  ON public.favorite_clubs
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "own_favorite_clubs_delete"
  ON public.favorite_clubs
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "favorite_clubs_deny_update"
  ON public.favorite_clubs
  AS RESTRICTIVE
  FOR UPDATE
  TO authenticated
  USING (false)
  WITH CHECK (false);

COMMIT;
