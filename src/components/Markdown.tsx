import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownProps {
  children: string;
}

// Shared markdown renderer — "Digital Curator" palette: ink text, bronze
// accents, hairline borders. GFM enabled for tables in raw notes.
export default function Markdown({ children }: MarkdownProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => (
          <h3 className="font-display text-xl md:text-2xl font-bold text-[#2d3435] mt-6 mb-3">{children}</h3>
        ),
        h2: ({ children }) => (
          <h3 className="font-display text-lg md:text-xl font-bold text-[#2d3435] mt-6 mb-3">{children}</h3>
        ),
        h3: ({ children }) => (
          <h4 className="font-display text-base md:text-lg font-bold text-[#2d3435] mt-5 mb-2">{children}</h4>
        ),
        h4: ({ children }) => (
          <h5 className="text-sm md:text-base font-bold text-[#2d3435] mt-4 mb-2">{children}</h5>
        ),
        p: ({ children }) => (
          <p className="text-sm md:text-[15px] text-[#5a6061] leading-relaxed mb-3">{children}</p>
        ),
        strong: ({ children }) => (
          <strong className="font-semibold text-[#2d3435]">{children}</strong>
        ),
        a: ({ href, children }) => (
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="text-[#715b37] underline decoration-[#d8cbb2] underline-offset-2 hover:decoration-[#715b37]"
          >
            {children}
          </a>
        ),
        ul: ({ children }) => (
          <ul className="list-disc pl-5 md:pl-6 space-y-1.5 mb-3 text-sm md:text-[15px] text-[#5a6061]">
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal pl-5 md:pl-6 space-y-1.5 mb-3 text-sm md:text-[15px] text-[#5a6061]">
            {children}
          </ol>
        ),
        li: ({ children }) => <li className="leading-relaxed">{children}</li>,
        blockquote: ({ children }) => (
          <blockquote className="border-l-2 border-[#715b37] bg-[#f5f0e8]/60 px-4 py-2 rounded-r-md my-4 font-display italic text-[#2d3435]">
            {children}
          </blockquote>
        ),
        hr: () => <hr className="my-6 border-[rgba(45,52,53,0.08)]" />,
        table: ({ children }) => (
          <div className="overflow-x-auto rounded-md border border-[rgba(45,52,53,0.08)] my-4">
            <table className="w-full border-collapse text-xs md:text-sm">{children}</table>
          </div>
        ),
        thead: ({ children }) => <thead className="bg-[#f2f4f4]">{children}</thead>,
        th: ({ children }) => (
          <th className="p-2 md:p-3 text-left font-semibold text-[#2d3435] border-b border-[rgba(45,52,53,0.12)] whitespace-nowrap">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="p-2 md:p-3 text-[#5a6061] border-b border-[rgba(45,52,53,0.06)] align-top">
            {children}
          </td>
        ),
        code: ({ children }) => (
          <code className="bg-[#f2f4f4] text-[#2d3435] rounded px-1.5 py-0.5 text-xs md:text-sm">
            {children}
          </code>
        ),
        img: ({ src, alt }) => (
          <img src={src} alt={alt ?? ''} className="max-w-full rounded-md my-4" loading="lazy" />
        ),
      }}
    >
      {children}
    </ReactMarkdown>
  );
}
