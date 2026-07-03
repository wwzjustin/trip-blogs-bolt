import * as Icons from 'lucide-react';
import { L10n, pickL10n } from '../types/content';
import { useLanguage } from '../contexts/LanguageContext';

interface ListBlockProps {
  title: L10n;
  items: L10n[];
  icon?: string;
}

// Framed principles list — numbered bronze medallions on elevated white.
export default function ListBlock({ title, items, icon }: ListBlockProps) {
  const { language } = useLanguage();
  const IconComponent =
    ((Icons as unknown as Record<string, React.ComponentType<{ className?: string; size?: number }>>)[
      icon ?? ''
    ] as React.ComponentType<{ className?: string; size?: number }> | undefined) ?? Icons.Sparkles;

  return (
    <section className="max-w-3xl mx-auto px-4 py-5 md:py-6">
      <div
        className="bg-white rounded-lg border border-[rgba(45,52,53,0.08)] p-5 md:p-8"
        style={{ boxShadow: 'var(--shadow-sm)' }}
      >
        <h2 className="font-display text-lg md:text-xl font-bold text-[#2d3435] mb-5 flex items-center gap-2.5">
          <IconComponent className="w-4 h-4 md:w-5 md:h-5 text-[#715b37] flex-shrink-0" />
          <span>{pickL10n(language, title)}</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-3 md:p-4 rounded-md bg-[#faf8f4] border border-[#ece4d4]"
            >
              <div className="flex-shrink-0 w-6 h-6 md:w-7 md:h-7 rounded-full text-white flex items-center justify-center font-semibold text-xs md:text-sm"
                style={{ background: 'linear-gradient(135deg,#715b37,#644f2d)' }}
              >
                {index + 1}
              </div>
              <p className="text-xs md:text-sm text-[#5a6061] leading-relaxed pt-0.5">
                {pickL10n(language, item)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
