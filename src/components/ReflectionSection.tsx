import { useState } from 'react';
import * as Icons from 'lucide-react';
import { reflections } from '../data/reflections';
import { Reflection, ReflectionSection as ReflectionSectionType } from '../types/trip';

const ReflectionCard = ({ reflection }: { reflection: Reflection }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const IconComponent = Icons[reflection.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>;

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 md:p-6 text-left hover:bg-slate-50 transition-colors"
      >
        <div className="flex items-start gap-3 md:gap-4">
          <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-slate-700 to-slate-900 rounded-lg flex items-center justify-center">
            {IconComponent && <IconComponent className="w-5 h-5 md:w-6 md:h-6 text-white" />}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-base md:text-xl font-bold text-slate-900 mb-1">
              {reflection.title}
            </h3>
            {reflection.subtitle && (
              <p className="text-xs md:text-sm text-slate-600 mb-1 md:mb-2">{reflection.subtitle}</p>
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
            <ReflectionSectionContent key={index} section={section} />
          ))}
        </div>
      )}
    </div>
  );
};

const ReflectionSectionContent = ({ section }: { section: ReflectionSectionType }) => {
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

      {section.content && (
        <div className="text-sm md:text-base text-slate-700 whitespace-pre-line leading-relaxed">
          {section.content}
        </div>
      )}

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
                <tr
                  key={rowIndex}
                  className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-slate-50'}
                >
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

export const ReflectionSection = () => {
  return (
    <section className="bg-gradient-to-b from-white to-slate-100 py-8 md:py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-4xl font-bold text-slate-900 mb-3 md:mb-4">
            宏观思考与洞察
          </h2>
          <p className="text-base md:text-xl text-slate-600 max-w-3xl mx-auto px-2">
            超越景点的深度反思：从宗教与王权的博弈，到文明的自我修复机制
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:gap-6">
          {reflections.map((reflection) => (
            <ReflectionCard key={reflection.id} reflection={reflection} />
          ))}
        </div>

        <div className="mt-8 md:mt-12 bg-gradient-to-r from-slate-800 to-slate-900 text-white rounded-xl p-5 md:p-8 shadow-xl">
          <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 flex items-center gap-2">
            <Icons.BookOpen className="w-5 h-5 md:w-6 md:h-6" />
            结语
          </h3>
          <p className="text-base md:text-lg leading-relaxed mb-3 md:mb-4">
            这次英国之行，我不是在"看景点"，而是在<strong>"阅读一个文明如何通过空间、制度、人物不断自我修复与延续"</strong>。
          </p>
          <p className="text-sm md:text-base text-slate-200 leading-relaxed">
            从白崖到威斯敏斯特，从罗马军营到现代大学，我看到的是：权力如何被建筑化、法律如何被制度化、知识如何被保存、文化如何被软化。英国不是"完美"的，但它展示了一条路径：如何在不断的冲突、妥协、修复中，让制度活下来。
          </p>
        </div>
      </div>
    </section>
  );
};
