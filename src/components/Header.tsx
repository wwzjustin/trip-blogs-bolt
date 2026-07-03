import { Link } from 'react-router-dom';
import { Plane, ArrowLeft } from 'lucide-react';
import { Trip, countJournalDays } from '../types/content';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../i18n/translations';

interface HeaderProps {
  trip: Trip;
}

// Per-trip hero. Gradient derives from the trip's accent color so each trip
// gets its own identity without any per-trip component code.
export default function Header({ trip }: HeaderProps) {
  const { language } = useLanguage();
  const accent = trip.accent ?? '#1e3a8a';
  const dayCount = countJournalDays(trip.blocks);

  return (
    <div
      className="text-white py-10 md:py-14 px-4 relative"
      style={{
        background: `linear-gradient(135deg, ${accent} 0%, ${accent}dd 55%, #0f172a 100%)`
      }}
    >
      <div className="max-w-4xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-white/70 hover:text-white text-sm mb-4 transition-colors"
        >
          <ArrowLeft size={16} />
          {t(language, 'header.backToTrips')}
        </Link>

        <div className="flex items-center mb-3 md:mb-4">
          <Plane size={28} className="mr-2 md:mr-3 flex-shrink-0" />
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold">{trip.title}</h1>
        </div>
        {trip.subtitle && (
          <p className="text-white/80 text-base md:text-lg mb-3 md:mb-2">{trip.subtitle}</p>
        )}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs sm:text-sm text-white/60">
          {trip.date && <span>{trip.date}</span>}
          {trip.traveler && (
            <>
              <span className="hidden sm:inline">·</span>
              <span>
                {t(language, 'header.traveler')}：{trip.traveler}
              </span>
            </>
          )}
          {dayCount > 0 && (
            <>
              <span className="hidden sm:inline">·</span>
              <span>
                {dayCount}
                {t(language, 'header.days')}
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
