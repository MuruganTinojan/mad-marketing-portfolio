import React from 'react';
import { useData } from '../context/DataContext';
import { getBlogSlug } from '../utils/slugify';

const FALLBACK_THUMB = 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop';

export default function BlogSection({ onOpenBlog, onOpenArchive }) {
  const { blogs } = useData();

  // Get only the newest (latest) blog
  const newestBlog = blogs && blogs.length > 0 ? blogs[0] : null;

  if (!newestBlog) return null;

  const imageSrc = newestBlog.img || newestBlog.image || FALLBACK_THUMB;
  const pubDate = newestBlog.publishDate || newestBlog.date || 'Recent';
  const readTime = newestBlog.readTime || '4 min read';
  const excerptText =
    newestBlog.metaDescription ||
    newestBlog.excerpt ||
    newestBlog['content-1'] ||
    "Discover how strategic engineering and audience resonance accelerate digital growth.";

  const handleOpenBlog = () => {
    if (onOpenBlog) {
      onOpenBlog(newestBlog);
    } else {
      const slug = getBlogSlug(newestBlog);
      window.location.pathname = `/blog/${slug}`;
    }
  };

  const handleOpenArchive = () => {
    if (onOpenArchive) {
      onOpenArchive();
    } else {
      window.location.hash = '#blogs';
    }
  };

  return (
    <section id="insights" className="section insights-section">
      <div className="container">
        <div className="section-header">
          <div className="insights-header-top">
            <span className="section-badge">
              <span className="pulse-dot-green"></span> PERSPECTIVES & INSIGHTS
            </span>
            <button
              onClick={handleOpenArchive}
              className="view-all-blogs-link-btn"
              aria-label="View all blog articles"
            >
              <span>Explore All Articles</span>
              <span className="blogs-count-badge">{blogs.length}</span>
              <i className="fa-solid fa-arrow-up-right-from-square" style={{ fontSize: '11px' }}></i>
            </button>
          </div>

          <h2 className="section-heading">
            Thought leadership forged from{' '}
            <span className="gradient-text">Production Trenches.</span>
          </h2>
          <p className="section-body-lead">
            We don't publish theories. Our articles share architectural audits, audience research methodologies, and performance breakthroughs from live client deployments.
          </p>
        </div>

        {/* Featured Newest Blog Showcase Card */}
        <div className="featured-blog-card">
          <div className="featured-blog-grid">
            {/* Left: Image Container */}
            <div
              className="featured-blog-media-wrap"
              onClick={handleOpenBlog}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') handleOpenBlog();
              }}
              aria-label={`Read ${newestBlog.title}`}
            >
              <img
                src={imageSrc}
                alt={newestBlog.title}
                className="featured-blog-img"
                loading="lazy"
                onError={(e) => {
                  e.target.src = FALLBACK_THUMB;
                }}
              />
              <div className="featured-blog-img-overlay">
                <span className="read-overlay-badge">
                  <i className="fa-solid fa-book-open-reader"></i> Read Full Story
                </span>
              </div>
              <span className="featured-badge-pill">NEWEST PUBLICATION</span>
            </div>

            {/* Right: Content Info */}
            <div className="featured-blog-content">
              <div className="featured-blog-meta">
                <span className="blog-category-tag">{newestBlog.category}</span>
                <span className="blog-meta-dot">&bull;</span>
                <span className="blog-date">
                  <i className="fa-regular fa-calendar"></i> {pubDate}
                </span>
                <span className="blog-meta-dot">&bull;</span>
                <span className="blog-read-time">
                  <i className="fa-regular fa-clock"></i> {readTime}
                </span>
              </div>

              <h3
                className="featured-blog-title"
                onClick={handleOpenBlog}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') handleOpenBlog();
                }}
              >
                {newestBlog.title}
              </h3>

              <p className="featured-blog-excerpt">
                {typeof excerptText === 'string' && excerptText.length > 220
                  ? excerptText.substring(0, 220) + '...'
                  : excerptText}
              </p>

              {/* Author & Capability Tags */}
              <div className="featured-blog-bottom-row">
                <div className="featured-author-box">
                  <img
                    src="./assets/mad_logo.png"
                    alt="MAD Marketing"
                    className="featured-author-avatar"
                  />
                  <div className="featured-author-info">
                    <span className="author-name">MAD Editorial Core</span>
                    <span className="author-label">Verified Contribution</span>
                  </div>
                </div>

                <div className="featured-blog-cta-group">
                  <button
                    className="btn btn-secondary btn-read-article"
                    onClick={handleOpenBlog}
                  >
                    Read Story <i className="fa-solid fa-arrow-right"></i>
                  </button>
                  <button
                    className="btn btn-gradient btn-view-all"
                    onClick={handleOpenArchive}
                  >
                    All Publications ({blogs.length}){' '}
                    <i className="fa-solid fa-arrow-up-right-from-square" style={{ fontSize: '12px' }}></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
