import React, { useState, useEffect, useCallback } from 'react';
import { DataProvider, useData } from './context/DataContext';
import Navbar from './components/Navbar';
import SideProgress from './components/SideProgress';
import HeroSection from './components/HeroSection';
import MadModelSection from './components/MadModelSection';
import WebDigitalSection from './components/WebDigitalSection';
import SocialMarketingSection from './components/SocialMarketingSection';
import SoftwareSolutionsSection from './components/SoftwareSolutionsSection';
import ClientsPartnersSection from './components/ClientsPartnersSection';
import BlogSection from './components/BlogSection';
import OpportunitySection from './components/OpportunitySection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import CaseStudyModal from './components/CaseStudyModal';
import SuccessModal from './components/SuccessModal';
import BlogArchivePage from './components/BlogArchivePage';
import BlogArticlePage from './components/BlogArticlePage';
import AdminDashboard from './components/AdminDashboard';
import { getBlogSlug } from './utils/slugify';

function parseCurrentRoute() {
  const pathname = window.location.pathname.replace(/\/+$/, '') || '/';
  const hash = window.location.hash;

  // 1. Admin route
  if (hash === '#admin') {
    return { page: 'admin' };
  }

  // 2. Blog listing (/blog or #blogs or #/blog)
  if (pathname === '/blog' || hash === '#blogs' || hash === '#/blog') {
    return { page: 'blog-archive' };
  }

  // 3. Blog article (/blog/:slug or #/blog/:slug or #blog/:slug)
  if (pathname.startsWith('/blog/')) {
    const slug = pathname.replace('/blog/', '').trim();
    if (slug) return { page: 'blog-article', slug };
  }
  if (hash.startsWith('#/blog/')) {
    const slug = hash.replace('#/blog/', '').trim();
    if (slug) return { page: 'blog-article', slug };
  }
  if (hash.startsWith('#blog/')) {
    const slug = hash.replace('#blog/', '').trim();
    if (slug) return { page: 'blog-article', slug };
  }

  // Default home
  return { page: 'home' };
}

function MainApp() {
  const { getBlogBySlug } = useData();
  const [activeSection, setActiveSection] = useState('why-mad');
  const [selectedProject, setSelectedProject] = useState(null);
  const [successData, setSuccessData] = useState(null);
  const [spotlightPos, setSpotlightPos] = useState({ x: -500, y: -500 });
  const [currentRoute, setCurrentRoute] = useState(() => parseCurrentRoute());

  // Listen to popstate and hashchange for backward/forward navigation
  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentRoute(parseCurrentRoute());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  // Safe navigation helper supporting pushState and fallback hash
  const navigateTo = useCallback((targetUrl) => {
    try {
      window.history.pushState({}, '', targetUrl);
      setCurrentRoute(parseCurrentRoute());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      // Fallback for file:// or restricted environments
      if (targetUrl === '/blog') {
        window.location.hash = '#blogs';
      } else if (targetUrl.startsWith('/blog/')) {
        const slug = targetUrl.replace('/blog/', '');
        window.location.hash = `#/blog/${slug}`;
      } else {
        window.location.hash = '#why-mad';
      }
      setCurrentRoute(parseCurrentRoute());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  // Mouse spotlight tracker
  useEffect(() => {
    const handleMouseMove = (e) => {
      setSpotlightPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // IntersectionObserver for tracking active section on Home page
  useEffect(() => {
    if (currentRoute.page !== 'home') return;

    const sectionIds = [
      'why-mad',
      'mad-model',
      'web-digital',
      'social-marketing',
      'software-solutions',
      'clients-partners',
      'insights',
      'the-opportunity',
      'contact'
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: '-25% 0px -40% 0px',
        threshold: 0.15
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [currentRoute.page]);

  // View: Admin Dashboard
  if (currentRoute.page === 'admin') {
    return (
      <AdminDashboard
        onBackToSite={() => navigateTo('/')}
      />
    );
  }

  // View: Blog Listing / Archive
  if (currentRoute.page === 'blog-archive') {
    return (
      <BlogArchivePage
        onBackToHome={() => navigateTo('/')}
        onOpenBlog={(blog) => {
          const slug = getBlogSlug(blog);
          navigateTo(`/blog/${slug}`);
        }}
      />
    );
  }

  // View: Blog Article Detail
  if (currentRoute.page === 'blog-article') {
    const activeBlog = getBlogBySlug(currentRoute.slug);
    return (
      <BlogArticlePage
        blog={activeBlog}
        onNavigateBlog={(targetBlog) => {
          const slug = getBlogSlug(targetBlog);
          navigateTo(`/blog/${slug}`);
        }}
        onBackToBlogList={() => navigateTo('/blog')}
        onBackToHome={() => navigateTo('/')}
      />
    );
  }

  // View: Main Portfolio Landing Page
  return (
    <div className="app-root">
      {/* Ambient background atmosphere */}
      <div className="ambient-glow" aria-hidden="true">
        <div className="glow-orb glow-orb-1"></div>
        <div className="glow-orb glow-orb-2"></div>
        <div className="glow-orb glow-orb-3"></div>
      </div>
      <div className="tech-grid-overlay" aria-hidden="true"></div>
      <div
        className="mouse-spotlight"
        style={{ left: `${spotlightPos.x}px`, top: `${spotlightPos.y}px` }}
        aria-hidden="true"
      ></div>

      {/* Navigation */}
      <Navbar activeSection={activeSection} />
      <SideProgress activeSection={activeSection} />

      {/* Main Content Sections */}
      <main>
        <HeroSection />
        <MadModelSection />
        <WebDigitalSection onOpenCaseStudy={(project) => setSelectedProject(project)} />
        <SocialMarketingSection />
        <SoftwareSolutionsSection />
        <ClientsPartnersSection />
        
        {/* Blog Teaser Section */}
        <BlogSection
          onOpenBlog={(blog) => {
            const slug = getBlogSlug(blog);
            navigateTo(`/blog/${slug}`);
          }}
          onOpenArchive={() => navigateTo('/blog')}
        />

        <OpportunitySection />
        <ContactSection onInquirySuccess={(data) => setSuccessData(data)} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Case Study Modal */}
      {selectedProject && (
        <CaseStudyModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      {/* Success Modal */}
      {successData && (
        <SuccessModal
          data={successData}
          onClose={() => setSuccessData(null)}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <DataProvider>
      <MainApp />
    </DataProvider>
  );
}
