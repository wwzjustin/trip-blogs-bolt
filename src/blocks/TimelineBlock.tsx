import { useState } from 'react';
import { Clock, MapPin, Users, ChevronDown, ChevronUp } from 'lucide-react';
import { L10n, TimelineEntry, pickL10n } from '../types/content';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../i18n/translations';

interface TimelineBlockProps {
  title: L10n;
  description?: L10n;
  entries: TimelineEntry[];
}

// Vertical expandable historical timeline. Collapsed by default — some trips
// carry 60+ entries.
export default function TimelineBlock({ title, description, entries }: TimelineBlockProps) {
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
              {entries.length} {t(language, 'timeline.entries')}
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
          <div className="mt-6 relative">
            <div className="absolute left-[5px] top-2 bottom-2 w-px bg-[rgba(45,52,53,0.1)]"></div>
            <div className="space-y-6">
              {entries.map((period, index) => (
                <div key={index} className="relative pl-6">
                  <span className="absolute left-0 top-1.5 w-[11px] h-[11px] rounded-full bg-white border-2 border-[#9a7f52]"></span>
                  <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-0.5">
                    <h4 className="font-display font-semibold text-sm md:text-base text-[#2d3435]">
                      {L(period.period)}
                    </h4>
                    {period.timeRange && (
                      <span className="inline-flex items-center gap-1 text-[11px] text-[#9aa0a1]">
                        <Clock size={10} />
                        {L(period.timeRange)}
                      </span>
                    )}
                  </div>
                  <div className="mt-1.5 space-y-1 text-xs md:text-sm text-[#5a6061] leading-relaxed">
                    {period.keyLocation && (
                      <p className="flex items-start gap-1.5">
                        <MapPin size={12} className="text-[#9a7f52] flex-shrink-0 mt-0.5" />
                        <span>{L(period.keyLocation)}</span>
                      </p>
                    )}
                    {period.keyFigures && period.keyFigures.length > 0 && (
                      <p className="flex items-start gap-1.5">
                        <Users size={12} className="text-[#9a7f52] flex-shrink-0 mt-0.5" />
                        <span>{period.keyFigures.map((f) => L(f)).join('、')}</span>
                      </p>
                    )}
                    {period.majorEvents && <p>{L(period.majorEvents)}</p>}
                    {period.significance && (
                      <p className="text-[#9aa0a1]">
                        <span className="font-medium text-[#5a6061]">
                          {t(language, 'timeline.significance')}:
                        </span>{' '}
                        {L(period.significance)}
                      </p>
                    )}
                    {period.connection && (
                      <p className="font-display italic text-[#9aa0a1]">{L(period.connection)}</p>
                    )}
                    {period.relatedDays && period.relatedDays.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {period.relatedDays.map((day) => (
                          <span
                            key={day}
                            className="px-2 py-0.5 rounded-full bg-[#f5f0e8] text-[#715b37] text-[10px] font-medium uppercase tracking-wider"
                          >
                            Day {day}
                          </span>
                        ))}
                      </div>
                    )}
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
