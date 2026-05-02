-- LEAP 2026 AI Workshop — Supabase schema
-- Run this in the Supabase SQL Editor at supabase.com

-- ── Poll votes (real-time aggregation) ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS poll_votes (
  id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  poll_id     text NOT NULL,         -- 'icebreaker' | 'mid-session'
  option_idx  smallint NOT NULL,
  session_key text NOT NULL,
  created_at  timestamptz DEFAULT now()
);

-- One vote per session per poll (upsert updates the chosen option)
CREATE UNIQUE INDEX IF NOT EXISTS poll_votes_session_poll
  ON poll_votes(poll_id, session_key);

-- Allow anonymous reads and inserts via anon key
ALTER TABLE poll_votes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can vote" ON poll_votes
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can read votes" ON poll_votes
  FOR SELECT USING (true);

CREATE POLICY "Session can update own vote" ON poll_votes
  FOR UPDATE USING (true);

-- ── Prompt library (curated + community) ────────────────────────────────────
CREATE TABLE IF NOT EXISTS prompts (
  id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title       text NOT NULL,
  body        text NOT NULL,
  category    text NOT NULL,         -- 'career' | 'business' | 'productivity' | 'finance' | 'community'
  source      text DEFAULT 'curated', -- 'curated' | 'community'
  author_name text,
  tags        text[],
  upvotes     integer DEFAULT 0,
  is_featured boolean DEFAULT false,
  is_approved boolean DEFAULT true,
  created_at  timestamptz DEFAULT now()
);

ALTER TABLE prompts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read approved prompts" ON prompts
  FOR SELECT USING (is_approved = true);

-- ── Community shared results ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS shares (
  id           uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  prompt_id    uuid REFERENCES prompts(id) ON DELETE SET NULL,
  prompt_body  text NOT NULL,
  result_body  text NOT NULL,
  author_name  text,
  session_key  text NOT NULL,
  upvotes      integer DEFAULT 0,
  is_approved  boolean DEFAULT false,
  created_at   timestamptz DEFAULT now()
);

ALTER TABLE shares ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a share" ON shares
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can read approved shares" ON shares
  FOR SELECT USING (is_approved = true);

-- ── Prompt upvote dedup ───────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS prompt_upvotes (
  prompt_id   uuid REFERENCES prompts(id) ON DELETE CASCADE,
  session_key text NOT NULL,
  PRIMARY KEY (prompt_id, session_key)
);

ALTER TABLE prompt_upvotes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can upvote" ON prompt_upvotes
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can read upvotes" ON prompt_upvotes
  FOR SELECT USING (true);
