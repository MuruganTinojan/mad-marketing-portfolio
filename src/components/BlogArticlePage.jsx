import React, { useEffect, useState } from 'react';
import { useData } from '../context/DataContext';
import { getBlogSlug } from '../utils/slugify';
import { renderBlogContent } from '../utils/blogContentRenderer';
import Footer from './Footer';

const FALLBACK_HERO_IMG = 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop';
const WHATSAPP_URL = 'https://wa.me/94766343111?text=' + encodeURIComponent("I'm interested in your services");

export default function BlogArticlePage({
  blog,
  onNavigateBlog,
  onBackToBlogList,
  onBackToHome
}) {
  const { getRelatedBlogs } = useData();
  const [heroImgSrc, setHeroImgSrc] = useState(blog ? (blog.img || blog.image || FALLBACK_HERO_IMG) : FALLBACK_HERO_IMG);

  // Sync hero image if blog changes
  useEffect(() => {
    if (blog) {
      setHeroImgSrc(blog.img || blog.image || FALLBACK_HERO_IMG);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [blog]);

  // Dynamic SEO Updates (Title, Meta Description, OG tags, Canonical)
  useEffect(() => {
    if (!blog) return;

    const originalTitle = document.title;
    const pageTitle = blog.seoTitle || `${blog.title} | MAD Marketing`;
    document.title = pageTitle;

    const setMetaTag = (selector, attr, val) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        if (selector.startsWith('meta[name=')) {
          el.setAttribute('name', selector.match(/name="([^"]+)"/)[1]);
        } else if (selector.startsWith('meta[property=')) {
          el.setAttribute('property', selector.match(/property="([^"]+)"/)[1]);
        }
        document.head.appendChild(el);
      }
      el.setAttribute(attr, val);
    };

    const description = blog.metaDescription || blog.excerpt || blog.title;
    setMetaTag('meta[name="description"]', 'content', description);
    setMetaTag('meta[property="og:title"]', 'content', pageTitle);
    setMetaTag('meta[property="og:description"]', 'content', description);
    setMetaTag('meta[property="og:image"]', 'content', heroImgSrc);
    setMetaTag('meta[property="og:type"]', 'content', 'article');
    setMetaTag('meta[name="twitter:card"]', 'content', 'summary_large_image');
    setMetaTag('meta[name="twitter:title"]', 'content', pageTitle);
    setMetaTag('meta[name="twitter:description"]', 'content', description);
    setMetaTag('meta[name="twitter:image"]', 'content', heroImgSrc);

    // Canonical link
    const canonicalSlug = getBlogSlug(blog);
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', `${window.location.origin}/blog/${canonicalSlug}`);

    return () => {
      document.title = originalTitle;
    };
  }, [blog, heroImgSrc]);

  // Handle 404 / Invalid Article State
  if (!blog) {
    return (
      <div className="blog-article-page-wrap">
        <header className="archive-navbar">
          <div className="archive-nav-container">
            <div className="archive-nav-left">
              <button className="btn-archive-back" onClick={onBackToBlogList} aria-label="Back to all articles">
                <i className="fa-solid fa-arrow-left"></i> Back to Articles
              </button>
              <div className="archive-logo-divider"></div>
              <img src="/assets/mad_logo.png" alt="MAD Marketing" className="archive-nav-logo" />
            </div>
          </div>
        </header>

        <div className="container" style={{ padding: '120px 24px', textAlign: 'center' }}>
          <div className="archive-empty-state" style={{ margin: '0 auto', maxWidth: '560px' }}>
            <i className="fa-solid fa-file-circle-question empty-icon" style={{ fontSize: '48px', color: 'var(--color-purple)' }}></i>
            <h1 style={{ fontSize: '32px', margin: '20px 0 10px', color: '#fff' }}>Article Not Found</h1>
            <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>
              The publication you are looking for may have been moved or the requested URL is invalid.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
              <button className="btn btn-secondary" onClick={onBackToBlogList}>
                <i className="fa-solid fa-newspaper"></i> View All Articles
              </button>
              <button className="btn btn-gradient" onClick={onBackToHome}>
                <i className="fa-solid fa-house"></i> Back to Home
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Related articles (up to 3 matching same category, excluding current)
  const relatedArticles = getRelatedBlogs(blog, 3);

  // Format publication date
  const displayDate = blog.publishDate || blog.date || 'Recent';

  // Compute estimated reading time if not present
  const displayReadTime = blog.readTime || '5 min read';

  return (
    <div className="blog-article-page-wrap">
      {/* Top Navbar */}
      <header className="archive-navbar sticky-article-nav">
        <div className="archive-nav-container">
          <div className="archive-nav-left">
            <button
              className="btn-archive-back"
              onClick={onBackToBlogList}
              aria-label="Back to all articles"
            >
              <i className="fa-solid fa-arrow-left"></i> All Articles
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
              <img src="/assets/mad_logo.png" alt="MAD Marketing" className="archive-nav-logo" />
            </a>
          </div>

          <div className="archive-nav-right">
            <span className="article-category-badge-nav">
              <span className="pulse-dot-green"></span> {blog.category}
            </span>
          </div>
        </div>
      </header>

      {/* Main Article Container */}
      <article className="article-main-container">
        {/* Breadcrumb */}
        <nav className="article-breadcrumb" aria-label="Breadcrumb">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onBackToHome();
            }}
          >
            Home
          </a>
          <span className="breadcrumb-separator">/</span>
          <a
            href="/blog"
            onClick={(e) => {
              e.preventDefault();
              onBackToBlogList();
            }}
          >
            Blog
          </a>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current" aria-current="page">{blog.category}</span>
        </nav>

        {/* Header Metadata */}
        <header className="article-header-section">
          <div className="article-category-pill">{blog.category}</div>
          <h1 className="article-main-title">{blog.title}</h1>

          <div className="article-meta-row">
            <div className="article-author-meta">
              <span className="article-author-name">MAD Editorial Core</span>
              <span className="article-author-sub">Verified Publication</span>
            </div>
          </div>

          <div className="article-stats-block">
            <span className="article-stat-item">
              <i className="fa-regular fa-calendar"></i> {displayDate}
            </span>
            <span className="meta-separator">&bull;</span>
            <span className="article-stat-item">
              <i className="fa-regular fa-clock"></i> {displayReadTime}
            </span>
          </div>
        </header>

        {/* Hero Image */}
        <div className="article-hero-media-wrap">
          <img
            src={heroImgSrc}
            alt={blog.title}
            className="article-hero-img"
            onError={() => setHeroImgSrc(FALLBACK_HERO_IMG)}
          />
          <div className="article-hero-overlay"></div>
        </div>

        {/* Article Editorial Body */}
        <div className="article-content-prose">
          {renderBlogContent(blog)}
        </div>

        {/* WhatsApp Service CTA Section */}
        <section className="article-whatsapp-cta-section my-16">
          <div className="whatsapp-cta-card">
            <div className="whatsapp-cta-glow" aria-hidden="true"></div>
            <div className="whatsapp-cta-content">
              <div className="whatsapp-cta-badge">
                <i className="fa-brands fa-whatsapp text-emerald-400"></i> DIRECT ARCHITECTURE CONSULTATION
              </div>
              <h2 className="whatsapp-cta-title">
                Ready to engineer your brand's next <span className="gradient-text">Growth Breakthrough?</span>
              </h2>
              <p className="whatsapp-cta-description">
                {blog.highlight ||
                  "Connect directly with our engineering and digital performance directors to audit your digital infrastructure, conversions, and organic search visibility."}
              </p>

              <div className="whatsapp-cta-action-row">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp-direct"
                  id="btn-whatsapp-blog-cta"
                  aria-label="Chat on WhatsApp with MAD Marketing"
                >
                  <i className="fa-brands fa-whatsapp whatsapp-icon-bold"></i>
                  <span>Chat on WhatsApp</span>
                </a>

                <div className="whatsapp-guarantee-note">
                  <i className="fa-solid fa-bolt text-amber-400"></i> Average response time: &lt; 30 minutes
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Articles Section */}
        {relatedArticles.length > 0 && (
          <section className="article-related-section my-20">
            <div className="related-section-header">
              <div>
                <span className="section-badge">CURATED RECOMMENDATIONS</span>
                <h3 className="related-section-title">
                  More in <span className="gradient-text">{blog.category}</span>
                </h3>
              </div>
              <button
                className="btn-view-all-category"
                onClick={onBackToBlogList}
              >
                All Articles <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>

            <div className="related-cards-grid">
              {relatedArticles.map((rel) => {
                const relImg = rel.img || rel.image || FALLBACK_HERO_IMG;
                const relDate = rel.publishDate || rel.date || 'Recent';
                const relRead = rel.readTime || '4 min read';
                return (
                  <div
                    key={rel.id}
                    className="related-blog-card"
                    onClick={() => onNavigateBlog(rel)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        onNavigateBlog(rel);
                      }
                    }}
                  >
                    <div className="related-card-media">
                      <img
                        src={relImg}
                        alt={rel.title}
                        className="related-card-img"
                        loading="lazy"
                        onError={(e) => {
                          e.target.src = FALLBACK_HERO_IMG;
                        }}
                      />
                      <span className="related-category-pill">{rel.category}</span>
                    </div>

                    <div className="related-card-info">
                      <div className="related-meta-row">
                        <span><i className="fa-regular fa-calendar"></i> {relDate}</span>
                        <span>&bull;</span>
                        <span><i className="fa-regular fa-clock"></i> {relRead}</span>
                      </div>
                      <h4 className="related-card-title">{rel.title}</h4>
                      <span className="related-read-action">
                        Read Story <i className="fa-solid fa-arrow-right"></i>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </article>

      {/* Global Site Footer */}
      <Footer />
    </div>
  );
}
