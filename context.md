# Travel Journals — context.md

> Read this first in any new session in this repo. It's the project overview, the architecture
> rationale, and the current-state snapshot in one place — replaces the old README.md and
> BUILD_PLAN.md (merged here; both are gone).

## What this is

Interactive, timeline-based travel journals — "not tourism, but field studies of civilizations."
Justin writes one dense, bilingual (中文 + English) markdown research note per trip; it becomes a
shareable blog page. Originally a Bolt-generated single-trip site (hardcoded to one UK trip),
rebuilt into a multi-trip platform where **adding a trip touches zero component code.**

**Live trips:**
- 🇬🇧 `/trips/uk-2025` — 11 days through British civilization, Dec 17–27, 2025
- 🇲🇽 `/trips/mexico-2026` — 7 days, Aztec highlands to the Maya Yucatán, Jun–Jul 2026

## How it works

```
content/raw/<slug>.md          ← raw travel note (human source of truth, never deleted)
        │  converted in a Claude Code session per content/CONVERSION.md
        ▼
content/trips/<slug>.json      ← structured trip: an ordered array of typed BLOCKS
        │  auto-discovered by src/content/loadTrips.ts (glob import — zero wiring)
        ▼
/trips/<slug>                  ← live blog page, rendered block-by-block
```

**A trip is an ordered list of blocks.** A registry (`src/blocks/index.tsx`) maps each
`block.type` to a React renderer; an unknown type falls back to rendered markdown instead of
crashing. Block vocabulary: `prose`, `journal`, `attractions`, `timeline`, `table`, `reflection`,
`list`, `section`. This is why the UK (attraction-cards-per-day) and Mexico (dense narrative days
+ a 75-entry timeline + bilingual glossaries) — two structurally different notes — render from the
exact same components.

## Adding a new trip

1. Drop the note at `content/raw/<place>-<year>.md`.
2. In a Claude Code session: *"Convert `content/raw/<slug>.md` per `content/CONVERSION.md`."*
   → produces `content/trips/<slug>.json`.
3. `npm run typecheck && npm run build`
4. Commit + push → Netlify auto-deploys (repo is already connected; no CLI login needed). The
   trip appears on the index and at `/trips/<slug>` automatically.

`content/CONVERSION.md` is the detailed contract: the canonical editorial flow (framework →
timeline → daily journal with attraction-card drill-downs → key takeaways → reference-library
appendix), the bilingual-output requirement, the markdown→block mapping table, and how to extend
the block vocabulary if a note needs a genuinely new shape. Read it before converting a note —
don't guess the format from this file.

## Architecture decisions (the "why")

- **Blocks + registry + prose fallback**, not a fixed schema. A fixed schema (the original
  `Attraction`/`historicalTimeline` model) has to know every content shape in advance; every new
  note format would need a new typed field and component. The registry's `?? ProseFallback` is
  what lets a brand-new block type render safely (as markdown) before its dedicated component
  even exists.
- **JSON lives inside this repo** (`content/trips/`), not at the workspace root. Netlify only
  builds this repo — content living outside it would be unreachable at build time. Raw `.md`
  notes are equally in-repo (`content/raw/`) for the same reason; this was a deliberate reversal
  of an earlier, more "portable" design that didn't account for the Netlify build boundary.
- **`L10n = string | {zh, en}`** on every human-readable field (`src/types/content.ts`). The
  language toggle switches real content, not just UI chrome. Plain strings still work (shown in
  both languages) — useful for inherently-bilingual glossary rows. New trips should ship `{zh,
  en}` for anything reader-facing (see CONVERSION.md §1.4 for exactly which fields).
- **`dayKey` on journal blocks** — optional, for trips where one calendar day is split into
  multiple entries (morning/noon/afternoon/evening, as Mexico's 6/27 and 6/28 are). Entries
  sharing a `dayKey` count as one day in `countJournalDays`; blocks without one always count
  individually (the common case — one block per day, as in the UK trip).
- **React Router, per-trip URLs** — shareable deep links, real back button, per-trip page title.
  It's a blog, not a single-page app.
- **Images are self-hosted** in `public/images/`, downloaded from Wikipedia and resized to
  1200px via `sips`. Hotlinking external CDNs (Wikimedia, Britannica, Alamy) all failed in
  practice — rate-limited, ORB-blocked, or watermarked comps — so every landmark photo across
  both trips was fetched once and committed. `src/utils/imageService.ts`'s `photoMap` matches on
  the longest key first, so specific keys (`chapultepec`) beat generic ones (`castle`); an
  unmatched keyword gets a quiet in-palette SVG placeholder, never a random stock photo.
- **No CMS, no upload UI, no automated conversion script.** Conversion happens in a Claude Code
  session, deliberately human-in-the-loop — this runs a few times a year, not a workload worth
  automating end-to-end.

## Design system

Shares its visual language with ArtStory ("Digital Curator"): bronze `#715b37` primary, warm
surface `#f9f9f9`, ink text `#2d3435`, hairline borders at `rgba(45,52,53,.08)`, ambient 6%-opacity
shadows, Noto Serif (display) + Inter (body), glass sticky nav, uppercase-tracked section
dividers. Tokens are copied into `src/index.css`; keep new components in this language rather than
inventing new colors/type.

## Project structure

```
content/            raw notes + trip JSONs + CONVERSION.md   (portable, framework-agnostic data)
src/types/           content.ts — Block union, Trip, L10n, validator, countJournalDays
src/content/         loadTrips.ts — glob auto-discovery, sorted by `order`
src/blocks/          one renderer per block type + registry with prose fallback
src/pages/           TripIndex (/), TripPage (/trips/:slug), NotFound
src/components/      Header (accent hero), AttractionModal, Markdown
src/contexts/ src/i18n/   UI-chrome language toggle (en/zh) — NOT trip content, see L10n above
src/utils/           imageService — keyword → self-hosted photo, longest-key-wins matching
public/images/       self-hosted landmark photos (UK + Mexico, ~41 files)
```

## Development

```bash
npm install
npm run dev        # http://localhost:5173
npm run typecheck
npm run build       # → dist/
```

## Deployment

Netlify, connected to this GitHub repo for push-to-deploy — `git push` is the entire deploy step,
no CLI login required on any machine. Build: `npm run build`, publish `dist/`. SPA redirect
(`/*` → `/index.html`, 200) is in `netlify.toml` so deep links survive a hard refresh.

## Known caveats / open items

- **UK per-day dates are a best-guess reconciliation, not verified fact.** The raw note only
  states "December 2025" for the whole trip (no per-day dates existed anywhere in it). Justin
  gave arrival 12/17 and departure 12/26, which spans 10 calendar days — one short of the 11
  labeled itinerary days, and Day 11 (Seven Sisters → Brighton → Westminster) is too substantial
  to be a travel-home day. Resolved by keeping the stated arrival date and extending departure to
  **Dec 27** rather than trimming a day's content. If the arrival was actually the imprecise one
  (i.e., true arrival was 12/16), the fix is a one-shot script re-run shifting every date back a
  day — see git history (`git log --oneline -- content/trips/uk-2025.json`) for the exact script
  used, or just ask a Claude Code session to regenerate it.
- Bundle isn't code-split (single ~1.1MB JS chunk) — non-blocking at current trip count, worth
  addressing with `manualChunks` if the trip count grows significantly.

## Tech stack

React 18 · TypeScript · Vite · Tailwind CSS · React Router · react-markdown + remark-gfm · Lucide

---

**Author:** Justin · MIT License
