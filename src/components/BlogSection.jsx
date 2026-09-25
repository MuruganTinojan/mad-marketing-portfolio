import React from 'react';
import { useData } from '../context/DataContext';

export default function BlogSection({ onOpenBlog }) {
  const { blogs } = useData();

  // Get only the newest (latest) blog
  const newestBlog = blogs && blogs.length > 0 ? blogs[0] : null;

  const handleOpenAllPublications = () => {
    window.open('/#blogs', '_blank');
  };

  if (!newestBlog) return null;

  return (
    <section id="insights" className="section insights-section">
      <div className="container">
        <div className="section-header">
          <div className="insights-header-top">
            <span className="section-badge">
              <span className="pulse-dot-green"></span> PERSPECTIVES & INSIGHTS
            </span>
            <button
              onClick={handleOpenAllPublications}
              className="view-all-blogs-link-btn"
              aria-label="View all blog articles in new tab"
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
            <div className="featured-blog-media-wrap" onClick={() => onOpenBlog(newestBlog)}>
              <img
                src={newestBlog.image}
                alt={newestBlog.title}
                className="featured-blog-img"
                loading="lazy"
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
                  <i className="fa-regular fa-calendar"></i> {newestBlog.date}
                </span>
                <span className="blog-meta-dot">&bull;</span>
                <span className="blog-read-time">
                  <i className="fa-regular fa-clock"></i> {newestBlog.readTime}
                </span>
              </div>

              <h3
                className="featured-blog-title"
                onClick={() => onOpenBlog(newestBlog)}
              >
                {newestBlog.title}
              </h3>

              <p className="featured-blog-excerpt">{newestBlog.excerpt}</p>

              {/* Author & Capability Tags */}
              <div className="featured-blog-bottom-row">
                <div className="featured-author-box">
                  <img
                    src="./assets/mad_logo.png"
                    alt={newestBlog.author}
                    className="featured-author-avatar"
                  />
                  <div className="featured-author-info">
                    <span className="author-name">{newestBlog.author}</span>
                    <span className="author-label">Verified Contribution</span>
                  </div>
                </div>

                <div className="featured-blog-cta-group">
                  <button
                    className="btn btn-secondary btn-read-article"
                    onClick={() => onOpenBlog(newestBlog)}
                  >
                    Read Story <i className="fa-solid fa-arrow-up-right-from-square"></i>
                  </button>
                  <button
                    className="btn btn-gradient btn-view-all"
                    onClick={handleOpenAllPublications}
                  >
                    All Publications ({blogs.length}) <i className="fa-solid fa-arrow-up-right-from-square" style={{ fontSize: '12px' }}></i>
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
