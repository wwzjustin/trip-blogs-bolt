import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getTrips } from '../content/loadTrips';
import { countJournalDays, pickL10n } from '../types/content';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../i18n/translations';

// "/" — one editorial card per trip, auto-discovered from content/trips/*.json.
export default function TripIndex() {
  const { language } = useLanguage();
  const L = (v: Parameters<typeof pickL10n>[1]) => pickL10n(language, v);
  const trips = getTrips();

  useEffect(() => {
    document.title = t(language, 'index.title');
  }, [language]);

  return (
    <div>
      <header className="text-center pt-14 md:pt-24 pb-10 md:pb-16 px-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#715b37] mb-4">
          {t(language, 'index.kicker')}
        </p>
        <h1 className="font-display text-4xl md:text-6xl font-bold text-[#2d3435] tracking-tight">
          {t(language, 'index.title')}
        </h1>
        <p className="font-display italic text-sm md:text-lg text-[#5a6061] mt-4">
          {t(language, 'index.subtitle')}
        </p>
      </header>

      <main className="max-w-4xl mx-auto w-full px-4 pb-16 md:pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-7">
          {trips.map((trip) => {
            const accent = trip.accent ?? '#715b37';
            const dayCount = countJournalDays(trip.blocks);
            return (
              <Link key={trip.id} to={`/trips/${trip.id}`} className="group">
                <article
                  className="bg-white rounded-lg border border-[rgba(45,52,53,0.08)] overflow-hidden h-full flex flex-col transition-all duration-300 hover:-translate-y-0.5"
                  style={{ boxShadow: 'var(--shadow-sm)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.boxShadow = 'var(--shadow-lg)')}
                  onMouseLeave={(e) => (e.currentTarget.style.boxShadow = 'var(--shadow-sm)')}
                >
                  <div className="h-1" style={{ background: accent }}></div>
                  <div className="p-6 md:p-8 flex-1 flex flex-col">
                    <p
                      className="text-[10px] font-semibold uppercase tracking-[0.25em] mb-3"
                      style={{ color: accent }}
                    >
                      {L(trip.date)}
                      {dayCount > 0 && ` · ${dayCount} ${t(language, 'index.days')}`}
                    </p>
                    <h2 className="font-display text-xl md:text-2xl font-bold text-[#2d3435] leading-snug">
                      {L(trip.title)}
                    </h2>
                    {trip.subtitle && (
                      <p className="font-display italic text-xs md:text-sm text-[#9aa0a1] mt-2 line-clamp-2">
                        {L(trip.subtitle)}
                      </p>
                    )}
                    {trip.summary && (
                      <p className="text-xs md:text-sm text-[#5a6061] leading-relaxed mt-4 flex-1">
                        {L(trip.summary)}
                      </p>
                    )}
                    <div className="flex items-center gap-1.5 mt-6 pt-4 border-t border-[rgba(45,52,53,0.06)]">
                      <span className="text-xs font-semibold text-[#715b37] group-hover:text-[#4e3f27] transition-colors">
                        {t(language, 'index.view')}
                      </span>
                      <ArrowRight
                        size={13}
                        className="text-[#715b37] group-hover:translate-x-0.5 transition-transform"
                      />
                    </div>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}
