import { useState } from 'react';
import * as Icons from 'lucide-react';
import { L10n, Reflection, ReflectionSectionContent, pickL10n } from '../types/content';
import Markdown from '../components/Markdown';
import { useLanguage } from '../contexts/LanguageContext';
import { Language } from '../contexts/LanguageContext';

function resolveIcon(name: string): React.ComponentType<{ className?: string }> {
  const Icon = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[
    name
  ];
  return Icon ?? Icons.BookOpen;
}

const SectionContent = ({
  section,
  language
}: {
  section: ReflectionSectionContent;
  language: Language;
}) => {
  const L = (v: L10n | undefined) => pickL10n(language, v);
  const content = L(section.content);

  return (
    <div className="space-y-2.5">
      {section.heading && (
        <h4 className="font-display text-sm md:text-base font-bold text-[#2d3435] flex items-center gap-2">
          <span className="w-0.5 h-4 bg-[#715b37] rounded-full"></span>
          {L(section.heading)}
        </h4>
      )}

      {section.quote && (
        <blockquote className="border-l-2 border-[#715b37] bg-[#f5f0e8]/60 px-4 py-2.5 rounded-r-md my-3">
          <p className="font-display italic text-sm md:text-[15px] text-[#2d3435]">
            {L(section.quote)}
          </p>
        </blockquote>
      )}

      {content && <Markdown>{content}</Markdown>}

      {section.list && (
        <ul className="space-y-1.5 ml-1">
          {section.list.map((item, index) => (
            <li key={index} className="flex items-start gap-2.5">
              <span className="w-1 h-1 rounded-full bg-[#9a7f52] mt-2 flex-shrink-0"></span>
              <span className="text-xs md:text-sm text-[#5a6061] leading-relaxed">{L(item)}</span>
            </li>
          ))}
        </ul>
      )}

      {section.table && (
        <div className="overflow-x-auto rounded-md border border-[rgba(45,52,53,0.08)] my-3">
          <table className="w-full border-collapse text-xs md:text-sm">
            <thead>
              <tr className="bg-[#f2f4f4]">
                {section.table.headers.map((header, index) => (
                  <th
                    key={index}
                    className="p-2.5 text-left font-semibold text-[#2d3435] border-b border-[rgba(45,52,53,0.12)]"
                  >
                    {L(header)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {section.table.rows.map((row, rowIndex) => (
                <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-[#fbfbfa]'}>
                  {row.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className="p-2.5 text-[#5a6061] border-b border-[rgba(45,52,53,0.06)] align-top"
                    >
                      {L(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const ReflectionCard = ({ reflection, language }: { reflection: Reflection; language: Language }) => {
  const L = (v: L10n | undefined) => pickL10n(language, v);
  const [isExpanded, setIsExpanded] = useState(false);
  const IconComponent = resolveIcon(reflection.icon);

  return (
    <div
      className="bg-white rounded-lg border border-[rgba(45,52,53,0.08)] overflow-hidden transition-shadow"
      style={{ boxShadow: isExpanded ? 'var(--shadow-md)' : 'var(--shadow-sm)' }}
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-5 md:p-6 text-left hover:bg-[#fbfbfa] transition-colors"
      >
        <div className="flex items-start gap-4">
          <div
            className="flex-shrink-0 w-9 h-9 md:w-10 md:h-10 rounded-md flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg,#715b37,#644f2d)' }}
          >
            <IconComponent className="w-4 h-4 md:w-5 md:h-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-baseline gap-x-2.5">
              <h3 className="font-display text-base md:text-lg font-bold text-[#2d3435]">
                {L(reflection.title)}
              </h3>
              {reflection.subtitle && (
                <span className="text-[11px] uppercase tracking-[0.15em] text-[#9aa0a1]">
                  {L(reflection.subtitle)}
                </span>
              )}
            </div>
            <p className="font-display italic text-xs md:text-sm text-[#5a6061] mt-1.5 leading-relaxed">
              {L(reflection.summary)}
            </p>
          </div>
          <Icons.ChevronDown
            className={`w-4 h-4 text-[#c4cbcc] flex-shrink-0 transition-transform duration-300 ${
              isExpanded ? 'rotate-180' : ''
            }`}
          />
        </div>
      </button>

      {isExpanded && (
        <div className="px-5 md:px-6 pb-5 md:pb-6 space-y-4 border-t border-[rgba(45,52,53,0.06)] pt-4">
          {reflection.sections.map((section, index) => (
            <SectionContent key={index} section={section} language={language} />
          ))}
        </div>
      )}
    </div>
  );
};

interface ReflectionBlockProps {
  title?: L10n;
  description?: L10n;
  items: Reflection[];
}

// Expandable thematic insight cards.
export default function ReflectionBlock({ title, description, items }: ReflectionBlockProps) {
  const { language } = useLanguage();
  const L = (v: L10n | undefined) => pickL10n(language, v);

  return (
    <section className="max-w-3xl mx-auto px-4 py-6 md:py-8">
      {title && (
        <div className="text-center mb-6 md:mb-8">
          <h2 className="font-display text-xl md:text-2xl font-bold text-[#2d3435]">{L(title)}</h2>
          {description && (
            <p className="font-display italic text-xs md:text-sm text-[#5a6061] mt-2">
              {L(description)}
            </p>
          )}
        </div>
      )}
      <div className="space-y-3 md:space-y-4">
        {items.map((reflection) => (
          <ReflectionCard key={reflection.id} reflection={reflection} language={language} />
        ))}
      </div>
    </section>
  );
}
