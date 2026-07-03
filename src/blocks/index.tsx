import { Block } from '../types/content';
import ProseBlock from './ProseBlock';
import JournalBlock from './JournalBlock';
import AttractionsBlock from './AttractionsBlock';
import TimelineBlock from './TimelineBlock';
import TableBlock from './TableBlock';
import ReflectionBlock from './ReflectionBlock';
import ListBlock from './ListBlock';
import SectionBlock from './SectionBlock';

// The extensibility core: block.type → renderer. Adding a new content shape
// = one union member in types/content.ts + one component + one line here.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const REGISTRY: Record<string, React.ComponentType<any>> = {
  prose: ProseBlock,
  journal: JournalBlock,
  attractions: AttractionsBlock,
  timeline: TimelineBlock,
  table: TableBlock,
  reflection: ReflectionBlock,
  list: ListBlock,
  section: SectionBlock,
};

export function BlockRenderer({ block }: { block: Block }) {
  // Unknown/future block types degrade to the prose fallback (title + body
  // render as markdown) instead of white-screening the page.
  const Component = REGISTRY[block.type] ?? ProseBlock;
  return <Component {...block} />;
}
