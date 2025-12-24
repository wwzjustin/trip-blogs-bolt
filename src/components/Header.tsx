import { Trip } from '../types/trip';
import { Plane } from 'lucide-react';

interface HeaderProps {
  trip: Trip;
}

export default function Header({ trip }: HeaderProps) {
  return (
    <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white py-8 md:py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-center mb-3 md:mb-4">
          <Plane size={28} className="mr-2 md:mr-3 flex-shrink-0" />
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-center">{trip.title}</h1>
        </div>
        <p className="text-blue-200 text-center text-base md:text-lg mb-3 md:mb-2 px-2">{trip.subtitle}</p>
        <div className="flex flex-col sm:flex-row items-center justify-center sm:space-x-4 space-y-1 sm:space-y-0 text-xs sm:text-sm text-blue-300">
          <span>{trip.date}</span>
          <span className="hidden sm:inline">·</span>
          <span>旅行者：{trip.traveler}</span>
          <span className="hidden sm:inline">·</span>
          <span>{trip.days.length}天行程</span>
        </div>
      </div>
    </div>
  );
}
