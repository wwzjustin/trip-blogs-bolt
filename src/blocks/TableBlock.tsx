import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { TableData } from '../types/content';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../i18n/translations';

interface TableBlockProps {
  title: string;
  description?: string;
  table: TableData;
}

// Any headed table: glossary, comparison, parallel timeline. Real table on
// desktop, stacked cards on mobile (ported from the old Scotland table).
// Collapsed by default — glossaries can run 40+ rows.
export default function TableBlock({ title, description, table }: TableBlockProps) {
  const { language } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="max-w-4xl mx-auto px-4 py-6 md:py-8">
      <div className="bg-gradient-to-br from-blue-50 to-slate-50 rounded-xl shadow-lg p-4 md:p-8">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between gap-3 text-left"
        >
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">{title}</h2>
            {description && (
              <p className="text-sm md:text-base text-slate-600 mt-1">{description}</p>
            )}
            <p className="text-xs md:text-sm text-slate-400 mt-1">
              {table.rows.length} {t(language, 'table.rows')}
            </p>
          </div>
          <span className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors flex-shrink-0">
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 md:w-6 md:h-6 text-slate-700" />
            ) : (
              <ChevronDown className="w-5 h-5 md:w-6 md:h-6 text-slate-700" />
            )}
          </span>
        </button>

        {isExpanded && (
          <div className="mt-6">
            {/* desktop */}
            <div className="hidden md:block overflow-x-auto rounded-lg">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-slate-700 text-white">
                    {table.headers.map((header, index) => (
                      <th
                        key={index}
                        className={`p-3 md:p-4 text-left text-sm md:text-base ${
                          index === 0 ? 'rounded-tl-lg' : ''
                        } ${index === table.headers.length - 1 ? 'rounded-tr-lg' : ''}`}
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {table.rows.map((row, rowIndex) => (
                    <tr
                      key={rowIndex}
                      className={`${
                        rowIndex % 2 === 0 ? 'bg-white' : 'bg-slate-50'
                      } hover:bg-blue-50 transition-colors`}
                    >
                      {row.map((cell, cellIndex) => (
                        <td
                          key={cellIndex}
                          className={`p-3 md:p-4 border-b border-slate-200 text-sm md:text-base align-top ${
                            cellIndex === 0 ? 'font-semibold text-slate-800' : 'text-slate-700'
                          }`}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* mobile: stacked cards */}
            <div className="md:hidden space-y-4">
              {table.rows.map((row, rowIndex) => (
                <div
                  key={rowIndex}
                  className="bg-white rounded-lg shadow-md p-4 border-l-4 border-slate-700"
                >
                  <h4 className="font-bold text-slate-900 text-base mb-3">{row[0]}</h4>
                  <div className="space-y-2 text-sm">
                    {row.slice(1).map((cell, cellIndex) => (
                      <div key={cellIndex}>
                        <span className="font-semibold text-slate-700">
                          {table.headers[cellIndex + 1]}：
                        </span>
                        <span className="text-slate-600">{cell}</span>
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
