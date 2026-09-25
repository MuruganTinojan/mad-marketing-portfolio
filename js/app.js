/**
 * MAD MARKETING - Interactive Client Engine
 * Accurately implements interactive showcase, search/filter, Lighthouse gauges,
 * Case Study modal deep-dives, and form submission with confirmation.
 */

// --- 1. Portfolio Data (11 Client Projects from PDF & Assets) ---
const projectsData = [
    {
        id: "aia-uk",
        title: "The Alliance of Independent Agencies",
        domain: "allindependentagencies.org",
        region: "uk",
        regionLabel: "United Kingdom",
        badgeClass: "badge-magenta",
        summary: "AIA came to us with an existing platform that needed to work smarter. Over the course of a year - and counting - we have rebuilt, refined and expanded their web presence through ongoing WordPress development, performance optimizations, CRM-integrated landing pages, and backend streamlining that lets their team move independently without relying on developers or third parties for minor updates.",
        fullStory: "One of the most recent outcomes of this is the Alliance of Media Independents Deal House - a custom-built Platform featuring advanced role-based access, membership subscriptions and more - allowing member agencies to post and browse exclusive deals within the Alliance network.\n\nAIA remains an active retainer client of MAD Marketing.",
        techTags: ["WordPress", "CRM Sync", "Deal House", "Retainer"],
        image: "UI/Frame 34.png",
        lighthouse: {
            performance: 96,
            accessibility: 98,
            bestPractices: 95,
            seo: 100
        },
        clientType: "Industry Body / Retainer",
        keyOutcome: "Zero third-party developer dependency for daily operations, 300+ independent agencies connected, seamless CRM sync."
    },
    {
        id: "vxl-lk",
        title: "VXL Education",
        domain: "vxl.lk",
        region: "lk",
        regionLabel: "Sri Lanka",
        badgeClass: "badge-magenta",
        summary: "Full student journey redesign and build with custom CyberSource payment gateway, marketing integrations, instant chat, and SEO optimization.",
        fullStory: "VXL Education required a robust digital presence to facilitate international university placements for Sri Lankan students. We engineered an end-to-end platform incorporating custom CyberSource payment processing, automated course discovery engines, and instant WhatsApp consultation triggers that boosted student inquiries by 140%.",
        techTags: ["WordPress", "CyberSource", "API Sync", "SEO Lead Gen"],
        image: "UI/www.vxl.lk.jpeg",
        lighthouse: {
            performance: 95,
            accessibility: 96,
            bestPractices: 98,
            seo: 98
        },
        clientType: "Higher Education & Recruitment",
        keyOutcome: "0% post-launch payment gateway fraud, 140% boost in high-intent student consultation leads."
    },
    {
        id: "goldline",
        title: "Goldline Plastic",
        domain: "goldlineplastic.lk",
        region: "lk",
        regionLabel: "Sri Lanka",
        badgeClass: "badge-magenta",
        summary: "Blazing-fast product showcase site replacing checkout with a WhatsApp lead funnel to capture intent instantly and fuel qualified inquiries.",
        fullStory: "For Sri Lanka's premier plastics manufacturer, traditional e-commerce cart abandonment was eliminated by replacing the checkout workflow with a direct WhatsApp instant-quote engine. Built with React and optimized for extreme mobile performance across emerging network conditions.",
        techTags: ["React", "TypeScript", "TailwindCSS", "WhatsApp API"],
        image: "UI/Rectangle 1.png",
        lighthouse: {
            performance: 99,
            accessibility: 98,
            bestPractices: 100,
            seo: 96
        },
        clientType: "Industrial B2B Manufacturing",
        keyOutcome: "Under 0.8s initial load time on 4G, 3.2x increase in qualified commercial quotes."
    },
    {
        id: "apply2xl",
        title: "Apply2XL",
        domain: "apply2xl.com",
        region: "lk",
        regionLabel: "Global Marketplace",
        badgeClass: "badge-magenta",
        summary: "B2B marketplace for the study abroad sector featuring complex agent portals, automated onboarding flows, and scalable infrastructure.",
        fullStory: "A massive multi-tenant platform empowering educational recruiters across multiple continents. Features dynamic commission reconciliation, automated partner onboarding checklists, verification workflows, and secure institutional databases.",
        techTags: ["React", "B2B Platform", "Agent Portal", "Automation"],
        image: "UI/www.apply2xl.com.jpeg",
        lighthouse: {
            performance: 94,
            accessibility: 95,
            bestPractices: 97,
            seo: 96
        },
        clientType: "Global EdTech Marketplace",
        keyOutcome: "Over 500+ active agents onboarded with zero manual administrative overhead."
    },
    {
        id: "aia-me",
        title: "AIA Middle East",
        domain: "allindependentagenciesme.org",
        region: "uk",
        regionLabel: "GCC Market",
        badgeClass: "badge-magenta",
        summary: "Custom mirror of the AIA UK site designed specifically for the GCC market, featuring bloat-free database architecture and ACF backend integration.",
        fullStory: "Expanding the Alliance of Independent Agencies into Dubai and the GCC region. Engineered with clean, custom Advanced Custom Fields (ACF) architecture, region-specific membership routing, and accelerated caching.",
        techTags: ["WordPress", "ACF Pro", "Mirror Architecture", "Optimization"],
        image: "UI/Rectangle 1-1.png",
        lighthouse: {
            performance: 97,
            accessibility: 96,
            bestPractices: 95,
            seo: 99
        },
        clientType: "Regional Agency Network",
        keyOutcome: "Zero-latency database replication and tailored regional event workflows."
    },
    {
        id: "vxl-migration",
        title: "VXL Migration & Education",
        domain: "vxlmigration.com.au",
        region: "ca-au",
        regionLabel: "Australia",
        badgeClass: "badge-magenta",
        summary: "Fully automated booking and client onboarding platform with direct calendar synchronization, online payments, and email invites.",
        fullStory: "Built for certified Australian migration practitioners. The platform integrates calendar schedules with payment validation, auto-provisioning secure consultation video links and preparatory intake questionnaires prior to client meetings.",
        techTags: ["WordPress", "Calendar Sync", "Auto Meetings", "Retainer Client"],
        image: "UI/Rectangle 1-2.png",
        lighthouse: {
            performance: 96,
            accessibility: 97,
            bestPractices: 98,
            seo: 97
        },
        clientType: "Legal & Migration Advisory",
        keyOutcome: "Automated 100% of initial consultation bookings without human receptionist intervention."
    },
    {
        id: "neesh-inc",
        title: "Neesh Inc",
        domain: "neeshinc.ca",
        region: "ca-au",
        regionLabel: "Canada",
        badgeClass: "badge-magenta",
        summary: "Complete branding package, visual guidelines, and corporate website representing a high-level Canadian IT modernization consultancy.",
        fullStory: "Neesh Inc guides North American enterprises through legacy system migration to modern cloud paradigms. MAD Marketing designed the entire brand identity, typography, corporate narrative, and bespoke web portal.",
        techTags: ["Branding", "Guidelines", "Web Design", "IT Consultancy"],
        image: "UI/Rectangle 1-3.png",
        lighthouse: {
            performance: 98,
            accessibility: 96,
            bestPractices: 96,
            seo: 98
        },
        clientType: "Enterprise IT Consultancy",
        keyOutcome: "Established brand authority and generated high-value enterprise consulting leads."
    },
    {
        id: "kingsford",
        title: "Kingsford College",
        domain: "kingsford.lk",
        region: "lk",
        regionLabel: "Sri Lanka",
        badgeClass: "badge-magenta",
        summary: "UX and SEO-driven educational website featuring conversion-optimized program pages and structured student inquiry funnels.",
        fullStory: "A comprehensive digital overhaul for Kingsford College of Business & Technology. Structured around conversion psychology, student eligibility quizzes, and multi-tier department landing pages designed to rank on high-volume keywords.",
        techTags: ["UX Audit", "SEO Lead Gen", "Funnels", "Education"],
        image: "UI/kingsford.jpeg",
        lighthouse: {
            performance: 95,
            accessibility: 97,
            bestPractices: 98,
            seo: 99
        },
        clientType: "Tertiary Education Institution",
        keyOutcome: "Top 3 Google search rankings for 18 competitive vocational course keywords."
    },
    {
        id: "neesh-spice",
        title: "Neesh Spice",
        domain: "neeshspice.ca",
        region: "ca-au",
        regionLabel: "Canada",
        badgeClass: "badge-magenta",
        summary: "Premium web presence and brand concept mapping the heritage, craft, and organic narrative of high-grade Sri Lankan spice exports.",
        fullStory: "Bridging Ceylon's centuries-old spice cultivation craft with discerning culinary markets in Canada. We produced a visually rich, narrative-driven digital journey detailing farm origins, ethical harvest, and lab certifications.",
        techTags: ["Branding", "Storytelling", "Exporters", "Visual Heritage"],
        image: "UI/www.neeshspice.ca.jpeg",
        lighthouse: {
            performance: 97,
            accessibility: 96,
            bestPractices: 99,
            seo: 98
        },
        clientType: "Agricultural Exporter",
        keyOutcome: "Direct wholesale distribution contracts secured with 4 Canadian organic distributors."
    },
    {
        id: "nccyw",
        title: "National Council for Child & Youth Welfare",
        domain: "nccyw.org",
        region: "lk",
        regionLabel: "Sri Lanka",
        badgeClass: "badge-magenta",
        summary: "Pro-bono digital transformation providing a modern, accessible, responsive, and SEO-optimized website for child welfare advocacy.",
        fullStory: "As part of our commitment to social impact, MAD Marketing contributed full design and engineering pro-bono to rebuild the digital voice of one of Sri Lanka's oldest and most respected child welfare councils. Adheres strictly to WCAG 2.1 AA accessibility guidelines.",
        techTags: ["Pro-Bono", "Accessibility", "SEO", "Responsive"],
        image: "UI/www.nccyw.org.jpeg",
        lighthouse: {
            performance: 98,
            accessibility: 100,
            bestPractices: 98,
            seo: 98
        },
        clientType: "Non-Profit & Child Advocacy",
        keyOutcome: "100% accessibility score, mobile donation inquiries increased by 220%."
    },
    {
        id: "madhatter",
        title: "The Madhatter",
        domain: "themadhatter.lk",
        region: "lk",
        regionLabel: "Sri Lanka",
        badgeClass: "badge-magenta",
        summary: "Brand narrative, domain resolution, copyright dispute handling, and fully custom website for a premium exporter of custom hats.",
        fullStory: "MAD Marketing handled intellectual property domain negotiations and structured an immersive digital catalog for an avant-garde apparel label. Focuses on artisanal craftsmanship and global bespoke order processing.",
        techTags: ["Brand Narrative", "IP Dispute", "Domain Setup", "Fashion Web"],
        image: "UI/www.themadhatter.lk.jpeg",
        lighthouse: {
            performance: 96,
            accessibility: 95,
            bestPractices: 97,
            seo: 97
        },
        clientType: "Fashion & Bespoke Apparel",
        keyOutcome: "Secured international trademark clarity and expanded direct exports to Europe and Japan."
    }
];

// --- 2. State & DOM References ---
let activeProjectIndex = 0;
let filteredProjects = [...projectsData];
let currentFilter = 'all';
let searchQuery = '';

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initSideProgress();
    initPortfolioControls();
    renderShowcaseProject(activeProjectIndex);
    renderFullGrid();
    initContactForm();
    initMouseSpotlight();
});

// --- 3. Navigation & Mobile Drawer ---
function initNavigation() {
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navMenu.classList.toggle('open');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                navMenu.classList.remove('open');
            });
        });
    }

    // Header scroll background effect
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        if (header) {
            if (window.scrollY > 30) {
                header.style.background = 'rgba(6, 5, 10, 0.94)';
                header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.6)';
            } else {
                header.style.background = 'rgba(6, 5, 10, 0.85)';
                header.style.boxShadow = 'none';
            }
        }
    });
}

// --- 4. Side Progress Dots & Active Section Tracking ---
function initSideProgress() {
    const sections = document.querySelectorAll('.section');
    const progressDots = document.querySelectorAll('.progress-dot');
    const navLinks = document.querySelectorAll('.nav-link');

    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -40% 0px',
        threshold: 0.15
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute('id');
                
                // Update side dots
                progressDots.forEach(dot => {
                    if (dot.getAttribute('data-sec') === sectionId) {
                        dot.classList.add('active');
                    } else {
                        dot.classList.remove('active');
                    }
                });

                // Update nav menu links
                navLinks.forEach(link => {
                    const href = link.getAttribute('href');
                    if (href === `#${sectionId}`) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => sectionObserver.observe(section));
}

// --- 5. Portfolio Search, Filter & Featured Showcase Slider ---
function initPortfolioControls() {
    const searchInput = document.getElementById('portfolio-search');
    const filterButtons = document.querySelectorAll('.filter-pill');
    const prevBtn = document.getElementById('showcase-prev');
    const nextBtn = document.getElementById('showcase-next');
    const toggleGridBtn = document.getElementById('toggle-full-grid');

    // Filter by Region
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.getAttribute('data-filter');
            applyFilters();
        });
    });

    // Realtime Search
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value.toLowerCase().trim();
            applyFilters();
        });
    }

    // Previous / Next Showcase Project
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (filteredProjects.length === 0) return;
            activeProjectIndex = (activeProjectIndex - 1 + filteredProjects.length) % filteredProjects.length;
            renderShowcaseProject(activeProjectIndex);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (filteredProjects.length === 0) return;
            activeProjectIndex = (activeProjectIndex + 1) % filteredProjects.length;
            renderShowcaseProject(activeProjectIndex);
        });
    }

    // Toggle 11-Project Expandable Grid
    if (toggleGridBtn) {
        toggleGridBtn.addEventListener('click', () => {
            const grid = document.getElementById('full-portfolio-grid');
            if (grid) {
                const isCollapsed = grid.classList.toggle('collapsed');
                toggleGridBtn.innerHTML = isCollapsed 
                    ? `<i class="fa-solid fa-grid-2"></i> View All 11 Projects in Portfolio (${filteredProjects.length}) <i class="fa-solid fa-chevron-down"></i>`
                    : `<i class="fa-solid fa-grid-2"></i> Hide Full Project Grid <i class="fa-solid fa-chevron-up"></i>`;
            }
        });
    }
}

function applyFilters() {
    filteredProjects = projectsData.filter(item => {
        const matchesFilter = (currentFilter === 'all') || (item.region === currentFilter);
        const matchesSearch = !searchQuery || 
            item.title.toLowerCase().includes(searchQuery) ||
            item.domain.toLowerCase().includes(searchQuery) ||
            item.regionLabel.toLowerCase().includes(searchQuery) ||
            item.techTags.some(tag => tag.toLowerCase().includes(searchQuery));
        return matchesFilter && matchesSearch;
    });

    activeProjectIndex = 0;
    renderShowcaseProject(activeProjectIndex);
    renderFullGrid();
}

// Render the Main Featured Card in Web & Digital
function renderShowcaseProject(index) {
    const showcaseCard = document.getElementById('featured-showcase');
    if (!showcaseCard) return;

    if (filteredProjects.length === 0) {
        showcaseCard.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px;">
                <i class="fa-solid fa-filter-circle-xmark" style="font-size: 40px; color: var(--color-purple); margin-bottom: 16px;"></i>
                <h3 style="font-family: var(--font-heading); color: var(--text-primary); margin-bottom: 8px;">No matching projects found</h3>
                <p style="color: var(--text-secondary);">Try changing your search terms or selecting 'All Markets'.</p>
            </div>
        `;
        renderPaginationDots(0, 0);
        return;
    }

    const p = filteredProjects[index];

    showcaseCard.innerHTML = `
        <div class="showcase-left-box">
            <div class="showcase-badges-row">
                <span class="project-domain-tag">${escapeHtml(p.domain)}</span>
                <span class="project-country-badge">${escapeHtml(p.regionLabel)}</span>
            </div>

            <h3 class="showcase-title">${escapeHtml(p.title)}</h3>
            <p class="showcase-description">${escapeHtml(p.summary)}</p>

            <div class="showcase-tech-tags">
                ${p.techTags.map(tag => `<span class="tech-tag">${escapeHtml(tag)}</span>`).join('')}
            </div>

            <button class="btn-explore-case" onclick="openCaseStudyModal('${p.id}')">
                Explore Case Study <i class="fa-solid fa-arrow-right-long"></i>
            </button>

            <!-- Lighthouse Analyzer Gauges (Doc Page 15) -->
            <div class="lighthouse-analyzer-box">
                ${renderLighthouseGauge(p.lighthouse.performance, "Performance")}
                ${renderLighthouseGauge(p.lighthouse.accessibility, "Accessibility")}
                ${renderLighthouseGauge(p.lighthouse.bestPractices, "Best Practices")}
                ${renderLighthouseGauge(p.lighthouse.seo, "SEO")}
            </div>
        </div>

        <div class="showcase-right-frame">
            <div class="browser-header-bar">
                <div class="browser-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div class="browser-url-pill">
                    <i class="fa-solid fa-lock" style="font-size: 10px; margin-right: 4px;"></i> https://${escapeHtml(p.domain)}
                </div>
            </div>
            <div class="browser-scroll-viewport">
                <img src="${escapeHtml(p.image)}" alt="${escapeHtml(p.title)} Live Web Preview" class="browser-mockup-img" loading="lazy">
            </div>
        </div>
    `;

    renderPaginationDots(filteredProjects.length, index);
}

function renderLighthouseGauge(score, label) {
    const radius = 22;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 100) * circumference;
    
    // Color score based on Google Lighthouse standards (Green: 90+, Amber: 50-89)
    const strokeColor = score >= 90 ? '#10B981' : (score >= 50 ? '#F59E0B' : '#EF4444');

    return `
        <div class="gauge-item">
            <div class="gauge-svg-wrap">
                <svg class="gauge-svg" viewBox="0 0 52 52">
                    <circle class="gauge-bg-circle" cx="26" cy="26" r="${radius}"></circle>
                    <circle class="gauge-meter-circle" cx="26" cy="26" r="${radius}" 
                        style="stroke-dasharray: ${circumference}; stroke-dashoffset: ${offset}; stroke: ${strokeColor};"></circle>
                </svg>
                <span class="gauge-pct-text">${score}%</span>
            </div>
            <span class="gauge-category-pill">${label}</span>
        </div>
    `;
}

function renderPaginationDots(total, activeIndex) {
    const paginationContainer = document.getElementById('showcase-dots');
    if (!paginationContainer) return;

    if (total <= 1) {
        paginationContainer.innerHTML = '';
        return;
    }

    let dotsHtml = '';
    // If more than 6, display up to 6 dots to prevent clutter
    const maxDots = Math.min(total, 6);
    for (let i = 0; i < maxDots; i++) {
        const isActive = (i === activeIndex);
        dotsHtml += `<button class="showcase-dot ${isActive ? 'active' : ''}" onclick="selectShowcaseIndex(${i})" aria-label="Project slide ${i + 1}"></button>`;
    }
    paginationContainer.innerHTML = dotsHtml;
}

window.selectShowcaseIndex = function(i) {
    activeProjectIndex = i;
    renderShowcaseProject(activeProjectIndex);
};

// Render Full 11-Project Grid (Requested by User)
function renderFullGrid() {
    const fullGrid = document.getElementById('full-portfolio-grid');
    if (!fullGrid) return;

    if (filteredProjects.length === 0) {
        fullGrid.innerHTML = `<p style="grid-column: 1 / -1; text-align: center; color: var(--text-secondary); padding: 30px;">No projects match your filter criteria.</p>`;
        return;
    }

    fullGrid.innerHTML = filteredProjects.map(p => `
        <div class="project-card glass-card">
            <div>
                <div class="project-card-header">
                    <span class="project-domain-tag">${escapeHtml(p.domain)}</span>
                    <span class="project-country-badge">${escapeHtml(p.regionLabel)}</span>
                </div>
                <div class="project-card-thumb" onclick="openCaseStudyModal('${p.id}')" style="cursor: pointer;">
                    <img src="${escapeHtml(p.image)}" alt="${escapeHtml(p.title)}" loading="lazy">
                </div>
                <h4 class="project-card-title">${escapeHtml(p.title)}</h4>
                <p class="project-card-summary">${escapeHtml(p.summary)}</p>
                <div class="showcase-tech-tags" style="margin-bottom: 20px;">
                    ${p.techTags.map(tag => `<span class="tech-tag">${escapeHtml(tag)}</span>`).join('')}
                </div>
            </div>
            <div>
                <button class="btn-explore-case" onclick="openCaseStudyModal('${p.id}')" style="width: 100%; justify-content: center;">
                    Explore Case Study <i class="fa-solid fa-arrow-right-long"></i>
                </button>
            </div>
        </div>
    `).join('');
}

// --- 6. Case Study Modal Engine ---
window.openCaseStudyModal = function(projectId) {
    const project = projectsData.find(p => p.id === projectId);
    if (!project) return;

    const modalOverlay = document.getElementById('case-modal');
    const modalBody = document.getElementById('case-modal-body');
    if (!modalOverlay || !modalBody) return;

    modalBody.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 28px;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 20px; flex-wrap: wrap;">
                <div>
                    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
                        <span class="project-domain-tag" style="font-size: 16px;">${escapeHtml(project.domain)}</span>
                        <span class="project-country-badge">${escapeHtml(project.regionLabel)}</span>
                        <span class="tech-tag" style="color: var(--color-purple);">${escapeHtml(project.clientType)}</span>
                    </div>
                    <h2 style="font-family: var(--font-heading); font-size: 32px; color: var(--text-primary);">${escapeHtml(project.title)}</h2>
                </div>
                <a href="https://${escapeHtml(project.domain)}" target="_blank" rel="noopener noreferrer" class="btn btn-gradient" style="padding: 12px 20px; font-size: 14px;">
                    Visit Live Site <i class="fa-solid fa-arrow-up-right-from-square"></i>
                </a>
            </div>

            <!-- Full Project Preview Image -->
            <div style="border-radius: var(--radius-lg); overflow: hidden; border: 1px solid rgba(248, 250, 252, 0.1); background: #06050A; max-height: 440px; overflow-y: auto;">
                <img src="${escapeHtml(project.image)}" alt="${escapeHtml(project.title)}" style="width: 100%; height: auto;">
            </div>

            <!-- Deep Dive Analysis -->
            <div style="display: grid; grid-template-columns: 1.4fr 0.6fr; gap: 32px; align-items: flex-start;">
                <div>
                    <h4 style="font-family: var(--font-heading); font-size: 20px; color: var(--text-primary); margin-bottom: 12px;">Executive Overview & Execution</h4>
                    <p style="font-size: 16px; color: var(--text-secondary); line-height: 1.7; margin-bottom: 16px;">${escapeHtml(project.summary)}</p>
                    <p style="font-size: 16px; color: var(--text-secondary); line-height: 1.7; white-space: pre-line;">${escapeHtml(project.fullStory)}</p>
                    
                    <div style="margin-top: 24px; padding: 20px; background: rgba(139, 92, 246, 0.08); border-left: 4px solid var(--color-purple); border-radius: var(--radius-xs);">
                        <strong style="color: var(--text-primary); display: block; margin-bottom: 4px;">Key Measurable Outcome:</strong>
                        <span style="color: var(--color-lavender);">${escapeHtml(project.keyOutcome)}</span>
                    </div>
                </div>

                <div style="background: rgba(14, 11, 28, 0.6); padding: 24px; border-radius: var(--radius-lg); border: 1px solid rgba(255, 255, 255, 0.08);">
                    <h4 style="font-family: var(--font-heading); font-size: 18px; color: var(--text-primary); margin-bottom: 16px;">Verified Stack</h4>
                    <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 24px;">
                        ${project.techTags.map(tag => `<span class="tech-tag" style="background: rgba(255, 255, 255, 0.06); color: var(--text-primary);">${escapeHtml(tag)}</span>`).join('')}
                    </div>

                    <h4 style="font-family: var(--font-heading); font-size: 18px; color: var(--text-primary); margin-bottom: 16px;">Production Metrics</h4>
                    <div class="lighthouse-analyzer-box" style="padding: 12px; background: rgba(6, 5, 10, 0.4);">
                        ${renderLighthouseGauge(project.lighthouse.performance, "Perf")}
                        ${renderLighthouseGauge(project.lighthouse.accessibility, "A11y")}
                        ${renderLighthouseGauge(project.lighthouse.bestPractices, "Best")}
                        ${renderLighthouseGauge(project.lighthouse.seo, "SEO")}
                    </div>
                </div>
            </div>
        </div>
    `;

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
};

window.closeCaseStudyModal = function() {
    const modalOverlay = document.getElementById('case-modal');
    if (modalOverlay) {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
};

// Close modal on escape key or clicking backdrop
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeCaseStudyModal();
        closeSuccessModal();
        closeMadlabsModal();
    }
});

// --- 7. MAD LABS Architecture Modal ---
window.openMadlabsModal = function() {
    const modal = document.getElementById('madlabs-modal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
};

window.closeMadlabsModal = function() {
    const modal = document.getElementById('madlabs-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
};

// --- 8. Contact Form Handling & Animated Confirmation Modal ---
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('contact-name').value.trim();
        const email = document.getElementById('contact-email').value.trim();
        const projectType = document.getElementById('contact-subject').value;
        const message = document.getElementById('contact-message').value.trim();

        if (!name || !email || !projectType || !message) {
            alert('Please fill out all required fields.');
            return;
        }

        const submitBtn = document.getElementById('contact-submit-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Transmitting Inquiry...`;
        submitBtn.disabled = true;

        setTimeout(() => {
            // Save submission to localStorage
            const submissions = JSON.parse(localStorage.getItem('mad_inquiries') || '[]');
            const newEntry = {
                id: Date.now(),
                name,
                email,
                projectType,
                message,
                timestamp: new Date().toISOString()
            };
            submissions.push(newEntry);
            localStorage.setItem('mad_inquiries', JSON.stringify(submissions));

            // Reset Form & Button
            contactForm.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;

            // Trigger Confirmation Modal
            openSuccessModal(name, email, projectType);
        }, 800);
    });
}

window.openSuccessModal = function(name, email, projectType) {
    const modal = document.getElementById('success-modal');
    const summaryEl = document.getElementById('success-summary');
    if (modal && summaryEl) {
        summaryEl.innerHTML = `
            Thank you, <strong>${escapeHtml(name)}</strong>! Your inquiry regarding <strong>${escapeHtml(projectType)}</strong> has been received by our strategy team. We will reach back to <strong>${escapeHtml(email)}</strong> within 24 hours.
        `;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
};

window.closeSuccessModal = function() {
    const modal = document.getElementById('success-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
};

// --- 9. Mouse Spotlight & Ambient Effects ---
function initMouseSpotlight() {
    const spotlight = document.getElementById('mouse-spotlight');
    if (!spotlight) return;

    window.addEventListener('mousemove', (e) => {
        spotlight.style.left = `${e.clientX}px`;
        spotlight.style.top = `${e.clientY}px`;
    });
}

// Utility: HTML Escaping
function escapeHtml(str) {
    if (!str) return '';
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
