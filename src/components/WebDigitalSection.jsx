import React, { useState, useMemo, useRef } from 'react';
import { useData } from '../context/DataContext';

export default function WebDigitalSection({ onOpenCaseStudy }) {
  const { projects } = useData();
  const allProjects = projects && projects.length > 0 ? projects : [];
  const [currentFilter, setCurrentFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const [isGridExpanded, setIsGridExpanded] = useState(false);
  const [isFading, setIsFading] = useState(false);

  // Touch swipe tracking for mobile gestures
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);
  const touchEndX = useRef(null);
  const touchEndY = useRef(null);

  // Filter projects by region and search query
  const filteredProjects = useMemo(() => {
    return allProjects.filter((p) => {
      const matchesFilter = currentFilter === 'all' || p.region === currentFilter;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.domain.toLowerCase().includes(q) ||
        p.regionLabel.toLowerCase().includes(q) ||
        (p.techTags && p.techTags.some((tag) => tag.toLowerCase().includes(q)));
      return matchesFilter && matchesSearch;
    });
  }, [allProjects, currentFilter, searchQuery]);

  const changeSlide = (newIndex) => {
    if (newIndex === activeIndex || filteredProjects.length === 0) return;
    setIsFading(true);
    setTimeout(() => {
      setActiveIndex(newIndex);
      setIsFading(false);
    }, 150);
  };

  const handlePrev = () => {
    if (filteredProjects.length === 0) return;
    const nextIdx = (activeIndex - 1 + filteredProjects.length) % filteredProjects.length;
    changeSlide(nextIdx);
  };

  const handleNext = () => {
    if (filteredProjects.length === 0) return;
    const nextIdx = (activeIndex + 1) % filteredProjects.length;
    changeSlide(nextIdx);
  };

  // Touch swipe gesture handlers for mobile
  const handleTouchStart = (e) => {
    if (!e.touches || e.touches.length === 0) return;
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    touchEndX.current = e.touches[0].clientX;
    touchEndY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e) => {
    if (!e.touches || e.touches.length === 0) return;
    touchEndX.current = e.touches[0].clientX;
    touchEndY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const diffX = touchStartX.current - touchEndX.current;
    const diffY = touchStartY.current - touchEndY.current;

    // Detect horizontal swipe: horizontal movement must exceed vertical movement and threshold (45px)
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 45) {
      if (diffX > 0) {
        // Swiped Left -> Advance to next project
        handleNext();
      } else {
        // Swiped Right -> Go to previous project
        handlePrev();
      }
    }

    touchStartX.current = null;
    touchStartY.current = null;
    touchEndX.current = null;
    touchEndY.current = null;
  };

  const activeProject = filteredProjects[activeIndex] || filteredProjects[0];

  return (
    <section id="web-digital" className="section web-digital-section">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">WEB & DIGITAL</span>
          <h2 className="section-heading">
            This is where MAD Marketing's story began -{' '}
            <span className="gradient-text">and where our capabilities run deepest.</span>
          </h2>
          <p className="section-body-sub">
            From complex multi-integration platforms to lean, high-performance builds, we approach every web project in a tried and tested way: understand the business, understand the audience, and build something that actually works for both.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="portfolio-controls-bar">
          <div className="search-input-wrapper">
            <i className="fa-solid fa-magnifying-glass search-icon" aria-hidden="true"></i>
            <input
              type="text"
              className="search-input"
              placeholder="Search projects by name, country, technology..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setActiveIndex(0);
              }}
              aria-label="Search projects"
            />
          </div>

          <div className="filter-pills-row" role="tablist">
            {[
              { id: 'all', label: 'All Markets' },
              { id: 'lk', label: 'Sri Lanka' },
              { id: 'uk', label: 'UK & GCC' },
              { id: 'ca-au', label: 'Canada & Australia' }
            ].map((tab) => (
              <button
                key={tab.id}
                className={`filter-pill ${currentFilter === tab.id ? 'active' : ''}`}
                onClick={() => {
                  setCurrentFilter(tab.id);
                  setActiveIndex(0);
                }}
                role="tab"
                aria-selected={currentFilter === tab.id}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Showcase Card */}
        {filteredProjects.length === 0 ? (
          <div className="featured-showcase-card" style={{ display: 'block', textAlign: 'center', padding: '60px 20px' }}>
            <i className="fa-solid fa-filter-circle-xmark" style={{ fontSize: '38px', color: 'var(--color-purple)', marginBottom: '14px' }}></i>
            <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', marginBottom: '8px' }}>
              No matching projects found
            </h3>
            <p style={{ color: 'var(--text-secondary)' }}>
              Try adjusting your search query or selecting "All Markets".
            </p>
          </div>
        ) : (
          <div
            className={`featured-showcase-card ${isFading ? 'fade-transition' : ''}`}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="showcase-left-box">
              <div className="showcase-badges-row">
                <span className="project-domain-tag">{activeProject.domain}</span>
                <span className="project-country-badge">{activeProject.regionLabel}</span>
              </div>

              <h3 className="showcase-title">{activeProject.title}</h3>
              <p className="showcase-description">{activeProject.summary}</p>

              <div className="showcase-tech-tags">
                {activeProject.techTags.map((tag) => (
                  <span key={tag} className="tech-tag">
                    {tag}
                  </span>
                ))}
              </div>

              <button
                className="btn-explore-case"
                onClick={() => onOpenCaseStudy(activeProject)}
              >
                Explore Case Study <i className="fa-solid fa-arrow-right-long"></i>
              </button>
            </div>

            <div className="showcase-right-frame">
              <div className="browser-header-bar">
                <div className="browser-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <div className="browser-url-pill">
                  <i className="fa-solid fa-lock" style={{ fontSize: '10px', marginRight: '4px' }}></i>
                  https://{activeProject.domain}
                </div>
                <span className="scroll-hint-chip">
                  <i className="fa-solid fa-arrow-down-up-across-line"></i> Scroll preview
                </span>
              </div>
              <div className="browser-scroll-viewport">
                <img
                  src={activeProject.image}
                  alt={`${activeProject.title} Live Preview`}
                  className="browser-mockup-img"
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = './showcase/allindependentagencies.org.jpeg';
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Mobile Swipe Hint */}
        {filteredProjects.length > 1 && (
          <div className="mobile-swipe-guide">
            <i className="fa-solid fa-arrows-left-right"></i>
            <span>Swipe left or right to explore projects</span>
          </div>
        )}

        {/* Showcase Slider Controls */}
        {filteredProjects.length > 1 && (
          <div className="showcase-pagination">
            <button className="nav-arrow-btn" onClick={handlePrev} aria-label="Previous Project">
              <i className="fa-solid fa-chevron-left"></i>
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {filteredProjects.map((p, idx) => (
                <button
                  key={p.id}
                  className={`showcase-dot ${idx === activeIndex ? 'active' : ''}`}
                  onClick={() => changeSlide(idx)}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>
            <button className="nav-arrow-btn" onClick={handleNext} aria-label="Next Project">
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        )}

        {/* Toggle 11-Project Full Grid */}
        <div className="grid-toggle-wrapper">
          <button
            className="btn-toggle-grid"
            onClick={() => setIsGridExpanded(!isGridExpanded)}
          >
            <i className="fa-solid fa-table-cells"></i>
            {isGridExpanded
              ? 'Hide Full Project Grid'
              : `View All 11 Projects in Portfolio (${filteredProjects.length})`}
            <i className={`fa-solid ${isGridExpanded ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
          </button>
        </div>

        {/* Expandable 11-Project Grid */}
        {isGridExpanded && (
          <div className="full-portfolio-grid">
            {filteredProjects.map((p) => (
              <div key={p.id} className="project-card glass-card">
                <div>
                  <div className="showcase-badges-row">
                    <span className="project-domain-tag">{p.domain}</span>
                    <span className="project-country-badge">{p.regionLabel}</span>
                  </div>
                  <div
                    className="project-card-thumb"
                    onClick={() => onOpenCaseStudy(p)}
                    title="Click to view full case study"
                  >
                    <img
                      src={p.image}
                      alt={p.title}
                      loading="lazy"
                      onError={(e) => {
                        e.target.src = './showcase/allindependentagencies.org.jpeg';
                      }}
                    />
                  </div>
                  <h4 className="showcase-title" style={{ fontSize: '18px', marginBottom: '8px' }}>
                    {p.title}
                  </h4>
                  <p className="showcase-description" style={{ fontSize: '14px', marginBottom: '14px' }}>
                    {p.summary}
                  </p>
                  <div className="showcase-tech-tags" style={{ marginBottom: '18px' }}>
                    {p.techTags.map((tag) => (
                      <span key={tag} className="tech-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <button
                  className="btn-explore-case"
                  style={{ width: '100%', justifyContent: 'center' }}
                  onClick={() => onOpenCaseStudy(p)}
                >
                  Explore Case Study <i className="fa-solid fa-arrow-right-long"></i>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
