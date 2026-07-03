import { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { getTrip } from '../content/loadTrips';
import { pickL10n } from '../types/content';
import { BlockRenderer } from '../blocks';
import Header from '../components/Header';
import { useLanguage } from '../contexts/LanguageContext';

// "/trips/:slug" — renders one trip's blocks in order through the registry.
export default function TripPage() {
  const { slug } = useParams<{ slug: string }>();
  const { language } = useLanguage();
  const trip = slug ? getTrip(slug) : undefined;

  useEffect(() => {
    if (trip) document.title = pickL10n(language, trip.title);
  }, [trip, language]);

  if (!trip) {
    return <Navigate to="/404" replace />;
  }

  return (
    <div>
      <Header trip={trip} />
      <main className="pb-12 md:pb-20">
        {trip.blocks.map((block, index) => (
          <BlockRenderer key={index} block={block} />
        ))}
      </main>
    </div>
  );
}
