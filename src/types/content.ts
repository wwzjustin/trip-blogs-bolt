// ---------- localization ----------
// Any human-readable field can be a plain string (shown in both languages,
// e.g. inherently bilingual glossary rows) or a {zh, en} pair the language
// toggle switches between.
export type L10n = string | { zh: string; en: string };

export function pickL10n(lang: 'zh' | 'en', v: L10n): string;
export function pickL10n(lang: 'zh' | 'en', v: L10n | undefined): string | undefined;
export function pickL10n(lang: 'zh' | 'en', v: L10n | undefined): string | undefined {
  if (v == null) return undefined;
  if (typeof v === 'string') return v;
  return v[lang] ?? v.zh ?? v.en;
}

// ---------- shared ----------
export interface TableData {
  headers: L10n[];
  rows: L10n[][];
}

// ---------- sub-shapes ----------
export interface Attraction {
  id: string;
  nameCn: string;               // Chinese name — primary in zh mode
  nameEn: string;               // English name — primary in en mode
  type: L10n;                   // e.g. "皇家城堡", "Temple"
  imageKeyword?: string;        // photoMap/stock keyword, "+"-joined
  historicalContext?: L10n;
  experience?: L10n;
  insight?: L10n;
  relatedPeople?: L10n[];
  historicalPeriod?: L10n;
}

export interface TimelineEntry {
  period: L10n;                 // "诺曼征服 1066"
  timeRange?: L10n;             // "AD 43–410"
  keyLocation?: L10n;
  keyFigures?: L10n[];
  majorEvents?: L10n;
  significance?: L10n;
  connection?: L10n;            // "与旅行体验的连接"
  relatedDays?: number[];
}

export interface ReflectionSectionContent {
  heading?: L10n;
  content?: L10n;               // markdown
  list?: L10n[];
  quote?: L10n;
  table?: TableData;
}

export interface Reflection {
  id: string;
  title: L10n;
  subtitle?: L10n;
  icon: string;                 // lucide-react icon name, e.g. "Crown"
  summary: L10n;
  sections: ReflectionSectionContent[];
}

// ---------- blocks (discriminated union on `type`) ----------
interface BlockBase {
  id?: string;
  title?: L10n;
}

export interface ProseBlock extends BlockBase {
  type: 'prose';
  body: L10n;                   // markdown; also the FALLBACK for unknown types
}

export interface JournalBlock extends BlockBase {
  type: 'journal';
  date?: L10n;                  // "Day 1", "6/26 AM" — small badge label (display only)
  dayKey?: string;               // calendar-day identity for counting, e.g. "6/27" —
                                  // set this when a single day is split across multiple
                                  // journal blocks (AM/noon/PM/evening) so countJournalDays
                                  // counts one day, not one block per entry
  title: L10n;
  cities?: L10n[];
  body?: L10n;                  // markdown narrative
  attractions?: Attraction[];   // discrete place cards
}

export interface AttractionsBlock extends BlockBase {
  type: 'attractions';
  items: Attraction[];
}

export interface TimelineBlock extends BlockBase {
  type: 'timeline';
  title: L10n;
  description?: L10n;
  entries: TimelineEntry[];
}

export interface TableBlock extends BlockBase {
  type: 'table';
  title: L10n;
  description?: L10n;
  table: TableData;
}

export interface ReflectionBlock extends BlockBase {
  type: 'reflection';
  title?: L10n;
  description?: L10n;
  items: Reflection[];
}

export interface ListBlock extends BlockBase {
  type: 'list';
  title: L10n;
  items: L10n[];
  icon?: string;
}

export interface SectionBlock extends BlockBase {
  type: 'section';
  title: L10n;
  blocks: Block[];
}

export type Block =
  | ProseBlock
  | JournalBlock
  | AttractionsBlock
  | TimelineBlock
  | TableBlock
  | ReflectionBlock
  | ListBlock
  | SectionBlock;

export const KNOWN_BLOCK_TYPES = [
  'prose',
  'journal',
  'attractions',
  'timeline',
  'table',
  'reflection',
  'list',
  'section',
] as const;

// ---------- trip ----------
export interface Trip {
  id: string;                   // url slug, MUST equal the filename, e.g. "uk-2025"
  title: L10n;
  subtitle?: L10n;
  traveler?: string;
  date?: L10n;                  // "2025年12月"
  order?: number;               // sort key for the index (lower = first)
  cover?: string;               // hero image: full URL or an imageService keyword
  summary?: L10n;               // 1–2 sentence blurb for the index card
  accent?: string;              // theme color, e.g. "#1e3a8a"
  blocks: Block[];              // rendered in array order
}

// ---------- light runtime validation ----------
function warnUnknownBlocks(blocks: Block[], tripId: string): void {
  for (const block of blocks) {
    if (!(KNOWN_BLOCK_TYPES as readonly string[]).includes(block.type)) {
      console.warn(
        `[trips] "${tripId}": unknown block type "${block.type}" — will render via prose fallback`
      );
    }
    if (block.type === 'section' && Array.isArray(block.blocks)) {
      warnUnknownBlocks(block.blocks, tripId);
    }
  }
}

export function validateTrip(raw: unknown, sourceFile: string): Trip {
  const trip = raw as Trip;
  if (!trip || typeof trip.id !== 'string' || !trip.id) {
    throw new Error(`[trips] ${sourceFile}: missing required "id"`);
  }
  if (trip.title == null) {
    throw new Error(`[trips] ${sourceFile}: missing required "title"`);
  }
  if (!Array.isArray(trip.blocks) || trip.blocks.length === 0) {
    throw new Error(`[trips] ${sourceFile}: "blocks" must be a non-empty array`);
  }
  warnUnknownBlocks(trip.blocks, trip.id);
  return trip;
}

/**
 * Count distinct calendar days across journal blocks, including inside
 * sections. Blocks sharing a `dayKey` (e.g. a day split into AM/noon/PM/
 * evening entries) count once; blocks without one always count as their own
 * day (the common case — one journal block per day).
 */
export function countJournalDays(blocks: Block[]): number {
  const keys = new Set<string>();
  let index = 0;
  const walk = (bs: Block[]) => {
    for (const block of bs) {
      if (block.type === 'journal') {
        index += 1;
        keys.add(block.dayKey ?? `__block_${index}`);
      }
      if (block.type === 'section') walk(block.blocks);
    }
  };
  walk(blocks);
  return keys.size;
}
