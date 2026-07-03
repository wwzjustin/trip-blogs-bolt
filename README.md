# Travel Memory Timeline · Multi-Trip Journal Platform

Interactive, timeline-based travel journals — "not tourism, but field studies of civilizations."
Each trip starts as one dense, bilingual markdown research note and becomes a shareable blog page.

**Trips currently live:**
- 🇬🇧 `/trips/uk-2025` — 11 days through British civilization (Dec 2025)
- 🇲🇽 `/trips/mexico-2026` — Aztec highlands, colonial layers & the Maya Yucatán (Jun–Jul 2026)

---

## How it works

```
content/raw/<slug>.md          ← your raw travel note (human source of truth)
        │  converted in a Claude Code session per content/CONVERSION.md
        ▼
content/trips/<slug>.json      ← structured trip: an ordered array of typed BLOCKS
        │  auto-discovered by src/content/loadTrips.ts (glob import — zero wiring)
        ▼
/trips/<slug>                  ← live blog page rendered block-by-block
```

**A trip is an ordered list of blocks.** A registry (`src/blocks/index.tsx`) maps each
`block.type` to a React renderer; unknown types fall back to rendered markdown and never
break the build. Block vocabulary: `prose`, `journal`, `attractions`, `timeline`, `table`,
`reflection`, `list`, `section`.

This means structurally different trips — the UK's attraction-cards-per-day and Mexico's
dense narrative days + 75-entry political timeline + bilingual glossaries — render from the
same components with **zero per-trip code**.

## Adding a new trip

1. Drop your note at `content/raw/<place>-<year>.md`.
2. In a Claude Code session: *"Convert `content/raw/<slug>.md` per `content/CONVERSION.md`."*
   → produces `content/trips/<slug>.json`.
3. `npm run typecheck && npm run build`
4. Commit + push → Netlify auto-deploys. The trip appears on the index and at `/trips/<slug>`.

No component edits. Ever. (If a note truly needs a new content shape, see
`content/CONVERSION.md` §4 — one new block type + one renderer, additive.)

## Development

```bash
npm install
npm run dev        # http://localhost:5173
npm run typecheck
npm run build      # → dist/
```

## Project structure

```
content/            raw notes + trip JSONs + CONVERSION.md   (portable, framework-free data)
src/types/          content.ts — Block union, Trip, validator
src/content/        loadTrips.ts — glob auto-discovery
src/blocks/         one renderer per block type + registry with prose fallback
src/pages/          TripIndex (/), TripPage (/trips/:slug), NotFound
src/components/     Header (accent-gradient hero), AttractionModal, Markdown
src/contexts/ src/i18n/   UI-chrome language toggle (en/zh); trip content is bilingual inline
src/utils/          imageService — keyword → stock image with fallbacks
```

## Architecture notes

- **JSON per trip** — pure data, portable to any future frontend, git-diffable.
- **React Router** — per-trip URLs, deep links work on hard refresh (SPA redirect in `netlify.toml`).
- **Bilingual inline** — the language toggle switches UI chrome only; note content renders as authored.
- Full design rationale and build history: `BUILD_PLAN.md`.

## Tech stack

React 18 · TypeScript · Vite · Tailwind CSS · React Router · react-markdown + remark-gfm · Lucide

## Deployment

Netlify — `npm run build`, publish `dist/`, SPA redirect included. See `DEPLOY.md`.

---

**Author:** Justin · MIT License
