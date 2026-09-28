import React from 'react';

/**
 * Safely parse inline text containing **bold** markup into React nodes.
 * Avoids dangerouslySetInnerHTML and protects against XSS.
 */
export function renderFormattedText(text) {
  if (!text) return null;
  if (typeof text !== 'string') return String(text);

  // Split by **bold** delimiters
  const parts = text.split(/(\*\*[^*]+?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**') && part.length >= 4) {
      const inner = part.slice(2, -2);
      return <strong key={index} className="font-semibold text-white">{inner}</strong>;
    }
    return part;
  });
}

/**
 * Render a list block from newline-separated or bullet-separated text
 */
export function renderPointsBlock(pointsText) {
  if (!pointsText) return null;
  
  // Split on newlines or bullet patterns
  const lines = pointsText
    .split(/\r?\n|(?=\*\*)/g)
    .map(line => line.trim())
    .filter(line => line.length > 0 && line !== '-');

  if (lines.length === 0) return null;

  return (
    <ul className="blog-points-list my-4 space-y-2 pl-4">
      {lines.map((item, idx) => {
        // Strip leading hyphen, asterisk, or bullet
        const cleanItem = item.replace(/^[-•*]\s*/, '').trim();
        if (!cleanItem) return null;
        return (
          <li key={idx} className="blog-point-item flex items-start gap-3 text-slate-300">
            <span className="blog-point-bullet text-amber-400 mt-1 flex-shrink-0" aria-hidden="true">
              ✦
            </span>
            <span className="blog-point-text flex-1">
              {renderFormattedText(cleanItem)}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

/**
 * Comprehensive parser for legacy MAD Marketing blog structure
 * Handles:
 * - subheading-N (with typo tolerance, e.g. suubheading-N)
 * - content-N
 * - content-N-2
 * - content-N-points
 * - content-N-upper
 * - highlight
 * - Fallback standard 'content' markdown
 */
export function renderBlogContent(blog) {
  if (!blog) return null;

  // Determine if this is a numbered structure or single-content structure
  // Look for any keys matching subheading-\d+ or content-\d+
  const keys = Object.keys(blog);
  const numberedIndices = new Set();
  
  const numRegex = /(?:subheading|suubheading|content)-(\d+)/i;
  keys.forEach((key) => {
    const match = key.match(numRegex);
    if (match) {
      numberedIndices.add(parseInt(match[1], 10));
    }
  });

  const sortedIndices = Array.from(numberedIndices).sort((a, b) => a - b);

  // If we have numbered sections, render them systematically
  if (sortedIndices.length > 0) {
    return (
      <div className="blog-article-body space-y-8">
        {sortedIndices.map((idx) => {
          const subheading = blog[`subheading-${idx}`] || blog[`suubheading-${idx}`];
          const content = blog[`content-${idx}`];
          const content2 = blog[`content-${idx}-2`];
          const points = blog[`content-${idx}-points`];
          const upper = blog[`content-${idx}-upper`];

          const hasContent = subheading || content || content2 || points || upper;
          if (!hasContent) return null;

          return (
            <section key={idx} className="blog-section-block my-6">
              {subheading && (
                <h2 className="blog-heading-2 text-xl md:text-2xl font-bold text-white tracking-tight mt-8 mb-4 border-l-2 border-amber-400 pl-4">
                  {renderFormattedText(subheading.trim())}
                </h2>
              )}

              {upper && (
                <div className="blog-upper-text text-base md:text-lg text-slate-200 mb-3 italic">
                  {renderFormattedText(upper.trim())}
                </div>
              )}

              {content && (
                <p className="blog-paragraph text-slate-300 text-base md:text-lg leading-relaxed mb-4">
                  {renderFormattedText(content.trim())}
                </p>
              )}

              {points && renderPointsBlock(points)}

              {content2 && (
                <p className="blog-paragraph text-slate-300 text-base md:text-lg leading-relaxed mt-4">
                  {renderFormattedText(content2.trim())}
                </p>
              )}
            </section>
          );
        })}

        {blog.highlight && (
          <aside className="blog-highlight-box my-10 p-6 md:p-8 rounded-2xl border border-amber-400/30 bg-gradient-to-br from-amber-500/10 via-black/40 to-transparent backdrop-blur-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none"></div>
            <div className="flex items-start gap-4">
              <span className="text-2xl md:text-3xl text-amber-400" aria-hidden="true">💡</span>
              <div className="text-amber-100 font-medium text-base md:text-lg leading-relaxed">
                {renderFormattedText(blog.highlight.trim())}
              </div>
            </div>
          </aside>
        )}
      </div>
    );
  }

  // Fallback: Standard Markdown / Paragraph Content
  if (blog.content) {
    const rawContent = String(blog.content);
    const sections = rawContent.split(/\n\n+/);

    return (
      <div className="blog-article-body space-y-6">
        {sections.map((sec, i) => {
          const trimmed = sec.trim();
          if (!trimmed) return null;

          // H3 Heading (### Title)
          if (trimmed.startsWith('### ')) {
            return (
              <h3 key={i} className="blog-heading-3 text-lg md:text-xl font-bold text-white mt-8 mb-3 border-l-2 border-amber-400 pl-3">
                {renderFormattedText(trimmed.replace(/^###\s+/, ''))}
              </h3>
            );
          }

          // H2 Heading (## Title)
          if (trimmed.startsWith('## ')) {
            return (
              <h2 key={i} className="blog-heading-2 text-xl md:text-2xl font-bold text-white mt-8 mb-4 border-l-2 border-amber-400 pl-4">
                {renderFormattedText(trimmed.replace(/^##\s+/, ''))}
              </h2>
            );
          }

          // Bullet List block (starts with - or 1.)
          if (trimmed.startsWith('- ') || /^\d+\.\s/.test(trimmed)) {
            const listItems = trimmed.split(/\n+/);
            return (
              <ul key={i} className="blog-points-list my-4 space-y-2 pl-4">
                {listItems.map((item, j) => {
                  const cleaned = item.replace(/^(?:-\s+|\d+\.\s+)/, '').trim();
                  return (
                    <li key={j} className="blog-point-item flex items-start gap-3 text-slate-300">
                      <span className="blog-point-bullet text-amber-400 mt-1 flex-shrink-0" aria-hidden="true">✦</span>
                      <span className="blog-point-text flex-1">
                        {renderFormattedText(cleaned)}
                      </span>
                    </li>
                  );
                })}
              </ul>
            );
          }

          // Standard paragraph
          return (
            <p key={i} className="blog-paragraph text-slate-300 text-base md:text-lg leading-relaxed">
              {renderFormattedText(trimmed)}
            </p>
          );
        })}

        {blog.highlight && (
          <aside className="blog-highlight-box my-10 p-6 md:p-8 rounded-2xl border border-amber-400/30 bg-gradient-to-br from-amber-500/10 via-black/40 to-transparent backdrop-blur-sm">
            <div className="flex items-start gap-4">
              <span className="text-2xl md:text-3xl text-amber-400" aria-hidden="true">💡</span>
              <div className="text-amber-100 font-medium text-base md:text-lg leading-relaxed">
                {renderFormattedText(blog.highlight.trim())}
              </div>
            </div>
          </aside>
        )}
      </div>
    );
  }

  return (
    <p className="text-slate-400 italic">No content available for this article.</p>
  );
}
