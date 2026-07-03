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
interface BlockBase {
  id?: string;
  title?: string;
}

export interface ProseBlock extends BlockBase {
  type: 'prose';
  body: string;                 // markdown; also the FALLBACK for unknown types
}

export interface JournalBlock extends BlockBase {
  type: 'journal';
  date?: string;                // "Day 1", "6/26" — small badge label
  title: string;
  cities?: string[];
  body?: string;                // markdown narrative
  attractions?: Attraction[];   // discrete place cards
}

export interface AttractionsBlock extends BlockBase {
  type: 'attractions';
  items: Attraction[];
}

export interface TimelineBlock extends BlockBase {
  type: 'timeline';
  title: string;
  description?: string;
  entries: TimelineEntry[];
}

export interface TableBlock extends BlockBase {
  type: 'table';
  title: string;
  description?: string;
  table: TableData;
}

export interface ReflectionBlock extends BlockBase {
  type: 'reflection';
  title?: string;
  description?: string;
  items: Reflection[];
}

export interface ListBlock extends BlockBase {
  type: 'list';
  title: string;
  items: string[];
  icon?: string;
}

export interface SectionBlock extends BlockBase {
  type: 'section';
  title: string;
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
  title: string;                // bilingual inline OK
  subtitle?: string;
  traveler?: string;
  date?: string;                // "2025年12月"
  order?: number;               // sort key for the index (lower = first)
  cover?: string;               // hero image: full URL or an imageService keyword
  summary?: string;             // 1–2 sentence blurb for the index card
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
  if (typeof trip.title !== 'string' || !trip.title) {
    throw new Error(`[trips] ${sourceFile}: missing required "title"`);
  }
  if (!Array.isArray(trip.blocks) || trip.blocks.length === 0) {
    throw new Error(`[trips] ${sourceFile}: "blocks" must be a non-empty array`);
  }
  warnUnknownBlocks(trip.blocks, trip.id);
  return trip;
}

/** Count journal blocks (days), including inside sections. */
export function countJournalDays(blocks: Block[]): number {
  let count = 0;
  for (const block of blocks) {
    if (block.type === 'journal') count += 1;
    if (block.type === 'section') count += countJournalDays(block.blocks);
  }
  return count;
}
