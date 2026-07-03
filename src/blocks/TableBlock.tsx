import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { L10n, TableData, pickL10n } from '../types/content';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../i18n/translations';

interface TableBlockProps {
  title: L10n;
  description?: L10n;
  table: TableData;
}

// Any headed table: glossary, comparison, parallel timeline. Real table on
// desktop, stacked cards on mobile. Collapsed by default.
export default function TableBlock({ title, description, table }: TableBlockProps) {
  const { language } = useLanguage();
  const L = (v: L10n | undefined) => pickL10n(language, v);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="max-w-3xl mx-auto px-4 py-5 md:py-6">
      <div
        className="bg-white rounded-lg border border-[rgba(45,52,53,0.08)] p-5 md:p-7"
        style={{ boxShadow: 'var(--shadow-sm)' }}
      >
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between gap-3 text-left"
        >
          <div>
            <h2 className="font-display text-lg md:text-xl font-bold text-[#2d3435]">{L(title)}</h2>
            {description && (
              <p className="font-display italic text-xs md:text-sm text-[#5a6061] mt-1.5">
                {L(description)}
              </p>
            )}
            <p className="text-[11px] uppercase tracking-[0.15em] text-[#9aa0a1] mt-2">
              {table.rows.length} {t(language, 'table.rows')}
            </p>
          </div>
          <span className="p-2 rounded-full border border-[rgba(45,52,53,0.1)] hover:bg-[#f2f4f4] transition-colors flex-shrink-0">
            {isExpanded ? (
              <ChevronUp className="w-4 h-4 text-[#5a6061]" />
            ) : (
              <ChevronDown className="w-4 h-4 text-[#5a6061]" />
            )}
          </span>
        </button>

        {isExpanded && (
          <div className="mt-5">
            {/* desktop */}
            <div className="hidden md:block overflow-x-auto rounded-md border border-[rgba(45,52,53,0.08)]">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-[#f2f4f4]">
                    {table.headers.map((header, index) => (
                      <th
                        key={index}
                        className="p-3 text-left font-semibold text-[#2d3435] border-b border-[rgba(45,52,53,0.12)]"
                      >
                        {L(header)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {table.rows.map((row, rowIndex) => (
                    <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-[#fbfbfa]'}>
                      {row.map((cell, cellIndex) => (
                        <td
                          key={cellIndex}
                          className={`p-3 border-b border-[rgba(45,52,53,0.06)] align-top ${
                            cellIndex === 0
                              ? 'font-display font-semibold text-[#2d3435]'
                              : 'text-[#5a6061]'
                          }`}
                        >
                          {L(cell)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* mobile: stacked cards */}
            <div className="md:hidden space-y-3">
              {table.rows.map((row, rowIndex) => (
                <div
                  key={rowIndex}
                  className="rounded-md border border-[rgba(45,52,53,0.08)] p-3.5 bg-[#fbfbfa]"
                >
                  <h4 className="font-display font-semibold text-[#2d3435] text-sm mb-2">
                    {L(row[0])}
                  </h4>
                  <div className="space-y-1.5 text-xs">
                    {row.slice(1).map((cell, cellIndex) => (
                      <div key={cellIndex}>
                        <span className="font-medium text-[#5a6061]">
                          {L(table.headers[cellIndex + 1])}：
                        </span>
                        <span className="text-[#9aa0a1]">{L(cell)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
