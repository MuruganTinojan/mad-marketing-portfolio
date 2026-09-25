import React from 'react';

export default function MadModelSection() {
  return (
    <section id="mad-model" className="section mad-model-section">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">THE MAD MODEL</span>
          <h2 className="section-heading">
            Most agencies wait to be briefed. <span className="gradient-text">We don't.</span>
          </h2>
          <p className="section-body-sub">
            Before a single asset is built, we go deep - into the business problem, the target audience, the competitive landscape, and the market at play. This research drives every decision we make, from first concept to final delivery.
          </p>
          <div className="tagline-accent-box">
            <span className="pentagra-text">We don't draw lines.</span>
            <span className="result-text">We deliver results.</span>
          </div>
        </div>

        <div className="model-cards-grid">
          {/* Card 1: Web & Digital */}
          <div className="model-card glass-card">
            <div>
              <div className="card-icon-box icon-box-web">
                <i className="fa-solid fa-laptop-code"></i>
              </div>
              <h3 className="model-card-title">Web & Digital</h3>
              <p className="model-card-sub">Built for real audiences, not award Submissions.</p>
              <ul className="model-card-points">
                <li><span className="point-dot point-dot-purple"></span> High-performance builds</li>
                <li><span className="point-dot point-dot-purple"></span> Integration platforms</li>
                <li><span className="point-dot point-dot-purple"></span> UX-driven student/lead paths</li>
                <li><span className="point-dot point-dot-purple"></span> Blazing-fast static sites</li>
              </ul>
            </div>
            <a href="#web-digital" className="model-card-action">
              View Portfolio <i className="fa-solid fa-chevron-right"></i>
            </a>
          </div>

          {/* Card 2: Social & Marketing */}
          <div className="model-card glass-card">
            <div>
              <div className="card-icon-box icon-box-social">
                <i className="fa-solid fa-bullhorn"></i>
              </div>
              <h3 className="model-card-title">Social & Marketing</h3>
              <p className="model-card-sub">Research-led campaigns that speak to the markets that matter.</p>
              <ul className="model-card-points">
                <li><span className="point-dot point-dot-purple"></span> Multi-channel brand experiences</li>
                <li><span className="point-dot point-dot-purple"></span> Google, Meta & TikTok Ads</li>
                <li><span className="point-dot point-dot-purple"></span> High-performance SEO campaigns</li>
                <li><span className="point-dot point-dot-purple"></span> Visual brand storytelling</li>
              </ul>
            </div>
            <a href="#social-marketing" className="model-card-action">
              Explore Strategy <i className="fa-solid fa-chevron-right"></i>
            </a>
          </div>

          {/* Card 3: Software Solutions */}
          <div className="model-card glass-card">
            <div>
              <div className="card-icon-box icon-box-software">
                <i className="fa-solid fa-code-merge"></i>
              </div>
              <h3 className="model-card-title">Software Solutions</h3>
              <p className="model-card-sub">Proprietary tools solving real operational problems, already in use.</p>
              <ul className="model-card-points">
                <li><span className="point-dot point-dot-blue"></span> Automated onboarding flows</li>
                <li><span className="point-dot point-dot-blue"></span> Custom payment gateway plugins</li>
                <li><span className="point-dot point-dot-blue"></span> B2B study abroad marketplaces</li>
                <li><span className="point-dot point-dot-blue"></span> Role-based membership tools</li>
              </ul>
            </div>
            <a href="#software-solutions" className="model-card-action">
              Check Solutions <i className="fa-solid fa-chevron-right"></i>
            </a>
          </div>
        </div>

        <div className="model-bottom-banner">
          <i className="fa-solid fa-circle-nodes banner-icon"></i>
          <p>We adapt to our clients, not the other way around. We stay available, move fast, and treat every deadline as a commitment.</p>
        </div>
      </div>
    </section>
  );
}
