import { Trip } from '../types/trip';
import { Plane, Languages } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../i18n/translations';

interface HeaderProps {
  trip: Trip;
}

export default function Header({ trip }: HeaderProps) {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white py-8 md:py-12 px-4 relative">
      <div className="absolute top-4 left-4 z-10">
        <div className="relative">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as 'en' | 'zh')}
            className="appearance-none bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-lg px-3 py-2 pr-8 text-sm font-medium hover:bg-white/20 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/30"
          >
            <option value="en" className="bg-blue-900 text-white">English</option>
            <option value="zh" className="bg-blue-900 text-white">简体中文</option>
          </select>
          <Languages size={16} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-white/70" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-center mb-3 md:mb-4">
          <Plane size={28} className="mr-2 md:mr-3 flex-shrink-0" />
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-center">{trip.title}</h1>
        </div>
        <p className="text-blue-200 text-center text-base md:text-lg mb-3 md:mb-2 px-2">{trip.subtitle}</p>
        <div className="flex flex-col sm:flex-row items-center justify-center sm:space-x-4 space-y-1 sm:space-y-0 text-xs sm:text-sm text-blue-300">
          <span>{trip.date}</span>
          <span className="hidden sm:inline">·</span>
          <span>{t(language, 'header.traveler')}：{trip.traveler}</span>
          <span className="hidden sm:inline">·</span>
          <span>{trip.days.length}{t(language, 'header.days')}</span>
        </div>
      </div>
    </div>
  );
}
