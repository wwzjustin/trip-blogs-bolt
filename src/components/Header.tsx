import { Trip, countJournalDays, pickL10n } from '../types/content';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../i18n/translations';

interface HeaderProps {
  trip: Trip;
}

// Editorial trip hero — surface background, bronze uppercase kicker, serif
// display title, hairline rule. The trip accent appears only as a thin bar.
export default function Header({ trip }: HeaderProps) {
  const { language } = useLanguage();
  const L = (v: Parameters<typeof pickL10n>[1]) => pickL10n(language, v);
  const accent = trip.accent ?? '#715b37';
  const dayCount = countJournalDays(trip.blocks);

  return (
    <div className="bg-[#f9f9f9] border-b border-[rgba(45,52,53,0.08)]">
      <div className="max-w-3xl mx-auto px-4 pt-12 md:pt-20 pb-10 md:pb-14 text-center">
        <div className="flex items-center justify-center gap-3 mb-5">
          <span className="h-px w-8" style={{ background: accent }}></span>
          <span
            className="text-[11px] font-semibold uppercase tracking-[0.25em]"
            style={{ color: accent }}
          >
            {L(trip.date)}
          </span>
          <span className="h-px w-8" style={{ background: accent }}></span>
        </div>

        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#2d3435] leading-tight tracking-tight">
          {L(trip.title)}
        </h1>
        {trip.subtitle && (
          <p className="font-display italic text-sm md:text-lg text-[#5a6061] mt-4 max-w-2xl mx-auto leading-relaxed">
            {L(trip.subtitle)}
          </p>
        )}

        <div className="flex items-center justify-center gap-4 mt-6 text-[11px] md:text-xs text-[#9aa0a1] uppercase tracking-[0.15em]">
          {trip.traveler && (
            <span>
              {t(language, 'header.traveler')} · {trip.traveler}
            </span>
          )}
          {dayCount > 0 && (
            <>
              <span className="w-1 h-1 rounded-full bg-[#c4cbcc]"></span>
              <span>
                {dayCount} {t(language, 'header.days')}
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
