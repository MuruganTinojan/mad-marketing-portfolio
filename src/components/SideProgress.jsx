import React from 'react';

export default function SideProgress({ activeSection }) {
  const sections = [
    { id: 'why-mad', label: 'Why MAD?' },
    { id: 'mad-model', label: 'The Model' },
    { id: 'web-digital', label: 'Web & Digital' },
    { id: 'social-marketing', label: 'Social & Marketing' },
    { id: 'software-solutions', label: 'Software Solutions' },
    { id: 'clients-partners', label: 'Clients & Partners' },
    { id: 'insights', label: 'Insights & Blog' },
    { id: 'the-opportunity', label: 'The Opportunity' },
    { id: 'contact', label: 'Get in Touch' }
  ];

  return (
    <nav className="side-progress-nav" aria-label="Section Quick Navigation">
      {sections.map((sec) => (
        <a
          key={sec.id}
          href={`#${sec.id}`}
          className={`progress-dot ${activeSection === sec.id ? 'active' : ''}`}
          aria-label={sec.label}
        >
          <span className="dot-tooltip">{sec.label}</span>
        </a>
      ))}
    </nav>
  );
}
