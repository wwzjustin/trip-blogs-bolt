import { X, MapPin, Clock, Users, Quote } from 'lucide-react';
import { Attraction } from '../types/trip';
import { getAttractionImage } from '../utils/imageService';
import { useEffect } from 'react';

interface AttractionModalProps {
  attraction: Attraction;
  onClose: () => void;
}

export default function AttractionModal({ attraction, onClose }: AttractionModalProps) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-4 bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl max-w-5xl w-full max-h-[95vh] md:max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-48 sm:h-56 md:h-80 bg-gray-200 flex-shrink-0">
          <img
            src={getAttractionImage(attraction)}
            alt={attraction.nameCn}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              if (!target.src.includes('data:image')) {
                target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="1200" height="800"%3E%3Crect width="1200" height="800" fill="%231e3a8a"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-size="32" fill="white"%3E' + encodeURIComponent(attraction.nameCn) + '%3C/text%3E%3C/svg%3E';
              }
            }}
          />
          <button
            onClick={onClose}
            className="absolute top-2 right-2 md:top-4 md:right-4 p-1.5 md:p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
          >
            <X size={20} className="md:w-6 md:h-6" />
          </button>

          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3 md:p-6">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1 md:mb-2">{attraction.nameCn}</h2>
            <p className="text-gray-200 text-sm sm:text-base md:text-lg">{attraction.nameEn}</p>
          </div>
        </div>

        <div className="overflow-y-auto flex-1 p-4 md:p-6 lg:p-8">
          <div className="flex flex-wrap gap-2 mb-4 md:mb-6">
            <span className="px-2 md:px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs md:text-sm font-medium">
              {attraction.type}
            </span>
            {attraction.historicalPeriod && (
              <span className="px-2 md:px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs md:text-sm font-medium flex items-center">
                <Clock size={12} className="md:w-3.5 md:h-3.5 mr-1" />
                {attraction.historicalPeriod}
              </span>
            )}
          </div>

          {attraction.historicalContext && (
            <div className="mb-4 md:mb-6">
              <div className="flex items-center space-x-2 mb-2 md:mb-3">
                <MapPin size={18} className="md:w-5 md:h-5 text-blue-900 flex-shrink-0" />
                <h3 className="text-base md:text-xl font-bold text-gray-900">历史定位</h3>
              </div>
              <p className="text-sm md:text-base text-gray-700 leading-relaxed">{attraction.historicalContext}</p>
            </div>
          )}

          {attraction.experience && (
            <div className="mb-4 md:mb-6">
              <div className="flex items-center space-x-2 mb-2 md:mb-3">
                <MapPin size={18} className="md:w-5 md:h-5 text-blue-900 flex-shrink-0" />
                <h3 className="text-base md:text-xl font-bold text-gray-900">实地体验</h3>
              </div>
              <p className="text-sm md:text-base text-gray-700 leading-relaxed">{attraction.experience}</p>
            </div>
          )}

          {attraction.insight && (
            <div className="mb-4 md:mb-6 bg-amber-50 border-l-4 border-amber-600 p-3 md:p-4 rounded-r-lg">
              <div className="flex items-start space-x-2">
                <Quote size={18} className="md:w-5 md:h-5 text-amber-600 flex-shrink-0 mt-0.5 md:mt-1" />
                <div>
                  <h3 className="text-base md:text-lg font-bold text-gray-900 mb-1 md:mb-2">核心洞察</h3>
                  <p className="text-sm md:text-base text-gray-800 leading-relaxed italic">{attraction.insight}</p>
                </div>
              </div>
            </div>
          )}

          {attraction.relatedPeople && attraction.relatedPeople.length > 0 && (
            <div>
              <div className="flex items-center space-x-2 mb-2 md:mb-3">
                <Users size={18} className="md:w-5 md:h-5 text-blue-900 flex-shrink-0" />
                <h3 className="text-base md:text-xl font-bold text-gray-900">相关人物</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {attraction.relatedPeople.map((person, index) => (
                  <span
                    key={index}
                    className="px-2 md:px-3 py-1 md:py-2 bg-gray-100 text-gray-800 rounded-lg text-xs md:text-sm font-medium"
                  >
                    {person}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-gray-200 p-3 md:p-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 md:px-6 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors font-medium text-sm md:text-base"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  );
}
