import { Link } from 'react-router-dom';
import { Compass } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../i18n/translations';

export default function NotFound() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <div className="text-center">
        <Compass size={56} className="mx-auto text-slate-300 mb-4" />
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
          {t(language, 'notFound.title')}
        </h1>
        <p className="text-slate-600 mb-6">{t(language, 'notFound.text')}</p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors font-medium"
        >
          {t(language, 'notFound.backHome')}
        </Link>
      </div>
    </div>
  );
}
