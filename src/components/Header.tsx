import { Trip } from '../types/trip';
import { Plane } from 'lucide-react';

interface HeaderProps {
  trip: Trip;
}

export default function Header({ trip }: HeaderProps) {
  return (
    <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-center mb-4">
          <Plane size={32} className="mr-3" />
          <h1 className="text-4xl md:text-5xl font-bold text-center">{trip.title}</h1>
        </div>
        <p className="text-blue-200 text-center text-lg mb-2">{trip.subtitle}</p>
        <div className="flex items-center justify-center space-x-4 text-sm text-blue-300">
          <span>{trip.date}</span>
          <span>·</span>
          <span>旅行者：{trip.traveler}</span>
          <span>·</span>
          <span>{trip.days.length}天行程</span>
        </div>
      </div>
    </div>
  );
}
