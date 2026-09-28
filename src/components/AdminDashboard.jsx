import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { showcaseGallery } from '../data/projectsData';

export default function AdminDashboard({ onBackToSite }) {
  const {
    blogs,
    projects,
    portalData,
    partners,
    addBlog,
    updateBlog,
    deleteBlog,
    moveBlog,
    addProject,
    updateProject,
    deleteProject,
    moveProject,
    updatePortal,
    addPartner,
    updatePartner,
    deletePartner,
    downloadBlogsJson,
    resetAllDefaults,
    exportAllJSON,
    importAllJSON
  } = useData();

  const [activeTab, setActiveTab] = useState('blogs'); // 'blogs' | 'projects' | 'portal' | 'partners' | 'backup'
  const [toastMessage, setToastMessage] = useState('');

  // ---------------- Security / Auth Gate State ----------------
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      return sessionStorage.getItem('mad_admin_session') === 'true';
    } catch {
      return false;
    }
  });
  const [passcode, setPasscode] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (passcode.trim() === 'mad2026' || passcode.trim() === 'admin' || passcode.trim() === 'MAD2026') {
      try {
        sessionStorage.setItem('mad_admin_session', 'true');
      } catch (err) {
        console.warn(err);
      }
      setIsAuthenticated(true);
      setLoginError('');
      showToast('🔑 Studio Unlocked');
    } else {
      setLoginError('Incorrect passcode. Default master key: mad2026');
    }
  };

  const handleLogout = () => {
    try {
      sessionStorage.removeItem('mad_admin_session');
    } catch (err) {
      console.warn(err);
    }
    setIsAuthenticated(false);
    onBackToSite();
  };

  // ---------------- Blog Editor State ----------------
  const [editingBlogId, setEditingBlogId] = useState(null);
  const [imageMode, setImageMode] = useState('existing'); // 'existing' | 'upload'
  const [uploadError, setUploadError] = useState('');
  const [blogForm, setBlogForm] = useState({
    title: '',
    category: 'Web', // Controlled category: 'Web' | 'SEO' | 'UX' | 'Marketing' | 'Design'
    seoTitle: '',
    metaDescription: '',
    targetKeywords: '',
    publishDate: new Date().toISOString().split('T')[0],
    img: 'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?q=80&w=1200&auto=format&fit=crop',
    highlight: '',
    content: ''
  });

  const existingBlogImages = [
    { label: 'Mobile Optimized UI', url: 'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?q=80&w=1200&auto=format&fit=crop' },
    { label: 'Web Design Trends', url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1200&auto=format&fit=crop' },
    { label: 'Local SEO Strategy', url: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=1200&auto=format&fit=crop' },
    { label: 'E-Commerce UX Retail', url: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?q=80&w=1200&auto=format&fit=crop' },
    { label: 'Organic Ads Research', url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop' },
    { label: 'Lighthouse Performance', url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop' },
    { label: 'Technical SEO Guide', url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop' },
    { label: 'Micro-Interactions UX', url: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=80&w=1200&auto=format&fit=crop' },
    { label: 'Design Systems Tokens', url: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=1200&auto=format&fit=crop' },
    { label: 'CRM Architecture', url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop' },
    { label: 'Enterprise Cloud Grid', url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop' }
  ];

  // ---------------- Project Editor State ----------------
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [projectImageMode, setProjectImageMode] = useState('gallery'); // 'gallery' | 'upload' | 'custom'
  const [projectUploadError, setProjectUploadError] = useState('');
  const [projectForm, setProjectForm] = useState({
    title: '',
    domain: '',
    region: 'lk',
    regionLabel: 'Sri Lanka',
    summary: '',
    fullStory: '',
    techTags: 'React, TypeScript, CSS3',
    image: './showcase/allindependentagencies.org.jpeg',
    browserUrl: '',
    clientType: 'Enterprise',
    keyOutcome: 'High performance metrics achieved.'
  });

  // ---------------- Portal Editor State ----------------
  const [portalForm, setPortalForm] = useState(() => ({
    portalTitle: portalData.portalTitle || 'MAD Operations Portal v2.4',
    portalStatus: portalData.portalStatus || 'Live Deployment',
    telemetryLabel: portalData.telemetryLabel || 'Realtime Microservice Telemetry',
    telemetrySub: portalData.telemetrySub || 'Latency: 18ms • Zero Error Rate',
    stats: portalData.stats || [],
    solutions: portalData.solutions || [],
    confidentialityText: portalData.confidentialityText || '',
    actionButtonText: portalData.actionButtonText || 'Explore MAD labs Portfolio',
    actionButtonUrl: portalData.actionButtonUrl || 'https://madlabs.lk'
  }));

  // ---------------- Partner Editor State ----------------
  const [partnerForm, setPartnerForm] = useState({
    name: '',
    src: ''
  });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // ================= Blog Handlers =================
  const handleEditBlog = (blog) => {
    setEditingBlogId(blog.id);
    setBlogForm({
      title: blog.title || '',
      category: ['Web', 'SEO', 'UX', 'Marketing', 'Design'].includes(blog.category) ? blog.category : 'Web',
      seoTitle: blog.seoTitle || '',
      metaDescription: blog.metaDescription || blog.excerpt || '',
      targetKeywords: blog.targetKeywords || (Array.isArray(blog.tags) ? blog.tags.join(', ') : ''),
      publishDate: blog.publishDate || blog.date || new Date().toISOString().split('T')[0],
      img: blog.img || blog.image || 'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?q=80&w=1200&auto=format&fit=crop',
      highlight: blog.highlight || '',
      content: blog.content || blog['content-1'] || ''
    });
  };

  const handleImageFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate type
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/svg+xml'];
    if (!validTypes.includes(file.type)) {
      setUploadError('Please select a valid image (PNG, JPG, WebP, SVG)');
      return;
    }

    // Validate size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('Image size exceeds 5MB limit');
      return;
    }

    setUploadError('');
    const reader = new FileReader();
    reader.onload = (event) => {
      setBlogForm((prev) => ({
        ...prev,
        img: event.target.result
      }));
      showToast(`📸 Loaded "${file.name}"`);
    };
    reader.readAsDataURL(file);
  };

  const handleSaveBlog = (e) => {
    e.preventDefault();
    if (!blogForm.title.trim()) {
      showToast('⚠️ Please enter a blog title');
      return;
    }

    const payload = {
      title: blogForm.title.trim(),
      category: blogForm.category,
      seoTitle: blogForm.seoTitle || `${blogForm.title.trim()} | MAD Marketing`,
      metaDescription: blogForm.metaDescription || blogForm.title.trim(),
      targetKeywords: blogForm.targetKeywords || '',
      publishDate: blogForm.publishDate || new Date().toISOString().split('T')[0],
      img: blogForm.img,
      image: blogForm.img,
      highlight: blogForm.highlight,
      content: blogForm.content
    };

    if (editingBlogId) {
      updateBlog(editingBlogId, payload);
      showToast('✅ Blog updated successfully!');
    } else {
      addBlog(payload);
      showToast('✅ New blog added to portfolio!');
    }

    // Reset
    setEditingBlogId(null);
    setBlogForm({
      title: '',
      category: 'Web',
      seoTitle: '',
      metaDescription: '',
      targetKeywords: '',
      publishDate: new Date().toISOString().split('T')[0],
      img: 'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?q=80&w=1200&auto=format&fit=crop',
      highlight: '',
      content: ''
    });
  };

  // ================= Project Handlers =================
  const handleProjectImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/svg+xml'];
    if (!validTypes.includes(file.type)) {
      setProjectUploadError('Please select a valid image (PNG, JPG, WebP, SVG)');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setProjectUploadError('Image size exceeds 5MB limit');
      return;
    }

    setProjectUploadError('');
    const reader = new FileReader();
    reader.onload = (event) => {
      setProjectForm((prev) => ({
        ...prev,
        image: event.target.result
      }));
      showToast(`📸 Loaded "${file.name}" for project`);
    };
    reader.readAsDataURL(file);
  };

  const handleEditProject = (proj) => {
    setEditingProjectId(proj.id);
    const imgPath = proj.image || './showcase/allindependentagencies.org.jpeg';
    if (imgPath.startsWith('data:')) {
      setProjectImageMode('upload');
    } else if (showcaseGallery.some((g) => g.file === imgPath)) {
      setProjectImageMode('gallery');
    } else {
      setProjectImageMode('gallery');
    }

    setProjectForm({
      title: proj.title,
      domain: proj.domain,
      region: proj.region || 'lk',
      regionLabel: proj.regionLabel || 'Sri Lanka',
      summary: proj.summary,
      fullStory: proj.fullStory || proj.summary,
      techTags: Array.isArray(proj.techTags) ? proj.techTags.join(', ') : '',
      image: imgPath,
      browserUrl: proj.domain ? `https://${proj.domain}` : '',
      clientType: proj.clientType || 'Corporate',
      keyOutcome: proj.keyOutcome || ''
    });
  };

  const handleSaveProject = (e) => {
    e.preventDefault();
    if (!projectForm.title.trim() || !projectForm.domain.trim()) {
      showToast('⚠️ Please enter project title and domain');
      return;
    }

    const payload = {
      title: projectForm.title,
      domain: projectForm.domain,
      region: projectForm.region,
      regionLabel: projectForm.regionLabel,
      summary: projectForm.summary,
      fullStory: projectForm.fullStory,
      techTags: projectForm.techTags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      image: projectForm.image || './showcase/allindependentagencies.org.jpeg',
      clientType: projectForm.clientType,
      keyOutcome: projectForm.keyOutcome
    };

    if (editingProjectId) {
      updateProject(editingProjectId, payload);
      showToast('✅ Showcase project updated!');
    } else {
      addProject(payload);
      showToast('✅ New project added to showcase!');
    }

    setEditingProjectId(null);
    setProjectForm({
      title: '',
      domain: '',
      region: 'lk',
      regionLabel: 'Sri Lanka',
      summary: '',
      fullStory: '',
      techTags: 'React, TypeScript, CSS3',
      image: './showcase/allindependentagencies.org.jpeg',
      browserUrl: '',
      clientType: 'Enterprise',
      keyOutcome: ''
    });
  };

  // ================= Portal Handlers =================
  const handleSavePortal = (e) => {
    e.preventDefault();
    updatePortal(portalForm);
    showToast('✅ Portal & Software metrics updated!');
  };

  // ================= Partner Handlers =================
  const handleAddPartner = (e) => {
    e.preventDefault();
    if (!partnerForm.name.trim() || !partnerForm.src.trim()) {
      showToast('⚠️ Please enter partner company name and logo image path/URL');
      return;
    }
    addPartner({ name: partnerForm.name.trim(), src: partnerForm.src.trim() });
    setPartnerForm({ name: '', src: '' });
    showToast('✅ Partner logo added to ribbon marquee!');
  };

  // ================= Backup Handlers =================
  const handleDownloadBackup = () => {
    const jsonStr = exportAllJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mad-portfolio-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('📥 Backup JSON downloaded successfully!');
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const res = importAllJSON(event.target.result);
      if (res.success) {
        showToast('✅ Backup imported and synchronized!');
      } else {
        showToast('❌ Import error: ' + res.error);
      }
    };
    reader.readAsText(file);
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-login-screen">
        <div className="admin-login-card">
          <div className="admin-login-icon">
            <i className="fa-solid fa-shield-halved"></i>
          </div>
          <span className="admin-pill-tag">RESTRICTED CONSOLE</span>
          <h2 className="admin-login-title">MAD Studio Manager</h2>
          <p className="admin-login-desc">
            Direct access gateway. Enter your studio master key to configure publications, showcase metrics, and partner integrations.
          </p>

          <form onSubmit={handleLogin} className="admin-login-form">
            <div className="admin-field-group">
              <label>Studio Passcode</label>
              <input
                type="password"
                className="admin-input"
                placeholder="Enter passcode (Default: mad2026)"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                autoFocus
              />
            </div>
            {loginError && <div className="admin-login-error">{loginError}</div>}

            <button type="submit" className="btn btn-gradient" style={{ width: '100%', marginTop: '10px' }}>
              Unlock Studio <i className="fa-solid fa-key"></i>
            </button>
          </form>

          <button className="admin-login-return-btn" onClick={onBackToSite}>
            <i className="fa-solid fa-arrow-left"></i> Return to Public Site
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard-root">
      {/* Toast Notification */}
      {toastMessage && <div className="admin-toast-box">{toastMessage}</div>}

      {/* Top Bar */}
      <header className="admin-header-bar">
        <div className="admin-header-inner">
          <div className="admin-brand-col">
            <span className="admin-pill-tag">MANAGEMENT CONSOLE</span>
            <h1 className="admin-brand-title">
              MAD <span className="gradient-text">Studio Manager</span>
            </h1>
          </div>

          <div className="admin-actions-col" style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <button
              className="btn btn-secondary"
              onClick={exportAllJSON}
              title="Download all site data as a JSON file backup"
              style={{ borderColor: 'rgba(0, 230, 153, 0.4)', color: 'var(--color-primary-green)' }}
            >
              <i className="fa-solid fa-download"></i> Export Data (JSON)
            </button>
            <button className="btn btn-secondary" onClick={onBackToSite}>
              <i className="fa-solid fa-globe"></i> View Live Site
            </button>
            <button className="btn btn-secondary" onClick={handleLogout} title="Lock session">
              <i className="fa-solid fa-lock"></i> Lock & Exit
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="admin-nav-tabs-bar">
        <div className="admin-tabs-container">
          <button
            className={`admin-tab-btn ${activeTab === 'blogs' ? 'active' : ''}`}
            onClick={() => setActiveTab('blogs')}
          >
            <i className="fa-solid fa-pen-nib"></i> Articles & Blogs ({blogs.length})
          </button>
          <button
            className={`admin-tab-btn ${activeTab === 'projects' ? 'active' : ''}`}
            onClick={() => setActiveTab('projects')}
          >
            <i className="fa-solid fa-laptop-code"></i> Web & Digital Showcase ({projects.length})
          </button>
          <button
            className={`admin-tab-btn ${activeTab === 'portal' ? 'active' : ''}`}
            onClick={() => setActiveTab('portal')}
          >
            <i className="fa-solid fa-server"></i> Portal Body & Software Stats
          </button>
          <button
            className={`admin-tab-btn ${activeTab === 'partners' ? 'active' : ''}`}
            onClick={() => setActiveTab('partners')}
          >
            <i className="fa-solid fa-handshake"></i> Clients & Partners ({partners.length})
          </button>
          <button
            className={`admin-tab-btn ${activeTab === 'backup' ? 'active' : ''}`}
            onClick={() => setActiveTab('backup')}
          >
            <i className="fa-solid fa-database"></i> Backup & Reset
          </button>
        </div>
      </div>

      {/* Main Studio Body */}
      <main className="admin-main-container">
        {/* ========================================================= */}
        {/* 1. BLOGS TAB                                              */}
        {/* ========================================================= */}
        {activeTab === 'blogs' && (
          <div className="admin-tab-content">
            <div className="admin-dual-pane">
              {/* Left Form: Add / Edit Blog */}
              <div className="admin-pane-card">
                <div className="pane-card-header">
                  <h3>
                    <i className="fa-solid fa-file-circle-plus"></i>{' '}
                    {editingBlogId ? 'Edit Article' : 'Create New Article'}
                  </h3>
                  {editingBlogId && (
                    <button
                      className="btn-text-cancel"
                      onClick={() => {
                        setEditingBlogId(null);
                        setBlogForm({
                          title: '',
                          slug: '',
                          category: 'Enterprise Architecture',
                          readTime: '4 min read',
                          date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
                          image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop',
                          author: 'MAD Editorial',
                          authorAvatar: './assets/mad_logo.png',
                          excerpt: '',
                          content: '',
                          tags: 'Architecture, Cloud'
                        });
                      }}
                    >
                      Cancel Edit
                    </button>
                  )}
                </div>

                <form onSubmit={handleSaveBlog} className="admin-form-stack">
                  <div className="admin-field-group">
                    <label>Article Title *</label>
                    <input
                      type="text"
                      className="admin-input"
                      placeholder="e.g. Why Your Sri Lankan Business Needs a Mobile-Optimized Website"
                      value={blogForm.title}
                      onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                      required
                    />
                  </div>

                  <div className="admin-grid-2">
                    <div className="admin-field-group">
                      <label>Category * (Controlled Selection)</label>
                      <select
                        className="admin-input"
                        value={blogForm.category}
                        onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
                        required
                      >
                        <option value="Web">Web</option>
                        <option value="SEO">SEO</option>
                        <option value="UX">UX</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Design">Design</option>
                      </select>
                    </div>

                    <div className="admin-field-group">
                      <label>Publish Date</label>
                      <input
                        type="date"
                        className="admin-input"
                        value={blogForm.publishDate}
                        onChange={(e) => setBlogForm({ ...blogForm, publishDate: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Featured Image Management (Option A: Upload New | Option B: Choose Existing) */}
                  <div className="admin-field-group">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <label style={{ margin: 0 }}>Featured Image *</label>
                      <div className="image-mode-toggle" style={{ display: 'inline-flex', gap: '6px' }}>
                        <button
                          type="button"
                          className={`btn-action-pill ${imageMode === 'existing' ? 'active' : ''}`}
                          style={{
                            padding: '3px 10px',
                            fontSize: '11px',
                            borderRadius: '4px',
                            background: imageMode === 'existing' ? 'var(--color-primary-green)' : 'rgba(255,255,255,0.08)',
                            color: imageMode === 'existing' ? '#000' : '#fff',
                            border: 'none',
                            cursor: 'pointer',
                            fontWeight: 600
                          }}
                          onClick={() => setImageMode('existing')}
                        >
                          <i className="fa-solid fa-images"></i> Choose Existing
                        </button>
                        <button
                          type="button"
                          className={`btn-action-pill ${imageMode === 'upload' ? 'active' : ''}`}
                          style={{
                            padding: '3px 10px',
                            fontSize: '11px',
                            borderRadius: '4px',
                            background: imageMode === 'upload' ? 'var(--color-primary-green)' : 'rgba(255,255,255,0.08)',
                            color: imageMode === 'upload' ? '#000' : '#fff',
                            border: 'none',
                            cursor: 'pointer',
                            fontWeight: 600
                          }}
                          onClick={() => setImageMode('upload')}
                        >
                          <i className="fa-solid fa-upload"></i> Upload New
                        </button>
                      </div>
                    </div>

                    {imageMode === 'existing' ? (
                      <div className="admin-existing-images-picker">
                        <select
                          className="admin-input"
                          value={blogForm.img}
                          onChange={(e) => setBlogForm({ ...blogForm, img: e.target.value })}
                          style={{ marginBottom: '8px' }}
                        >
                          {existingBlogImages.map((imgItem) => (
                            <option key={imgItem.url} value={imgItem.url}>
                              {imgItem.label} ({imgItem.url.startsWith('http') ? 'External' : 'Local'})
                            </option>
                          ))}
                        </select>
                        <input
                          type="text"
                          className="admin-input"
                          placeholder="Or enter custom image URL or /blog/... path"
                          value={blogForm.img}
                          onChange={(e) => setBlogForm({ ...blogForm, img: e.target.value })}
                        />
                      </div>
                    ) : (
                      <div className="admin-upload-box">
                        <input
                          type="file"
                          accept="image/png, image/jpeg, image/webp, image/svg+xml"
                          className="admin-input"
                          onChange={handleImageFileUpload}
                        />
                        {uploadError && (
                          <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>
                            {uploadError}
                          </p>
                        )}
                        <p style={{ color: 'var(--text-muted)', fontSize: '11px', marginTop: '4px' }}>
                          Accepted formats: PNG, JPG, WebP, SVG. Max file size: 5MB.
                        </p>
                      </div>
                    )}

                    {/* Image Preview Box with error fallback */}
                    <div
                      className="admin-img-preview-box"
                      style={{
                        marginTop: '10px',
                        background: '#080611',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '8px',
                        padding: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px'
                      }}
                    >
                      <img
                        src={blogForm.img}
                        alt="Preview"
                        style={{ width: '90px', height: '60px', objectFit: 'cover', borderRadius: '4px' }}
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop';
                        }}
                      />
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)', overflow: 'hidden' }}>
                        <span style={{ color: '#fff', fontWeight: 600, display: 'block' }}>Live Preview</span>
                        <span style={{ fontSize: '11px', wordBreak: 'break-all' }}>{blogForm.img?.substring(0, 50)}...</span>
                      </div>
                    </div>
                  </div>

                  {/* SEO Fields */}
                  <div className="admin-field-group">
                    <label>SEO Document Title</label>
                    <input
                      type="text"
                      className="admin-input"
                      placeholder="e.g. Mobile-Optimized Websites in 2025 | MAD Marketing"
                      value={blogForm.seoTitle}
                      onChange={(e) => setBlogForm({ ...blogForm, seoTitle: e.target.value })}
                    />
                  </div>

                  <div className="admin-field-group">
                    <label>Meta Description (SEO & Social Previews)</label>
                    <textarea
                      rows="2"
                      className="admin-textarea"
                      placeholder="Compelling 150-160 character description for search engines..."
                      value={blogForm.metaDescription}
                      onChange={(e) => setBlogForm({ ...blogForm, metaDescription: e.target.value })}
                    ></textarea>
                  </div>

                  <div className="admin-field-group">
                    <label>Target Keywords (comma-separated)</label>
                    <input
                      type="text"
                      className="admin-input"
                      placeholder="mobile SEO, Sri Lanka web development, Colombo"
                      value={blogForm.targetKeywords}
                      onChange={(e) => setBlogForm({ ...blogForm, targetKeywords: e.target.value })}
                    />
                  </div>

                  <div className="admin-field-group">
                    <label>Final Article Highlight / CTA Copy</label>
                    <textarea
                      rows="2"
                      className="admin-textarea"
                      placeholder="Ready to future-proof your business with MAD Marketing?..."
                      value={blogForm.highlight}
                      onChange={(e) => setBlogForm({ ...blogForm, highlight: e.target.value })}
                    ></textarea>
                  </div>

                  <div className="admin-field-group">
                    <label>Article Body Content (Markdown supported)</label>
                    <textarea
                      rows="7"
                      className="admin-textarea code-font"
                      placeholder="Use ### for subheadings, - for bullets, and blank lines between paragraphs..."
                      value={blogForm.content}
                      onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                    ></textarea>
                  </div>

                  <button type="submit" className="btn btn-gradient" style={{ width: '100%' }}>
                    {editingBlogId ? 'Update Article' : 'Publish Article'}
                  </button>
                </form>
              </div>

              {/* Right Pane: Live Blogs List */}
              <div className="admin-pane-card">
                <div className="pane-card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                  <h3>
                    <i className="fa-solid fa-list-check"></i> Published Articles ({blogs.length})
                  </h3>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    style={{ fontSize: '12px', padding: '6px 12px' }}
                    onClick={downloadBlogsJson}
                    title="Export blogsData.json directly"
                  >
                    <i className="fa-solid fa-download"></i> Save blogsData.json
                  </button>
                </div>

                <div className="admin-items-list">
                  {blogs.map((b, idx) => (
                    <div key={b.id || idx} className="admin-list-item-card">
                      <img
                        src={b.img || b.image || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop'}
                        alt={b.title}
                        className="admin-item-thumb"
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop';
                        }}
                      />
                      <div className="admin-item-info">
                        <div className="admin-item-badges">
                          {idx === 0 ? (
                            <span className="admin-tag-live">#1 NEWEST (HOMEPAGE)</span>
                          ) : (
                            <span className="admin-tag-order">#{idx + 1}</span>
                          )}
                          <span className="admin-tag-category">{b.category}</span>
                          <span className="admin-tag-date">{b.publishDate || b.date}</span>
                        </div>
                        <h4 className="admin-item-title">{b.title}</h4>
                        <p className="admin-item-snippet">{b.metaDescription || b.excerpt || b['content-1'] || ''}</p>
                      </div>
                      <div className="admin-item-actions">
                        <div className="reorder-btn-group">
                          <button
                            type="button"
                            className="admin-btn-action small reorder"
                            disabled={idx === 0}
                            onClick={() => moveBlog(idx, idx - 1)}
                            title="Move article up (Prioritize on homepage)"
                          >
                            <i className="fa-solid fa-chevron-up"></i>
                          </button>
                          <button
                            type="button"
                            className="admin-btn-action small reorder"
                            disabled={idx === blogs.length - 1}
                            onClick={() => moveBlog(idx, idx + 1)}
                            title="Move article down"
                          >
                            <i className="fa-solid fa-chevron-down"></i>
                          </button>
                        </div>
                        <button
                          type="button"
                          className="admin-btn-action edit"
                          onClick={() => handleEditBlog(b)}
                          title="Edit Article"
                        >
                          <i className="fa-solid fa-pencil"></i>
                        </button>
                        <button
                          type="button"
                          className="admin-btn-action delete"
                          onClick={() => {
                            if (window.confirm(`Delete article: "${b.title}"?`)) {
                              deleteBlog(b.id);
                              showToast('🗑️ Article deleted');
                            }
                          }}
                          title="Delete Article"
                        >
                          <i className="fa-solid fa-trash-can"></i>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* 2. WEB & DIGITAL SHOWCASE TAB                             */}
        {/* ========================================================= */}
        {activeTab === 'projects' && (
          <div className="admin-tab-content">
            <div className="admin-dual-pane">
              {/* Left: Project Editor Form */}
              <div className="admin-pane-card">
                <div className="pane-card-header">
                  <h3>
                    <i className="fa-solid fa-window-restore"></i>{' '}
                    {editingProjectId ? 'Edit Showcase Project' : 'Add Showcase Project'}
                  </h3>
                  {editingProjectId && (
                    <button
                      className="btn-text-cancel"
                      onClick={() => {
                        setEditingProjectId(null);
                        setProjectForm({
                          title: '',
                          domain: '',
                          region: 'lk',
                          regionLabel: 'Sri Lanka',
                          summary: '',
                          fullStory: '',
                          techTags: 'React, TypeScript, CSS3',
                          image: './showcase/allindependentagencies.org.jpeg',
                          browserUrl: '',
                          clientType: 'Enterprise',
                          keyOutcome: ''
                        });
                      }}
                    >
                      Cancel Edit
                    </button>
                  )}
                </div>

                <form onSubmit={handleSaveProject} className="admin-form-stack">
                  <div className="admin-grid-2">
                    <div className="admin-field-group">
                      <label>Showcase Title *</label>
                      <input
                        type="text"
                        className="admin-input"
                        placeholder="e.g. Alliance of Independent Agencies"
                        value={projectForm.title}
                        onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                        required
                      />
                    </div>
                    <div className="admin-field-group">
                      <label>Domain Tag (Pill) *</label>
                      <input
                        type="text"
                        className="admin-input"
                        placeholder="e.g. allindependentagencies.org"
                        value={projectForm.domain}
                        onChange={(e) => setProjectForm({ ...projectForm, domain: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="admin-grid-2">
                    <div className="admin-field-group">
                      <label>Country / Region Tab</label>
                      <select
                        className="admin-input"
                        value={projectForm.region}
                        onChange={(e) => {
                          const reg = e.target.value;
                          const labelMap = {
                            lk: 'Sri Lanka',
                            uk: 'United Kingdom',
                            'ca-au': 'Canada & Australia'
                          };
                          setProjectForm({
                            ...projectForm,
                            region: reg,
                            regionLabel: labelMap[reg] || 'Global'
                          });
                        }}
                      >
                        <option value="lk">Sri Lanka (lk)</option>
                        <option value="uk">United Kingdom (uk)</option>
                        <option value="ca-au">Canada & Australia (ca-au)</option>
                      </select>
                    </div>
                    <div className="admin-field-group">
                      <label>Region Label Display</label>
                      <input
                        type="text"
                        className="admin-input"
                        value={projectForm.regionLabel}
                        onChange={(e) => setProjectForm({ ...projectForm, regionLabel: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Project Screenshot / Mockup Image Management */}
                  <div className="admin-field-group">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap', gap: '6px' }}>
                      <label style={{ margin: 0 }}>Showcase Screenshot Image *</label>
                      <div className="image-mode-toggle" style={{ display: 'inline-flex', gap: '6px' }}>
                        <button
                          type="button"
                          className={`btn-action-pill ${projectImageMode === 'gallery' ? 'active' : ''}`}
                          style={{
                            padding: '3px 10px',
                            fontSize: '11px',
                            borderRadius: '4px',
                            background: projectImageMode === 'gallery' ? 'var(--color-primary-green)' : 'rgba(255,255,255,0.08)',
                            color: projectImageMode === 'gallery' ? '#000' : '#fff',
                            border: 'none',
                            cursor: 'pointer',
                            fontWeight: 600
                          }}
                          onClick={() => setProjectImageMode('gallery')}
                        >
                          <i className="fa-solid fa-folder-open"></i> Choose Image
                        </button>
                        <button
                          type="button"
                          className={`btn-action-pill ${projectImageMode === 'upload' ? 'active' : ''}`}
                          style={{
                            padding: '3px 10px',
                            fontSize: '11px',
                            borderRadius: '4px',
                            background: projectImageMode === 'upload' ? 'var(--color-primary-green)' : 'rgba(255,255,255,0.08)',
                            color: projectImageMode === 'upload' ? '#000' : '#fff',
                            border: 'none',
                            cursor: 'pointer',
                            fontWeight: 600
                          }}
                          onClick={() => setProjectImageMode('upload')}
                        >
                          <i className="fa-solid fa-upload"></i> Upload File
                        </button>
                        <button
                          type="button"
                          className={`btn-action-pill ${projectImageMode === 'custom' ? 'active' : ''}`}
                          style={{
                            padding: '3px 10px',
                            fontSize: '11px',
                            borderRadius: '4px',
                            background: projectImageMode === 'custom' ? 'var(--color-primary-green)' : 'rgba(255,255,255,0.08)',
                            color: projectImageMode === 'custom' ? '#000' : '#fff',
                            border: 'none',
                            cursor: 'pointer',
                            fontWeight: 600
                          }}
                          onClick={() => setProjectImageMode('custom')}
                        >
                          <i className="fa-solid fa-link"></i> Custom URL
                        </button>
                      </div>
                    </div>

                    {projectImageMode === 'gallery' && (
                      <div className="admin-existing-images-picker">
                        <select
                          className="admin-input"
                          value={projectForm.image}
                          onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })}
                          style={{ marginBottom: '8px' }}
                        >
                          {showcaseGallery.map((item) => (
                            <option key={item.file} value={item.file}>
                              {item.label}
                            </option>
                          ))}
                        </select>

                        {/* Quick visual thumbnails grid */}
                        <div
                          style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(75px, 1fr))',
                            gap: '8px',
                            maxHeight: '130px',
                            overflowY: 'auto',
                            padding: '8px',
                            background: 'rgba(255,255,255,0.03)',
                            borderRadius: '8px',
                            border: '1px solid rgba(255,255,255,0.08)'
                          }}
                        >
                          {showcaseGallery.map((item) => {
                            const isSelected = projectForm.image === item.file;
                            return (
                              <div
                                key={item.file}
                                onClick={() => setProjectForm({ ...projectForm, image: item.file })}
                                title={item.label}
                                style={{
                                  cursor: 'pointer',
                                  borderRadius: '6px',
                                  overflow: 'hidden',
                                  border: isSelected ? '2px solid var(--color-primary-green)' : '1px solid rgba(255,255,255,0.1)',
                                  background: '#0a0815',
                                  transition: 'all 0.2s ease',
                                  height: '52px'
                                }}
                              >
                                <img
                                  src={item.file}
                                  alt={item.label}
                                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                  onError={(e) => {
                                    e.target.style.display = 'none';
                                  }}
                                />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {projectImageMode === 'upload' && (
                      <div className="admin-upload-box">
                        <input
                          type="file"
                          accept="image/png, image/jpeg, image/webp, image/svg+xml"
                          className="admin-input"
                          onChange={handleProjectImageUpload}
                        />
                        {projectUploadError && (
                          <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>
                            {projectUploadError}
                          </p>
                        )}
                        <p style={{ color: 'var(--text-muted)', fontSize: '11px', marginTop: '4px' }}>
                          Select an image from your computer (PNG, JPG, WebP, SVG, max 5MB). It is saved directly to your site and lives immediately!
                        </p>
                      </div>
                    )}

                    {projectImageMode === 'custom' && (
                      <div>
                        <input
                          type="text"
                          className="admin-input"
                          placeholder="/showcase/filename.jpeg or https://..."
                          value={projectForm.image}
                          onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })}
                        />
                      </div>
                    )}

                    {/* Mockup Preview Card */}
                    <div
                      style={{
                        marginTop: '10px',
                        background: '#080611',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '8px',
                        padding: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '14px'
                      }}
                    >
                      <img
                        src={projectForm.image}
                        alt="Project Mockup Preview"
                        style={{ width: '110px', height: '65px', objectFit: 'cover', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.1)' }}
                        onError={(e) => {
                          e.target.src = './showcase/allindependentagencies.org.jpeg';
                        }}
                      />
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)', overflow: 'hidden' }}>
                        <span style={{ color: '#fff', fontWeight: 600, display: 'block', marginBottom: '2px' }}>
                          <i className="fa-solid fa-eye"></i> Live Showcase Preview
                        </span>
                        <span style={{ fontSize: '11px', wordBreak: 'break-all', display: 'block' }}>
                          {projectForm.image.startsWith('data:') ? 'Custom Uploaded Data (Base64)' : projectForm.image}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="admin-field-group">
                    <label>Showcase Description (Summary)</label>
                    <textarea
                      rows="3"
                      className="admin-textarea"
                      placeholder="Core problem and engineering solution..."
                      value={projectForm.summary}
                      onChange={(e) => setProjectForm({ ...projectForm, summary: e.target.value })}
                    ></textarea>
                  </div>

                  <div className="admin-field-group">
                    <label>In-depth Story (Case Study Modal)</label>
                    <textarea
                      rows="3"
                      className="admin-textarea"
                      placeholder="Detailed background, architecture, and deployment outcomes..."
                      value={projectForm.fullStory}
                      onChange={(e) => setProjectForm({ ...projectForm, fullStory: e.target.value })}
                    ></textarea>
                  </div>

                  <div className="admin-field-group">
                    <label>Technology Stack Tags (comma-separated)</label>
                    <input
                      type="text"
                      className="admin-input"
                      placeholder="WordPress, CRM Sync, CyberSource, React"
                      value={projectForm.techTags}
                      onChange={(e) => setProjectForm({ ...projectForm, techTags: e.target.value })}
                    />
                  </div>

                  <div className="admin-grid-2">
                    <div className="admin-field-group">
                      <label>Client Category</label>
                      <input
                        type="text"
                        className="admin-input"
                        placeholder="Industry Body / Retainer"
                        value={projectForm.clientType}
                        onChange={(e) => setProjectForm({ ...projectForm, clientType: e.target.value })}
                      />
                    </div>
                    <div className="admin-field-group">
                      <label>Measurable Outcome</label>
                      <input
                        type="text"
                        className="admin-input"
                        placeholder="140% boost in high intent leads"
                        value={projectForm.keyOutcome}
                        onChange={(e) => setProjectForm({ ...projectForm, keyOutcome: e.target.value })}
                      />
                    </div>
                  </div>

                  <button type="submit" className="btn btn-gradient" style={{ width: '100%' }}>
                    {editingProjectId ? 'Save Project Changes' : 'Add Project to Showcase'}
                  </button>
                </form>
              </div>

              {/* Right: Existing Projects List */}
              <div className="admin-pane-card">
                <div className="pane-card-header">
                  <h3>
                    <i className="fa-solid fa-layer-group"></i> Active Projects ({projects.length})
                  </h3>
                  <span className="admin-hint-pill">Top project (#1) is featured on homepage load</span>
                </div>

                <div className="admin-items-list">
                  {projects.map((proj, idx) => (
                    <div key={proj.id} className="admin-list-item-card">
                      <img src={proj.image} alt={proj.title} className="admin-item-thumb" />
                      <div className="admin-item-info">
                        <div className="admin-item-badges">
                          {idx === 0 ? (
                            <span className="admin-tag-live">#1 (FEATURED IN SHOWCASE)</span>
                          ) : (
                            <span className="admin-tag-order">#{idx + 1}</span>
                          )}
                          <span className="admin-tag-category">{proj.regionLabel}</span>
                          <span className="admin-tag-domain">{proj.domain}</span>
                        </div>
                        <h4 className="admin-item-title">{proj.title}</h4>
                      </div>
                      <div className="admin-item-actions">
                        <div className="reorder-btn-group">
                          <button
                            type="button"
                            className="admin-btn-action small reorder"
                            disabled={idx === 0}
                            onClick={() => moveProject(idx, idx - 1)}
                            title="Move project up (Show earlier / Featured)"
                          >
                            <i className="fa-solid fa-chevron-up"></i>
                          </button>
                          <button
                            type="button"
                            className="admin-btn-action small reorder"
                            disabled={idx === projects.length - 1}
                            onClick={() => moveProject(idx, idx + 1)}
                            title="Move project down"
                          >
                            <i className="fa-solid fa-chevron-down"></i>
                          </button>
                        </div>
                        <button
                          type="button"
                          className="admin-btn-action edit"
                          onClick={() => handleEditProject(proj)}
                          title="Edit Project"
                        >
                          <i className="fa-solid fa-pencil"></i>
                        </button>
                        <button
                          type="button"
                          className="admin-btn-action delete"
                          onClick={() => {
                            if (window.confirm(`Delete project "${proj.title}"?`)) {
                              deleteProject(proj.id);
                              showToast('🗑️ Project removed');
                            }
                          }}
                          title="Delete Project"
                        >
                          <i className="fa-solid fa-trash-can"></i>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* 3. PORTAL BODY & SOFTWARE SOLUTIONS TAB                   */}
        {/* ========================================================= */}
        {activeTab === 'portal' && (
          <div className="admin-tab-content">
            <div className="admin-pane-card">
              <div className="pane-card-header">
                <h3>
                  <i className="fa-solid fa-microchip"></i> MAD Operations Portal v2.4 & Solutions Configuration
                </h3>
              </div>

              <form onSubmit={handleSavePortal} className="admin-form-stack">
                <div className="admin-grid-2">
                  <div className="admin-field-group">
                    <label>Portal Title</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={portalForm.portalTitle}
                      onChange={(e) => setPortalForm({ ...portalForm, portalTitle: e.target.value })}
                    />
                  </div>
                  <div className="admin-field-group">
                    <label>Portal Status (Live Indicator)</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={portalForm.portalStatus}
                      onChange={(e) => setPortalForm({ ...portalForm, portalStatus: e.target.value })}
                    />
                  </div>
                </div>

                <div className="admin-grid-2">
                  <div className="admin-field-group">
                    <label>Telemetry Label</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={portalForm.telemetryLabel}
                      onChange={(e) => setPortalForm({ ...portalForm, telemetryLabel: e.target.value })}
                    />
                  </div>
                  <div className="admin-field-group">
                    <label>Telemetry Subtitle</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={portalForm.telemetrySub}
                      onChange={(e) => setPortalForm({ ...portalForm, telemetrySub: e.target.value })}
                    />
                  </div>
                </div>

                <div className="admin-field-group">
                  <label>Confidentiality Banner Text</label>
                  <textarea
                    rows="2"
                    className="admin-textarea"
                    value={portalForm.confidentialityText}
                    onChange={(e) => setPortalForm({ ...portalForm, confidentialityText: e.target.value })}
                  ></textarea>
                </div>

                {/* 4 Stats Grid */}
                <h4 style={{ color: '#fff', marginTop: '1rem' }}>
                  <i className="fa-solid fa-chart-pie"></i> 4 Portal Stat Indicators
                </h4>
                <div className="admin-grid-2">
                  {portalForm.stats.map((stat, idx) => (
                    <div key={idx} className="admin-stat-edit-box">
                      <div className="admin-field-group">
                        <label>Stat #{idx + 1} Value</label>
                        <input
                          type="text"
                          className="admin-input"
                          value={stat.number}
                          onChange={(e) => {
                            const newStats = [...portalForm.stats];
                            newStats[idx].number = e.target.value;
                            setPortalForm({ ...portalForm, stats: newStats });
                          }}
                        />
                      </div>
                      <div className="admin-field-group">
                        <label>Stat #{idx + 1} Label</label>
                        <input
                          type="text"
                          className="admin-input"
                          value={stat.label}
                          onChange={(e) => {
                            const newStats = [...portalForm.stats];
                            newStats[idx].label = e.target.value;
                            setPortalForm({ ...portalForm, stats: newStats });
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* 3 Solutions Cards */}
                <h4 style={{ color: '#fff', marginTop: '1.5rem' }}>
                  <i className="fa-solid fa-cubes"></i> 3 Solution Pillars
                </h4>
                <div className="admin-grid-3">
                  {portalForm.solutions.map((sol, idx) => (
                    <div key={idx} className="admin-stat-edit-box">
                      <div className="admin-field-group">
                        <label>Pillar #{idx + 1} Title</label>
                        <input
                          type="text"
                          className="admin-input"
                          value={sol.title}
                          onChange={(e) => {
                            const newSols = [...portalForm.solutions];
                            newSols[idx].title = e.target.value;
                            setPortalForm({ ...portalForm, solutions: newSols });
                          }}
                        />
                      </div>
                      <div className="admin-field-group">
                        <label>Icon Path</label>
                        <input
                          type="text"
                          className="admin-input"
                          value={sol.icon}
                          onChange={(e) => {
                            const newSols = [...portalForm.solutions];
                            newSols[idx].icon = e.target.value;
                            setPortalForm({ ...portalForm, solutions: newSols });
                          }}
                        />
                      </div>
                      <div className="admin-field-group">
                        <label>Description</label>
                        <textarea
                          rows="3"
                          className="admin-textarea"
                          value={sol.info}
                          onChange={(e) => {
                            const newSols = [...portalForm.solutions];
                            newSols[idx].info = e.target.value;
                            setPortalForm({ ...portalForm, solutions: newSols });
                          }}
                        ></textarea>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="admin-grid-2" style={{ marginTop: '1rem' }}>
                  <div className="admin-field-group">
                    <label>Action Button Text</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={portalForm.actionButtonText}
                      onChange={(e) => setPortalForm({ ...portalForm, actionButtonText: e.target.value })}
                    />
                  </div>
                  <div className="admin-field-group">
                    <label>Action Button URL Target</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={portalForm.actionButtonUrl}
                      onChange={(e) => setPortalForm({ ...portalForm, actionButtonUrl: e.target.value })}
                    />
                  </div>
                </div>

                <button type="submit" className="btn btn-gradient" style={{ marginTop: '1.5rem' }}>
                  Save Portal & Software Settings
                </button>
              </form>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* 4. CLIENTS & PARTNERS TAB                                 */}
        {/* ========================================================= */}
        {activeTab === 'partners' && (
          <div className="admin-tab-content">
            <div className="admin-dual-pane">
              {/* Left: Add Partner Form */}
              <div className="admin-pane-card">
                <div className="pane-card-header">
                  <h3>
                    <i className="fa-solid fa-plus-circle"></i> Add Client / Partner Logo
                  </h3>
                </div>

                <form onSubmit={handleAddPartner} className="admin-form-stack">
                  <div className="admin-field-group">
                    <label>Company / Institution Name *</label>
                    <input
                      type="text"
                      className="admin-input"
                      placeholder="e.g. Acme Corporation"
                      value={partnerForm.name}
                      onChange={(e) => setPartnerForm({ ...partnerForm, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="admin-field-group">
                    <label>Logo Image Path or URL *</label>
                    <input
                      type="text"
                      className="admin-input"
                      placeholder="/assets/client's LOGOS/... or https://..."
                      value={partnerForm.src}
                      onChange={(e) => setPartnerForm({ ...partnerForm, src: e.target.value })}
                      required
                    />
                    {partnerForm.src && (
                      <div className="admin-partner-logo-preview">
                        <img src={partnerForm.src} alt="Logo preview" />
                      </div>
                    )}
                  </div>

                  <button type="submit" className="btn btn-gradient" style={{ width: '100%' }}>
                    Add Partner to Ribbon Marquee
                  </button>
                </form>

                <div className="admin-spec-hint-card" style={{ marginTop: '24px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '18px' }}>
                  <h5 style={{ color: 'var(--color-primary-green)', fontSize: '13px', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <i className="fa-solid fa-circle-info"></i> Ribbon Marquee Specs
                  </h5>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '12.5px', lineHeight: '1.6', margin: 0 }}>
                    Logos are continuously looped inside the white ribbon marquee across the homepage. Recommended image formats are high-resolution PNG or SVG with transparent or clean white backgrounds.
                  </p>
                </div>
              </div>

              {/* Right: Partner Logos Grid */}
              <div className="admin-pane-card">
                <div className="pane-card-header">
                  <h3>
                    <i className="fa-solid fa-ribbon"></i> Live Ribbon Logos ({partners.length})
                  </h3>
                  <span className="admin-hint-pill">Continuously scrolls on homepage</span>
                </div>

                <div className="admin-partners-grid">
                  {partners.map((p, idx) => (
                    <div key={idx} className="admin-partner-card">
                      <div className="partner-logo-box">
                        <img src={p.src} alt={p.name} title={p.name} />
                      </div>
                      <span className="partner-name-text">{p.name}</span>
                      <button
                        className="admin-btn-action delete small"
                        onClick={() => {
                          if (window.confirm(`Remove ${p.name}?`)) {
                            deletePartner(idx);
                            showToast('🗑️ Partner removed');
                          }
                        }}
                        title="Remove Partner"
                      >
                        <i className="fa-solid fa-xmark"></i>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* 5. BACKUP & SYSTEM RESET TAB                              */}
        {/* ========================================================= */}
        {activeTab === 'backup' && (
          <div className="admin-tab-content">
            <div className="admin-pane-card">
              <div className="pane-card-header">
                <h3>
                  <i className="fa-solid fa-shield-halved"></i> Data Synchronization & Backups
                </h3>
              </div>

              <div className="backup-actions-grid">
                <div className="backup-box">
                  <div className="backup-icon">
                    <i className="fa-solid fa-file-export"></i>
                  </div>
                  <h4>Export JSON Backup</h4>
                  <p>Download a complete snapshot of all articles, projects, portal stats, and partner logos.</p>
                  <button className="btn btn-primary" onClick={handleDownloadBackup}>
                    Download Data JSON
                  </button>
                </div>

                <div className="backup-box">
                  <div className="backup-icon">
                    <i className="fa-solid fa-file-import"></i>
                  </div>
                  <h4>Import JSON Backup</h4>
                  <p>Restore or overwrite site content from a previously saved JSON snapshot.</p>
                  <label className="btn btn-secondary" style={{ cursor: 'pointer' }}>
                    Choose File & Import
                    <input type="file" accept=".json" onChange={handleFileUpload} style={{ display: 'none' }} />
                  </label>
                </div>
              </div>

              <div className="danger-zone-box" style={{ marginTop: '2.5rem' }}>
                <div className="danger-zone-header">
                  <i className="fa-solid fa-triangle-exclamation"></i>
                  <h4>Reset to Factory Portfolio Defaults</h4>
                </div>
                <p>
                  This will reset all articles, web showcase projects, portal indicators, and partner logos back to their original production configurations.
                </p>
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    if (window.confirm('Are you sure you want to reset everything to initial factory defaults?')) {
                      resetAllDefaults();
                      showToast('🔄 Site reset to factory defaults!');
                    }
                  }}
                >
                  Reset All to Factory Defaults
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
