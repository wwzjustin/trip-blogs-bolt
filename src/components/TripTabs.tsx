import { Plus } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../i18n/translations';

interface TripTabsProps {
  currentTripId: string;
  onTripChange: (tripId: string) => void;
}

export default function TripTabs({ currentTripId }: TripTabsProps) {
  const { language } = useLanguage();

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-4 overflow-x-auto py-4">
          <button
            className={`px-6 py-3 rounded-lg font-medium transition-all whitespace-nowrap ${
              currentTripId === 'uk-2024'
                ? 'bg-blue-900 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {t(language, 'tripTabs.ukTrip')}
          </button>

          <button
            disabled
            className="px-6 py-3 rounded-lg font-medium bg-gray-50 text-gray-400 cursor-not-allowed whitespace-nowrap"
            title={t(language, 'tripTabs.uploadHint')}
          >
            {t(language, 'tripTabs.trip2')}
          </button>

          <button
            disabled
            className="px-6 py-3 rounded-lg font-medium bg-gray-50 text-gray-400 cursor-not-allowed whitespace-nowrap"
            title={t(language, 'tripTabs.uploadHint')}
          >
            {t(language, 'tripTabs.trip3')}
          </button>

          <button
            disabled
            className="px-6 py-3 rounded-lg font-medium bg-gray-50 text-gray-300 cursor-not-allowed flex items-center space-x-2 whitespace-nowrap"
            title={t(language, 'tripTabs.uploadHint')}
          >
            <Plus size={20} />
            <span>{t(language, 'tripTabs.newTrip')}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
