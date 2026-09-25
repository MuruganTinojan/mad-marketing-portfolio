import React, { useState, useEffect } from 'react';
import { DataProvider } from './context/DataContext';
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
import BlogReaderModal from './components/BlogReaderModal';
import BlogArchivePage from './components/BlogArchivePage';
import AdminDashboard from './components/AdminDashboard';

function MainApp() {
  const [activeSection, setActiveSection] = useState('why-mad');
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [successData, setSuccessData] = useState(null);
  const [spotlightPos, setSpotlightPos] = useState({ x: -500, y: -500 });
  const [viewMode, setViewMode] = useState('home'); // 'home' | 'blogs' | 'admin'

  // Hash-based view switching & browser back/forward support
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#blogs') {
        setViewMode('blogs');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#admin') {
        setViewMode('admin');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setViewMode('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
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
    if (viewMode !== 'home') return;

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
  }, [viewMode]);

  // If in Admin Dashboard view
  if (viewMode === 'admin') {
    return (
      <AdminDashboard
        onBackToSite={() => {
          window.location.hash = '#why-mad';
        }}
      />
    );
  }

  // If in Blog Archive Page view
  if (viewMode === 'blogs') {
    return (
      <>
        <BlogArchivePage
          onBackToHome={() => {
            window.location.hash = '#insights';
          }}
          onOpenBlog={(blog) => setSelectedBlog(blog)}
        />
        {selectedBlog && (
          <BlogReaderModal
            blog={selectedBlog}
            onClose={() => setSelectedBlog(null)}
          />
        )}
      </>
    );
  }

  // Standard Main Portfolio Landing Page
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
        
        {/* Blog Section (between Clients & Partners and The Opportunity) */}
        <BlogSection onOpenBlog={(blog) => setSelectedBlog(blog)} />

        <OpportunitySection />
        <ContactSection onInquirySuccess={(data) => setSuccessData(data)} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      {selectedProject && (
        <CaseStudyModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      {selectedBlog && (
        <BlogReaderModal
          blog={selectedBlog}
          onClose={() => setSelectedBlog(null)}
        />
      )}

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
