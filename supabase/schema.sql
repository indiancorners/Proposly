-- Proposly Phase 2 Schema
-- Run this in Supabase Dashboard > SQL Editor

-- Proposals table
CREATE TABLE IF NOT EXISTS proposals (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID,
  status      TEXT        NOT NULL DEFAULT 'draft'
                          CHECK (status IN ('draft','sent','won','lost')),
  category    TEXT        NOT NULL DEFAULT 'general',
  theme       TEXT        NOT NULL DEFAULT 'folio',
  content     JSONB       NOT NULL DEFAULT '{}',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Auto-update updated_at on every row change
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS proposals_updated_at ON proposals;
CREATE TRIGGER proposals_updated_at
  BEFORE UPDATE ON proposals
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Index for user queries
CREATE INDEX IF NOT EXISTS proposals_user_id_idx ON proposals (user_id);
CREATE INDEX IF NOT EXISTS proposals_updated_at_idx ON proposals (updated_at DESC);

-- NOTE: No RLS in Phase 2. Phase 3 (Clerk) adds:
--   ALTER TABLE proposals ENABLE ROW LEVEL SECURITY;
--   CREATE POLICY "users_own_proposals" ON proposals
--     USING (auth.uid()::text = user_id::text);
