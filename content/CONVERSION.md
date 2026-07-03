# CONVERSION CONTRACT — raw `.md` → trip `.json`

> **Read this when Justin adds a new note to `content/raw/<slug>.md` and says "convert it."**
> Your job: produce `content/trips/<slug>.json` conforming to `src/types/content.ts`.
> The app auto-discovers every JSON in `content/trips/` — no component or wiring changes needed.

## 1. Output rules

1. **Filename = slug = `trip.id`.** e.g. `mexico-2026.md` → `mexico-2026.json`, `"id": "mexico-2026"`. Lowercase, kebab-case, `<place>-<year>`.
2. **Preserve source order.** Blocks render top-to-bottom in array order — mirror the note's flow.
3. **Never drop content.** If a passage fits no specialized block, make it a `prose` block. Losing nothing beats perfect structure.
4. **Keep bilingual strings intact.** Don't translate, don't split languages.
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
