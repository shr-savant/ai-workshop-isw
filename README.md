# LEAP 2026 · AI Workshop App

Interactive web app for the **Making AI Work For You** workshop at LEAP Collective 2026, hosted by the India Society of Worcester (May 2, Shrewsbury MA).

Co-presented by **Rik Banerjee** and **Shrikant Savant**.

---

## Pages

| Route | Description |
|---|---|
| `/hub` | Attendee hub — live polls + Q&A chat |
| `/kit` | AI Starter Kit — tools, prompts, principles |
| `/playground` | Guided prompt experiments (Try-ons #1–3) |
| `/prompts` | Prompt library — filterable by category |
| `/prompts/[id]` | Individual prompt with inline Try It panel |
| `/schedule` | 60-minute workshop run of show |
| `/share` | Community result sharing (opens post-workshop) |

---

## Local Development

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

Copy the example file and fill in your keys:

```bash
cp .env.local.example .env.local
```

`.env.local`:

```bash
# Google Gemini — aistudio.google.com/app/apikey
GEMINI_API_KEY=AIza...

# Supabase — supabase.com > project settings > API
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

> The app runs without Supabase vars — polls will be non-functional but all other pages work.

### 3. Set up Supabase (for live polls)

1. Create a free project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run the contents of `supabase/schema.sql`
3. Copy the project URL and anon key into `.env.local`

### 4. Start the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — redirects to `/hub`.

---

## Deployment (Vercel)

### 1. Push to GitHub

```bash
git add .
git commit -m "Initial Next.js app"
git push
```

### 2. Connect to Vercel

1. Go to [vercel.com](https://vercel.com) → **Add New Project**
2. Import your GitHub repository
3. Vercel auto-detects Next.js — no build config needed

### 3. Add environment variables

In Vercel project settings → **Environment Variables**, add:

| Variable | Value |
|---|---|
| `GEMINI_API_KEY` | Your Google AI Studio key |
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon key |

### 4. Deploy

Vercel deploys automatically on every push to `main`.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router) |
| AI | Google Gemini 2.0 Flash (`@google/generative-ai`) |
| Database | Supabase (Postgres + Row Level Security) |
| Styling | Tailwind CSS + CSS custom properties |
| Deployment | Vercel |

---

## Security Notes

- `GEMINI_API_KEY` is server-side only — never exposed to the browser
- `/api/chat` enforces a rate limit of 20 requests per session per hour
- Supabase RLS is enabled on all tables — anon key is safe to expose publicly
- `.env.local` is gitignored

---

## Project Structure

```
app/
├── api/
│   ├── chat/route.ts          # Gemini proxy
│   └── polls/
│       ├── vote/route.ts      # Cast a poll vote
│       └── results/route.ts   # Fetch live tallies
├── hub/                       # Attendee hub
├── kit/                       # AI Starter Kit
├── playground/                # Guided experiments
├── prompts/                   # Prompt library
│   └── [id]/                  # Individual prompt
├── schedule/                  # Run of show
├── share/                     # Community sharing
├── layout.tsx
└── globals.css

components/
├── SiteNav.tsx                # Sticky top nav
├── ChatPanel.tsx              # Reusable AI chat UI
└── PollCard.tsx               # Live poll with Supabase sync

lib/
└── supabase.ts                # Lazy Supabase client

supabase/
└── schema.sql                 # Run this in Supabase SQL Editor
```
