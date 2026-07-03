import { useState } from 'react';
import { MapPin, ChevronRight } from 'lucide-react';
import { Attraction, L10n, pickL10n } from '../types/content';
import Markdown from '../components/Markdown';
import AttractionModal from '../components/AttractionModal';
import { getAttractionThumbnail } from '../utils/imageService';
import { useLanguage } from '../contexts/LanguageContext';

interface JournalBlockProps {
  date?: L10n;
  title: L10n;
  cities?: L10n[];
  body?: L10n;
  attractions?: Attraction[];
}

// One travel day: bronze date kicker + serif title, optional narrative body,
// optional attraction cards opening the detail modal.
export default function JournalBlock({ date, title, cities, body, attractions }: JournalBlockProps) {
  const { language } = useLanguage();
  const L = (v: L10n | undefined) => pickL10n(language, v);
  const [selected, setSelected] = useState<Attraction | null>(null);
  const resolvedBody = L(body);

  return (
    <section className="max-w-3xl mx-auto px-4 py-4 md:py-5">
      <article
        className="bg-white rounded-lg border border-[rgba(45,52,53,0.08)] overflow-hidden"
        style={{ boxShadow: 'var(--shadow-sm)' }}
      >
        <div className="p-5 md:p-7">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
            {date && (
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#715b37]">
                {L(date)}
              </span>
            )}
            {cities && cities.length > 0 && (
              <span className="inline-flex items-center gap-1 text-[11px] md:text-xs text-[#9aa0a1]">
                <MapPin size={11} className="flex-shrink-0" />
                {cities.map((c) => L(c)).join(' · ')}
              </span>
            )}
          </div>
          <h3 className="font-display text-xl md:text-2xl font-bold text-[#2d3435] mb-4 leading-snug">
            {L(title)}
          </h3>

          {resolvedBody && <Markdown>{resolvedBody}</Markdown>}

          {attractions && attractions.length > 0 && (
            <div className="mt-4 space-y-1.5">
              {attractions.map((attraction) => {
                const primary = language === 'en' ? attraction.nameEn : attraction.nameCn;
                const secondary = language === 'en' ? attraction.nameCn : attraction.nameEn;
                return (
                  <button
                    key={attraction.id}
                    onClick={() => setSelected(attraction)}
                    className="w-full group"
                  >
                    <div className="flex items-center gap-3 md:gap-4 p-2 md:p-2.5 rounded-md border border-transparent hover:border-[rgba(45,52,53,0.1)] hover:bg-[#fbfbfa] transition-colors">
                      <div className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-md overflow-hidden bg-[#f2f4f4]">
                        <img
                          src={getAttractionThumbnail(attraction)}
                          alt={primary}
                          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                          loading="lazy"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            if (!target.src.includes('data:image')) {
                              target.src =
                                'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect width="400" height="300" fill="%23f2f4f4"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Georgia, serif" font-size="16" fill="%239aa0a1"%3E' +
                                encodeURIComponent(attraction.nameEn) +
                                '%3C/text%3E%3C/svg%3E';
                            }
                          }}
                        />
                      </div>
                      <div className="flex-1 text-left min-w-0">
                        <h4 className="font-display font-semibold text-sm md:text-base text-[#2d3435] group-hover:text-[#715b37] transition-colors truncate">
                          {primary}
                        </h4>
                        <p className="text-xs text-[#9aa0a1] truncate">{secondary}</p>
                        <span className="inline-block mt-1 text-[10px] md:text-[11px] font-medium uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#f5f0e8] text-[#715b37]">
                          {L(attraction.type)}
                        </span>
                      </div>
                      <ChevronRight
                        size={16}
                        className="text-[#c4cbcc] group-hover:text-[#715b37] transition-colors flex-shrink-0"
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </article>

      {selected && <AttractionModal attraction={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
