import React from 'react';
import { useData } from '../context/DataContext';

export default function SoftwareSolutionsSection() {
  const { portalData } = useData();

  const stats = portalData?.stats || [
    { number: '100%', label: 'Client Retention Across All Software Deployments' },
    { number: '99.5 - 99.9%', label: 'Uptime Across Live Products On Google Cloud Platform' },
    { number: '0%', label: 'Fraud Incidents Post-Launch On the CyberSource Payment Plugin' },
    { number: '3', label: 'Live Client Deployments Across The Active Product Portfolio' }
  ];

  const solutionIcons = [
    // API & Plugin Development
    <svg key="icon-api" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none">
      <rect x="4" y="10" width="40" height="28" rx="4" stroke="url(#g1)" strokeWidth="2.5"/>
      <path d="M16 24l-5 4 5 4" stroke="url(#g1)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M32 24l5 4-5 4" stroke="url(#g1)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M26 19l-4 18" stroke="url(#g2)" strokeWidth="2.5" strokeLinecap="round"/>
      <defs>
        <linearGradient id="g1" x1="4" y1="10" x2="44" y2="38" gradientUnits="userSpaceOnUse">
          <stop stopColor="#8B5CF6"/><stop offset="1" stopColor="#D946EF"/>
        </linearGradient>
        <linearGradient id="g2" x1="22" y1="19" x2="26" y2="37" gradientUnits="userSpaceOnUse">
          <stop stopColor="#8B5CF6"/><stop offset="1" stopColor="#D946EF"/>
        </linearGradient>
      </defs>
    </svg>,
    // B2B Marketplace Portals
    <svg key="icon-b2b" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none">
      <rect x="4" y="6" width="18" height="12" rx="3" stroke="url(#g3)" strokeWidth="2.5"/>
      <rect x="26" y="6" width="18" height="12" rx="3" stroke="url(#g3)" strokeWidth="2.5"/>
      <rect x="14" y="30" width="20" height="12" rx="3" stroke="url(#g4)" strokeWidth="2.5"/>
      <path d="M13 18v4a6 6 0 006 6h10a6 6 0 006-6v-4" stroke="url(#g3)" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M24 24v6" stroke="url(#g4)" strokeWidth="2.5" strokeLinecap="round"/>
      <defs>
        <linearGradient id="g3" x1="4" y1="6" x2="44" y2="42" gradientUnits="userSpaceOnUse">
          <stop stopColor="#8B5CF6"/><stop offset="1" stopColor="#D946EF"/>
        </linearGradient>
        <linearGradient id="g4" x1="14" y1="30" x2="34" y2="42" gradientUnits="userSpaceOnUse">
          <stop stopColor="#8B5CF6"/><stop offset="1" stopColor="#D946EF"/>
        </linearGradient>
      </defs>
    </svg>,
    // Booking & Meeting Engines
    <svg key="icon-booking" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none">
      <rect x="6" y="10" width="36" height="32" rx="4" stroke="url(#g5)" strokeWidth="2.5"/>
      <path d="M6 18h36" stroke="url(#g5)" strokeWidth="2.5"/>
      <path d="M16 6v8M32 6v8" stroke="url(#g5)" strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="24" cy="30" r="5" stroke="url(#g6)" strokeWidth="2.5"/>
      <path d="M24 27v3l2 2" stroke="url(#g6)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <defs>
        <linearGradient id="g5" x1="6" y1="6" x2="42" y2="42" gradientUnits="userSpaceOnUse">
          <stop stopColor="#8B5CF6"/><stop offset="1" stopColor="#D946EF"/>
        </linearGradient>
        <linearGradient id="g6" x1="19" y1="25" x2="29" y2="35" gradientUnits="userSpaceOnUse">
          <stop stopColor="#8B5CF6"/><stop offset="1" stopColor="#D946EF"/>
        </linearGradient>
      </defs>
    </svg>
  ];

  const solutions = portalData?.solutions || [
    {
      id: 'sol-1',
      icon: '__svg_0__',
      title: 'Custom API & Plugin Development',
      info: 'Rebuilding payment gateways, merchant integration models, and automated platform triggers that hook directly into Shopify, WooCommerce, and CRM ecosystems.'
    },
    {
      id: 'sol-2',
      icon: '__svg_1__',
      title: 'B2B Agent & Member Marketplace Portals',
      info: 'Platform solutions built with role-based dashboard architectures, dynamic subscriptions, document management pipelines, and onboarding checklists.'
    },
    {
      id: 'sol-3',
      icon: '__svg_2__',
      title: 'Automated Booking & Meeting Engines',
      info: 'Direct synchronizations with Google/Outlook calendars, auto-generating dynamic meeting channels, notifications, and client routing models.'
    }
  ];

  return (
    <section id="software-solutions" className="section software-section">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">SOFTWARE SOLUTIONS</span>
          <h2 className="section-heading">
            Most agencies build websites.{' '}
            <span className="gradient-text">Some build campaigns. Very few build products.</span>
          </h2>
          <p className="section-body-lead">
            MAD LABS is the product engineering arm of the MAD universe - a dedicated software and technology capability that designs, builds and deploys enterprise-grade solutions for real business problems.
          </p>
          <p className="section-body-sub">
            From multi-tenant SaaS platforms to custom-built operational tools and AI-powered workflows, MAD LABS delivers technology that works in production, not just in presentations. Most software agencies push you to choose between a generic product and an expensive custom build. MAD LABS offers both - from the same team, on the same infrastructure, to the same standard.
          </p>
        </div>

        {/* MAD Operations Portal Mockup */}
        <div className="operations-portal-window">
          <div className="portal-titlebar">
            <div className="portal-titlebar-left">
              <div className="portal-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <span className="portal-name">{portalData?.portalTitle || 'MAD Operations Portal v2.4'}</span>
            </div>
            <div className="portal-status-live">
              <span className="portal-pulse-dot"></span> {portalData?.portalStatus || 'Live Deployment'}
            </div>
          </div>

          <div className="portal-body">
            <div className="stats-cells-grid">
              {stats.map((stat, idx) => (
                <div className="stat-cell" key={stat.id || idx}>
                  <span className="stat-number">{stat.number}</span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              ))}
            </div>

            <div className="portal-telemetry-box">
              <div className="telemetry-meta">
                <span>{portalData?.telemetryLabel || 'Realtime Microservice Telemetry'}</span>
                <span>{portalData?.telemetrySub || 'Latency: 18ms • Zero Error Rate'}</span>
              </div>
              <svg className="telemetry-svg" viewBox="0 0 800 60" preserveAspectRatio="none">
                <path
                  d="M0,45 L120,40 L180,48 L240,25 L320,38 L400,15 L460,42 L520,30 L600,20 L680,35 L740,18 L800,28"
                  fill="none"
                  stroke="#8B5CF6"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* 3 Solution Cards */}
        <div className="solutions-cards-grid">
          {solutions.map((sol, idx) => (
            <div className="solution-feature-card" key={sol.id || idx}>
              <div className="solution-icon-wrap">
                {sol.icon && sol.icon.startsWith('__svg_') ? (
                  solutionIcons[parseInt(sol.icon.replace('__svg_', '').replace('__', ''), 10)]
                ) : sol.icon && !sol.icon.startsWith('./') && sol.icon.includes('<svg') ? (
                  <span dangerouslySetInnerHTML={{ __html: sol.icon }} />
                ) : sol.icon && (sol.icon.startsWith('./') || sol.icon.startsWith('http') || sol.icon.startsWith('/')) ? (
                  <img src={sol.icon} alt={sol.title} />
                ) : (
                  solutionIcons[idx % solutionIcons.length]
                )}
              </div>
              <h4 className="solution-card-title">{sol.title}</h4>
              <p className="solution-card-info">{sol.info}</p>
            </div>
          ))}
        </div>

        {/* Confidentiality Banner */}
        <div className="confidentiality-banner">
          <i className="fa-solid fa-shield-halved" aria-hidden="true"></i>
          <p>
            {portalData?.confidentialityText ||
              'Client names are kept confidential by mutual agreement - a mark of the discretion and professionalism that defines every MAD LABS engagement.'}
          </p>
        </div>

        {/* Action Button */}
        <div className="madlabs-action-wrap">
          <button
            className="btn-madlabs"
            onClick={() => window.open(portalData?.actionButtonUrl || 'https://madlabs.lk', '_blank')}
          >
            <img src="./madlabs_logo.png" alt="MAD Labs Symbol" />{' '}
            {portalData?.actionButtonText || 'Explore MAD labs Portfolio'}
          </button>
        </div>
      </div>
    </section>
  );
}
