import { useState } from 'react';
import { Trip, Attraction } from '../types/trip';
import DayCard from './DayCard';
import AttractionModal from './AttractionModal';

interface TimelineProps {
  trip: Trip;
}

export default function Timeline({ trip }: TimelineProps) {
  const [selectedAttraction, setSelectedAttraction] = useState<Attraction | null>(null);

  return (
    <div className="relative py-8 md:py-12">
      <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-amber-600 via-amber-500 to-amber-600 hidden md:block"></div>

      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
        {trip.days.map((day, index) => (
          <DayCard
            key={day.day}
            day={day}
            isLeft={index % 2 === 0}
            onAttractionClick={setSelectedAttraction}
          />
        ))}
      </div>

      {selectedAttraction && (
        <AttractionModal
          attraction={selectedAttraction}
          onClose={() => setSelectedAttraction(null)}
        />
      )}
    </div>
  );
}
