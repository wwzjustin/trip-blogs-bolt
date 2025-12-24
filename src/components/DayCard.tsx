import { MapPin, ChevronRight } from 'lucide-react';
import { DayItinerary, Attraction } from '../types/trip';
import { getAttractionThumbnail } from '../utils/imageService';

interface DayCardProps {
  day: DayItinerary;
  isLeft: boolean;
  onAttractionClick: (attraction: Attraction) => void;
}

export default function DayCard({ day, isLeft, onAttractionClick }: DayCardProps) {
  return (
    <div className={`flex items-start mb-8 md:mb-16 md:items-center ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
      <div className={`flex-1 ${isLeft ? 'md:pr-8 md:text-right' : 'md:pl-8 md:text-left'} pl-4 md:pl-0`}>
        <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-4 md:p-6 border-l-4 border-amber-600">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 space-y-2 md:space-y-0">
            <div className={`${isLeft ? 'md:order-2' : 'md:order-1'}`}>
              <h3 className="text-xl md:text-2xl font-bold text-blue-900">Day {day.day}</h3>
              <p className="text-gray-600 mt-1 text-sm md:text-base">{day.title}</p>
            </div>
            <div className={`flex items-center space-x-2 text-xs md:text-sm text-gray-500 ${isLeft ? 'md:order-1' : 'md:order-2'}`}>
              <MapPin size={14} className="md:w-4 md:h-4 flex-shrink-0" />
              <span>{day.cities.join(' · ')}</span>
            </div>
          </div>

          <div className="space-y-3">
            {day.attractions.map((attraction) => (
              <button
                key={attraction.id}
                onClick={() => onAttractionClick(attraction)}
                className="w-full group"
              >
                <div className="flex items-center space-x-3 md:space-x-4 p-2 md:p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden bg-gray-200">
                    <img
                      src={getAttractionThumbnail(attraction)}
                      alt={attraction.nameCn}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        if (!target.src.includes('data:image')) {
                          target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect width="400" height="300" fill="%231e3a8a"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-size="18" fill="white"%3E' + encodeURIComponent(attraction.nameCn) + '%3C/text%3E%3C/svg%3E';
                        }
                      }}
                    />
                  </div>
                  <div className={`flex-1 text-left ${isLeft ? 'md:text-right' : 'md:text-left'}`}>
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
                    className={`text-gray-400 group-hover:text-blue-900 transition-colors flex-shrink-0 md:w-5 md:h-5 ${isLeft ? 'md:order-first md:rotate-180' : ''}`}
                  />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="relative flex items-center justify-center w-12 md:w-16 flex-shrink-0 z-10 -ml-6 md:ml-0">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-blue-900 to-blue-700 text-white flex items-center justify-center font-bold text-sm md:text-lg shadow-lg">
          {day.day}
        </div>
      </div>

      <div className="flex-1 hidden md:block"></div>
    </div>
  );
}
