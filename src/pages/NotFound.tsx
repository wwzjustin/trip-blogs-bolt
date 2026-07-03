import { Link } from 'react-router-dom';
import { Compass } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../i18n/translations';

export default function NotFound() {
  const { language } = useLanguage();

  return (
    <div className="flex items-center justify-center px-4 py-24 md:py-40">
      <div className="text-center">
        <Compass size={48} className="mx-auto text-[#c4cbcc] mb-5" strokeWidth={1.25} />
        <h1 className="font-display text-2xl md:text-3xl font-bold text-[#2d3435] mb-2">
          {t(language, 'notFound.title')}
        </h1>
        <p className="text-sm text-[#5a6061] mb-8">{t(language, 'notFound.text')}</p>
        <Link
          to="/"
          className="inline-block px-5 py-2.5 rounded-md text-sm font-medium text-white transition-opacity hover:opacity-90"
          style={{ background: 'linear-gradient(135deg,#715b37,#644f2d)' }}
        >
          {t(language, 'notFound.backHome')}
        </Link>
      </div>
    </div>
  );
}
