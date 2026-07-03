import { X, MapPin, Clock, Users, Quote, Footprints } from 'lucide-react';
import { Attraction, L10n, pickL10n } from '../types/content';
import { getAttractionImage } from '../utils/imageService';
import { useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../i18n/translations';

interface AttractionModalProps {
  attraction: Attraction;
  onClose: () => void;
}

export default function AttractionModal({ attraction, onClose }: AttractionModalProps) {
  const { language } = useLanguage();
  const L = (v: L10n | undefined) => pickL10n(language, v);
  const primary = language === 'en' ? attraction.nameEn : attraction.nameCn;
  const secondary = language === 'en' ? attraction.nameCn : attraction.nameEn;

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
    <>
      {/* Viewport-pinned close button, rendered as a SIBLING of the backdrop
          (not a child) — `backdrop-filter` on the backdrop creates a new
          containing block for `position: fixed` descendants in Chromium, so
          a close button nested inside it scrolls away with the content
          instead of staying pinned to the screen. Keeping it outside is what
          makes it reachable regardless of scroll position or mobile browser
          chrome shrinking the visible viewport. */}
      <button
        onClick={onClose}
        aria-label={t(language, 'attractionModal.close')}
        className="fixed top-3 right-3 md:top-5 md:right-5 z-[60] p-2.5 bg-white rounded-full hover:bg-[#f2f4f4] transition-colors"
        style={{ boxShadow: 'var(--shadow-md)' }}
      >
        <X size={18} className="text-[#2d3435]" />
      </button>

      <div
        className="fixed inset-0 z-50 overflow-y-auto p-2 md:p-6 bg-[#2d3435]/60"
        style={{ backdropFilter: 'blur(4px)' }}
        onClick={onClose}
      >
        <div className="min-h-full flex items-start md:items-center justify-center">
        <div
          className="bg-white rounded-lg max-w-3xl w-full my-4 md:my-0"
          style={{ boxShadow: 'var(--shadow-lg)' }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative h-48 sm:h-56 md:h-72 bg-[#f2f4f4] rounded-t-lg overflow-hidden flex-shrink-0">
            <img
              src={getAttractionImage(attraction)}
              alt={primary}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                if (!target.src.includes('data:image')) {
                  target.src =
                    'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="1200" height="800"%3E%3Crect width="1200" height="800" fill="%23f2f4f4"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Georgia, serif" font-size="28" fill="%239aa0a1"%3E' +
                    encodeURIComponent(attraction.nameEn) +
                    '%3C/text%3E%3C/svg%3E';
                }
              }}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#2d3435]/90 to-transparent p-4 md:p-6">
              <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-white mb-0.5">
                {primary}
              </h2>
              <p className="font-display italic text-white/70 text-sm md:text-base">{secondary}</p>
            </div>
          </div>

          <div className="p-5 md:p-8">
          <div className="flex flex-wrap gap-2 mb-5">
            <span className="px-2.5 py-1 rounded bg-[#f5f0e8] text-[#715b37] text-[11px] font-semibold uppercase tracking-wider">
              {L(attraction.type)}
            </span>
            {attraction.historicalPeriod && (
              <span className="px-2.5 py-1 rounded bg-[#f2f4f4] text-[#5a6061] text-[11px] font-medium flex items-center gap-1">
                <Clock size={11} />
                {L(attraction.historicalPeriod)}
              </span>
            )}
          </div>

          {attraction.historicalContext && (
            <div className="mb-5">
              <div className="flex items-center gap-2 mb-2">
                <MapPin size={15} className="text-[#715b37] flex-shrink-0" />
                <h3 className="font-display text-sm md:text-base font-bold text-[#2d3435]">
                  {t(language, 'attractionModal.historicalContext')}
                </h3>
              </div>
              <p className="text-sm md:text-[15px] text-[#5a6061] leading-relaxed">
                {L(attraction.historicalContext)}
              </p>
            </div>
          )}

          {attraction.experience && (
            <div className="mb-5">
              <div className="flex items-center gap-2 mb-2">
                <Footprints size={15} className="text-[#715b37] flex-shrink-0" />
                <h3 className="font-display text-sm md:text-base font-bold text-[#2d3435]">
                  {t(language, 'attractionModal.experience')}
                </h3>
              </div>
              <p className="text-sm md:text-[15px] text-[#5a6061] leading-relaxed">
                {L(attraction.experience)}
              </p>
            </div>
          )}

          {attraction.insight && (
            <div className="mb-5 border-l-2 border-[#715b37] bg-[#f5f0e8]/60 p-4 rounded-r-md">
              <div className="flex items-start gap-2.5">
                <Quote size={15} className="text-[#715b37] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-display text-sm md:text-base font-bold text-[#2d3435] mb-1.5">
                    {t(language, 'attractionModal.insight')}
                  </h3>
                  <p className="font-display italic text-sm md:text-[15px] text-[#2d3435] leading-relaxed">
                    {L(attraction.insight)}
                  </p>
                </div>
              </div>
            </div>
          )}

          {attraction.relatedPeople && attraction.relatedPeople.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2.5">
                <Users size={15} className="text-[#715b37] flex-shrink-0" />
                <h3 className="font-display text-sm md:text-base font-bold text-[#2d3435]">
                  {t(language, 'attractionModal.relatedPeople')}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {attraction.relatedPeople.map((person, index) => (
                  <span
                    key={index}
                    className="px-2.5 py-1.5 bg-[#f2f4f4] text-[#5a6061] rounded-md text-xs font-medium"
                  >
                    {L(person)}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

          <div className="border-t border-[rgba(45,52,53,0.08)] p-3 md:p-4 flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-md text-sm font-medium text-white transition-opacity hover:opacity-90"
              style={{ background: 'linear-gradient(135deg,#715b37,#644f2d)' }}
            >
              {t(language, 'attractionModal.close')}
            </button>
          </div>
        </div>
        </div>
      </div>
    </>
  );
}
