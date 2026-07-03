import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { Attraction } from '../types/content';
import AttractionModal from '../components/AttractionModal';
import { getAttractionThumbnail } from '../utils/imageService';

interface AttractionsBlockProps {
  title?: string;
  items: Attraction[];
}

// Standalone grid of attraction cards not tied to a specific day.
export default function AttractionsBlock({ title, items }: AttractionsBlockProps) {
  const [selected, setSelected] = useState<Attraction | null>(null);

  return (
    <section className="max-w-4xl mx-auto px-4 py-6 md:py-8">
      {title && (
        <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
          <span className="w-1.5 h-6 md:h-7 bg-amber-500 rounded-full flex-shrink-0"></span>
          {title}
        </h2>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
        {items.map((attraction) => (
          <button key={attraction.id} onClick={() => setSelected(attraction)} className="group text-left">
            <div className="bg-white rounded-xl shadow hover:shadow-lg transition-shadow overflow-hidden h-full">
              <div className="h-32 md:h-40 bg-gray-200 overflow-hidden">
                <img
                  src={getAttractionThumbnail(attraction)}
                  alt={attraction.nameCn}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <div className="p-3 md:p-4 flex items-center justify-between gap-2">
                <div>
                  <h4 className="font-semibold text-sm md:text-base text-gray-900 group-hover:text-blue-900">
                    {attraction.nameCn}
                  </h4>
                  <p className="text-xs md:text-sm text-gray-500">{attraction.nameEn}</p>
                </div>
                <ChevronRight size={18} className="text-gray-400 group-hover:text-blue-900 flex-shrink-0" />
              </div>
            </div>
          </button>
        ))}
      </div>

      {selected && <AttractionModal attraction={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
