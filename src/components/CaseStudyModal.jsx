import React, { useEffect } from 'react';

export default function CaseStudyModal({ project, onClose }) {
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

  if (!project) return null;

  const renderLighthouseMeter = (score, label) => {
    const radius = 20;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 100) * circumference;
    const strokeColor = score >= 90 ? '#10B981' : score >= 50 ? '#F59E0B' : '#EF4444';

    return (
      <div className="gauge-item" key={label}>
        <div className="gauge-svg-wrap" style={{ width: '48px', height: '48px' }}>
          <svg className="gauge-svg" viewBox="0 0 52 52">
            <circle className="gauge-bg-circle" cx="26" cy="26" r={radius} />
            <circle
              className="gauge-meter-circle"
              cx="26"
              cy="26"
              r={radius}
              style={{
                strokeDasharray: circumference,
                strokeDashoffset: offset,
                stroke: strokeColor
              }}
            />
          </svg>
          <span className="gauge-pct-text" style={{ fontSize: '11px' }}>{score}%</span>
        </div>
        <span className="gauge-category-pill" style={{ fontSize: '11px' }}>{label}</span>
      </div>
    );
  };

  return (
    <div
      className="modal-overlay active"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Case Study Modal"
    >
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close Case Study">
          <i className="fa-solid fa-xmark"></i>
        </button>

        <div className="modal-content-body">
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '20px', flexWrap: 'wrap', marginBottom: '24px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', flexWrap: 'wrap' }}>
                <span className="project-domain-tag">{project.domain}</span>
                <span className="project-country-badge">{project.regionLabel}</span>
                <span className="tech-tag" style={{ color: 'var(--color-purple)' }}>{project.clientType}</span>
              </div>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(22px, 3.5vw, 30px)', color: 'var(--text-primary)' }}>
                {project.title}
              </h2>
            </div>
            <a
              href={`https://${project.domain}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-gradient case-study-visit-btn"
            >
              Visit Live Site <i className="fa-solid fa-arrow-up-right-from-square"></i>
            </a>
          </div>

          {/* Full High-Res Preview (Single Natural Scroll) */}
          <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid rgba(248, 250, 252, 0.1)', background: '#06050A', marginBottom: '28px' }}>
            <img src={project.image} alt={project.title} style={{ width: '100%', height: 'auto', display: 'block' }} />
          </div>

          {/* Details & Metrics */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '28px' }}>
            <div>
              <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', color: 'var(--text-primary)', marginBottom: '12px' }}>
                Executive Overview & Problem Solving
              </h4>
              <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '14px' }}>
                {project.summary}
              </p>
              <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: '1.7', whiteSpace: 'pre-line' }}>
                {project.fullStory}
              </p>

              <div style={{ marginTop: '20px', padding: '16px 20px', background: 'rgba(139, 92, 246, 0.08)', borderLeft: '4px solid var(--color-purple)', borderRadius: 'var(--radius-xs)' }}>
                <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '4px', fontSize: '14px' }}>
                  Key Measurable Outcome:
                </strong>
                <span style={{ color: 'var(--color-lavender)', fontSize: '14px' }}>{project.keyOutcome}</span>
              </div>
            </div>

            <div style={{ background: 'rgba(14, 11, 28, 0.6)', padding: '24px', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', color: 'var(--text-primary)', marginBottom: '14px' }}>
                Verified Technology Stack
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
                {project.techTags.map((tag) => (
                  <span key={tag} className="tech-tag" style={{ background: 'rgba(255, 255, 255, 0.06)', color: 'var(--text-primary)' }}>
                    {tag}
                  </span>
                ))}
              </div>

              <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', color: 'var(--text-primary)', marginBottom: '14px' }}>
                Google Lighthouse Audit
              </h4>
              <div className="lighthouse-analyzer-box" style={{ padding: '12px', background: 'rgba(6, 5, 10, 0.5)' }}>
                {renderLighthouseMeter(project.lighthouse.performance, 'Perf')}
                {renderLighthouseMeter(project.lighthouse.accessibility, 'A11y')}
                {renderLighthouseMeter(project.lighthouse.bestPractices, 'Best')}
                {renderLighthouseMeter(project.lighthouse.seo, 'SEO')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
