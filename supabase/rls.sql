-- Proposly — Row Level Security
-- Run this in the Supabase SQL Editor AFTER schema.sql.
--
-- Auth model: Clerk via Supabase's native third-party auth integration.
--   auth.jwt()->>'sub'  = the Clerk user id (matches proposals.user_id / profiles.id)
--   auth.role()         = 'authenticated' for signed-in users, 'service_role' for the
--                         billing webhook (which uses the service key and bypasses RLS).
-- Safe to re-run: every policy/trigger is dropped first.

-- ─── proposals ────────────────────────────────────────────────────────────────
ALTER TABLE proposals ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS proposals_owner_all ON proposals;
CREATE POLICY proposals_owner_all ON proposals
  FOR ALL
  USING (user_id = auth.jwt()->>'sub')
  WITH CHECK (user_id = auth.jwt()->>'sub');

-- ─── profiles ─────────────────────────────────────────────────────────────────
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS profiles_owner_select ON profiles;
CREATE POLICY profiles_owner_select ON profiles
  FOR SELECT USING (id = auth.jwt()->>'sub');

DROP POLICY IF EXISTS profiles_owner_insert ON profiles;
CREATE POLICY profiles_owner_insert ON profiles
  FOR INSERT WITH CHECK (id = auth.jwt()->>'sub');

DROP POLICY IF EXISTS profiles_owner_update ON profiles;
CREATE POLICY profiles_owner_update ON profiles
  FOR UPDATE USING (id = auth.jwt()->>'sub')
             WITH CHECK (id = auth.jwt()->>'sub');

-- is_pro must NEVER be settable by a client — only the billing webhook (service_role)
-- may change it. This trigger pins is_pro for everyone else, which also fixes a latent
-- bug where upsertProfile() always sends is_pro=false and could downgrade a Pro user.
CREATE OR REPLACE FUNCTION protect_profile_is_pro()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  IF auth.role() = 'service_role' THEN
    RETURN NEW;                 -- webhook may set is_pro freely
  END IF;
  IF TG_OP = 'INSERT' THEN
    NEW.is_pro := false;        -- new profiles always start on the free tier
  ELSE
    NEW.is_pro := OLD.is_pro;   -- clients can never flip their own tier
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS profiles_protect_is_pro ON profiles;
CREATE TRIGGER profiles_protect_is_pro
  BEFORE INSERT OR UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION protect_profile_is_pro();

-- ─── shared_links ─────────────────────────────────────────────────────────────
ALTER TABLE shared_links ENABLE ROW LEVEL SECURITY;

-- Owners may create/read/delete links for proposals they own. There is deliberately
-- no public SELECT policy — anonymous share reads go through get_shared_proposal().
DROP POLICY IF EXISTS shared_links_owner_select ON shared_links;
CREATE POLICY shared_links_owner_select ON shared_links
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM proposals p
            WHERE p.id = shared_links.proposal_id
              AND p.user_id = auth.jwt()->>'sub')
  );

DROP POLICY IF EXISTS shared_links_owner_insert ON shared_links;
CREATE POLICY shared_links_owner_insert ON shared_links
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM proposals p
            WHERE p.id = shared_links.proposal_id
              AND p.user_id = auth.jwt()->>'sub')
  );

DROP POLICY IF EXISTS shared_links_owner_delete ON shared_links;
CREATE POLICY shared_links_owner_delete ON shared_links
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM proposals p
            WHERE p.id = shared_links.proposal_id
              AND p.user_id = auth.jwt()->>'sub')
  );

-- ─── public share read path ─────────────────────────────────────────────────
-- SECURITY DEFINER so anonymous visitors can read exactly one shared proposal
-- (and only via a valid link id) while RLS keeps direct table access locked down.
-- Also makes the view-count increment atomic (was a non-atomic read-then-write).
CREATE OR REPLACE FUNCTION get_shared_proposal(link_id uuid)
RETURNS proposals
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  result proposals;
BEGIN
  UPDATE shared_links SET view_count = view_count + 1 WHERE id = link_id;
  SELECT p.* INTO result
  FROM proposals p
  JOIN shared_links s ON s.proposal_id = p.id
  WHERE s.id = link_id;
  RETURN result;   -- NULL when the link does not exist
END;
$$;

REVOKE ALL ON FUNCTION get_shared_proposal(uuid) FROM public;
GRANT EXECUTE ON FUNCTION get_shared_proposal(uuid) TO anon, authenticated;
