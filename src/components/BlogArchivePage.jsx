import React, { useState, useMemo } from 'react';
import { useData } from '../context/DataContext';

export default function BlogArchivePage({ onBackToHome, onOpenBlog }) {
  const { blogs } = useData();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Extract unique categories
  const categories = useMemo(() => {
    const set = new Set(['All']);
    blogs.forEach((b) => {
      if (b.category) set.add(b.category);
    });
    return Array.from(set);
  }, [blogs]);

  // Filtered blogs
  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const matchesCat = selectedCategory === 'All' || blog.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        blog.title.toLowerCase().includes(q) ||
        blog.excerpt.toLowerCase().includes(q) ||
        (blog.tags && blog.tags.some((t) => t.toLowerCase().includes(q)));
      return matchesCat && matchesSearch;
    });
  }, [blogs, selectedCategory, searchQuery]);

  return (
    <div className="blog-archive-page">
      {/* Top Header */}
      <header className="archive-navbar">
        <div className="archive-nav-container">
          <div className="archive-nav-left">
            <button className="btn-archive-back" onClick={onBackToHome} aria-label="Back to main portfolio">
              <i className="fa-solid fa-arrow-left"></i> Back to Portfolio
            </button>
            <div className="archive-logo-divider"></div>
            <img src="./assets/mad_logo.png" alt="MAD Marketing" className="archive-nav-logo" />
          </div>

          <div className="archive-nav-right">
            <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
              <i className="fa-solid fa-book-open"></i> Publications Archive
            </span>
          </div>
        </div>
      </header>

      {/* Hero Header */}
      <div className="archive-hero-section">
        <div className="container">
          <span className="section-badge">EDITORIAL & RESEARCH</span>
          <h1 className="archive-hero-title">
            Perspectives, Case Breakdowns & <span className="gradient-text">Engineering Insights</span>
          </h1>
          <p className="archive-hero-subtitle">
            Exploring the intersection of enterprise cloud architectures, human audience psychology, and high-conversion digital experiences.
          </p>

          {/* Search & Filter Controls */}
          <div className="archive-controls-bar">
            <div className="archive-search-box">
              <i className="fa-solid fa-magnifying-glass search-icon"></i>
              <input
                type="text"
                className="archive-search-input"
                placeholder="Search articles by title, keywords, tech stack..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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

            <div className="archive-category-pills">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`archive-cat-btn ${selectedCategory === cat ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Blogs Grid */}
      <main className="archive-content-section">
        <div className="container">
          {filteredBlogs.length === 0 ? (
            <div className="archive-empty-state">
              <i className="fa-regular fa-folder-open empty-icon"></i>
              <h3>No articles found</h3>
              <p>Try adjusting your search query or switching categories.</p>
              <button
                className="btn btn-secondary"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="archive-blogs-grid">
              {filteredBlogs.map((blog, idx) => (
                <article
                  key={blog.id}
                  className="archive-blog-card"
                  onClick={() => onOpenBlog(blog)}
                >
                  <div className="archive-card-image-wrap">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="archive-card-img"
                      loading="lazy"
                    />
                    <span className="archive-card-category">{blog.category}</span>
                    {idx === 0 && selectedCategory === 'All' && !searchQuery && (
                      <span className="archive-newest-badge">LATEST</span>
                    )}
                  </div>

                  <div className="archive-card-body">
                    <div className="archive-card-meta">
                      <span>
                        <i className="fa-regular fa-calendar"></i> {blog.date}
                      </span>
                      <span>&bull;</span>
                      <span>
                        <i className="fa-regular fa-clock"></i> {blog.readTime}
                      </span>
                    </div>

                    <h2 className="archive-card-title">{blog.title}</h2>

                    <p className="archive-card-excerpt">{blog.excerpt}</p>

                    <div className="archive-card-footer">
                      <div className="archive-author-inline">
                        <img
                          src={blog.authorAvatar || './assets/mad_logo.png'}
                          alt={blog.author}
                          className="archive-author-avatar-tiny"
                        />
                        <span className="archive-author-name-text">{blog.author}</span>
                      </div>

                      <span className="archive-read-link">
                        Read Story <i className="fa-solid fa-arrow-right"></i>
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Footer Banner */}
      <footer className="archive-bottom-banner">
        <div className="container">
          <div className="archive-footer-box">
            <div>
              <h3>Have a high-stakes project in mind?</h3>
              <p>Let's architect a solution that moves your metrics.</p>
            </div>
            <button
              className="btn btn-gradient"
              onClick={() => {
                onBackToHome();
                setTimeout(() => {
                  window.location.hash = '#contact';
                }, 100);
              }}
            >
              Get in Touch <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
