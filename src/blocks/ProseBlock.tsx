import { L10n, pickL10n } from '../types/content';
import Markdown from '../components/Markdown';
import { useLanguage } from '../contexts/LanguageContext';

interface ProseBlockProps {
  title?: L10n;
  body?: L10n;
}

// Free-markdown block. Also the FALLBACK renderer for unknown block types.
export default function ProseBlock({ title, body }: ProseBlockProps) {
  const { language } = useLanguage();
  const resolvedTitle = pickL10n(language, title);
  const resolvedBody = pickL10n(language, body);

  return (
    <section className="max-w-3xl mx-auto px-4 py-5 md:py-6">
      {resolvedTitle && (
        <h2 className="font-display text-lg md:text-xl font-bold text-[#2d3435] mb-3">
          {resolvedTitle}
        </h2>
      )}
      {resolvedBody ? (
        <div
          className="bg-white rounded-lg border border-[rgba(45,52,53,0.08)] p-5 md:p-7"
          style={{ boxShadow: 'var(--shadow-sm)' }}
        >
          <Markdown>{resolvedBody}</Markdown>
        </div>
      ) : null}
    </section>
  );
}
