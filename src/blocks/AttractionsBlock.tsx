import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { Attraction, L10n, pickL10n } from '../types/content';
import AttractionModal from '../components/AttractionModal';
import { getAttractionThumbnail } from '../utils/imageService';
import { useLanguage } from '../contexts/LanguageContext';

interface AttractionsBlockProps {
  title?: L10n;
  items: Attraction[];
}

// Standalone grid of attraction cards not tied to a specific day.
export default function AttractionsBlock({ title, items }: AttractionsBlockProps) {
  const { language } = useLanguage();
  const [selected, setSelected] = useState<Attraction | null>(null);
  const resolvedTitle = pickL10n(language, title);

  return (
    <section className="max-w-3xl mx-auto px-4 py-5 md:py-6">
      {resolvedTitle && (
        <h2 className="font-display text-lg md:text-xl font-bold text-[#2d3435] mb-4">
          {resolvedTitle}
        </h2>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
        {items.map((attraction) => {
          const primary = language === 'en' ? attraction.nameEn : attraction.nameCn;
          const secondary = language === 'en' ? attraction.nameCn : attraction.nameEn;
          return (
            <button
              key={attraction.id}
              onClick={() => setSelected(attraction)}
              className="group text-left"
            >
              <div
                className="bg-white rounded-lg border border-[rgba(45,52,53,0.08)] overflow-hidden h-full transition-shadow"
                style={{ boxShadow: 'var(--shadow-sm)' }}
              >
                <div className="h-32 md:h-40 bg-[#f2f4f4] overflow-hidden">
                  <img
                    src={getAttractionThumbnail(attraction)}
                    alt={primary}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-3.5 flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <h4 className="font-display font-semibold text-sm md:text-base text-[#2d3435] group-hover:text-[#715b37] transition-colors truncate">
                      {primary}
                    </h4>
                    <p className="text-xs text-[#9aa0a1] truncate">{secondary}</p>
                  </div>
                  <ChevronRight
                    size={15}
                    className="text-[#c4cbcc] group-hover:text-[#715b37] flex-shrink-0"
                  />
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {selected && <AttractionModal attraction={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
