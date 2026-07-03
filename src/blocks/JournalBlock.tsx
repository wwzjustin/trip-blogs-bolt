import { useState } from 'react';
import { MapPin, ChevronRight } from 'lucide-react';
import { Attraction } from '../types/content';
import Markdown from '../components/Markdown';
import AttractionModal from '../components/AttractionModal';
import { getAttractionThumbnail } from '../utils/imageService';

interface JournalBlockProps {
  date?: string;
  title: string;
  cities?: string[];
  body?: string;
  attractions?: Attraction[];
}

// One travel day: a badge + title header, optional narrative markdown body,
// optional attraction cards opening the detail modal. Either or both.
export default function JournalBlock({ date, title, cities, body, attractions }: JournalBlockProps) {
  const [selected, setSelected] = useState<Attraction | null>(null);

  return (
    <section className="max-w-4xl mx-auto px-4 py-4 md:py-5">
      <div className="relative pl-5 md:pl-7">
        {/* timeline rail */}
        <div className="absolute left-0 top-2 bottom-0 w-1 bg-gradient-to-b from-amber-500 to-amber-200 rounded-full"></div>

        <div className="bg-white rounded-xl shadow-lg border-l-4 border-amber-600 overflow-hidden">
          <div className="p-4 md:p-6">
            <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-2">
              {date && (
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-900 text-white text-xs md:text-sm font-bold shadow">
                  {date}
                </span>
              )}
              {cities && cities.length > 0 && (
                <span className="inline-flex items-center gap-1 text-xs md:text-sm text-slate-500">
                  <MapPin size={14} className="flex-shrink-0" />
                  {cities.join(' · ')}
                </span>
              )}
            </div>
            <h3 className="text-lg md:text-2xl font-bold text-slate-900 mb-3">{title}</h3>

            {body && <Markdown>{body}</Markdown>}

            {attractions && attractions.length > 0 && (
              <div className="mt-3 space-y-2">
                {attractions.map((attraction) => (
                  <button
                    key={attraction.id}
                    onClick={() => setSelected(attraction)}
                    className="w-full group"
                  >
                    <div className="flex items-center space-x-3 md:space-x-4 p-2 md:p-3 rounded-lg hover:bg-gray-50 transition-colors border border-transparent hover:border-slate-200">
                      <div className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden bg-gray-200">
                        <img
                          src={getAttractionThumbnail(attraction)}
                          alt={attraction.nameCn}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            if (!target.src.includes('data:image')) {
                              target.src =
                                'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect width="400" height="300" fill="%231e3a8a"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-size="18" fill="white"%3E' +
                                encodeURIComponent(attraction.nameCn) +
                                '%3C/text%3E%3C/svg%3E';
                            }
                          }}
                        />
                      </div>
                      <div className="flex-1 text-left">
                        <h4 className="font-semibold text-sm md:text-base text-gray-900 group-hover:text-blue-900 transition-colors">
                          {attraction.nameCn}
                        </h4>
                        <p className="text-xs md:text-sm text-gray-500">{attraction.nameEn}</p>
                        <span className="inline-block mt-1 text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded">
                          {attraction.type}
                        </span>
                      </div>
                      <ChevronRight
                        size={18}
                        className="text-gray-400 group-hover:text-blue-900 transition-colors flex-shrink-0 md:w-5 md:h-5"
                      />
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {selected && <AttractionModal attraction={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
