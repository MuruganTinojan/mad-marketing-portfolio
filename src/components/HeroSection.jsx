import React from 'react';

export default function HeroSection() {
  return (
    <section id="why-mad" className="section hero-section">
      <div className="container">
        <div className="hero-grid">
          <div className="hero-text-col">
            <span className="section-badge">Who we are</span>
            <h1 className="section-heading">
              Some problems don't have <span className="gradient-text">off-the-shelf answers.</span>
            </h1>
            <p className="section-body-lead">
              They need people who are willing to think differently, move decisively, and build solutions that hold up in the real world. This is what MAD Marketing was built for.
            </p>
            <p className="section-body-sub">
              We are a full-service creative and digital agency headquartered in Sri Lanka, working with startups, established businesses, and industry bodies across local and international markets—bringing together creative ambition and operational discipline to solve modern business problems.
            </p>

            <div className="tagline-accent-box">
              <span className="pentagra-text">MAD ideas.</span>
              <span className="result-text">Real results.</span>
            </div>

            <div className="hero-actions">
              <a href="#software-solutions" className="btn btn-capability-1">
                Our Capabilities
              </a>
              <a href="#web-digital" className="btn btn-capability-2">
                Explore Portfolio
              </a>
            </div>
          </div>

          <div className="hero-visual-col">
            <div className="hero-visual-stage">
              <div className="hummingbird-glow-backdrop" aria-hidden="true"></div>
              <img
                src="./assets/hummingbird.png"
                alt="MAD Marketing Glowing Hummingbird"
                className="hummingbird-img"
                loading="eager"
              />

              <a href="#web-digital" className="orbital-pin pin-web">
                <span className="pin-dot"></span> Web & Digital
              </a>
              <a href="#social-marketing" className="orbital-pin pin-social">
                <span className="pin-dot"></span> Social & PR
              </a>
              <a href="#software-solutions" className="orbital-pin pin-software">
                <span className="pin-dot"></span> Custom Software
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
