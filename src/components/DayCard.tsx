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
    <div className={`flex items-center mb-16 ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}>
      <div className={`flex-1 ${isLeft ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
        <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6 border-l-4 border-amber-600">
          <div className="flex items-center justify-between mb-4">
            <div className={isLeft ? 'order-2' : 'order-1'}>
              <h3 className="text-2xl font-bold text-blue-900">Day {day.day}</h3>
              <p className="text-gray-600 mt-1">{day.title}</p>
            </div>
            <div className={`flex items-center space-x-2 text-sm text-gray-500 ${isLeft ? 'order-1' : 'order-2'}`}>
              <MapPin size={16} />
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
                <div className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden bg-gray-200">
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
                  <div className={`flex-1 ${isLeft ? 'text-right' : 'text-left'}`}>
                    <h4 className="font-semibold text-gray-900 group-hover:text-blue-900 transition-colors">
                      {attraction.nameCn}
                    </h4>
                    <p className="text-sm text-gray-500">{attraction.nameEn}</p>
                    <span className="inline-block mt-1 text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded">
                      {attraction.type}
                    </span>
                  </div>
                  <ChevronRight
                    size={20}
                    className={`text-gray-400 group-hover:text-blue-900 transition-colors flex-shrink-0 ${isLeft ? 'order-first rotate-180' : ''}`}
                  />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="relative flex items-center justify-center w-16 flex-shrink-0 z-10">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-900 to-blue-700 text-white flex items-center justify-center font-bold text-lg shadow-lg">
          {day.day}
        </div>
      </div>

      <div className="flex-1"></div>
    </div>
  );
}
