# FootyHub — Complete Technical Specification

> **Version:** 1.0 — Interview-Derived Architecture  
> **Author:** Antigravity (AI Architect)  
> **Date:** June 2026  
> **Status:** Awaiting Developer Approval

---

## Table of Contents

1. [Product Requirements Document (PRD)](#1-product-requirements-document)
2. [User Stories](#2-user-stories)
3. [Technical Architecture](#3-technical-architecture)
4. [Database Schema](#4-database-schema)
5. [API Design](#5-api-design)
6. [Folder Structure](#6-folder-structure)
7. [Recommended Tech Stack](#7-recommended-tech-stack)
8. [Development Roadmap](#8-development-roadmap)

---

## 1. Product Requirements Document

### 1.1 Executive Summary

FootyHub is an **all-in-one football intelligence platform** for association football (soccer) fans. The core value proposition is aggregating player profiles, club data, fixtures, standings, transfer market news, and football news into a single, fast, and beautiful web experience — eliminating the need to switch between multiple football websites.

### 1.2 Problem Statement

No single football website covers everything a modern fan needs. BBC Sport has news. Sofascore has live scores. Transfermarkt has transfer data. FlashScore has fixtures. Wikipedia has history. Users are forced to maintain 4–6 bookmarks to get a complete picture of any player, club, or match.

FootyHub solves this by aggregating all football intelligence into a unified search-first platform.

### 1.3 Target Users

| Segment | Description | Primary Need |
|---|---|---|
| **Casual Fan** | Age 16–24, checks scores on weekends | Quick scores, fixtures, news |
| **Working Professional** | Age 25–40, follows 1–2 clubs closely | Club news, standings, transfers |
| **Football Obsessive** | Any age, tracks xG, heatmaps, transfer rumors | Deep player/club stats, comparisons |

**Geographic Focus (MVP):** South Asia (Nepal, India, Bangladesh) + UK/European football fans. Premier League as primary league priority.

### 1.4 Core Value Proposition

> *"Search any player, club, or competition — get everything you need on one page."*

The killer feature is the **Unified Entity Page**: search "Erling Haaland" and instantly see his profile, current stats, recent matches, club info, transfer history, and related news — without a single additional click.

### 1.5 MVP Feature Set

| Feature | Scope | Notes |
|---|---|---|
| Fixtures & Results | MVP | Live updates via 60s polling |
| Football News Feed | MVP | RSS + GNews metadata only |
| Player Search & Profiles | MVP | Via Football-Data.org + cache |
| Club Search & Profiles | MVP | Via Football-Data.org + cache |
| Transfer Market News | MVP | RSS + GNews metadata |
| League Tables / Standings | MVP | Cached, revalidated every 5 min |
| Global Search | MVP | PostgreSQL FTS across all entities |
| User Authentication | MVP | Email + Google OAuth via Supabase |
| Personalized Feed | MVP | Based on favorite club |
| User Profile & Settings | MVP | Username, avatar, bio, password |
| Admin Panel | MVP | User management, content, API health |

### 1.6 V2 Feature Set (Post-MVP)

- National team profiles
- Player comparison tool
- Match highlights (video embeds)
- Personal watchlist / favorites
- Advanced stats (xG, heatmaps)
- Push notifications (score alerts)
- Data export (GDPR)
- Session management UI
- Staging environment
- Meilisearch / OpenSearch upgrade

### 1.7 Out of Scope (Cut)

- User blogs / community posts
- Fantasy football integration
- Native mobile app (future)
- Paywalled content (MVP)
- Full article storage (legal)

### 1.8 Guest vs. Authenticated Access

| Feature | Guest | User | Admin |
|---|---|---|---|
| View fixtures/results | ✅ | ✅ | ✅ |
| View league tables | ✅ | ✅ | ✅ |
| View news feed | ✅ | ✅ | ✅ |
| View player/club profiles | ✅ | ✅ | ✅ |
| Player comparison | ✅ | ✅ | ✅ |
| Save favorites | ❌ | ✅ | ✅ |
| Personalized feed | ❌ | ✅ | ✅ |
| Admin panel access | ❌ | ❌ | ✅ |
| User management | ❌ | ❌ | ✅ |
| Feature content | ❌ | ❌ | ✅ |

### 1.9 Non-Functional Requirements

| Requirement | Target |
|---|---|
| Initial page load | < 2 seconds |
| Subsequent navigation | < 1 second |
| Search response | < 500ms |
| Cached API response | < 300ms |
| Uptime | > 99% (graceful degradation during spikes) |
| Mobile responsive | Yes — mobile-first CSS |
| GDPR (Right to Erasure) | Yes — account deletion in MVP |

### 1.10 Monetization (Future)

No monetization in MVP. Future model:

1. **Freemium subscription** (~$5–10/month) for advanced features
2. **Non-intrusive ads** for free tier users
3. Role system already supports: `user | premium | admin`

---

## 2. User Stories

### Authentication

- `AUTH-01` As a visitor, I can create an account with my email and password so that I can access personalized features.
- `AUTH-02` As a visitor, I can sign in with Google OAuth so that I don't need to remember a separate password.
- `AUTH-03` As a user, I remain logged in for 30 days unless I explicitly log out.
- `AUTH-04` As a user, I can log in from multiple devices simultaneously.
- `AUTH-05` As a user, I can change my password from the settings page.
- `AUTH-06` As a user, I can delete my account and all associated data permanently.
- `AUTH-07` As a user, I receive a welcome email when I register.

### Core Football Features

- `FIX-01` As a visitor, I can view today's fixtures and recent results without logging in.
- `FIX-02` As a visitor, I can filter fixtures by competition (e.g., Premier League, Champions League).
- `FIX-03` As a visitor, I can see a fixture automatically refresh every 60–120 seconds during a live match.
- `STD-01` As a visitor, I can view the current league table for any supported competition.
- `NEWS-01` As a visitor, I can read a curated news feed with headlines, summaries, and source links.
- `NEWS-02` As a visitor, clicking a news article redirects me to the original publisher.
- `TRN-01` As a visitor, I can view a transfer news feed with the latest rumors and confirmed moves.

### Search

- `SRC-01` As a visitor, I can search for a player by name and see their profile.
- `SRC-02` As a visitor, I can search for a club by name and see their profile.
- `SRC-03` As a visitor, when I search "Mbappe", I see matching players, clubs he's played for, related news, and related transfers in a unified results page.
- `SRC-04` As a visitor, search results load in under 500ms.
- `SRC-05` As a visitor, I can compare two players' statistics side-by-side without logging in.

### Profiles

- `PLY-01` As a visitor, I can view a player's profile including nationality, position, current club, recent matches, and related news.
- `CLB-01` As a visitor, I can view a club's profile including their current squad, recent results, upcoming fixtures, league position, and related news.

### Personalization

- `PRS-01` As a user, I can set a favourite club to personalise my news feed.
- `PRS-02` As a user, my homepage shows upcoming fixtures and news for my favourite club.
- `PRS-03` As a user, I can save favourite players for quick access.
- `PRS-04` As a user, I can edit my profile (username, avatar, bio).

### Admin

- `ADM-01` As an admin, I can view all registered users.
- `ADM-02` As an admin, I can suspend or delete a user account.
- `ADM-03` As an admin, I can feature specific news articles on the homepage.
- `ADM-04` As an admin, I can view the health status of all external API providers.
- `ADM-05` As an admin, accessing `/admin` while not an admin returns a 403 Forbidden page.

---

## 3. Technical Architecture

### 3.1 System Overview

```
┌────────────────────────────────────────────────────────┐
│                    User's Browser                       │
│              Next.js 15 (React, TypeScript)             │
└─────────────────────────┬──────────────────────────────┘
                          │ HTTPS
┌─────────────────────────▼──────────────────────────────┐
│                Vercel Edge Network                       │
│         (CDN, ISR Cache, Edge Middleware)                │
└──────┬──────────────────┬──────────────────────────────┘
       │                  │
┌──────▼──────┐   ┌───────▼──────────────────────────────┐
│ Next.js     │   │           Supabase                    │
│ App Router  │   │  ┌─────────────────────────────────┐  │
│ Server      │◄──┤  │  PostgreSQL (Primary Database)  │  │
│ Components  │   │  │  + Full-Text Search (GIN Index) │  │
│ Server      │   │  └─────────────────────────────────┘  │
│ Actions     │   │  ┌──────────────┐ ┌────────────────┐  │
│ Route       │   │  │     Auth     │ │    Storage     │  │
│ Handlers    │   │  │  (JWT + RLS) │ │  (Avatars etc) │  │
└──────┬──────┘   └──────────────────────────────────────┘
       │
       │ Server-side API calls (cached)
┌──────▼──────────────────────────────────────────────────┐
│              External Data Providers                      │
│  ┌─────────────────────┐  ┌──────────────────────────┐  │
│  │  Football-Data.org  │  │  RSS Feeds + GNews API   │  │
│  │  (Fixtures, Teams,  │  │  (BBC Sport, Sky Sports, │  │
│  │  Players, Standings)│  │   ESPN FC, Goal.com)     │  │
│  └─────────────────────┘  └──────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

### 3.2 Key Architectural Patterns

#### Pattern 1: Cache-First Data Layer

Every football API response flows through a cache-first pattern:

```
Request → Check DB Cache → Cache Hit? → Return cached data
                        → Cache Miss? → Call External API
                                      → Store in DB with TTL
                                      → Return fresh data
```

**TTL Strategy by Entity Type:**

| Entity | Cache TTL | Reasoning |
|---|---|---|
| Live match score | 60 seconds | High freshness need |
| Today's fixtures | 5 minutes | Semi-live |
| League standings | 5 minutes | Updated after matches |
| Player profile | 24 hours | Rarely changes |
| Club profile | 24 hours | Rarely changes |
| News metadata | 15 minutes | Frequent updates |
| Transfer news | 30 minutes | Moderate updates |

#### Pattern 2: Football API Provider Abstraction

A typed interface decouples your application from Football-Data.org. Swapping providers = implementing a new class, not rewriting your app.

```typescript
// lib/football-api/provider.interface.ts
interface FootballDataProvider {
  getFixtures(params: FixtureParams): Promise<Fixture[]>
  getStandings(competitionId: string): Promise<Standing[]>
  getPlayer(playerId: string): Promise<Player>
  getClub(clubId: string): Promise<Club>
  getCompetitions(): Promise<Competition[]>
}

// lib/football-api/index.ts
// Swap this import to change providers globally
export { FootballDataOrgProvider as activeProvider }
```

#### Pattern 3: ISR (Incremental Static Regeneration)

Static-ish pages (standings, competition overview) use Next.js ISR with `revalidate` so they're pre-rendered and served from the CDN edge — without hitting your database on every request.

```typescript
// app/(main)/competitions/[id]/page.tsx
export const revalidate = 300 // Rebuild every 5 minutes
```

#### Pattern 4: Row Level Security (RLS)

Supabase RLS policies enforce data access at the database level. Even if a bug exists in your Next.js code, the database refuses to serve data that violates these policies.

```sql
-- Users can only read/write their own favorites
CREATE POLICY "users_own_favorites" ON favorite_players
  USING (auth.uid() = user_id);
```

#### Pattern 5: Background Polling (Client-Side)

For live match pages, a client-side polling hook refreshes data without WebSockets:

```typescript
// hooks/use-polling.ts
useEffect(() => {
  const interval = setInterval(refetch, 60_000) // 60 seconds
  return () => clearInterval(interval)
}, [])
```

### 3.3 Data Flow: Search Request

```
User types "Haaland"
      │
      ▼
Debounced fetch to /api/search?q=haaland
      │
      ▼
Route Handler: Full-text search across:
  - cached_players (tsvector on name, nationality)
  - cached_clubs (tsvector on name, country)
  - news_articles (tsvector on title, summary)
      │
      ▼
Results merged & ranked by relevance
      │
      ▼
Return: { players[], clubs[], news[] }
      │
      ▼
Client renders unified search results page
```

### 3.4 Authentication Flow

```
User clicks "Sign in with Google"
      │
      ▼
Supabase Auth initiates OAuth flow
      │
      ▼
Google returns user data + tokens
      │
      ▼
Supabase creates/updates auth.users record
      │
      ▼
Supabase trigger creates public.users profile
      │
      ▼
JWT stored in secure httpOnly cookie (30 days)
      │
      ▼
Next.js middleware reads JWT on every request
      │
      ▼
Middleware injects user context into Server Components
```

### 3.5 Admin Authorization

```typescript
// middleware.ts
if (pathname.startsWith('/admin')) {
  const user = await getUser(request)
  if (!user || user.role !== 'admin') {
    return NextResponse.redirect('/403')
  }
}
```

---

## 4. Database Schema

### 4.1 Schema Overview

```
auth.users (Supabase managed)
    │
    └── public.users (extends auth.users via trigger)
              │
              ├── public.favorite_players
              └── public.favorite_clubs

public.cached_players ──────────────────────────────┐
public.cached_clubs                                  │
public.cached_fixtures                               ├── Core Cache Tables
public.cached_standings                              │
public.news_articles                                 │
public.transfer_news ───────────────────────────────┘

public.api_request_logs (observability)
```

### 4.2 Full Table Definitions

```sql
-- ============================================================
-- USERS
-- ============================================================
CREATE TYPE user_role AS ENUM ('user', 'premium', 'admin');

CREATE TABLE public.users (
  id           uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email        text UNIQUE NOT NULL,
  username     text UNIQUE NOT NULL,
  avatar_url   text,
  bio          text CHECK (char_length(bio) <= 300),
  role         user_role NOT NULL DEFAULT 'user',
  favorite_club_id   text,         -- External API club ID
  favorite_club_name text,
  created_at   timestamptz NOT NULL DEFAULT now(),
  updated_at   timestamptz NOT NULL DEFAULT now()
);

-- Auto-create profile on Supabase Auth signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, username)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1))
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();


-- ============================================================
-- FAVORITE PLAYERS
-- ============================================================
CREATE TABLE public.favorite_players (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  player_id    text NOT NULL,    -- External API player ID
  player_name  text NOT NULL,
  player_photo text,
  club_name    text,
  created_at   timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, player_id)
);


-- ============================================================
-- FAVORITE CLUBS
-- ============================================================
CREATE TABLE public.favorite_clubs (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  club_id     text NOT NULL,     -- External API club ID
  club_name   text NOT NULL,
  club_logo   text,
  created_at  timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, club_id)
);


-- ============================================================
-- CACHED FIXTURES
-- ============================================================
CREATE TABLE public.cached_fixtures (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  fixture_id      text UNIQUE NOT NULL,  -- External API fixture ID
  competition_id  text NOT NULL,
  competition_name text NOT NULL,
  home_team_id    text NOT NULL,
  away_team_id    text NOT NULL,
  home_team_name  text NOT NULL,
  away_team_name  text NOT NULL,
  home_team_logo  text,
  away_team_logo  text,
  match_date      timestamptz NOT NULL,
  status          text NOT NULL,  -- SCHEDULED, LIVE, FINISHED, POSTPONED
  home_score      integer,
  away_score      integer,
  venue           text,
  raw_data        jsonb,          -- Full provider response, for future use
  cached_at       timestamptz NOT NULL DEFAULT now(),
  expires_at      timestamptz NOT NULL
);

CREATE INDEX idx_cached_fixtures_match_date ON cached_fixtures(match_date);
CREATE INDEX idx_cached_fixtures_competition ON cached_fixtures(competition_id);
CREATE INDEX idx_cached_fixtures_expires ON cached_fixtures(expires_at);
CREATE INDEX idx_cached_fixtures_teams ON cached_fixtures(home_team_id, away_team_id);


-- ============================================================
-- CACHED PLAYERS
-- ============================================================
CREATE TABLE public.cached_players (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  player_id        text UNIQUE NOT NULL,
  name             text NOT NULL,
  photo            text,
  nationality      text,
  position         text,
  date_of_birth    date,
  current_club_id  text,
  current_club_name text,
  shirt_number     integer,
  raw_data         jsonb,
  search_vector    tsvector,      -- Pre-computed FTS vector
  cached_at        timestamptz NOT NULL DEFAULT now(),
  expires_at       timestamptz NOT NULL
);

CREATE INDEX idx_cached_players_search ON cached_players USING GIN(search_vector);
CREATE INDEX idx_cached_players_name ON cached_players(name);
CREATE INDEX idx_cached_players_expires ON cached_players(expires_at);

-- Auto-compute tsvector on insert/update
CREATE OR REPLACE FUNCTION update_player_search_vector()
RETURNS TRIGGER AS $$
BEGIN
  NEW.search_vector := to_tsvector('english',
    coalesce(NEW.name, '') || ' ' ||
    coalesce(NEW.nationality, '') || ' ' ||
    coalesce(NEW.current_club_name, '') || ' ' ||
    coalesce(NEW.position, '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER player_search_vector_update
  BEFORE INSERT OR UPDATE ON cached_players
  FOR EACH ROW EXECUTE FUNCTION update_player_search_vector();


-- ============================================================
-- CACHED CLUBS
-- ============================================================
CREATE TABLE public.cached_clubs (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  club_id          text UNIQUE NOT NULL,
  name             text NOT NULL,
  short_name       text,
  tla              text,          -- Three-letter abbreviation (MCI, MUN etc)
  logo             text,
  country          text,
  founded          integer,
  venue            text,
  website          text,
  competition_ids  text[],        -- Competitions this club participates in
  raw_data         jsonb,
  search_vector    tsvector,
  cached_at        timestamptz NOT NULL DEFAULT now(),
  expires_at       timestamptz NOT NULL
);

CREATE INDEX idx_cached_clubs_search ON cached_clubs USING GIN(search_vector);
CREATE INDEX idx_cached_clubs_name ON cached_clubs(name);


-- ============================================================
-- CACHED STANDINGS
-- ============================================================
CREATE TABLE public.cached_standings (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  competition_id   text NOT NULL,
  season           text NOT NULL,  -- e.g. "2024/2025"
  raw_data         jsonb NOT NULL,
  cached_at        timestamptz NOT NULL DEFAULT now(),
  expires_at       timestamptz NOT NULL,
  UNIQUE (competition_id, season)
);


-- ============================================================
-- NEWS ARTICLES (METADATA ONLY)
-- ============================================================
CREATE TABLE public.news_articles (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title             text NOT NULL,
  summary           text,
  source_name       text NOT NULL,
  source_url        text NOT NULL UNIQUE,
  thumbnail_url     text,
  published_at      timestamptz NOT NULL,
  tags              text[],
  related_player_ids text[],
  related_club_ids  text[],
  category          text DEFAULT 'general', -- general, transfers, match_report
  search_vector     tsvector,
  created_at        timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_news_published ON news_articles(published_at DESC);
CREATE INDEX idx_news_search ON news_articles USING GIN(search_vector);
CREATE INDEX idx_news_clubs ON news_articles USING GIN(related_club_ids);


-- ============================================================
-- TRANSFER NEWS (METADATA ONLY)
-- ============================================================
CREATE TABLE public.transfer_news (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title            text NOT NULL,
  summary          text,
  source_name      text NOT NULL,
  source_url       text NOT NULL UNIQUE,
  thumbnail_url    text,
  player_id        text,
  player_name      text,
  from_club_id     text,
  from_club_name   text,
  to_club_id       text,
  to_club_name     text,
  fee_description  text,          -- "€50m", "Free", "Undisclosed"
  transfer_type    text,          -- permanent, loan, free, rumour
  published_at     timestamptz NOT NULL,
  created_at       timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_transfers_published ON transfer_news(published_at DESC);
CREATE INDEX idx_transfers_player ON transfer_news(player_id);


-- ============================================================
-- API REQUEST LOGS (OBSERVABILITY)
-- ============================================================
CREATE TABLE public.api_request_logs (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  provider         text NOT NULL,   -- 'football-data-org', 'gnews', 'rss'
  endpoint         text NOT NULL,
  status_code      integer,
  response_time_ms integer,
  error_message    text,
  created_at       timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_api_logs_provider ON api_request_logs(provider, created_at DESC);


-- ============================================================
-- ROW LEVEL SECURITY POLICIES
-- ============================================================

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorite_players ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorite_clubs ENABLE ROW LEVEL SECURITY;

-- Users can read their own profile
CREATE POLICY "users_read_own" ON public.users
  FOR SELECT USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "users_update_own" ON public.users
  FOR UPDATE USING (auth.uid() = id);

-- Admins can read all users
CREATE POLICY "admin_read_all_users" ON public.users
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Favorite players: users own their data
CREATE POLICY "own_favorite_players" ON public.favorite_players
  USING (auth.uid() = user_id);

-- Favorite clubs: users own their data
CREATE POLICY "own_favorite_clubs" ON public.favorite_clubs
  USING (auth.uid() = user_id);
```

### 4.3 Entity Relationship Diagram

```
auth.users
    │ 1:1
    ▼
public.users ──────────────────────────────────────┐
    │ 1:many                                        │
    ├──► favorite_players (user_id FK)              │
    └──► favorite_clubs (user_id FK)                │
                                                    │
cached_players ◄── referenced by favorite_players  │
cached_clubs   ◄── referenced by favorite_clubs    │
               ◄── referenced by cached_fixtures    │
               ◄── referenced by public.users       ◄┘
               ◄── referenced by transfer_news

news_articles (standalone, tagged with club/player IDs)
transfer_news (standalone, tagged with club/player IDs)
cached_standings (standalone, keyed by competition + season)
api_request_logs (standalone, append-only)
```

---

## 5. API Design

### 5.1 Architecture Decision

FootyHub uses **Next.js 15 Route Handlers** for public/data endpoints and **Server Actions** for authenticated mutations. There is no separate Express/NestJS server.

### 5.2 Route Handlers (Public & Protected)

All routes live under `app/api/`.

#### Football Data

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/fixtures` | None | Get fixtures with query params |
| `GET` | `/api/fixtures/[id]` | None | Get single fixture detail |
| `GET` | `/api/standings/[competitionId]` | None | Get standings for competition |
| `GET` | `/api/players/[id]` | None | Get player profile (cache-first) |
| `GET` | `/api/clubs/[id]` | None | Get club profile (cache-first) |
| `GET` | `/api/competitions` | None | List supported competitions |
| `GET` | `/api/search` | None | Unified FTS across all entities |

**Query Parameters — `/api/fixtures`:**

```
/api/fixtures?competition=PL&status=LIVE&dateFrom=2025-01-01&dateTo=2025-01-07
```

| Param | Type | Description |
|---|---|---|
| `competition` | string | Competition code (PL, CL, BL1, etc.) |
| `status` | string | SCHEDULED, LIVE, FINISHED |
| `dateFrom` | ISO date | Filter from date |
| `dateTo` | ISO date | Filter to date |
| `teamId` | string | Filter by team |

**Query Parameters — `/api/search`:**

```
/api/search?q=haaland&type=all&limit=10
```

| Param | Type | Description |
|---|---|---|
| `q` | string | Search query (required) |
| `type` | string | `all`, `players`, `clubs`, `news` |
| `limit` | number | Results per type (default: 5) |

#### News & Transfers

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/news` | None | Paginated news feed |
| `GET` | `/api/transfers` | None | Paginated transfer news |

**Query Parameters — `/api/news`:**

```
/api/news?category=general&clubId=65&page=1&limit=20
```

#### Admin

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/admin/users` | Admin | Paginated user list |
| `PATCH` | `/api/admin/users/[id]` | Admin | Update user (suspend/unsuspend) |
| `DELETE` | `/api/admin/users/[id]` | Admin | Delete user account |
| `GET` | `/api/admin/health` | Admin | External API health status |

### 5.3 Server Actions (Authenticated Mutations)

Server Actions are used for all authenticated write operations. They run server-side and include automatic CSRF protection via Next.js.

```typescript
// actions/favorites.ts
'use server'

export async function addFavoritePlayer(playerId: string, playerData: PlayerData)
export async function removeFavoritePlayer(playerId: string)
export async function addFavoriteClub(clubId: string, clubData: ClubData)
export async function removeFavoriteClub(clubId: string)
```

```typescript
// actions/profile.ts
'use server'

export async function updateProfile(data: UpdateProfileInput)
export async function changePassword(data: ChangePasswordInput)
export async function deleteAccount()
export async function setFavoriteClub(clubId: string, clubName: string)
```

```typescript
// actions/auth.ts
'use server'

export async function signInWithEmail(data: SignInInput)
export async function signUpWithEmail(data: SignUpInput)
export async function signOut()
export async function signInWithGoogle()
```

### 5.4 Standard API Response Format

All Route Handlers return consistent JSON envelopes:

```typescript
// Success
{
  "success": true,
  "data": { ... },
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "cached": true,
    "cachedAt": "2025-01-15T10:30:00Z"
  }
}

// Error
{
  "success": false,
  "error": {
    "code": "NOT_FOUND",
    "message": "Player not found"
  }
}
```

### 5.5 Rate Limiting

Implemented as Next.js middleware using an in-memory sliding window:

| User Type | Endpoint | Limit |
|---|---|---|
| Guest | `/api/search` | 50 req/hour |
| Guest | All other public | 200 req/hour |
| Authenticated | All endpoints | No limit (MVP) |

### 5.6 Football API Provider Abstraction

```typescript
// lib/football-api/provider.interface.ts
export interface FootballDataProvider {
  readonly name: string
  getFixtures(params: FixtureQueryParams): Promise<Fixture[]>
  getFixtureById(id: string): Promise<Fixture>
  getStandings(competitionId: string, season?: string): Promise<Standing[]>
  getPlayer(playerId: string): Promise<Player>
  getClub(clubId: string): Promise<Club>
  getClubFixtures(clubId: string, limit?: number): Promise<Fixture[]>
  getCompetitions(): Promise<Competition[]>
  getTransfers(clubId?: string): Promise<Transfer[]>
}

// lib/football-api/index.ts
import { FootballDataOrgProvider } from './football-data-org'
export const footballApi: FootballDataProvider = new FootballDataOrgProvider()

// To switch providers in future:
// import { ApiFootballProvider } from './api-football'
// export const footballApi: FootballDataProvider = new ApiFootballProvider()
```

---

## 6. Folder Structure

```
footyhub/
│
├── .github/
│   └── workflows/
│       ├── ci.yml              # Lint + type-check + test on PR
│       └── preview.yml         # Vercel preview deploy
│
├── app/                        # Next.js 15 App Router
│   ├── (auth)/                 # Auth route group (no main nav)
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── register/
│   │   │   └── page.tsx
│   │   ├── forgot-password/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   │
│   ├── (main)/                 # Public-facing pages
│   │   ├── page.tsx            # Homepage (personalized if logged in)
│   │   ├── fixtures/
│   │   │   ├── page.tsx        # Fixtures list with filters
│   │   │   └── [id]/
│   │   │       └── page.tsx    # Single fixture detail
│   │   ├── players/
│   │   │   └── [id]/
│   │   │       └── page.tsx    # Unified player profile
│   │   ├── clubs/
│   │   │   └── [id]/
│   │   │       └── page.tsx    # Unified club profile
│   │   ├── competitions/
│   │   │   └── [id]/
│   │   │       ├── page.tsx    # Competition overview
│   │   │       └── standings/
│   │   │           └── page.tsx
│   │   ├── news/
│   │   │   └── page.tsx        # News feed
│   │   ├── transfers/
│   │   │   └── page.tsx        # Transfer market news
│   │   ├── search/
│   │   │   └── page.tsx        # Unified search results
│   │   └── layout.tsx          # Main nav + footer
│   │
│   ├── (dashboard)/            # Authenticated user pages
│   │   ├── profile/
│   │   │   └── page.tsx
│   │   ├── settings/
│   │   │   └── page.tsx
│   │   ├── favorites/
│   │   │   └── page.tsx
│   │   └── layout.tsx          # Dashboard nav
│   │
│   ├── admin/                  # Admin-only pages
│   │   ├── page.tsx            # Admin dashboard
│   │   ├── users/
│   │   │   └── page.tsx
│   │   ├── content/
│   │   │   └── page.tsx
│   │   ├── monitoring/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   │
│   ├── api/                    # Route Handlers
│   │   ├── fixtures/
│   │   │   ├── route.ts
│   │   │   └── [id]/route.ts
│   │   ├── standings/
│   │   │   └── [competitionId]/route.ts
│   │   ├── players/
│   │   │   └── [id]/route.ts
│   │   ├── clubs/
│   │   │   └── [id]/route.ts
│   │   ├── competitions/
│   │   │   └── route.ts
│   │   ├── search/
│   │   │   └── route.ts
│   │   ├── news/
│   │   │   └── route.ts
│   │   ├── transfers/
│   │   │   └── route.ts
│   │   └── admin/
│   │       ├── users/route.ts
│   │       ├── users/[id]/route.ts
│   │       └── health/route.ts
│   │
│   ├── layout.tsx              # Root layout (fonts, providers)
│   ├── not-found.tsx
│   ├── error.tsx
│   ├── loading.tsx
│   └── globals.css
│
├── components/
│   ├── ui/                     # Primitive UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   ├── input.tsx
│   │   ├── avatar.tsx
│   │   ├── skeleton.tsx
│   │   ├── dialog.tsx
│   │   └── toast.tsx
│   ├── layout/
│   │   ├── navbar.tsx
│   │   ├── mobile-nav.tsx
│   │   ├── footer.tsx
│   │   └── search-bar.tsx
│   ├── fixtures/
│   │   ├── fixture-card.tsx
│   │   ├── fixture-list.tsx
│   │   ├── fixture-score.tsx
│   │   └── live-indicator.tsx
│   ├── standings/
│   │   └── standings-table.tsx
│   ├── players/
│   │   ├── player-card.tsx
│   │   └── player-profile-header.tsx
│   ├── clubs/
│   │   ├── club-card.tsx
│   │   └── club-profile-header.tsx
│   ├── news/
│   │   ├── news-card.tsx
│   │   └── news-feed.tsx
│   ├── search/
│   │   ├── search-results.tsx
│   │   └── search-result-item.tsx
│   └── admin/
│       ├── users-table.tsx
│       └── api-health-panel.tsx
│
├── lib/
│   ├── supabase/
│   │   ├── client.ts           # Browser Supabase client
│   │   ├── server.ts           # Server Supabase client (cookies)
│   │   └── middleware.ts       # Session refresh helper
│   │
│   ├── football-api/           # ⭐ Provider Abstraction Layer
│   │   ├── types.ts            # Shared TypeScript interfaces
│   │   ├── provider.interface.ts
│   │   ├── cache-service.ts    # DB cache read/write with TTL
│   │   ├── football-data-org/
│   │   │   ├── client.ts       # HTTP client for football-data.org
│   │   │   ├── transformers.ts # Map API response → internal types
│   │   │   └── index.ts        # Provider implementation
│   │   └── index.ts            # Exports active provider
│   │
│   ├── news/
│   │   ├── rss-parser.ts       # Parse BBC/Sky/ESPN RSS feeds
│   │   ├── gnews-client.ts     # GNews API client
│   │   └── news-aggregator.ts  # Merge + deduplicate sources
│   │
│   ├── search/
│   │   └── full-text-search.ts # PostgreSQL FTS query builder
│   │
│   ├── email/
│   │   └── resend.ts           # Resend email client + templates
│   │
│   ├── rate-limit/
│   │   └── sliding-window.ts   # Rate limiter middleware
│   │
│   └── utils/
│       ├── formatters.ts       # Date, score, name formatters
│       ├── validators.ts       # Zod schemas
│       └── constants.ts        # Competition IDs, TTL values
│
├── actions/                    # Next.js Server Actions
│   ├── auth.ts
│   ├── favorites.ts
│   ├── profile.ts
│   └── admin.ts
│
├── hooks/                      # Client-side React hooks
│   ├── use-search.ts           # Debounced search hook
│   ├── use-favorites.ts        # Optimistic UI for favorites
│   ├── use-polling.ts          # Background data refresh
│   └── use-auth.ts             # Auth state hook
│
├── types/                      # Global TypeScript types
│   ├── football.ts             # Player, Club, Fixture, Standing
│   ├── user.ts                 # User, Session, Role
│   ├── news.ts                 # NewsArticle, TransferNews
│   └── api.ts                  # API response envelopes
│
├── supabase/
│   ├── migrations/
│   │   ├── 001_initial_schema.sql
│   │   ├── 002_rls_policies.sql
│   │   └── 003_search_indexes.sql
│   └── seed.sql                # Dev seed data
│
├── middleware.ts                # Auth + rate limit + admin guard
├── next.config.ts
├── tsconfig.json
├── .env.local                  # Local secrets (gitignored)
├── .env.example                # Template for contributors
├── .eslintrc.json
├── .prettierrc
└── README.md
```

---

## 7. Recommended Tech Stack

### 7.1 Complete Stack

| Layer | Technology | Version | Reasoning |
|---|---|---|---|
| **Framework** | Next.js | 15 (App Router) | ISR, Server Components, Server Actions |
| **Language** | TypeScript | 5.x | Type safety, better DX, portfolio signal |
| **Styling** | CSS Modules + Vanilla CSS | — | Full control, no build overhead |
| **Database** | PostgreSQL (via Supabase) | 15+ | RLS, FTS, JSONB, mature |
| **Auth** | Supabase Auth | — | OAuth, JWT, managed |
| **ORM/Query** | Supabase JS Client | 2.x | Type-safe DB queries |
| **Football API** | Football-Data.org | v4 | Free tier, reliable |
| **News** | GNews API + RSS | — | Cheap, legal, proven |
| **Email** | Resend | — | Modern DX, free 3k/mo |
| **Monitoring** | Sentry | — | Error tracking |
| **Analytics** | Google Analytics 4 | — | Industry standard |
| **Deployment** | Vercel | — | Native Next.js support |
| **CI/CD** | GitHub Actions | — | Free, industry standard |
| **Validation** | Zod | 3.x | Runtime type safety |
| **Date handling** | date-fns | 3.x | Lightweight, tree-shakeable |
| **Linting** | ESLint + Prettier | — | Code quality |

### 7.2 What We Deliberately Avoided (and Why)

| Skipped | Reason |
|---|---|
| Express / NestJS backend | Supabase + Next.js Server Actions covers all needs |
| Prisma ORM | Supabase JS client is sufficient; Prisma adds complexity |
| Redux / Zustand | React Server Components reduce client state needs significantly |
| Tailwind CSS | Vanilla CSS gives full control; avoid dependency on utility classes |
| WebSockets | Overkill for MVP; 60s polling is sufficient |
| Elasticsearch | PostgreSQL FTS handles MVP scale |
| Docker | Vercel + Supabase manages infra; Docker adds dev overhead for solo developer |
| Microservices | Premature for 5k users; monolith is the right choice |

### 7.3 Key NPM Packages

```json
{
  "dependencies": {
    "next": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "@supabase/supabase-js": "^2.x",
    "@supabase/ssr": "^0.x",
    "resend": "^3.x",
    "zod": "^3.x",
    "date-fns": "^3.x",
    "rss-parser": "^3.x",
    "@sentry/nextjs": "^8.x"
  },
  "devDependencies": {
    "typescript": "^5.x",
    "@types/node": "^20.x",
    "@types/react": "^19.x",
    "eslint": "^9.x",
    "eslint-config-next": "^15.x",
    "prettier": "^3.x"
  }
}
```

---

## 8. Development Roadmap

### Philosophy

> Ship working software at the end of every milestone. No milestone ends with half-built features. Each milestone produces a demo-able product.

### Timeline Overview

```
M1: Foundation          Weeks 1–2
M2: Football Data       Weeks 3–4
M3: Search & Profiles   Weeks 5–6
M4: News & Transfers    Weeks 7–8
M5: Personalization     Weeks 9–10
M6: Admin Panel         Weeks 11–12
M7: Polish & Launch     Weeks 13–14
── MVP LAUNCH ──────────────────────────── ~Week 14
V2 Planning             Weeks 15+
```

---

### Milestone 1 — Foundation (Weeks 1–2)

**Goal:** A working Next.js app with authentication deployed to Vercel.

- [ ] Initialize Next.js 15 project with TypeScript
- [ ] Configure ESLint, Prettier, tsconfig strictly
- [ ] Set up Supabase project (dev + prod)
- [ ] Write and run initial DB migrations (users table, RLS policies)
- [ ] Implement Email + Password auth (Supabase Auth)
- [ ] Implement Google OAuth (Supabase Auth)
- [ ] Build login, register, forgot-password pages
- [ ] Implement Next.js middleware for session handling
- [ ] Admin role guard on `/admin` routes
- [ ] Set up GitHub repository
- [ ] Configure GitHub Actions (lint + type-check on PR)
- [ ] Configure Vercel auto-deploy on `main`
- [ ] Set up environment variables (`.env.example`)

**Deliverable:** Deployed app at `footyhub.vercel.app` with working auth.

---

### Milestone 2 — Football Data Layer (Weeks 3–4)

**Goal:** Fixtures and standings live on the site, powered by Football-Data.org with caching.

- [ ] Implement Football-Data.org HTTP client (`lib/football-api/football-data-org/client.ts`)
- [ ] Define shared TypeScript types for Fixture, Club, Player, Standing
- [ ] Implement response transformers (API format → internal format)
- [ ] Build cache service with TTL read/write logic
- [ ] Create provider abstraction interface
- [ ] Implement `/api/fixtures` Route Handler (with cache-first logic)
- [ ] Implement `/api/standings/[competitionId]` Route Handler
- [ ] Implement `/api/competitions` Route Handler
- [ ] Build Fixtures list page with competition filter
- [ ] Build League Standings page
- [ ] Add ISR (`revalidate`) to standings page
- [ ] Implement 60s client-side polling on fixtures page
- [ ] Add `api_request_logs` tracking
- [ ] Build homepage with today's featured fixtures

**Deliverable:** Browse Premier League fixtures and standings live.

---

### Milestone 3 — Search & Profiles (Weeks 5–6)

**Goal:** The "killer feature" — unified search and entity profiles.

- [ ] Implement `/api/players/[id]` Route Handler (cache-first)
- [ ] Implement `/api/clubs/[id]` Route Handler (cache-first)
- [ ] Set up PostgreSQL FTS with GIN indexes on `cached_players`, `cached_clubs`
- [ ] Build `full-text-search.ts` query service
- [ ] Implement `/api/search` Route Handler (unified FTS)
- [ ] Build global search bar component with debouncing
- [ ] Build unified search results page (players + clubs + news)
- [ ] Build Player profile page (photo, stats, club, recent matches, news)
- [ ] Build Club profile page (logo, squad, fixtures, standings, news)
- [ ] Add rate limiting middleware for guest search (50/hour)
- [ ] Implement player comparison page (two players side-by-side)

**Deliverable:** Search "Haaland" → see his full profile. Search "Arsenal" → see club page.

---

### Milestone 4 — News & Transfers (Weeks 7–8)

**Goal:** A living news and transfer market feed.

- [ ] Build RSS parser (`lib/news/rss-parser.ts`)
- [ ] Configure RSS feeds: BBC Sport, Sky Sports, ESPN FC
- [ ] Build GNews API client (`lib/news/gnews-client.ts`)
- [ ] Build news aggregator (merge, deduplicate, store metadata)
- [ ] Schedule background news refresh (Vercel Cron Job every 15 min)
- [ ] Implement `/api/news` Route Handler with pagination
- [ ] Implement `/api/transfers` Route Handler with pagination
- [ ] Build News feed page (with source attribution + outbound links)
- [ ] Build Transfer market news page
- [ ] Add news FTS index for search integration
- [ ] Link news articles to player/club profile pages

**Deliverable:** Curated live news feed. Transfer rumors section live.

---

### Milestone 5 — Personalization (Weeks 9–10)

**Goal:** Authenticated users get a personalized experience.

- [ ] Build user profile page (avatar, username, bio, favorite club)
- [ ] Build account settings page (change password, delete account)
- [ ] Implement `updateProfile` Server Action
- [ ] Implement `deleteAccount` Server Action
- [ ] Implement `setFavoriteClub` Server Action
- [ ] Implement `addFavoritePlayer` / `removeFavoritePlayer` Server Actions
- [ ] Personalize homepage feed based on favorite club (news + fixtures)
- [ ] Build favorites page (saved players)
- [ ] Add "Save to favorites" button on player/club profiles
- [ ] Implement Resend welcome email on new user signup
- [ ] Set up Supabase Storage for avatar uploads

**Deliverable:** Logged-in users see personalized content. Profile pages work end-to-end.

---

### Milestone 6 — Admin Panel (Weeks 11–12)

**Goal:** A functional admin dashboard for platform management.

- [ ] Build admin layout and dashboard overview page
- [ ] Build `/admin/users` — paginated user list with search
- [ ] Implement user suspend/unsuspend actions
- [ ] Implement user delete action (with cascade)
- [ ] Build `/admin/content` — featured news management
- [ ] Build `/admin/monitoring` — API health status panel
- [ ] Display `api_request_logs` analytics (request counts, error rates)
- [ ] Admin-only route protection verified end-to-end

**Deliverable:** Full admin panel with user management and monitoring.

---

### Milestone 7 — Polish & Launch (Weeks 13–14)

**Goal:** Production-quality, publicly launched application.

- [ ] Full mobile responsive audit and fixes
- [ ] Performance audit — achieve <2s initial load on 3G
- [ ] SEO implementation (meta tags, OG tags, sitemap.xml, robots.txt)
- [ ] Sentry integration (error tracking + source maps)
- [ ] Google Analytics 4 integration
- [ ] Uptime monitoring setup (Better Uptime / UptimeRobot — free tier)
- [ ] Security audit (CORS, CSP headers, RLS policy review)
- [ ] 404 and error pages polished
- [ ] Accessibility audit (WCAG AA compliance, keyboard navigation)
- [ ] README documentation (setup guide, architecture overview)
- [ ] Purchase custom domain (`footyhub.app` or equivalent)
- [ ] Configure custom domain on Vercel
- [ ] Production smoke test (all core flows verified)
- [ ] **Public launch** 🚀

---

### V2 Roadmap (Post-Launch)

These features unlock after MVP validation:

| Feature | Complexity | Value |
|---|---|---|
| Player comparison (advanced) | Medium | High |
| National team profiles | Low | Medium |
| Match highlights (embeds) | Medium | High |
| Watchlist / favorites advanced | Low | High |
| xG + advanced stats | High | High (power users) |
| Push notifications | High | Medium |
| Meilisearch upgrade | Medium | High (scale) |
| Premium subscription tier | High | High (revenue) |
| GDPR data export | Medium | Required for EU |
| Staging environment | Low | Professional |

---

## Appendix A: Environment Variables

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=        # Server-only, never expose to client

# Football-Data.org
FOOTBALL_DATA_API_KEY=

# GNews
GNEWS_API_KEY=

# Resend
RESEND_API_KEY=

# Sentry
SENTRY_DSN=
SENTRY_AUTH_TOKEN=

# Google Analytics
NEXT_PUBLIC_GA_ID=

# App
NEXT_PUBLIC_APP_URL=https://footyhub.app
```

---

## Appendix B: Supported Competitions (MVP)

Football-Data.org free tier covers these competitions:

| Code | Competition |
|---|---|
| PL | English Premier League |
| CL | UEFA Champions League |
| PD | Spanish La Liga |
| BL1 | German Bundesliga |
| SA | Italian Serie A |
| FL1 | French Ligue 1 |
| DED | Dutch Eredivisie |
| PPL | Portuguese Primeira Liga |
| EC | European Championship |
| WC | FIFA World Cup |

---

*This document was generated from a structured architecture interview. All decisions reflect deliberate trade-offs for a solo developer building a portfolio-quality product at realistic scale.*
