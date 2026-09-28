import React, { useState, useEffect } from 'react';

export default function Navbar({ activeSection }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const navLinks = [
    { label: 'Why MAD?', href: '#why-mad', sec: 'why-mad' },
    { label: 'The Model', href: '#mad-model', sec: 'mad-model' },
    { label: 'Web & Digital', href: '#web-digital', sec: 'web-digital' },
    {
      label: 'Social & Marketing',
      href: '#social-marketing',
      sec: 'social-marketing'
    },
    {
      label: 'Software',
      href: '#software-solutions',
      sec: 'software-solutions'
    },
    {
      label: 'Clients & Partners',
      href: '#clients-partners',
      sec: 'clients-partners'
    },
    { label: 'Insights', href: '#insights', sec: 'insights' },
    {
      label: 'The Opportunity',
      href: '#the-opportunity',
      sec: 'the-opportunity'
    }
  ];

  const handleLinkClick = (event, href) => {
    event.preventDefault();

    // Close mobile navigation
    setMobileOpen(false);

    const targetId = href.replace('#', '');
    const targetElement = document.getElementById(targetId);

    if (!targetElement) {
      return;
    }

    // Update URL without triggering normal browser anchor behavior
    window.history.pushState(null, '', href);

    // Wait briefly so mobile menu can close before scrolling
    requestAnimationFrame(() => {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">

        {/* Logo */}
        <a
          href="#why-mad"
          className="nav-brand"
          aria-label="MAD Marketing Home"
          onClick={(event) => handleLinkClick(event, '#why-mad')}
        >
          <img
            src="./assets/mad_logo.png"
            alt="MAD Marketing"
            className="nav-logo"
          />
        </a>

        {/* Navigation */}
        <nav className={`nav-menu ${mobileOpen ? 'open' : ''}`}>
          {navLinks.map((link) => (
            <a
              key={link.sec}
              href={link.href}
              className={`nav-link ${activeSection === link.sec ? 'active' : ''
                }`}
              onClick={(event) => handleLinkClick(event, link.href)}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Navigation Actions */}
        <div className="nav-actions">

          {/* Let's Talk Button */}
          <a
            href="#contact"
            className="btn btn-gradient"
            onClick={(event) => handleLinkClick(event, '#contact')}
          >
            Let's Talk
            <i className="fa-solid fa-arrow-right"></i>
          </a>

          {/* Mobile Menu Button */}
          <button
            className={`mobile-toggle ${mobileOpen ? 'active' : ''}`}
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
}