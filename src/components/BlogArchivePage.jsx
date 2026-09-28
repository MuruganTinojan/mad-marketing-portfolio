import React, { useState, useMemo, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { getBlogSlug } from '../utils/slugify';
import Footer from './Footer';

const FIXED_CATEGORIES = ['All', 'Web', 'SEO', 'UX', 'Marketing', 'Design'];
const FALLBACK_THUMB = 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop';

export default function BlogArchivePage({ onBackToHome, onOpenBlog }) {
  const { blogs } = useData();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Scroll to top on mount and set page title
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const originalTitle = document.title;
    document.title = 'Publications & Strategic Insights | MAD Marketing';
    return () => {
      document.title = originalTitle;
    };
  }, []);

  // Filtered blogs based on Category & Search Query
  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const matchesCat =
        selectedCategory === 'All' ||
        (blog.category && blog.category.toLowerCase() === selectedCategory.toLowerCase());

      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesCat;

      const titleMatch = blog.title && blog.title.toLowerCase().includes(q);
      const excerptMatch =
        (blog.excerpt && blog.excerpt.toLowerCase().includes(q)) ||
        (blog.metaDescription && blog.metaDescription.toLowerCase().includes(q));
      const keywordMatch =
        (blog.targetKeywords && blog.targetKeywords.toLowerCase().includes(q)) ||
        (blog.tags && blog.tags.some((t) => t.toLowerCase().includes(q)));
      const contentMatch =
        blog.content && typeof blog.content === 'string' && blog.content.toLowerCase().includes(q);

      return matchesCat && (titleMatch || excerptMatch || keywordMatch || contentMatch);
    });
  }, [blogs, selectedCategory, searchQuery]);

  return (
    <div className="blog-archive-page">
      {/* Top Header */}
      <header className="archive-navbar">
        <div className="archive-nav-container">
          <div className="archive-nav-left">
            <button
              className="btn-archive-back"
              onClick={onBackToHome}
              aria-label="Back to main portfolio"
            >
              <i className="fa-solid fa-arrow-left"></i> Back to Portfolio
            </button>
            <div className="archive-logo-divider"></div>
            <a
              href="#why-mad"
              onClick={(e) => {
                e.preventDefault();
                onBackToHome();
              }}
              className="archive-brand-link"
            >
              <img src="./assets/mad_logo.png" alt="MAD Marketing" className="archive-nav-logo" />
            </a>
          </div>

          <div className="archive-nav-right">
            <span className="archive-publications-count-badge">
              <i className="fa-solid fa-book-open"></i> {blogs.length} Articles
            </span>
          </div>
        </div>
      </header>

      {/* Hero Header */}
      <div className="archive-hero-section">
        <div className="container">
          <span className="section-badge">EDITORIAL & RESEARCH</span>
          <h1 className="archive-hero-title">
            Perspectives, Case Breakdowns &{' '}
            <span className="gradient-text">Engineering Insights</span>
          </h1>
          <p className="archive-hero-subtitle">
            Exploring the intersection of modern web architecture, local search dominance, high-conversion UX, and performance marketing in Sri Lanka and regional markets.
          </p>

          {/* Search & Filter Controls Bar */}
          <div className="archive-controls-bar">
            {/* Search Input */}
            <div className="archive-search-box">
              <i className="fa-solid fa-magnifying-glass search-icon" aria-hidden="true"></i>
              <input
                type="text"
                className="archive-search-input"
                placeholder="Search articles by title, keywords, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search articles"
              />
              {searchQuery && (
                <button
                  className="search-clear-btn"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              )}
            </div>

            {/* Controlled Category Filter Pills */}
            <div className="archive-category-pills" role="tablist" aria-label="Article categories">
              {FIXED_CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    role="tab"
                    aria-selected={isActive}
                    className={`archive-cat-btn ${isActive ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Blogs Grid */}
      <main className="archive-content-section">
        <div className="container">
          {filteredBlogs.length === 0 ? (
            <div className="archive-empty-state">
              <i className="fa-regular fa-folder-open empty-icon" aria-hidden="true"></i>
              <h3>No articles found</h3>
              <p>
                No publications matched your current filter criteria ({selectedCategory !== 'All' ? `Category: ${selectedCategory}` : ''}{searchQuery ? `, Query: "${searchQuery}"` : ''}).
              </p>
              <button
                className="btn btn-secondary"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="archive-blogs-grid">
              {filteredBlogs.map((blog, idx) => {
                const imageSrc = blog.img || blog.image || FALLBACK_THUMB;
                const pubDate = blog.publishDate || blog.date || 'Recent';
                const readTime = blog.readTime || '4 min read';
                const excerptText =
                  blog.metaDescription ||
                  blog.excerpt ||
                  blog['content-1'] ||
                  'Discover how strategic engineering and audience resonance accelerate digital growth.';
                const slug = getBlogSlug(blog);

                return (
                  <article
                    key={blog.id || idx}
                    className="archive-blog-card"
                    onClick={() => onOpenBlog(blog)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        onOpenBlog(blog);
                      }
                    }}
                    aria-label={`Read article: ${blog.title}`}
                  >
                    <div className="archive-card-image-wrap">
                      <img
                        src={imageSrc}
                        alt={blog.title}
                        className="archive-card-img"
                        loading="lazy"
                        onError={(e) => {
                          e.target.src = FALLBACK_THUMB;
                        }}
                      />
                      <span className="archive-card-category">{blog.category}</span>
                      {idx === 0 && selectedCategory === 'All' && !searchQuery && (
                        <span className="archive-newest-badge">LATEST</span>
                      )}
                    </div>

                    <div className="archive-card-body">
                      <div className="archive-card-meta">
                        <span>
                          <i className="fa-regular fa-calendar"></i> {pubDate}
                        </span>
                        <span>&bull;</span>
                        <span>
                          <i className="fa-regular fa-clock"></i> {readTime}
                        </span>
                      </div>

                      <h2 className="archive-card-title">{blog.title}</h2>

                      <p className="archive-card-excerpt">
                        {typeof excerptText === 'string' && excerptText.length > 150
                          ? excerptText.substring(0, 150) + '...'
                          : excerptText}
                      </p>

                      <div className="archive-card-footer">
                        <div className="archive-author-inline">
                          <img
                            src="./assets/mad_logo.png"
                            alt="MAD Marketing"
                            className="archive-author-avatar-tiny"
                          />
                          <span className="archive-author-name-text">MAD Editorial</span>
                        </div>

                        <span className="archive-read-link">
                          Read Story <i className="fa-solid fa-arrow-right"></i>
                        </span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </main>

      {/* Global Site Footer */}
      <Footer />
    </div>
  );
}
