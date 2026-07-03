import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Languages } from 'lucide-react';
import TripIndex from './pages/TripIndex';
import TripPage from './pages/TripPage';
import NotFound from './pages/NotFound';
import { useLanguage } from './contexts/LanguageContext';
import { t } from './i18n/translations';

// Glass sticky nav — ArtStory "Digital Curator" idiom: serif wordmark,
// hairline border, blur backdrop, quiet controls.
function TopNav() {
  const { language, setLanguage } = useLanguage();
  const location = useLocation();
  const onTripPage = location.pathname.startsWith('/trips/');

  return (
    <header
      className="sticky top-0 z-50 bg-white/90 border-b border-[rgba(45,52,53,0.08)]"
      style={{ backdropFilter: 'blur(20px)' }}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="font-display text-lg font-semibold tracking-tight text-[#2d3435]">
            {t(language, 'nav.wordmark')}
          </span>
          {onTripPage && (
            <span className="hidden sm:inline text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9aa0a1] border border-[rgba(45,52,53,0.12)] rounded-full px-2 py-0.5">
              {t(language, 'nav.journal')}
            </span>
          )}
        </Link>

        <div className="flex items-center gap-2">
          {onTripPage && (
            <Link
              to="/"
              className="text-xs font-medium text-[#5a6061] hover:text-[#2d3435] transition-colors px-2 py-1.5"
            >
              {t(language, 'header.backToTrips')}
            </Link>
          )}
          <div className="relative">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as 'en' | 'zh')}
              className="appearance-none bg-transparent border border-[rgba(45,52,53,0.12)] rounded-md pl-3 pr-8 py-1.5 text-xs font-medium text-[#2d3435] hover:border-[rgba(45,52,53,0.3)] transition-colors cursor-pointer focus:outline-none"
            >
              <option value="en">English</option>
              <option value="zh">中文</option>
            </select>
            <Languages
              size={13}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#9aa0a1]"
            />
          </div>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  const { language } = useLanguage();
  return (
    <footer className="border-t border-[rgba(45,52,53,0.08)] bg-white">
      <div className="max-w-5xl mx-auto px-4 py-8 md:py-10 text-center">
        <p className="font-display text-sm md:text-base text-[#2d3435] italic">
          {t(language, 'footer.motto')}
        </p>
        <p className="text-[11px] md:text-xs text-[#9aa0a1] mt-2">{t(language, 'footer.note')}</p>
      </div>
    </footer>
  );
}

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f9f9f9]">
      <TopNav />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<TripIndex />} />
          <Route path="/trips/:slug" element={<TripPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
