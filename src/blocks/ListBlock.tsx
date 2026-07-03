import * as Icons from 'lucide-react';

interface ListBlockProps {
  title: string;
  items: string[];
  icon?: string;
}

// Short framed principles list (e.g. the trip's core cognitive framework).
export default function ListBlock({ title, items, icon }: ListBlockProps) {
  const IconComponent =
    ((Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[
      icon ?? ''
    ] as React.ComponentType<{ className?: string }> | undefined) ?? Icons.Sparkles;

  return (
    <section className="max-w-4xl mx-auto px-4 py-6 md:py-8">
      <div className="bg-white rounded-xl shadow-lg p-4 md:p-8">
        <h2 className="text-lg md:text-2xl font-bold text-slate-900 mb-4 md:mb-6 flex items-center gap-2">
          <IconComponent className="w-5 h-5 md:w-6 md:h-6 text-amber-500 flex-shrink-0" />
          <span>{title}</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-3 md:p-4 bg-amber-50 rounded-lg border border-amber-200"
            >
              <div className="flex-shrink-0 w-7 h-7 md:w-8 md:h-8 bg-amber-500 text-white rounded-full flex items-center justify-center font-bold text-sm md:text-base">
                {index + 1}
              </div>
              <p className="text-sm md:text-base text-slate-700 pt-0.5 md:pt-1">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
