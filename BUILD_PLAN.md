# BUILD PLAN — Travel Notes → Multi-Trip Blog Platform

> **Status:** ✅ BUILT (2026-07-03). Phases 0–6 complete and verified (typecheck clean, production build passing, 22/22 Playwright checks across index / UK page / Mexico page / modal / 404 / deep links, zero console errors). Phase 7: `netlify.toml` SPA redirect in place; deploy pending one-time `netlify login`. This document remains the architecture reference; for the per-trip conversion workflow see `content/CONVERSION.md`.
> **Audience:**
> 1. **The builder** (a Claude Code session, likely Sonnet) — execute the phases in order.
> 2. **Future conversion sessions** — when Justin drops a new `content/raw/<slug>.md` and says "convert this," read **§9 Conversion Contract** and produce `content/trips/<slug>.json`.
>
> **Read this whole file before writing code.** Do not start from the old README's "Adding New Trips" section — that describes the *pre-refactor* pattern this plan replaces.

---

## 1. What we're building & why

Justin travels and writes one dense, bilingual (中文 + English) `.md` research note per trip. Today the repo renders exactly **one** trip (UK, Dec 2025), hardcoded. The goal is a small **multi-trip travel-blog platform** where:

- Adding a trip = **drop one `.md` note → convert to one `.json` → it appears as its own blog page.** No component code is touched per trip.
- The renderer handles **any note shape**, because trips differ structurally. The UK note is attraction-card-per-place; the Mexico note is dense narrative days + parallel timelines + a big bilingual glossary. Trip #5 will be different again.
- Each trip is a **shareable URL** (`/trips/uk-2025`), because this is a *blog*.

**Two decisions already locked (do not revisit):**

| Decision | Choice | Why |
|---|---|---|
| Structured storage format | **JSON per trip** (`content/trips/<slug>.json`) | Pure data, portable to any future frontend, native Vite import, git-diffable, reliable for LLM generation. |
| Navigation | **React Router, per-trip URLs** | Shareable deep links, real back button, per-trip page titles. It's a blog. |

**Raw `.md` is always the human source of truth.** JSON is the generated, machine-rendered artifact. Never delete a raw note.

---

## 2. The core idea: blocks + registry + fallback

The reason a fixed schema (the current `Attraction` / `historicalTimeline` / `scotlandTimeline` model) fails: **it must know every content type in advance.** Every new note shape would need a new typed field and a new component.

Instead: **a trip is an ordered array of typed `blocks`.** A registry maps `block.type → React renderer`. Rendering an unknown/new block type falls back to rendered markdown — **it never crashes the build.** Adding a new content shape later = add one union member + register one renderer. That's the whole extensibility story.

```
trip.json ──▶ TripPage ──▶ for each block ──▶ registry[block.type] ?? Fallback ──▶ rendered UI
```

This is the load-bearing design. Keep the block vocabulary **small** (7 types below cover both existing trips). Only add a type when a real note needs something none of them express.

---

## 3. Target folder structure

```
trip-blogs-bolt/
├── BUILD_PLAN.md                 ← this file
├── content/                      ← NEW. Self-contained, portable, git-tracked. Build reads it.
│   ├── raw/                      ← human source of truth (NOT bundled into the app)
│   │   ├── uk-2025.md
│   │   └── mexico-2026.md
│   ├── trips/                    ← generated, rendered by the app
│   │   ├── uk-2025.json
│   │   └── mexico-2026.json
│   └── CONVERSION.md             ← extract §9 here in Phase 0 (the note→json contract)
├── src/
│   ├── types/
│   │   └── content.ts            ← NEW. The Block union + Trip type + validator. (Replaces types/trip.ts)
│   ├── content/
│   │   └── loadTrips.ts          ← NEW. import.meta.glob('../../content/trips/*.json') → Trip[]
│   ├── blocks/                   ← NEW. One renderer per block type + registry.
│   │   ├── index.tsx            ← BlockRenderer: registry lookup + fallback
│   │   ├── ProseBlock.tsx
│   │   ├── JournalBlock.tsx
│   │   ├── AttractionsBlock.tsx
│   │   ├── TimelineBlock.tsx
│   │   ├── TableBlock.tsx
│   │   ├── ReflectionBlock.tsx
│   │   ├── ListBlock.tsx
│   │   └── SectionBlock.tsx
│   ├── pages/                    ← NEW.
│   │   ├── TripIndex.tsx        ← "/" — cards, one per trip
│   │   ├── TripPage.tsx         ← "/trips/:slug" — renders a trip's blocks in order
│   │   └── NotFound.tsx         ← "*" — unknown route
│   ├── components/               ← reused/generalized (see §7 salvage map)
│   │   ├── Header.tsx           ← generalized: takes a Trip
│   │   ├── AttractionModal.tsx  ← KEEP as-is (used by AttractionsBlock/JournalBlock)
│   │   └── ...
│   ├── contexts/LanguageContext.tsx   ← KEEP (UI-chrome i18n only, see §8)
│   ├── i18n/translations.ts           ← KEEP but trim trip-specific keys (see §8)
│   ├── utils/imageService.ts          ← KEEP (see §6)
│   ├── App.tsx                  ← becomes the Router
│   └── main.tsx                ← wraps <BrowserRouter> + <LanguageProvider>
├── netlify.toml                 ← ADD SPA redirect (see §11)
└── (old files removed in Phase 6: src/data/*, HistoricalOverview, ReflectionSection, TripTabs, Timeline, DayCard as needed)
```

**Netlify constraint:** `content/` lives **inside** this repo (not at the workspace root), because Netlify only builds this repo — anything outside it is unreachable at build time. `content/` is still self-contained data you can lift out wholesale if you ever replace this frontend.

---

## 4. The data model (`src/types/content.ts`)

This replaces `src/types/trip.ts`. Copy it verbatim as the starting point.

```ts
// ---------- shared ----------
export interface TableData {
  headers: string[];
  rows: string[][];
}

// ---------- sub-shapes ----------
export interface Attraction {
  id: string;
  nameCn: string;
  nameEn: string;
  type: string;                 // e.g. "皇家城堡", "Temple"
  imageKeyword?: string;        // Unsplash/stock keyword, "+"-joined
  historicalContext?: string;
  experience?: string;
  insight?: string;
  relatedPeople?: string[];
  historicalPeriod?: string;
}

export interface TimelineEntry {
  period: string;               // "诺曼征服 1066"
  timeRange?: string;           // "AD 43–410"
  keyLocation?: string;
  keyFigures?: string[];
  majorEvents?: string;
  significance?: string;
  connection?: string;          // "与旅行体验的连接"
  relatedDays?: number[];
}

export interface ReflectionSectionContent {
  heading?: string;
  content?: string;             // markdown
  list?: string[];
  quote?: string;
  table?: TableData;
}
export interface Reflection {
  id: string;
  title: string;
  subtitle?: string;
  icon: string;                 // lucide-react icon name, e.g. "Crown"
  summary: string;
  sections: ReflectionSectionContent[];
}

// ---------- blocks (discriminated union on `type`) ----------
interface BlockBase { id?: string; title?: string; }

export interface ProseBlock       extends BlockBase { type: 'prose';       body: string; }               // markdown; also the FALLBACK
export interface JournalBlock      extends BlockBase { type: 'journal';     date?: string; title: string; cities?: string[]; body?: string; attractions?: Attraction[]; }
export interface AttractionsBlock  extends BlockBase { type: 'attractions'; items: Attraction[]; }
export interface TimelineBlock     extends BlockBase { type: 'timeline';    title: string; entries: TimelineEntry[]; }
export interface TableBlock        extends BlockBase { type: 'table';       title: string; description?: string; table: TableData; }
export interface ReflectionBlock   extends BlockBase { type: 'reflection';  items: Reflection[]; }
export interface ListBlock         extends BlockBase { type: 'list';        title: string; items: string[]; icon?: string; }
export interface SectionBlock      extends BlockBase { type: 'section';     title: string; blocks: Block[]; }  // optional grouping for TOC/nav

export type Block =
  | ProseBlock | JournalBlock | AttractionsBlock | TimelineBlock
  | TableBlock | ReflectionBlock | ListBlock | SectionBlock;

// ---------- trip ----------
export interface Trip {
  id: string;                   // url slug, MUST equal the filename, e.g. "uk-2025"
  title: string;                // bilingual inline OK, e.g. "英国历史文化深度游"
  subtitle?: string;
  traveler?: string;
  date?: string;                // "2025年12月"
  order?: number;               // sort key for the index (lower = first); fallback to date
  cover?: string;               // hero image: full URL or an imageService keyword
  summary?: string;             // 1–2 sentence blurb for the index card
  accent?: string;              // optional theme color, e.g. "#1e3a8a"
  blocks: Block[];              // rendered in array order
}
```

**Runtime validation (keep it light).** Add `validateTrip(raw): Trip` in `content.ts` or `loadTrips.ts` that:
- asserts `id`, `title`, and a non-empty `blocks` array exist;
- warns (does not throw) on any block whose `type` is not in the registry — it will still render via Fallback.
Do **not** pull in zod unless it earns its place; a hand-rolled check is enough here.

---

## 5. Block catalog — shape, purpose, renderer

| `type` | Purpose | Renderer notes | Which trip uses it |
|---|---|---|---|
| `prose` | Free markdown. **The fallback for any unknown type.** | `react-markdown` + `remark-gfm`. Render `body`; optional `title`. | Mexico Part 2 (civilizations), stray knowledge sections |
| `journal` | One day: `date` + `title` + optional narrative `body` + optional `attractions[]` cards | If `attractions` present → render cards (reuse DayCard visual + AttractionModal). If `body` present → render markdown. A day can have **either or both.** | UK days (cards), Mexico days (prose body) |
| `attractions` | A standalone grid of attraction cards not tied to a day | Reuse the card + `AttractionModal` click-through | (available; UK could use per-day instead) |
| `timeline` | Vertical, expandable historical timeline | Port the "England periods" view from `HistoricalOverview.tsx` (Clock/MapPin/Users rows, relatedDays chips) | UK England timeline; Mexico political & archaeological timelines |
| `table` | Any headed table: glossary, comparison, parallel timeline | Responsive: real `<table>` on desktop, stacked cards on mobile (port from `HistoricalOverview` Scotland table). `title` + optional `description`. | UK Scotland timeline; **all** Mexico Part 4 glossaries + concept tables |
| `reflection` | Expandable thematic insight cards | Port `ReflectionCard` from `ReflectionSection.tsx` wholesale (icon + summary + sections with quote/list/table/content) | UK reflections; Mexico can add later |
| `list` | A short framed list (principles / core framework) | Numbered or bulleted chips; optional lucide `icon` | UK core framework |
| `section` | Groups child blocks under a heading (drives a table-of-contents / in-page nav) | Render `title` as an anchor + map child `blocks`. Optional — only if you build a TOC. | Reproduces Mexico's "Part 1/2/3/4" structure |

**Registry + fallback (`src/blocks/index.tsx`):**

```tsx
const REGISTRY = {
  prose: ProseBlock, journal: JournalBlock, attractions: AttractionsBlock,
  timeline: TimelineBlock, table: TableBlock, reflection: ReflectionBlock,
  list: ListBlock, section: SectionBlock,
} as const;

export function BlockRenderer({ block }: { block: Block }) {
  const Cmp = (REGISTRY as any)[block.type] ?? ProseBlock; // unknown type → prose fallback
  return <Cmp {...(block as any)} />;
}
```

The `?? ProseBlock` line is what makes the platform survive future note formats. If a new type shows up in JSON before its renderer exists, it renders whatever `body`/`title` it has instead of white-screening.

---

## 6. Images

Keep `src/utils/imageService.ts` as-is. It maps keywords → curated stock URLs with a `picsum.photos` seeded fallback, plus an inline SVG fallback on `onError`. Attraction cards call `getAttractionThumbnail` / `getAttractionImage` using `imageKeyword` (fallback `nameEn`).

- **UK** relies on this for per-attraction imagery — the `photoMap` is already UK-heavy.
- **Mexico** days are prose-first, so images matter less. Prose/journal `body` may embed image URLs directly via markdown `![alt](url)` if desired.
- Optional later: extend `photoMap` with Mexico keywords. Non-blocking; do not gate the build on it.

---

## 7. Salvage map — reuse vs rewrite vs delete

| Existing file | Fate |
|---|---|
| `components/AttractionModal.tsx` | **KEEP** — used by attraction cards |
| `components/DayCard.tsx` | **Reuse the visual** inside `JournalBlock`/`AttractionsBlock` (or inline its markup) |
| `components/Header.tsx` | **Generalize** — already takes a `Trip`; drop the hardcoded day-count assumption (compute from `journal` blocks, or make optional) |
| `components/HistoricalOverview.tsx` | **Split** into `TimelineBlock` (England vertical view) + `TableBlock` (Scotland responsive table) + `ListBlock` (core framework). Then delete. |
| `components/ReflectionSection.tsx` | **Port** `ReflectionCard` + `ReflectionSectionContent` into `ReflectionBlock`. Then delete. |
| `components/Timeline.tsx` | Fold day-list logic into `TripPage` mapping over blocks. Then delete. |
| `components/TripTabs.tsx` | **Delete** — replaced by React Router nav + `TripIndex` cards |
| `data/ukTripData.ts`, `data/historicalTimeline.ts`, `data/coreFramework.ts`, `data/reflections.ts` | **Delete in Phase 6** after UK is migrated to `content/trips/uk-2025.json` |
| `data/英国旅游报告_完整版.md` | **Move** to `content/raw/uk-2025.md` |
| `types/trip.ts` | Superseded by `types/content.ts`; delete once nothing imports it |

---

## 8. i18n / bilingual — the decision

The notes are authored **bilingually inline** (e.g. `温莎城堡 Windsor Castle` in the same string). Do **not** try to split content into `{ zh, en }`.

- **UI chrome** (buttons, section labels, the language toggle, "Traveler", "Close", etc.) stays in `i18n/translations.ts` + `LanguageContext`. Keep the toggle.
- **Trip content** (everything from the JSON) is free-form bilingual strings, rendered **as-is** regardless of the toggle.
- **Tab/index label** = `trip.title` directly. Delete the per-trip translation keys (`tripTabs.ukTrip`, `trip2`, `trip3`, etc.) — trips are data now, not translation entries.
- Per-language content swap is an explicit **non-goal for v1**. If wanted later, add optional `{ zh, en }` variants at the field level; the block model already tolerates it.

---

## 9. CONVERSION CONTRACT — raw `.md` → trip `.json`

> **This is the section future upload sessions read.** When Justin adds `content/raw/<slug>.md` and says "convert it," follow these rules to produce `content/trips/<slug>.json`. Extract this section to `content/CONVERSION.md` in Phase 0 so it lives next to the notes.

### 9.1 Output rules
1. **Filename = slug = `trip.id`.** e.g. `mexico-2026.md` → `mexico-2026.json`, `"id": "mexico-2026"`. Lowercase, kebab-case, `<place>-<year>`.
2. **Preserve source order.** Blocks render top-to-bottom in array order — mirror the note's flow.
3. **Never drop content.** If a passage fits no specialized block, make it a `prose` block. Losing nothing beats perfect structure.
4. **Keep bilingual strings intact.** Don't translate, don't split languages.
5. **Slugify all `id`s** (attraction ids, etc.) from the English/pinyin name; keep them unique within the trip.
6. **Fill trip meta:** `title`, `subtitle`, `traveler` (default "Justin"), `date`, a 1–2 sentence `summary` for the index card, and `order` (or rely on `date`).

### 9.2 Mapping heuristics (markdown structure → block type)

| In the raw note you see… | Emit this block |
|---|---|
| A **daily entry** — heading like `### 6/26 — 抵达日` or `Day 1: …` | `journal`. Put the date in `date`, the heading in `title`, cities in `cities`. **Dense narrative paragraphs → `body` (markdown).** **Discrete "place — rich context/experience/insight" units → `attractions[]`.** Both may coexist. |
| A **chronological history table** (columns = period / people / events / significance) | `timeline` — one `TimelineEntry` per row. Map columns to `period`, `timeRange`, `keyFigures` (split lists), `majorEvents`, `significance`, `connection`, `relatedDays`. |
| Any **other table** — glossary, concept comparison, "A vs B", step lists | `table` — headers → `table.headers`, rows → `table.rows`. Put the section heading in `title`. |
| A **short principles / framework list** ("核心认知框架", numbered tenets) | `list` — bullets → `items`, pick a lucide `icon`. |
| **Thematic essays / reflections** ("宏观思考与洞察", "X vs Y" analyses with sub-points) | `reflection` — one `Reflection` per theme; its sub-parts → `sections[]` using `heading`/`content`/`list`/`quote`/`table`. Choose a lucide `icon` per theme. |
| **Explanatory prose** not tied to a day (civilization overviews, background) | `prose` — `body` = the markdown, `title` = its heading. |
| **Anything ambiguous or novel** | `prose`. (Or, if a whole new *recurring* shape emerges, propose adding a new block type — see §9.4.) |
| Multi-part notes (the note has "Part 1 / Part 2 …") | Optionally wrap each part's blocks in a `section` for a table-of-contents. Otherwise emit blocks flat in order. |

### 9.3 Icons
Block types `list` and `reflection` want a lucide-react icon **name** (string). Pick sensible ones (`Crown`, `Scale`, `Church`, `Globe`, `Landmark`, `BookOpen`, `Users`, `Sparkles`, `RefreshCw`, `HelpCircle`, `MapPin`, `Skull`, `Palette`). The renderer resolves the string via `import * as Icons`.

### 9.4 Extending the vocabulary
If a note needs a shape no block expresses (e.g. a recurring "budget breakdown", "route map", "food log"), **don't force-fit** — add a new block type: (1) add the interface to the `Block` union in `content.ts`, (2) create `blocks/<New>Block.tsx`, (3) register it in `blocks/index.tsx`. Until the renderer exists, emitting the new type still renders safely via the prose fallback.

---

## 10. Reference mapping — the two existing notes

**`content/raw/uk-2025.md`** (`英国旅游报告_完整版.md`) → `uk-2025.json`:

| Note part | → Blocks |
|---|---|
| 核心认知框架 (4 tenets) | 1× `list` |
| 历史时间线总表 (big period table) | 1× `timeline` (rich vertical view) |
| 苏格兰独立线 (parallel table) | 1× `table` |
| 每日行程详细记录 (Days 1–11, rich place cards) | 11× `journal`, each with `attractions[]` (migrate the existing `ukTripData.ts` day/attraction objects verbatim) |
| 零星知识点汇总 | `prose` block(s) |
| 宏观思考与洞察 (8 themes) | 1× `reflection` (migrate `reflections.ts` items verbatim) |

Phase 4 is mostly a **mechanical reshape of the existing `.ts` data** into JSON blocks — the content already exists and is typed; no re-authoring.

**`content/raw/mexico-2026.md`** → `mexico-2026.json`:

| Note part | → Blocks |
|---|---|
| Part 1.1–1.3 (concepts, figures, 帝国/总督/总统 explainer) | `prose` + `table` (the 4 concept-comparison tables) |
| Part 1.4 完整时间线表 | 1× `timeline` (or `table` if you prefer raw rows) |
| Part 2 考古文明时间线 (Olmec, Teotihuacan, Maya, Aztec, …) | `prose` per civilization (or one grouped) + `table` for the 神祇对照 table |
| Part 3 每日行程与思考 (6/26 … 7/2, dense narrative) | `journal` per day, **`body` = markdown prose, usually no attraction cards** |
| Part 4 词汇表 (神话人物 / 地理 / 历史人物 / 文字体系 / 教皇 / 牛油果酱) | 1× `table` each (optionally wrapped in a `section` "Glossary") |

This is the proof the vocabulary covers two very different notes without new components.

---

## 11. Deployment (unchanged target: Netlify)

- Build: `npm run build` → `dist/`. Publish dir `dist`.
- **SPA routing fix (required):** client-side routes like `/trips/mexico-2026` must serve `index.html` on hard refresh. Add to `netlify.toml`:
  ```toml
  [[redirects]]
    from = "/*"
    to = "/index.html"
    status = 200
  ```
- Flow after each new trip: drop raw `.md` → convert to JSON → `npm run build` (validates + renders) → commit → push → Netlify auto-deploys. Connect the GitHub repo to Netlify once (see `DEPLOY.md`).
- Update `index.html` `<title>`/OG tags (currently "Interactive UK Trip Recall") to something trip-agnostic; set per-trip `document.title` in `TripPage`.

---

## 12. Implementation phases (for the builder)

Run in order. **Verify at each checkpoint before proceeding** (`npm run typecheck`, `npm run build`, and `npm run dev` visual check). Follow the repo's existing TS/Tailwind conventions.

- **Phase 0 — Scaffold & deps.** Add `react-router-dom`, `react-markdown`, `remark-gfm`. Create `content/raw/` + `content/trips/`. Move `src/data/英国旅游报告_完整版.md` → `content/raw/uk-2025.md`. Copy the Mexico note → `content/raw/mexico-2026.md`. Extract §9 → `content/CONVERSION.md`.
- **Phase 1 — Schema & loader.** Create `src/types/content.ts` (§4). Create `src/content/loadTrips.ts` using `import.meta.glob('../../content/trips/*.json', { eager: true })` → validated, `order`-sorted `Trip[]`. **Auto-registration: a new JSON needs no manual wiring.**
- **Phase 2 — Block renderers.** Build `src/blocks/*` + `index.tsx` registry with prose fallback (§5). Port visuals from `HistoricalOverview`/`ReflectionSection`/`DayCard`. Keep `AttractionModal`.
- **Phase 3 — Pages & routing.** `TripIndex` (cards from `loadTrips`), `TripPage` (`useParams` → find trip → map blocks through `BlockRenderer`; set `document.title`), `NotFound`. Convert `App.tsx` to the router; wrap `<BrowserRouter>` in `main.tsx`. Generalize `Header`.
- **Phase 4 — Migrate UK.** Reshape `ukTripData.ts` + `historicalTimeline.ts` + `coreFramework.ts` + `reflections.ts` into `content/trips/uk-2025.json` per §10. **Checkpoint: `/trips/uk-2025` renders the timeline, 11 day-cards with working attraction modals, Scotland table, and reflections — visually equivalent to today's single-page app.**
- **Phase 5 — Convert Mexico.** Produce `content/trips/mexico-2026.json` via the §9 contract. **Checkpoint: index shows 2 cards; both `/trips/uk-2025` and `/trips/mexico-2026` render correctly; Mexico's prose days, timelines, and glossary tables all display; no white-screens.**
- **Phase 6 — Cleanup.** Delete migrated `src/data/*.ts`, `types/trip.ts`, and the now-unused `HistoricalOverview`/`ReflectionSection`/`Timeline`/`TripTabs`. Trim trip-specific i18n keys. Update `index.html` title/OG + footer copy. `npm run typecheck` clean.
- **Phase 7 — Deploy.** Add the `netlify.toml` SPA redirect. Connect repo to Netlify, push, verify deep links resolve on refresh.

---

## 13. Non-goals (v1)

- Per-language content swapping (bilingual-inline only).
- A CMS / admin UI / in-browser upload — conversion happens in a Claude Code session.
- Search, tags, maps, photo galleries. (Easy to add later as new block types.)
- Automated MD→JSON script calling an API — deliberately a human-in-the-loop session for now.

---

## 14. Definition of done

1. Dropping a new `content/raw/<slug>.md`, converting it to `content/trips/<slug>.json`, and pushing = a new live blog page at `/trips/<slug>` **with zero component edits.**
2. Two structurally different trips (UK cards-per-day, Mexico prose-per-day) both render correctly from the same renderer.
3. An unknown/future block type degrades to rendered prose instead of breaking the build.
4. Deep links (`/trips/<slug>`) resolve on hard refresh in production.
