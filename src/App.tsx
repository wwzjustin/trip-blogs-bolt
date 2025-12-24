import { useState } from 'react';
import Header from './components/Header';
import TripTabs from './components/TripTabs';
import { HistoricalOverview } from './components/HistoricalOverview';
import Timeline from './components/Timeline';
import { ReflectionSection } from './components/ReflectionSection';
import { ukTrip } from './data/ukTripData';

function App() {
  const [currentTripId] = useState('uk-2024');

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Header trip={ukTrip} />
      <TripTabs
        currentTripId={currentTripId}
        onTripChange={() => {}}
      />
      <HistoricalOverview />
      <Timeline trip={ukTrip} />
      <ReflectionSection />

      <footer className="bg-slate-900 text-white py-6 md:py-8 mt-8 md:mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-200 text-base md:text-lg font-medium">
            这不是旅游，而是文明的田野调查
          </p>
          <p className="text-xs md:text-sm text-slate-400 mt-2 px-2">
            &copy; 2024 Justin的旅行回忆 · 通过上传markdown文件添加更多旅行
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
