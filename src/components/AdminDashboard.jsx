import React, { useState } from 'react';
import { useData } from '../context/DataContext';

export default function AdminDashboard({ onBackToSite }) {
  const {
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
  const [blogForm, setBlogForm] = useState({
    title: '',
    slug: '',
    category: 'Enterprise Architecture',
    readTime: '4 min read',
    date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop',
    author: 'MAD Editorial',
    authorAvatar: '/assets/mad_logo.png',
    excerpt: '',
    content: '',
    tags: 'Architecture, Cloud'
  });

  // ---------------- Project Editor State ----------------
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [projectForm, setProjectForm] = useState({
    title: '',
    domain: '',
    region: 'lk',
    regionLabel: 'Sri Lanka',
    summary: '',
    fullStory: '',
    techTags: 'React, TypeScript, CSS3',
    image: '/UI/Rectangle 1.png',
    browserUrl: '',
    perf: 98,
    a11y: 98,
    bp: 100,
    seo: 98,
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
      title: blog.title,
      slug: blog.slug || blog.id,
      category: blog.category || 'General',
      readTime: blog.readTime || '4 min read',
      date: blog.date || '',
      image: blog.image || '',
      author: blog.author || 'MAD Editorial',
      authorAvatar: blog.authorAvatar || '/assets/mad_labs.png',
      excerpt: blog.excerpt || '',
      content: blog.content || '',
      tags: Array.isArray(blog.tags) ? blog.tags.join(', ') : ''
    });
  };

  const handleSaveBlog = (e) => {
    e.preventDefault();
    if (!blogForm.title.trim()) {
      showToast('⚠️ Please enter a blog title');
      return;
    }

    const payload = {
      ...blogForm,
      tags: blogForm.tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean)
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
      slug: '',
      category: 'Enterprise Architecture',
      readTime: '4 min read',
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop',
      author: 'MAD Editorial',
      authorAvatar: '/assets/madlabs.png',
      excerpt: '',
      content: '',
      tags: 'Architecture, Cloud'
    });
  };

  // ================= Project Handlers =================
  const handleEditProject = (proj) => {
    setEditingProjectId(proj.id);
    setProjectForm({
      title: proj.title,
      domain: proj.domain,
      region: proj.region || 'lk',
      regionLabel: proj.regionLabel || 'Sri Lanka',
      summary: proj.summary,
      fullStory: proj.fullStory || proj.summary,
      techTags: Array.isArray(proj.techTags) ? proj.techTags.join(', ') : '',
      image: proj.image || '/UI/Rectangle 1.png',
      browserUrl: proj.domain ? `https://${proj.domain}` : '',
      perf: proj.lighthouse ? proj.lighthouse.performance : 95,
      a11y: proj.lighthouse ? proj.lighthouse.accessibility : 95,
      bp: proj.lighthouse ? proj.lighthouse.bestPractices : 95,
      seo: proj.lighthouse ? proj.lighthouse.seo : 95,
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
      image: projectForm.image,
      clientType: projectForm.clientType,
      keyOutcome: projectForm.keyOutcome,
      lighthouse: {
        performance: Number(projectForm.perf) || 95,
        accessibility: Number(projectForm.a11y) || 95,
        bestPractices: Number(projectForm.bp) || 95,
        seo: Number(projectForm.seo) || 95
      }
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
      image: '/UI/Rectangle 1.png',
      browserUrl: '',
      perf: 98,
      a11y: 98,
      bp: 100,
      seo: 98,
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

          <div className="admin-actions-col" style={{ display: 'flex', gap: '10px' }}>
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
                          authorAvatar: '/assets/mad_logo.png',
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
                      placeholder="e.g. The Architecture of GCC Modernization"
                      value={blogForm.title}
                      onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                      required
                    />
                  </div>

                  <div className="admin-grid-2">
                    <div className="admin-field-group">
                      <label>Category</label>
                      <input
                        type="text"
                        className="admin-input"
                        placeholder="Enterprise Architecture / Marketing Strategy"
                        value={blogForm.category}
                        onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
                      />
                    </div>
                    <div className="admin-field-group">
                      <label>Reading Time</label>
                      <input
                        type="text"
                        className="admin-input"
                        placeholder="e.g. 5 min read"
                        value={blogForm.readTime}
                        onChange={(e) => setBlogForm({ ...blogForm, readTime: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="admin-grid-2">
                    <div className="admin-field-group">
                      <label>Publish Date</label>
                      <input
                        type="text"
                        className="admin-input"
                        value={blogForm.date}
                        onChange={(e) => setBlogForm({ ...blogForm, date: e.target.value })}
                      />
                    </div>
                    <div className="admin-field-group">
                      <label>Author</label>
                      <input
                        type="text"
                        className="admin-input"
                        value={blogForm.author}
                        onChange={(e) => setBlogForm({ ...blogForm, author: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="admin-field-group">
                    <label>Cover Image URL *</label>
                    <input
                      type="text"
                      className="admin-input"
                      placeholder="https://images.unsplash.com/... or /UI/..."
                      value={blogForm.image}
                      onChange={(e) => setBlogForm({ ...blogForm, image: e.target.value })}
                      required
                    />
                    {blogForm.image && (
                      <div className="admin-img-preview-box">
                        <img src={blogForm.image} alt="Preview" onError={(e) => (e.target.style.display = 'none')} />
                      </div>
                    )}
                  </div>

                  <div className="admin-field-group">
                    <label>Short Excerpt (Showcase summary)</label>
                    <textarea
                      rows="2"
                      className="admin-textarea"
                      placeholder="Concise 1-2 sentence hook..."
                      value={blogForm.excerpt}
                      onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                    ></textarea>
                  </div>

                  <div className="admin-field-group">
                    <label>Full Content (Markdown supported)</label>
                    <textarea
                      rows="7"
                      className="admin-textarea code-font"
                      placeholder="Use ### for headers, - for bullets, and blank lines between paragraphs..."
                      value={blogForm.content}
                      onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                    ></textarea>
                  </div>

                  <div className="admin-field-group">
                    <label>Keywords & Tags (comma-separated)</label>
                    <input
                      type="text"
                      className="admin-input"
                      placeholder="GCC, Architecture, Performance"
                      value={blogForm.tags}
                      onChange={(e) => setBlogForm({ ...blogForm, tags: e.target.value })}
                    />
                  </div>

                  <button type="submit" className="btn btn-gradient" style={{ width: '100%' }}>
                    {editingBlogId ? 'Update Article' : 'Publish Article'}
                  </button>
                </form>
              </div>

              {/* Right Pane: Live Blogs List */}
              <div className="admin-pane-card">
                <div className="pane-card-header">
                  <h3>
                    <i className="fa-solid fa-list-check"></i> Published Articles ({blogs.length})
                  </h3>
                  <span className="admin-hint-pill">Top item is featured on homepage</span>
                </div>

                <div className="admin-items-list">
                  {blogs.map((b, idx) => (
                    <div key={b.id} className="admin-list-item-card">
                      <img src={b.image} alt={b.title} className="admin-item-thumb" />
                      <div className="admin-item-info">
                        <div className="admin-item-badges">
                          {idx === 0 && <span className="admin-tag-live">NEWEST (HOMEPAGE)</span>}
                          <span className="admin-tag-category">{b.category}</span>
                          <span className="admin-tag-date">{b.date}</span>
                        </div>
                        <h4 className="admin-item-title">{b.title}</h4>
                        <p className="admin-item-snippet">{b.excerpt}</p>
                      </div>
                      <div className="admin-item-actions">
                        <button
                          className="admin-btn-action edit"
                          onClick={() => handleEditBlog(b)}
                          title="Edit Article"
                        >
                          <i className="fa-solid fa-pencil"></i>
                        </button>
                        <button
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
                          image: '/UI/Rectangle 1.png',
                          browserUrl: '',
                          perf: 98,
                          a11y: 98,
                          bp: 100,
                          seo: 98,
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

                  <div className="admin-field-group">
                    <label>Browser Mockup Image Path or URL</label>
                    <input
                      type="text"
                      className="admin-input"
                      placeholder="/UI/Frame 34.png or https://..."
                      value={projectForm.image}
                      onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })}
                    />
                    {projectForm.image && (
                      <div className="admin-img-preview-box">
                        <img src={projectForm.image} alt="Mockup Preview" />
                      </div>
                    )}
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

                  {/* Lighthouse Analyzer Sliders */}
                  <div className="admin-analyzer-box">
                    <label className="analyzer-box-header">
                      <i className="fa-solid fa-gauge-high"></i> Google Lighthouse Analyzer Box Scores
                    </label>
                    <div className="analyzer-sliders-grid">
                      <div className="slider-item">
                        <div className="slider-label-row">
                          <span>Performance</span>
                          <strong>{projectForm.perf}</strong>
                        </div>
                        <input
                          type="range"
                          min="50"
                          max="100"
                          value={projectForm.perf}
                          onChange={(e) => setProjectForm({ ...projectForm, perf: e.target.value })}
                        />
                      </div>
                      <div className="slider-item">
                        <div className="slider-label-row">
                          <span>Accessibility</span>
                          <strong>{projectForm.a11y}</strong>
                        </div>
                        <input
                          type="range"
                          min="50"
                          max="100"
                          value={projectForm.a11y}
                          onChange={(e) => setProjectForm({ ...projectForm, a11y: e.target.value })}
                        />
                      </div>
                      <div className="slider-item">
                        <div className="slider-label-row">
                          <span>Best Practices</span>
                          <strong>{projectForm.bp}</strong>
                        </div>
                        <input
                          type="range"
                          min="50"
                          max="100"
                          value={projectForm.bp}
                          onChange={(e) => setProjectForm({ ...projectForm, bp: e.target.value })}
                        />
                      </div>
                      <div className="slider-item">
                        <div className="slider-label-row">
                          <span>SEO</span>
                          <strong>{projectForm.seo}</strong>
                        </div>
                        <input
                          type="range"
                          min="50"
                          max="100"
                          value={projectForm.seo}
                          onChange={(e) => setProjectForm({ ...projectForm, seo: e.target.value })}
                        />
                      </div>
                    </div>
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
                </div>

                <div className="admin-items-list">
                  {projects.map((proj) => (
                    <div key={proj.id} className="admin-list-item-card">
                      <img src={proj.image} alt={proj.title} className="admin-item-thumb" />
                      <div className="admin-item-info">
                        <div className="admin-item-badges">
                          <span className="admin-tag-category">{proj.regionLabel}</span>
                          <span className="admin-tag-domain">{proj.domain}</span>
                        </div>
                        <h4 className="admin-item-title">{proj.title}</h4>
                        <div className="admin-lighthouse-mini-scores">
                          <span>Perf: {proj.lighthouse?.performance || 95}</span> &bull;
                          <span>A11y: {proj.lighthouse?.accessibility || 95}</span> &bull;
                          <span>SEO: {proj.lighthouse?.seo || 95}</span>
                        </div>
                      </div>
                      <div className="admin-item-actions">
                        <button
                          className="admin-btn-action edit"
                          onClick={() => handleEditProject(proj)}
                          title="Edit Project"
                        >
                          <i className="fa-solid fa-pencil"></i>
                        </button>
                        <button
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
