import React from 'react';

export default function Footer() {
  const footerLinks = [
    { label: 'Why MAD?', href: '#why-mad' },
    { label: 'The Model', href: '#mad-model' },
    { label: 'Web & Digital', href: '#web-digital' },
    { label: 'Social & Marketing', href: '#social-marketing' },
    { label: 'Software', href: '#software-solutions' },
    { label: 'Clients & Partners', href: '#clients-partners' },
    { label: 'Insights', href: '#insights' },
    { label: 'The Opportunity', href: '#the-opportunity' },
    { label: 'Contact', href: '#contact' }
  ];

  const handleLinkClick = (event, href) => {
    event.preventDefault();

    const targetId = href.replace('#', '');
    const targetElement = document.getElementById(targetId);

    if (!targetElement) {
      return;
    }

    // Update the URL hash without triggering the browser's default jump
    window.history.pushState(null, '', href);

    // Smooth scroll directly to the section
    targetElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <footer className="footer-bar">
      <div className="footer-inner">
        <p className="footer-copy">
          &copy; 2026 MAD Marketing. All rights reserved.
        </p>

        <nav className="footer-nav" aria-label="Footer Navigation">
          {footerLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="footer-link"
              onClick={(event) => handleLinkClick(event, link.href)}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}