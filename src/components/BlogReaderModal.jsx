import React, { useEffect } from 'react';

export default function BlogReaderModal({ blog, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!blog) return null;

  return (
    <div
      className="modal-overlay active"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={blog.title}
    >
      <div
        className="modal-dialog modal-blog-reader"
        style={{ maxWidth: '840px', maxHeight: '90vh' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close-btn" onClick={onClose} aria-label="Close article">
          <i className="fa-solid fa-xmark"></i>
        </button>

        <div className="modal-content-body blog-reader-body">
          {/* Header Image */}
          <div className="blog-reader-hero-img-wrap">
            <img src={blog.image} alt={blog.title} className="blog-reader-hero-img" />
            <div className="blog-reader-category-badge">{blog.category}</div>
          </div>

          <div className="blog-reader-meta-bar">
            <div className="blog-reader-author-info">
              <img
                src={blog.authorAvatar || '/assets/mad_logo.png'}
                alt={blog.author}
                className="blog-author-avatar-small"
              />
              <div>
                <span className="blog-author-name">{blog.author}</span>
                <span className="blog-date-text">
                  {blog.date} &bull; {blog.readTime}
                </span>
              </div>
            </div>
          </div>

          <h1 className="blog-reader-title">{blog.title}</h1>

          <div className="blog-reader-lead-box">
            <p>{blog.excerpt}</p>
          </div>

          {/* Formatted Article Body */}
          <div className="blog-reader-prose">
            {blog.content.split('\n\n').map((paragraph, idx) => {
              if (paragraph.startsWith('### ')) {
                return (
                  <h3 key={idx} className="blog-prose-h3">
                    {paragraph.replace('### ', '')}
                  </h3>
                );
              }
              if (paragraph.startsWith('- ')) {
                const listItems = paragraph.split('\n').map((item) => item.replace(/^- /, ''));
                return (
                  <ul key={idx} className="blog-prose-list">
                    {listItems.map((li, i) => {
                      const cleanText = li.replace(/\*\*(.*?)\*\*/g, '$1');
                      return <li key={i}>{cleanText}</li>;
                    })}
                  </ul>
                );
              }
              if (paragraph.match(/^\d\./)) {
                const listItems = paragraph.split('\n').map((item) => item.replace(/^\d+\.\s*/, ''));
                return (
                  <ol key={idx} className="blog-prose-ordered-list">
                    {listItems.map((li, i) => (
                      <li key={i}>{li.replace(/\*\*(.*?)\*\*/g, '$1')}</li>
                    ))}
                  </ol>
                );
              }
              return (
                <p key={idx} className="blog-prose-paragraph">
                  {paragraph.replace(/\*\*(.*?)\*\*/g, '$1')}
                </p>
              );
            })}
          </div>

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="blog-reader-tags-wrap">
              <span className="tags-label">Tags:</span>
              <div className="tags-pill-list">
                {blog.tags.map((tag, idx) => (
                  <span key={idx} className="blog-tag-pill">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="blog-reader-footer-actions">
            <button className="btn btn-secondary" onClick={onClose}>
              <i className="fa-solid fa-arrow-left"></i> Back
            </button>
            <a
              href="#contact"
              className="btn btn-gradient"
              onClick={() => {
                onClose();
                window.location.hash = '#contact';
              }}
            >
              Discuss With Our Team <i className="fa-solid fa-arrow-right"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
