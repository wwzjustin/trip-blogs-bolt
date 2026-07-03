import { Block } from '../types/content';
import { BlockRenderer } from './index';

interface SectionBlockProps {
  id?: string;
  title: string;
  blocks: Block[];
}

// Groups child blocks under an anchored heading — preserves the multi-part
// structure of long research notes ("第一部分 / Part 1", etc.).
export default function SectionBlock({ id, title, blocks }: SectionBlockProps) {
  const anchor = id ?? title.replace(/\s+/g, '-').toLowerCase();

  return (
    <section id={anchor} className="py-2">
      <div className="max-w-4xl mx-auto px-4 pt-8 md:pt-12 pb-2">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 border-b-2 border-amber-500 pb-3">
          {title}
        </h2>
      </div>
      {blocks.map((block, index) => (
        <BlockRenderer key={index} block={block} />
      ))}
    </section>
  );
}
