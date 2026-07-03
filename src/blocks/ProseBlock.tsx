import Markdown from '../components/Markdown';

interface ProseBlockProps {
  title?: string;
  body?: string;
}

// Free-markdown block. Also the FALLBACK renderer for unknown block types:
// it renders whatever `title`/`body` the block carries instead of crashing.
export default function ProseBlock({ title, body }: ProseBlockProps) {
  return (
    <section className="max-w-4xl mx-auto px-4 py-6 md:py-8">
      {title && (
        <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
          <span className="w-1.5 h-6 md:h-7 bg-amber-500 rounded-full flex-shrink-0"></span>
          {title}
        </h2>
      )}
      {body ? (
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 md:p-6">
          <Markdown>{body}</Markdown>
        </div>
      ) : null}
    </section>
  );
}
