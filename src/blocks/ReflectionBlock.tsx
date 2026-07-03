import { useState } from 'react';
import * as Icons from 'lucide-react';
import { Reflection, ReflectionSectionContent } from '../types/content';
import Markdown from '../components/Markdown';

function resolveIcon(name: string): React.ComponentType<{ className?: string }> {
  const Icon = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[
    name
  ];
  return Icon ?? Icons.BookOpen;
}

const SectionContent = ({ section }: { section: ReflectionSectionContent }) => {
  return (
    <div className="space-y-2 md:space-y-3">
      {section.heading && (
        <h4 className="text-base md:text-lg font-bold text-slate-900 flex items-center gap-2">
          <div className="w-1 h-5 md:h-6 bg-slate-700 rounded"></div>
          {section.heading}
        </h4>
      )}

      {section.quote && (
        <blockquote className="border-l-4 border-amber-500 bg-amber-50 p-3 md:p-4 rounded-r-lg my-3 md:my-4">
          <p className="text-sm md:text-base text-slate-800 italic font-medium">{section.quote}</p>
        </blockquote>
      )}

      {section.content && <Markdown>{section.content}</Markdown>}

      {section.list && (
        <ul className="space-y-1.5 md:space-y-2 ml-3 md:ml-4">
          {section.list.map((item, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="text-slate-700 mt-1.5 flex-shrink-0 text-sm md:text-base">•</span>
              <span className="text-sm md:text-base text-slate-700">{item}</span>
            </li>
          ))}
        </ul>
      )}

      {section.table && (
        <div className="overflow-x-auto rounded-lg border border-slate-200 my-3 md:my-4">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-100">
                {section.table.headers.map((header, index) => (
                  <th
                    key={index}
                    className="p-2 md:p-3 text-left font-semibold text-slate-800 border-b border-slate-300 text-xs md:text-base"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {section.table.rows.map((row, rowIndex) => (
                <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                  {row.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className="p-2 md:p-3 text-slate-700 border-b border-slate-200 text-xs md:text-base"
                    >
                      {cell}
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

const ReflectionCard = ({ reflection }: { reflection: Reflection }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const IconComponent = resolveIcon(reflection.icon);

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 md:p-6 text-left hover:bg-slate-50 transition-colors"
      >
        <div className="flex items-start gap-3 md:gap-4">
          <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-slate-700 to-slate-900 rounded-lg flex items-center justify-center">
            <IconComponent className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-base md:text-xl font-bold text-slate-900 mb-1">
              {reflection.title}
            </h3>
            {reflection.subtitle && (
              <p className="text-xs md:text-sm text-slate-600 mb-1 md:mb-2">
                {reflection.subtitle}
              </p>
            )}
            <p className="text-sm md:text-base text-slate-700 italic">{reflection.summary}</p>
          </div>
          <div className="flex-shrink-0">
            <Icons.ChevronDown
              className={`w-5 h-5 md:w-6 md:h-6 text-slate-400 transition-transform duration-300 ${
                isExpanded ? 'rotate-180' : ''
              }`}
            />
          </div>
        </div>
      </button>

      {isExpanded && (
        <div className="px-4 md:px-6 pb-4 md:pb-6 space-y-4 md:space-y-6 border-t border-slate-200 pt-4 md:pt-6">
          {reflection.sections.map((section, index) => (
            <SectionContent key={index} section={section} />
          ))}
        </div>
      )}
    </div>
  );
};

interface ReflectionBlockProps {
  title?: string;
  description?: string;
  items: Reflection[];
}

// Expandable thematic insight cards (ported from the old ReflectionSection).
export default function ReflectionBlock({ title, description, items }: ReflectionBlockProps) {
  return (
    <section className="max-w-4xl mx-auto px-4 py-6 md:py-8">
      {title && (
        <div className="text-center mb-6 md:mb-8">
          <h2 className="text-xl md:text-3xl font-bold text-slate-900 mb-2">{title}</h2>
          {description && (
            <p className="text-sm md:text-lg text-slate-600 max-w-3xl mx-auto">{description}</p>
          )}
        </div>
      )}
      <div className="grid grid-cols-1 gap-4 md:gap-6">
        {items.map((reflection) => (
          <ReflectionCard key={reflection.id} reflection={reflection} />
        ))}
      </div>
    </section>
  );
}
