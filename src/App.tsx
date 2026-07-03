import { Routes, Route } from 'react-router-dom';
import { Languages } from 'lucide-react';
import TripIndex from './pages/TripIndex';
import TripPage from './pages/TripPage';
import NotFound from './pages/NotFound';
import { useLanguage } from './contexts/LanguageContext';

function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="fixed top-4 right-4 z-40">
      <div className="relative">
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value as 'en' | 'zh')}
          className="appearance-none bg-slate-900/60 backdrop-blur-sm text-white border border-white/20 rounded-lg px-3 py-2 pr-8 text-sm font-medium hover:bg-slate-900/80 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/30"
        >
          <option value="en" className="bg-slate-900 text-white">
            English
          </option>
          <option value="zh" className="bg-slate-900 text-white">
            简体中文
          </option>
        </select>
        <Languages
          size={16}
          className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-white/70"
        />
      </div>
    </div>
  );
}

function App() {
  return (
    <>
      <LanguageToggle />
      <Routes>
        <Route path="/" element={<TripIndex />} />
        <Route path="/trips/:slug" element={<TripPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
