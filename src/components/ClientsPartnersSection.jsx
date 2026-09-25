import React from 'react';
import { useData } from '../context/DataContext';

export default function ClientsPartnersSection() {
  const { partners } = useData();
  const displayPartners = partners && partners.length > 0 ? partners : [];

  return (
    <section id="clients-partners" className="section partners-section">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">OUR CLIENTS & PARTNERS</span>
          <h2 className="section-heading">
            A growing portfolio. <span className="gradient-text">A consistent standard.</span>
          </h2>
          <p className="section-body-lead">
            Over two years, MAD Marketing and MAD LABS have worked with startups, established businesses, industry bodies and institutions across Sri Lanka, Australia, Canada, the United Kingdom and the Middle East.
          </p>
        </div>

        {/* White Ribbon Marquee */}
        <div className="white-ribbon-container">
          <div className="marquee-track">
            {/* First Set */}
            {displayPartners.map((logo, idx) => (
              <div className="partner-logo-item" key={`logo-1-${idx}`}>
                <img src={logo.src} alt={logo.name} title={logo.name} loading="lazy" />
              </div>
            ))}
            {/* Duplicate Set for Continuous Infinite Loop */}
            {displayPartners.map((logo, idx) => (
              <div className="partner-logo-item" key={`logo-2-${idx}`}>
                <img src={logo.src} alt={logo.name} title={logo.name} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
