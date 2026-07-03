import { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { getTrip } from '../content/loadTrips';
import { BlockRenderer } from '../blocks';
import Header from '../components/Header';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../i18n/translations';

// "/trips/:slug" — renders one trip's blocks in order through the registry.
export default function TripPage() {
  const { slug } = useParams<{ slug: string }>();
  const { language } = useLanguage();
  const trip = slug ? getTrip(slug) : undefined;

  useEffect(() => {
    if (trip) document.title = trip.title;
  }, [trip]);

  if (!trip) {
    return <Navigate to="/404" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Header trip={trip} />

      <main className="pb-8">
        {trip.blocks.map((block, index) => (
          <BlockRenderer key={index} block={block} />
        ))}
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
