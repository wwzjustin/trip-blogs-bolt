# CONVERSION CONTRACT — raw `.md` → trip `.json`

> **Read this when Justin adds a new note to `content/raw/<slug>.md` and says "convert it."**
> Your job: produce `content/trips/<slug>.json` conforming to `src/types/content.ts`.
> The app auto-discovers every JSON in `content/trips/` — no component or wiring changes needed.

## 0. THE CANONICAL BLOG FLOW (be editorial, not archival)

**Don't blindly mirror the note's structure.** The raw note is a research archive; the JSON is a
blog someone reads. Every trip follows this flow (established with Justin on the Mexico trip;
`mexico-2026.json` is the reference implementation):

1. **`list` — 核心认知框架 Core Framework.** Distill 4–6 tenets — the trip's thesis statements.
   Author these; they're rarely written as a list in the note.
2. **`timeline` — the trip's main historical timeline** (collapsed by default). If the note has
   several, lead with the political/chronological one; park the rest in the Reference Library.
3. **`section` "每日行程 Daily Journal" — journal blocks for each day.** For each day:
   - **Extract 1–3 famous sights into `attractions[]` cards** (this is the drill-down UX: photo
     thumbnail → modal with 历史定位 historicalContext / 实地体验 experience / 核心洞察 insight /
     relatedPeople / historicalPeriod). Reorganize the note's own words into those fields.
   - **Trim `body` to the narrative thread**: arrival texture, in-between observations, corrections
     learned, forward references ("见关键收获"). Don't duplicate what moved into the cards.
   - **If a single calendar day is split into multiple entries** (morning/noon/afternoon/evening —
     the note's headings like `6/27 上午` / `6/27 中午` / `6/27 下午` are the tell), give every
     entry from that day the **same `dayKey`** (e.g. `"6/27"`, the date with no time-of-day
     suffix). `date` stays the full display label per entry ("6/27 AM"); `dayKey` is what
     `countJournalDays` groups on for the trip's day-count badge, so 4 entries on one date count
     as 1 day, not 4. Skip `dayKey` when each journal block is already its own day (e.g. UK's
     "Day 1".."Day 11") — it defaults to counting each block separately.
   - **Images:** give every attraction an `imageKeyword` and make sure it matches a key in
     `src/utils/imageService.ts` `photoMap`. For new landmarks, fetch the Wikipedia REST lead image
     (`/api/rest_v1/page/summary/<Page>`, use a 1200px thumb URL) and add verified entries —
     specific keys before generic ones. No matching key = SVG placeholder fallback (acceptable,
     but famous sights deserve photos).
4. **`reflection` — 关键收获与思考 Key Takeaways.** Distill the note's scattered insights into
   5–8 thematic cards (title/subtitle/icon/summary + sections with content/list/quote/table).
   This is the section Justin explicitly wants — the "so what" of the trip.
5. **`section` "参考资料库 Reference Library"** — everything encyclopedic, verbatim: concept
   explainers, civilization/background prose, glossary tables, recipes, future-trip notes.
   Readers who want depth expand it; everyone else gets the story.

"Never drop content" still holds — content moves between layers (card / body / takeaway /
reference), it doesn't disappear. The raw note stays in `content/raw/` as the full-fidelity archive.

## 1. Output rules

1. **Filename = slug = `trip.id`.** e.g. `mexico-2026.md` → `mexico-2026.json`, `"id": "mexico-2026"`. Lowercase, kebab-case, `<place>-<year>`.
2. **Preserve source order.** Blocks render top-to-bottom in array order — mirror the note's flow.
3. **Never drop content.** If a passage fits no specialized block, make it a `prose` block. Losing nothing beats perfect structure.
4. **Ship both languages.** Every human-readable field accepts `"text"` (shown in both languages) or `{"zh": "...", "en": "..."}` (switched by the site's language toggle — see `L10n` in `src/types/content.ts`). **Required bilingual:** trip meta, section/block titles, day titles + bodies, all attraction-card fields, framework items, takeaways. **May stay single-string:** inherently bilingual glossary rows and Reference Library archive prose. Attraction `nameCn`/`nameEn` are separate fields — the UI swaps primary/secondary automatically.
5. **Slugify all `id`s** (attraction ids, etc.) from the English/pinyin name; keep them unique within the trip.
6. **Fill trip meta:** `title`, `subtitle`, `traveler` (default "Justin"), `date`, a 1–2 sentence `summary` for the index card, `order` (index sort), and optionally `accent` (a hex theme color for the trip's hero/cards).
7. **Prefer a deterministic script** (Node, reading the raw md and slicing by headings) over hand-transcribing long notes — verbatim fidelity matters. See `scripts/` for prior examples if present.

## 2. Mapping heuristics (markdown structure → block type)

| In the raw note you see… | Emit this block |
|---|---|
| A **daily entry** — heading like `### 6/26 — 抵达日` or `Day 1: …` | `journal`. Put the date label in `date`, the heading remainder in `title`, cities in `cities` if stated. **Dense narrative paragraphs → `body` (markdown).** **Discrete "place — rich context/experience/insight" units → `attractions[]`.** Both may coexist. |
| A **chronological history table** (columns = period / people / events / significance) | `timeline` — one `TimelineEntry` per row. Map columns to `period`, `timeRange`, `keyFigures` (split lists on `；`/`;`), `majorEvents`, `significance`, `connection`, `relatedDays`. |
| Any **other table** — glossary, concept comparison, "A vs B", step lists | `table` — headers → `table.headers`, rows → `table.rows`. Put the section heading in `title`. Small tables inside a prose passage may instead stay inline in the prose `body` (GFM tables render). |
| A **short principles / framework list** ("核心认知框架", numbered tenets) | `list` — bullets → `items`, pick a lucide `icon`. |
| **Thematic essays / reflections** ("宏观思考与洞察", "X vs Y" analyses with sub-points) | `reflection` — one `Reflection` per theme; its sub-parts → `sections[]` using `heading`/`content`/`list`/`quote`/`table`. Choose a lucide `icon` per theme. |
| **Explanatory prose** not tied to a day (civilization overviews, background) | `prose` — `body` = the markdown, `title` = its heading. |
| **Anything ambiguous or novel** | `prose`. (Or, if a whole new *recurring* shape emerges, add a new block type — see §4.) |
| Multi-part notes ("Part 1 / Part 2 …" / "第一部分…") | Wrap each part's blocks in a `section` (title = part heading) to preserve the document's structure. |

## 3. Icons

Block types `list` and `reflection` take a lucide-react icon **name** (string): `Crown`, `Scale`, `Church`, `Globe`, `Landmark`, `BookOpen`, `Users`, `Sparkles`, `RefreshCw`, `HelpCircle`, `MapPin`, `Skull`, `Palette`, … The renderer resolves the string at runtime and falls back to `BookOpen` if unknown.

## 4. Extending the vocabulary

If a note needs a shape no block expresses (e.g. a recurring "budget breakdown", "route map", "food log"), **don't force-fit** — add a new block type:
1. add the interface to the `Block` union in `src/types/content.ts`;
2. create `src/blocks/<New>Block.tsx`;
3. register it in `src/blocks/index.tsx`.

Until the renderer exists, emitting the new type still renders safely via the prose fallback (its `title` + `body` show as markdown; it never white-screens).

## 5. After converting

```bash
npm run typecheck && npm run build   # validates + renders
git add content/ && git commit -m "Add <trip> blog" && git push   # Netlify auto-deploys
```

The new trip appears at `/trips/<slug>` and on the index page automatically.
