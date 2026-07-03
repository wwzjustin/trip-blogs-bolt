import { Block, L10n, pickL10n } from '../types/content';
import { BlockRenderer } from './index';
import { useLanguage } from '../contexts/LanguageContext';

interface SectionBlockProps {
  id?: string;
  title: L10n;
  blocks: Block[];
}

// ArtStory year-divider idiom: centered uppercase letter-spaced label on a
// hairline rule, bronze accent.
export default function SectionBlock({ id, title, blocks }: SectionBlockProps) {
  const { language } = useLanguage();
  const label = pickL10n(language, title);
  const anchor = id ?? label.replace(/\s+/g, '-').toLowerCase();

  return (
    <section id={anchor}>
      <div className="max-w-3xl mx-auto px-4 pt-12 md:pt-16 pb-2">
        <div className="relative flex items-center justify-center">
          <div className="absolute inset-x-0 h-px bg-[rgba(45,52,53,0.08)]"></div>
          <span className="relative z-10 bg-[#f9f9f9] px-4 text-[11px] md:text-xs font-semibold tracking-[0.25em] uppercase text-[#715b37] text-center">
            {label}
          </span>
        </div>
      </div>
      {blocks.map((block, index) => (
        <BlockRenderer key={index} block={block} />
      ))}
    </section>
  );
}
