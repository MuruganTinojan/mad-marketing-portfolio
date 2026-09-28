import React, { createContext, useContext, useState, useEffect } from 'react';
import { projectsData as initialProjects, clientLogos as initialPartners } from '../data/projectsData';
import { defaultBlogs } from '../data/blogsData';
import { defaultPortalData } from '../data/defaultPortalData';

const DataContext = createContext(null);

const STORAGE_KEYS = {
  BLOGS: 'mad_blogs_v2',
  PROJECTS: 'mad_projects_v2',
  PORTAL: 'mad_portal_v2',
  PARTNERS: 'mad_partners_v2'
};

function sanitizeLogoSrc(src) {
  if (!src) return '';
  if (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('data:')) return src;
  let s = src.replace(/^\//, './');
  if (!s.startsWith('./')) s = `./${s}`;
  if (s.includes("client's LOGOS")) {
    s = s.replace("./assets/client's LOGOS/Alliance Independent Agency Logo.png", "./assets/clients/alliance.png")
         .replace("./assets/client's LOGOS/apply2xl.png", "./assets/clients/apply2xl.png")
         .replace("./assets/client's LOGOS/glp-logo-Cuh0Loi3.png", "./assets/clients/goldline.png")
         .replace("./assets/client's LOGOS/kingsford.png", "./assets/clients/kingsford.png")
         .replace("./assets/client's LOGOS/neesh inc.webp", "./assets/clients/neesh-inc.webp")
         .replace("./assets/client's LOGOS/neesh spice.webp", "./assets/clients/neesh-spice.webp")
         .replace("./assets/client's LOGOS/VXL Logo.png", "./assets/clients/vxl-logo.png")
         .replace("./assets/client's LOGOS/vxl migration.webp", "./assets/clients/vxl-migration.webp")
         .replace("./assets/client's LOGOS/MADHATTER logo.png", "./assets/clients/madhatter.png")
         .replace("./assets/client's LOGOS/PAPPARICH-logo.png", "./assets/clients/papparich.png")
         .replace("./assets/client's LOGOS/nccyw.jpg", "./assets/clients/nccyw.jpg")
         .replace("./assets/client's LOGOS/swasthi.png", "./assets/clients/swasthi.png")
         .replace("./assets/client's LOGOS/delta new.png", "./assets/clients/delta.png");
  }
  return s;
}

export function DataProvider({ children }) {
  // 1. Blogs State
  const [blogs, setBlogs] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BLOGS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to parse saved blogs from localStorage', e);
    }
    return defaultBlogs;
  });

  // 2. Projects State
  const [projects, setProjects] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROJECTS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to parse saved projects from localStorage', e);
    }
    return initialProjects;
  });

  // 3. Portal / Software Solutions State
  const [portalData, setPortalData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PORTAL);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to parse saved portal data from localStorage', e);
    }
    return defaultPortalData;
  });

  // 4. Clients / Partners State
  const [partners, setPartners] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PARTNERS);
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.map((p) => ({ ...p, src: sanitizeLogoSrc(p.src) }));
      }
    } catch (e) {
      console.warn('Failed to parse saved partners from localStorage', e);
    }
    return initialPartners.map((p) => ({ ...p, src: sanitizeLogoSrc(p.src) }));
  });

  // Save to LocalStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.BLOGS, JSON.stringify(blogs));
    } catch (e) {
      console.error('Error saving blogs:', e);
    }
  }, [blogs]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
    } catch (e) {
      console.error('Error saving projects:', e);
    }
  }, [projects]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PORTAL, JSON.stringify(portalData));
    } catch (e) {
      console.error('Error saving portal data:', e);
    }
  }, [portalData]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PARTNERS, JSON.stringify(partners));
    } catch (e) {
      console.error('Error saving partners:', e);
    }
  }, [partners]);

  // Blog CRUD
  const addBlog = (newBlog) => {
    const blogWithId = {
      id: newBlog.id || `blog-${Date.now()}`,
      date: newBlog.date || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      readTime: newBlog.readTime || '4 min read',
      category: newBlog.category || 'General',
      author: newBlog.author || 'MAD Editorial',
      authorAvatar: newBlog.authorAvatar || './assets/mad_logo.png',
      tags: Array.isArray(newBlog.tags) ? newBlog.tags : [],
      ...newBlog
    };
    setBlogs((prev) => [blogWithId, ...prev]);
    return blogWithId;
  };

  const updateBlog = (id, updatedFields) => {
    setBlogs((prev) =>
      prev.map((b) => (b.id === id ? { ...b, ...updatedFields } : b))
    );
  };

  const deleteBlog = (id) => {
    setBlogs((prev) => prev.filter((b) => b.id !== id));
  };

  // Projects CRUD
  const addProject = (newProject) => {
    const projectWithId = {
      id: newProject.id || `project-${Date.now()}`,
      title: newProject.title || 'Untitled Project',
      domain: newProject.domain || 'example.com',
      region: newProject.region || 'lk',
      regionLabel: newProject.regionLabel || 'Global',
      summary: newProject.summary || '',
      fullStory: newProject.fullStory || '',
      techTags: Array.isArray(newProject.techTags) ? newProject.techTags : ['React'],
      image: newProject.image || './UI/Rectangle 1.png',
      lighthouse: newProject.lighthouse || {
        performance: 95,
        accessibility: 95,
        bestPractices: 95,
        seo: 95
      },
      clientType: newProject.clientType || 'Corporate Client',
      keyOutcome: newProject.keyOutcome || 'Engineered for high conversion.',
      ...newProject
    };
    setProjects((prev) => [projectWithId, ...prev]);
    return projectWithId;
  };

  const updateProject = (id, updatedFields) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updatedFields } : p))
    );
  };

  const deleteProject = (id) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  // Portal Updates
  const updatePortal = (newPortalData) => {
    setPortalData((prev) => ({
      ...prev,
      ...newPortalData
    }));
  };

  // Partners CRUD
  const addPartner = (newPartner) => {
    setPartners((prev) => [...prev, newPartner]);
  };

  const updatePartner = (index, updatedPartner) => {
    setPartners((prev) =>
      prev.map((item, idx) => (idx === index ? updatedPartner : item))
    );
  };

  const deletePartner = (index) => {
    setPartners((prev) => prev.filter((_, idx) => idx !== index));
  };

  // Reset to Defaults
  const resetAllDefaults = () => {
    setBlogs(defaultBlogs);
    setProjects(initialProjects);
    setPortalData(defaultPortalData);
    setPartners(initialPartners);
    localStorage.removeItem(STORAGE_KEYS.BLOGS);
    localStorage.removeItem(STORAGE_KEYS.PROJECTS);
    localStorage.removeItem(STORAGE_KEYS.PORTAL);
    localStorage.removeItem(STORAGE_KEYS.PARTNERS);
  };

  // Export JSON
  const exportAllJSON = () => {
    const fullData = {
      blogs,
      projects,
      portalData,
      partners,
      exportedAt: new Date().toISOString()
    };
    return JSON.stringify(fullData, null, 2);
  };

  // Import JSON
  const importAllJSON = (jsonString) => {
    try {
      const data = JSON.parse(jsonString);
      if (Array.isArray(data.blogs)) setBlogs(data.blogs);
      if (Array.isArray(data.projects)) setProjects(data.projects);
      if (data.portalData) setPortalData(data.portalData);
      if (Array.isArray(data.partners)) setPartners(data.partners);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  return (
    <DataContext.Provider
      value={{
        blogs,
        projects,
        portalData,
        partners,
        addBlog,
        updateBlog,
        deleteBlog,
        addProject,
        updateProject,
        deleteProject,
        updatePortal,
        addPartner,
        updatePartner,
        deletePartner,
        resetAllDefaults,
        exportAllJSON,
        importAllJSON
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
