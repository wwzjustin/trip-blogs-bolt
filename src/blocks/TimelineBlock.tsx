import { useState } from 'react';
import { Clock, MapPin, Users, ChevronDown, ChevronUp } from 'lucide-react';
import { TimelineEntry } from '../types/content';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../i18n/translations';

interface TimelineBlockProps {
  title: string;
  description?: string;
  entries: TimelineEntry[];
}

// Vertical expandable historical timeline (ported from the England-periods
// view of the old HistoricalOverview). Collapsed by default — some trips
// carry 60+ entries.
export default function TimelineBlock({ title, description, entries }: TimelineBlockProps) {
  const { language } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="max-w-4xl mx-auto px-4 py-6 md:py-8">
      <div className="bg-gradient-to-b from-slate-50 to-white rounded-xl shadow-lg p-4 md:p-8">
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
              {entries.length} {t(language, 'timeline.entries')}
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
          <div className="space-y-4 md:space-y-5 mt-6">
            {entries.map((period, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md p-4 md:p-6 hover:shadow-xl transition-shadow border-l-4 border-slate-700"
              >
                <div className="flex flex-col lg:flex-row gap-4 md:gap-6">
                  <div className="lg:w-1/4">
                    {period.timeRange && (
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-4 h-4 md:w-5 md:h-5 text-slate-600 flex-shrink-0" />
                        <span className="text-xs md:text-sm font-medium text-slate-600">
                          {period.timeRange}
                        </span>
                      </div>
                    )}
                    <h4 className="text-base md:text-lg font-bold text-slate-900">{period.period}</h4>
                  </div>

                  <div className="lg:w-3/4 space-y-2 md:space-y-3">
                    {period.keyLocation && (
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 md:w-5 md:h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                        <div className="text-sm md:text-base">
                          <span className="font-semibold text-slate-700">
                            {t(language, 'timeline.location')}：
                          </span>
                          <span className="text-slate-600">{period.keyLocation}</span>
                        </div>
                      </div>
                    )}

                    {period.keyFigures && period.keyFigures.length > 0 && (
                      <div className="flex items-start gap-2">
                        <Users className="w-4 h-4 md:w-5 md:h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <div className="text-sm md:text-base">
                          <span className="font-semibold text-slate-700">
                            {t(language, 'timeline.keyFigures')}：
                          </span>
                          <span className="text-slate-600">{period.keyFigures.join('、')}</span>
                        </div>
                      </div>
                    )}

                    {period.majorEvents && (
                      <p className="text-sm md:text-base text-slate-600">
                        <span className="font-semibold">{t(language, 'timeline.coreEvents')}：</span>{' '}
                        {period.majorEvents}
                      </p>
                    )}

                    {period.significance && (
                      <p className="text-sm md:text-base text-slate-600">
                        <span className="font-semibold">
                          {t(language, 'timeline.significance')}：
                        </span>{' '}
                        {period.significance}
                      </p>
                    )}

                    {period.connection && (
                      <p className="text-sm md:text-base text-slate-500 italic">
                        {period.connection}
                      </p>
                    )}

                    {period.relatedDays && period.relatedDays.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-2">
                        {period.relatedDays.map((day) => (
                          <span
                            key={day}
                            className="px-2 md:px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs md:text-sm font-medium"
                          >
                            Day {day}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
