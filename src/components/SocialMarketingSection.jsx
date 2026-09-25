import React from 'react';

export default function SocialMarketingSection() {
  return (
    <section id="social-marketing" className="section social-marketing-section">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">SOCIAL & MARKETING</span>
          <h2 className="section-heading">
            Creative is the <span className="gradient-text">Mechanism.</span>
          </h2>
          <p className="section-body-lead">
            Great creative is not decoration. It is the single most important variable in whether a message lands or disappears.
          </p>
          <p className="section-body-sub">
            At MAD Marketing we believe that no media budget in the world can save bad creative - but the right creative, built around a deep understanding of the audience, will move markets with or without it. Before we write a word or design a frame, we do the homework. Who is the audience? What do they actually respond to? What are their pain points, their motivations, their context? The answer to those questions is where every campaign begins.
          </p>
          <div className="tagline-accent-box">
            <span className="pentagra-text">We don't guess. We research.</span>
            <span className="result-text">Then we create.</span>
          </div>
        </div>

        <div className="strategy-cards-grid">
          {/* Strategy Card 01 */}
          <div className="strategy-card">
            <div>
              <div className="strategy-card-header">
                <span className="strategy-num">01</span>
                <span className="strategy-tile-tag">Earn Attention Before You Buy It</span>
              </div>
              <h3 className="strategy-card-heading">
                Paid advertising is a multiplier. But you cannot multiply zero.
              </h3>
              <p className="strategy-card-body">
                A brand that has not earned organic attention has no foundation to build paid performance on. This is why we always start with organic - building content that is purposeful, researched and genuinely valuable to the audience. Organic performance tells us what resonates. It reveals the messages, formats and moments that the audience responds to naturally.
              </p>
              <p className="strategy-card-body">
                Only then do we deploy paid amplification - using real audience intelligence to inform every targeting decision, every creative variant, every dirham spent.
              </p>
            </div>
            <div className="strategy-card-footer">
              <p className="strategy-footer-quote">Organic builds the foundation.</p>
            </div>
          </div>

          {/* Strategy Card 02 */}
          <div className="strategy-card">
            <div>
              <div className="strategy-card-header">
                <span className="strategy-num">02</span>
                <span className="strategy-tile-tag">We Do The Homework</span>
              </div>
              <h3 className="strategy-card-heading">David Ogilvy said the consumer is not a moron.</h3>
              <p className="strategy-card-body">
                We'd go further - she is your most discerning critic and your most valuable advocate. Underestimate her and you lose. Understand her and you win every time.
              </p>
              <p className="strategy-card-body">
                MAD Marketing approaches every brief the same way - with rigour, with curiosity, and with genuine respect for the audience on the other end of the message. We study the market, the competitors, the culture and the context before we make a single recommendation.
              </p>
            </div>
            <div className="strategy-card-footer">
              <p className="strategy-footer-quote">
                We may not be the biggest agency in the room.{' '}
                <span className="result-text" style={{ color: 'var(--color-magenta)' }}>
                  But we are almost certainly the most prepared.
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
