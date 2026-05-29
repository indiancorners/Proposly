-- Proposly Phase 2 Schema
-- Run this in Supabase Dashboard > SQL Editor

-- Proposals table
CREATE TABLE IF NOT EXISTS proposals (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     TEXT,
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

-- Profiles table (Clerk user ID is TEXT)
CREATE TABLE IF NOT EXISTS profiles (
  id               TEXT        PRIMARY KEY,
  email            TEXT,
  is_pro           BOOLEAN     NOT NULL DEFAULT false,
  studio_name      TEXT        NOT NULL DEFAULT '',
  default_currency TEXT        NOT NULL DEFAULT 'USD',
  default_terms    TEXT        NOT NULL DEFAULT '',
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

DROP TRIGGER IF EXISTS profiles_updated_at ON profiles;
CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- NOTE: RLS skipped — app-level user_id filtering used.
-- Phase 5+ will add Clerk JWT template + Supabase RLS policies for defense-in-depth.

-- Migration for existing databases (safe to re-run, will no-op if already TEXT):
-- ALTER TABLE proposals ALTER COLUMN user_id TYPE TEXT;

-- ─── Phase 4: shared_links (run in Supabase SQL Editor) ──────────────────────
CREATE TABLE IF NOT EXISTS shared_links (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  proposal_id UUID        NOT NULL REFERENCES proposals(id) ON DELETE CASCADE,
  view_count  INTEGER     NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS shared_links_proposal_id_idx ON shared_links (proposal_id);
