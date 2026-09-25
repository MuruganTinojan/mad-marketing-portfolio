# MAD Marketing & MAD LABS — Full Site Documentation

> **Version:** 2.0 (React 18 + Vite)  
> **Source Document:** `MAD Portfolio ui doc - 2026.pdf`  
> **Design Philosophy:** *"MAD ideas. Real results."*

---

## Table of Contents
1. [Project Overview](#1-project-overview)
2. [Technology Stack](#2-technology-stack)
3. [Repository & Directory Architecture](#3-repository--directory-architecture)
4. [Design System & UI Tokens](#4-design-system--ui-tokens)
5. [Component & Section Breakdown](#5-component--section-breakdown)
   - [5.1 Navigation Bar & Mobile Menu](#51-navigation-bar--mobile-menu)
   - [5.2 Side Progress Navigation](#52-side-progress-navigation)
   - [5.3 Hero Section (Who We Are)](#53-hero-section-who-we-are)
   - [5.4 The MAD Model](#54-the-mad-model)
   - [5.5 Web & Digital (Portfolio Engine)](#55-web--digital-portfolio-engine)
   - [5.6 Social & Marketing](#56-social--marketing)
   - [5.7 Software Solutions (MAD LABS)](#57-software-solutions-mad-labs)
   - [5.8 Our Clients & Partners](#58-our-clients--partners)
   - [5.9 The Opportunity](#59-the-opportunity)
   - [5.10 Get In Touch (Contact Engine)](#510-get-in-touch-contact-engine)
   - [5.11 Page Footer](#511-page-footer)
6. [Interactive Modals System](#6-interactive-modals-system)
7. [Data Architecture & Local State](#7-data-architecture--local-state)
8. [Mobile & Responsive UX Optimizations](#8-mobile--responsive-ux-optimizations)
9. [Developer & Deployment Guide](#9-developer--deployment-guide)

---

## 1. Project Overview

**MAD Marketing** is a full-service creative and digital agency headquartered in Colombo, Sri Lanka, serving startups, established enterprises, and global industry bodies across local and international markets (Sri Lanka, Australia, Canada, United Kingdom, and the GCC region).

**MAD LABS** is the proprietary software engineering and cloud capability arm within the MAD universe, building enterprise-grade tools, multi-tenant portals, custom payment gateway plugins, and automated workflow engines.

This web application represents the agency's flagship interactive portfolio and corporate presentation site, translated with precision from the official **MAD Portfolio UI Specification Document (2026)**.

---

## 2. Technology Stack

| Layer | Technology | Details |
|---|---|---|
| **Core Framework** | React 18 (`18.3.1`) | Functional components, Hooks (`useState`, `useEffect`, `useMemo`), clean unidirectional data flow |
| **Build & Dev Tooling** | Vite 5 (`5.4.21`) | Lightning-fast HMR, ES module bundling, tree-shaking |
| **Styling** | Vanilla CSS3 | Custom Properties, Glassmorphism, CSS Grid, Flexbox, Mobile-First Media Queries |
| **Typography** | Google Fonts + Local `@font-face` | Space Grotesk, Inter, Squada One, Pentagra (`.ttf`), Armada (`.otf`) |
| **Icons** | FontAwesome 6 + SVG + PNG Assets | Clean semantic icon integration |
| **State & Persistence** | Browser `localStorage` + React State | Offline inquiry storage, zero-friction client demoing |

---

## 3. Repository & Directory Architecture

```
portfolio/
├── dist/                              # Compiled production bundle
├── node_modules/                      # Installed npm dependencies
├── public/                            # Static public assets (Vite)
├── src/                               # React source code
│   ├── components/                    # Modular UI components
│   │   ├── CaseStudyModal.jsx         # Full case study deep-dive dialog
│   │   ├── ClientsPartnersSection.jsx # Infinite partner logo marquee
│   │   ├── ContactSection.jsx         # 2-column contact form & details
│   │   ├── Footer.jsx                 # Site footer bar with nav links
│   │   ├── HeroSection.jsx            # Hero section with animated hummingbird
│   │   ├── MadlabsModal.jsx           # Enterprise architecture deep dive dialog
│   │   ├── MadModelSection.jsx        # 3 capability cards & commitment banner
│   │   ├── Navbar.jsx                 # Sticky header with mobile drawer
│   │   ├── OpportunitySection.jsx     # GCC expansion & strategic pillars
│   │   ├── SideProgress.jsx           # Vertical indicator dots
│   │   ├── SocialMarketingSection.jsx # 2 strategic marketing cards
│   │   ├── SoftwareSolutionsSection.jsx # MAD Operations Portal simulator
│   │   ├── SuccessModal.jsx           # Form submission confirmation modal
│   │   └── WebDigitalSection.jsx      # Slider, filters, search & 11-project grid
│   ├── data/
│   │   └── projectsData.js            # All 11 client case studies & logo manifests
│   ├── App.jsx                        # Main page assembler & scroll observer
│   ├── index.css                      # Global design system & responsive styling
│   └── main.jsx                       # React root entry point
├── assets/                            # Brand assets, fonts, client logos
│   ├── client's LOGOS/                # Partner logos (PNG, WebP, JPG)
│   ├── fonts/                         # Custom brand fonts (Pentagra, Armada)
│   ├── hummingbird.png                # Hero visual asset
│   └── mad_logo.png                   # Official MAD Marketing logo
├── Contact/                           # Contact circular icon badges & social SVGs
├── UI/                                # High-res website mockups & case study frames
├── index.html                         # Vite HTML template & meta headers
├── package.json                       # Project manifests & npm scripts
└── vite.config.js                     # Vite build configuration
```

---

## 4. Design System & UI Tokens

All styling adheres to strict design tokens defined in `src/index.css`:

### Color Palette

| Token | Hex / Value | Usage |
|---|---|---|
| `--color-bg-page` | `#06050A` | Full page primary canvas background |
| `--color-card-bg` | `rgba(14, 11, 28, 0.50)` | Glassmorphism card fill (45–50% opacity) |
| `--color-card-stroke` | `rgba(109, 40, 217, 0.18)` | Glass card border stroke (15–18% opacity) |
| `--color-input-bg` | `rgba(6, 5, 10, 0.65)` | Form input background |
| `--color-white-ribbon` | `#FFFFFF` | High-contrast client logo marquee ribbon |
| `--color-purple` | `#8B5CF6` | Primary brand purple accent |
| `--color-magenta` | `#D946EF` | Vibrant secondary fuchsia/magenta accent |
| `--color-blue` | `#3B82F6` | Software / tech accent blue |
| `--color-pink` | `#F472B6` | Gradient bridge accent |
| `--text-primary` | `#F8FAFC` | Headings, active links, primary values |
| `--text-secondary` | `#94A3B8` | Body copy, secondary summaries |
| `--text-muted` | `#64748B` | Sub-labels, category pills, copyright |
| `--text-placeholder` | `#757575` | Input placeholder text |

### Gradients

* **Brand Text Gradient:** `linear-gradient(45deg, #A78BFA 0%, #F472B6 50%, #60A5FA 100%)`
* **Primary Button Gradient:** `linear-gradient(45deg, #8B5CF6 0%, #D946EF 100%)`
* **Card & Banner Alt Gradient:** `linear-gradient(45deg, rgba(14, 11, 28, 0.55) 0%, rgba(26, 21, 51, 0.25) 100%)`
* **Search Input Gradient:** `linear-gradient(to right, rgba(17, 17, 17, 0.60) 0%, rgba(33, 33, 33, 0.60) 100%)`

### Typography Hierarchy

* **Headings (`H1`, `H2`):** `Space Grotesk`, Bold (60px desktop, `clamp(32px, 5vw, 56px)` responsive)
* **Body Copy:** `Inter`, Regular (16px) & Medium (20px lead text)
* **Section Badges:** `Squada One`, Regular (20px, uppercase, 1px letter spacing)
* **Taglines & Brand Quotes:** `Pentagra`, Regular (20px)
* **Display Accents:** `Armada`, Regular & Bold

### Glassmorphism Formula

Cards apply a high-end dark glass aesthetic:
```css
background: rgba(14, 11, 28, 0.50);
border: 1px solid rgba(109, 40, 217, 0.18);
border-radius: 16px;
backdrop-filter: blur(14px);
-webkit-backdrop-filter: blur(14px);
```

---

## 5. Component & Section Breakdown

### 5.1 Navigation Bar & Mobile Menu (`Navbar.jsx`)
* **Sticky Positioning:** Sits fixed at the top with a subtle backdrop blur. When scrolled past 25px, it darkens (`rgba(6, 5, 10, 0.96)`) and projects an ambient shadow.
* **Layout:**
  * Left: MAD Marketing Logo link (`/assets/mad_logo.png`).
  * Center: Navigation links spaced evenly (10–12px gap). Active sections are dynamically highlighted with a gradient underline.
  * Right: *"Let's Talk"* button (45° gradient, padding: 16px 20px, radius: 8px) linking directly to `#contact`.
* **Mobile Drawer:**
  * Custom animated hamburger button (`.mobile-toggle`).
  * Slide-down menu covering full viewport width.
  * **Scroll Lock:** Automatically sets `document.body.style.overflow = 'hidden'` while open to prevent jarring background scroll.

### 5.2 Side Progress Navigation (`SideProgress.jsx`)
* Fixed along the right viewport edge.
* Rendered as circular indicator dots with tooltips on hover:
  * Inactive dots: 15px diameter, subtle purple border.
  * Active dot: 19px diameter, filled purple background with soft glow shadow.
* **Intersection Observer:** Automatically tracks the active section in real-time as the user scrolls.
* **Responsive Hiding:** Hidden automatically on viewports `< 1140px` to eliminate overlap with cards.

### 5.3 Hero Section (Who We Are) (`HeroSection.jsx`)
* **Badge:** `Who we are` in Squada One with a purple border.
* **Heading:** *"Some problems don’t have **off-the-shelf answers.**"* (features multi-stop gradient on the accent text).
* **Narrative:** Two structured paragraphs emphasizing creative ambition coupled with operational discipline.
* **Tagline:** `<span class="pentagra-text">MAD ideas.</span> <span class="result-text">Real results.</span>` with optically aligned baselines.
* **Dual CTAs:**
  1. *"Our Capabilities"* (links to `#software-solutions`, 8% white fill, 15% stroke).
  2. *"Explore Portfolio"* (links to `#web-digital`, transparent fill, purple stroke).
* **Right Visual Stage:**
  * Animated glowing neon hummingbird (`/assets/hummingbird.png`).
  * Radial pulse aura (`.hummingbird-glow-backdrop`).
  * 3 interactive floating capability tags (*Web & Digital*, *Social & PR*, *Custom Software*) with floating micro-animations.

### 5.4 The MAD Model (`MadModelSection.jsx`)
* **Headline:** *"Most agencies wait to be briefed. **We don't.**"*
* **3-Card Capability Grid:**
  1. **Web & Digital:** Laptop icon, 4 purple bullet points, link to `#web-digital`.
  2. **Social & Marketing:** Megaphone icon, 4 purple bullet points, link to `#social-marketing`.
  3. **Software Solutions:** Code brackets icon, 4 blue bullet points, link to `#software-solutions`.
* **Commitment Banner:** Full-width glassmorphism pill reinforcing deadline integrity and client alignment.

### 5.5 Web & Digital (Portfolio Engine) (`WebDigitalSection.jsx`)
* **Control Bar:**
  * Live search input with real-time substring matching across project titles, domains, regions, and tech stack tags.
  * 4 Region filter pills: *All Markets*, *Sri Lanka*, *UK & GCC*, *Canada & Australia*.
* **Featured Showcase Slider:**
  * Domain badge and Country pill.
  * Case study summary and technology tags.
  * *"Explore Case Study"* CTA button opening the modal deep dive.
  * **Google Lighthouse Gauges:** 4 animated SVG rings rendering real-time performance scores (Performance, Accessibility, Best Practices, SEO).
  * **Interactive Mockup Frame:** Simulated browser window with URL pill, window controls, *"Scroll preview"* badge, and an internally scrollable high-res mockup.
  * Cross-fade animation during slide transitions.
* **Pagination:** Previous/Next arrow buttons and clickable indicator dots.
* **Expandable 11-Project Full Grid:**
  * Toggle button revealing all 11 client case studies in a 3-column (desktop) / 1-column (mobile) responsive grid.

### 5.6 Social & Marketing (`SocialMarketingSection.jsx`)
* **Headline:** *"Creative is the **Mechanism.**"*
* **Strategic Growth Philosophy:**
  * **Card 01 — Earn Attention Before You Buy It:** Details organic foundation before deploying paid amplification. Concludes with the Pentagra quote: *"Organic builds the foundation."*
  * **Card 02 — We Do The Homework:** Highlights audience respect and rigorous research. Concludes with: *"We may not be the biggest agency in the room. But we are almost certainly the most prepared."*

### 5.7 Software Solutions (MAD LABS) (`SoftwareSolutionsSection.jsx`)
* **Headline:** *"Most agencies build websites. **Some build campaigns. Very few build products.**"*
* **MAD Operations Portal v2.4 Simulator:**
  * Top bar with simulated traffic lights and a green animated pulsing live status dot.
  * **4 Core Deployment Stats:**
    1. `100%` Client Retention Across All Software Deployments
    2. `99.5 – 99.9%` Uptime Across Live Products On Google Cloud Platform
    3. `0%` Fraud Incidents Post-Launch On the CyberSource Payment Plugin
    4. `3` Live Client Deployments Across The Active Product Portfolio
  * Realtime microservice telemetry SVG waveform.
* **3 Solutions Cards:**
  1. *Custom API & Plugin Development* (with icon `/4.png`)
  2. *B2B Agent & Member Marketplace Portals* (with icon `/5.png`)
  3. *Automated Booking & Meeting Engines* (with icon `/7.png`)
* **Confidentiality Banner:** Shield icon and client discretion statement.
* **Action:** *"Explore MAD labs Portfolio"* button with icon `/8.png`.

### 5.8 Our Clients & Partners (`ClientsPartnersSection.jsx`)
* **Headline:** *"A growing portfolio. **A consistent standard.**"*
* **Continuous White Ribbon Marquee:**
  * Clean white background container (`#FFFFFF`) with 16px border-radius, soft blue/black drop shadow.
  * Infinite seamless linear CSS scroll with `animation-play-state: paused` on hover.
  * Features normalized partner logos: *Alliance of Independent Agencies, Apply2XL, Goldline Plastic, Kingsford College, Neesh Inc, Neesh Spice, VXL Education, VXL Migration, The Madhatter, PappaRich, NCCYW, Swasthi/Surasa, Delta*.

### 5.9 The Opportunity (`OpportunitySection.jsx`)
* **Headline:** *"Built, Proven, **Ready.**"*
* **2-Column Balanced Architecture:**
  * Left: Executive narrative detailing the scaling of tested Sri Lankan digital infrastructure into GCC regional enterprises.
  * Right: 3 Strategic highlight pillars (*Battle-Tested Pedigree*, *Turnkey Infrastructure*, *High-Stakes Partnership*).
* **Callout Banner:** *"The timing is right. The capability is real. Let's build together."*

### 5.10 Get In Touch (Contact Engine) (`ContactSection.jsx`)
* **Two-Column Symmetrical Grid:**
  * **Left: "Send Us a Message" Form:**
    * *Your Name* (required)
    * *Email Address* (required, validated with strict email regex)
    * *Project Type* (dropdown select)
    * *Project Description & Goals* (125px textarea)
    * Real-time inline error messages and button spinner during submission.
    * Saves inquiry data directly into `localStorage.getItem('mad_inquiries')`.
  * **Right: Contained Contact Information Card:**
    * Circular icon badges for Email (`info@madmarketing.lk`), Market Coverage, and Headquarters.
    * Social channels: Facebook, Instagram, LinkedIn, Pinterest, TikTok, YouTube.

### 5.11 Page Footer (`Footer.jsx`)
* Copyright: `© 2026 MAD Marketing. All rights reserved.`
* Navigation anchor links with responsive wrapping.

---

## 6. Interactive Modals System

All modals in the application utilize a unified single-scroll architecture with keyboard accessibility:
* Closes on **`Escape`** key press.
* Closes on **Backdrop Click**.
* Body scroll is locked (`overflow: hidden`) when any modal is active.
* Modal dialogs feature an easily reachable top-right `✕` close button.

### 1. Case Study Modal (`CaseStudyModal.jsx`)
* Renders comprehensive project breakdown:
  * Domain, Region, Client Category badges.
  * *"Visit Live Site"* external link with security attributes (`rel="noopener noreferrer"`).
  * High-resolution full mockup view in a natural single scroll.
  * Executive Overview, Problem Solving, and Measurable Outcomes.
  * Verified Technology Stack tags.
  * Lighthouse Audit Score meters.

### 2. MAD LABS Architecture Modal (`MadlabsModal.jsx`)
* Explains enterprise cloud standards, Docker containerization, CI/CD pipelines, multi-region database failover, and PCI-compliant tokenized payment architecture.
* Direct CTA leading into the contact section.

### 3. Submission Confirmation Modal (`SuccessModal.jsx`)
* Displays celebratory green check icon.
* Confirms inquiry receipt with the submitter's name, email, and selected project category.

---

## 7. Data Architecture & Local State

### Projects Data Schema (`src/data/projectsData.js`)
Each project object contains:
```javascript
{
  id: string,               // Unique identifier (e.g., 'aia-uk')
  title: string,            // Full business name
  domain: string,           // Web domain
  region: 'lk' | 'uk' | 'ca-au', // Region filter key
  regionLabel: string,      // Display region name
  summary: string,          // Primary case summary
  fullStory: string,        // In-depth background and achievements
  techTags: string[],       // Array of technology badges
  image: string,            // Path to project mockup asset
  lighthouse: {
    performance: number,    // 0 - 100
    accessibility: number,  // 0 - 100
    bestPractices: number,  // 0 - 100
    seo: number             // 0 - 100
  },
  clientType: string,       // Institutional category
  keyOutcome: string        // Measurable business outcome
}
```

### Local Storage Schema (`mad_inquiries`)
Submitted contact forms are persisted locally in JSON format:
```json
[
  {
    "id": 1790317500000,
    "name": "Jane Doe",
    "email": "jane@example.com",
    "subject": "Web & Digital Development",
    "message": "Looking to rebuild our corporate platform.",
    "timestamp": "2026-09-25T07:15:00.000Z"
  }
]
```

---

## 8. Mobile & Responsive UX Optimizations

| Viewport | Key Optimizations |
|---|---|
| **Mobile (`< 768px`)** | • Touch targets set to &ge; 48px.<br>• Inputs use 16px base font to prevent iOS viewport auto-zoom.<br>• Mobile drawer with scroll lock.<br>• Featured showcase card collapses to 1-column.<br>• Lighthouse gauges reorganize into a 2&times;2 grid.<br>• Two-column contact layout stacks into a single stream.<br>• Orbital pins on the hummingbird scale down and fit screen bounds. |
| **Tablet (`768px – 1140px`)** | • Side navigation dots automatically hide to prevent card collisions.<br>• Software stat cells format as a balanced 2&times;2 grid.<br>• Full portfolio grid displays in 2 clean columns. |
| **Desktop (`> 1140px`)** | • Full two-column showcase card.<br>• 4-column Software stats and Lighthouse meters.<br>• Active vertical side progress navigation dots.<br>• Interactive mouse spotlight ambient effect. |

---

## 9. Developer & Deployment Guide

### Prerequisites
* **Node.js:** v18.0.0 or higher (v24.x recommended)
* **npm:** v9.0.0 or higher

### Local Development
```bash
# 1. Install dependencies
npm install

# 2. Start Vite development server
npm run dev
```
The server will boot locally at `http://localhost:5173/`.

### Building for Production
```bash
# Compile and optimize assets into the /dist directory
npm run build
```
Vite outputs:
* Minified JavaScript bundle with code-splitting
* Optimized and purged CSS bundle
* Hashed static fonts and image references

### Previewing Production Build
```bash
npm run preview
```

### Production Deployment Options
* **Vercel / Netlify:** Connect the Git repository and set the build command to `npm run build` with output directory `dist`.
* **Static Hosting (AWS S3 + CloudFront / Cloudflare Pages / GitHub Pages):** Upload the contents of the `dist/` directory directly to the bucket or static root.
* **Nginx Server Configuration:**
```nginx
server {
    listen 80;
    server_name madmarketing.lk www.madmarketing.lk;
    root /var/www/mad-portfolio/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|otf)$ {
        expires 1y;
        add_header Cache-Control "public, no-transform";
    }
}
```
