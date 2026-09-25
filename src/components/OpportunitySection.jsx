import React from 'react';

export default function OpportunitySection() {
  return (
    <section id="the-opportunity" className="section opportunity-section">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">THE OPPORTUNITY</span>
          <h2 className="section-heading">
            Built, Proven, <span className="gradient-text">Ready.</span>
          </h2>
        </div>

        <div className="opportunity-grid-layout">
          <div className="opportunity-card-primary">
            <p>
              MAD Marketing and MAD LABS were built in Sri Lanka and tested on real clients, real problems and real markets. In two years, we have developed a full-service creative and digital capability alongside an enterprise-grade software portfolio that is live and client-proven.
            </p>
            <p>
              The GCC is where we take it further. Regional enterprises are investing heavily in digital transformation - and this market rewards partners who show up with substance. That is precisely where MAD is positioned to deliver.
            </p>
            <p>
              We are not entering speculatively. The infrastructure is built. The products are live. The team is ready. We are looking for the right partner - one who knows the market, commands the relationships, and is ready to build something significant.
            </p>
          </div>

          <div className="opportunity-pillars-col">
            <div className="opportunity-pillar-item">
              <i className="fa-solid fa-gem pillar-icon" aria-hidden="true"></i>
              <div className="pillar-text">
                <h4>Battle-Tested Pedigree</h4>
                <p>Multi-regional production deployments across UK, GCC, Australia, Canada, and Sri Lanka.</p>
              </div>
            </div>

            <div className="opportunity-pillar-item">
              <i className="fa-solid fa-server pillar-icon" aria-hidden="true"></i>
              <div className="pillar-text">
                <h4>Turnkey Infrastructure</h4>
                <p>Proprietary enterprise SaaS frameworks, payment plugins, and marketplace engines ready to roll out.</p>
              </div>
            </div>

            <div className="opportunity-pillar-item">
              <i className="fa-solid fa-handshake pillar-icon" aria-hidden="true"></i>
              <div className="pillar-text">
                <h4>High-Stakes Partnership</h4>
                <p>Aligning with established regional leadership ready to capture GCC digital transformation market share.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="opportunity-callout-banner">
          <i className="fa-solid fa-bolt" style={{ color: 'var(--color-magenta)', fontSize: '18px' }}></i>
          <p>The timing is right. The capability is real. Let's build together.</p>
        </div>
      </div>
    </section>
  );
}
