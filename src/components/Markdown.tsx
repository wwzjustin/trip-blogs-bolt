import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownProps {
  children: string;
}

// Shared markdown renderer styled to match the site's slate/amber language.
// GFM enabled so tables, strikethrough and task lists inside raw notes render.
export default function Markdown({ children }: MarkdownProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => (
          <h3 className="text-xl md:text-2xl font-bold text-slate-900 mt-6 mb-3">{children}</h3>
        ),
        h2: ({ children }) => (
          <h3 className="text-lg md:text-xl font-bold text-slate-900 mt-6 mb-3">{children}</h3>
        ),
        h3: ({ children }) => (
          <h4 className="text-base md:text-lg font-bold text-slate-900 mt-5 mb-2">{children}</h4>
        ),
        h4: ({ children }) => (
          <h5 className="text-sm md:text-base font-bold text-slate-800 mt-4 mb-2">{children}</h5>
        ),
        p: ({ children }) => (
          <p className="text-sm md:text-base text-slate-700 leading-relaxed mb-3">{children}</p>
        ),
        strong: ({ children }) => (
          <strong className="font-semibold text-slate-900">{children}</strong>
        ),
        a: ({ href, children }) => (
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="text-blue-800 underline decoration-blue-300 hover:decoration-blue-800"
          >
            {children}
          </a>
        ),
        ul: ({ children }) => (
          <ul className="list-disc pl-5 md:pl-6 space-y-1.5 mb-3 text-sm md:text-base text-slate-700">
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal pl-5 md:pl-6 space-y-1.5 mb-3 text-sm md:text-base text-slate-700">
            {children}
          </ol>
        ),
        li: ({ children }) => <li className="leading-relaxed">{children}</li>,
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-amber-500 bg-amber-50 px-4 py-2 rounded-r-lg my-4 italic text-slate-800">
            {children}
          </blockquote>
        ),
        hr: () => <hr className="my-6 border-slate-200" />,
        table: ({ children }) => (
          <div className="overflow-x-auto rounded-lg border border-slate-200 my-4">
            <table className="w-full border-collapse text-xs md:text-sm">{children}</table>
          </div>
        ),
        thead: ({ children }) => <thead className="bg-slate-100">{children}</thead>,
        th: ({ children }) => (
          <th className="p-2 md:p-3 text-left font-semibold text-slate-800 border-b border-slate-300 whitespace-nowrap">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="p-2 md:p-3 text-slate-700 border-b border-slate-200 align-top">
            {children}
          </td>
        ),
        code: ({ children }) => (
          <code className="bg-slate-100 text-slate-800 rounded px-1.5 py-0.5 text-xs md:text-sm">
            {children}
          </code>
        ),
        img: ({ src, alt }) => (
          <img src={src} alt={alt ?? ''} className="max-w-full rounded-lg my-4" loading="lazy" />
        ),
      }}
    >
      {children}
    </ReactMarkdown>
  );
}
