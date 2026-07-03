import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plane, CalendarDays, ArrowRight } from 'lucide-react';
import { getTrips } from '../content/loadTrips';
import { countJournalDays } from '../types/content';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../i18n/translations';

// "/" — one card per trip, auto-discovered from content/trips/*.json.
export default function TripIndex() {
  const { language } = useLanguage();
  const trips = getTrips();

  useEffect(() => {
    document.title = t(language, 'index.title');
  }, [language]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col">
      <header className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white py-14 md:py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Plane size={32} className="text-amber-400" />
            <h1 className="text-3xl md:text-5xl font-bold">{t(language, 'index.title')}</h1>
          </div>
          <p className="text-slate-300 text-base md:text-xl">{t(language, 'index.subtitle')}</p>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-10 md:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-8">
          {trips.map((trip) => {
            const accent = trip.accent ?? '#1e3a8a';
            const dayCount = countJournalDays(trip.blocks);
            return (
              <Link key={trip.id} to={`/trips/${trip.id}`} className="group">
                <article className="bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden h-full flex flex-col">
                  <div
                    className="h-36 md:h-44 p-5 md:p-6 flex flex-col justify-end"
                    style={{
                      background: `linear-gradient(135deg, ${accent} 0%, ${accent}cc 60%, #0f172a 100%)`
                    }}
                  >
                    <h2 className="text-xl md:text-2xl font-bold text-white leading-snug">
                      {trip.title}
                    </h2>
                    {trip.subtitle && (
                      <p className="text-white/70 text-xs md:text-sm mt-1 line-clamp-2">
                        {trip.subtitle}
                      </p>
                    )}
                  </div>
                  <div className="p-5 md:p-6 flex-1 flex flex-col">
                    {trip.summary && (
                      <p className="text-sm md:text-base text-slate-600 leading-relaxed flex-1">
                        {trip.summary}
                      </p>
                    )}
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
                      <span className="inline-flex items-center gap-1.5 text-xs md:text-sm text-slate-500">
                        <CalendarDays size={15} />
                        {trip.date}
                        {dayCount > 0 && ` · ${dayCount}${t(language, 'index.days')}`}
                      </span>
                      <span
                        className="inline-flex items-center gap-1 text-xs md:text-sm font-semibold group-hover:gap-2 transition-all"
                        style={{ color: accent }}
                      >
                        {t(language, 'index.view')}
                        <ArrowRight size={15} />
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>
      </main>

      <footer className="bg-slate-900 text-white py-6 md:py-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-slate-200 text-base md:text-lg font-medium">
            {t(language, 'footer.motto')}
          </p>
          <p className="text-xs md:text-sm text-slate-400 mt-2">{t(language, 'footer.note')}</p>
        </div>
      </footer>
    </div>
  );
}
