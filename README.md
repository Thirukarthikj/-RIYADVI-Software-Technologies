# Riyadvi Software Technologies — Corporate Website Revamp

> A next-generation, luxury digital experience, 3D interactive web application, and full-stack enterprise architecture engineered for **Riyadvi Software Technologies**.

---

## 🌟 Executive Summary

This project revamps the corporate web presence of **Riyadvi Software Technologies** from a conventional static website into an immersive, dynamic digital flagship. Built with **Next.js 14 App Router**, **Three.js / React Three Fiber**, **Framer Motion**, **TailwindCSS**, and an **Express.js / MongoDB** backend, this platform showcases technical mastery, aesthetic excellence, and high-conversion lead generation workflows.

- **Primary Colors:** Luxury Gold (`#D4AF37`) & Deep Obsidian Black (`#000000` / `#0A0A0A`)
- **Typography:** Inter (Body), Montserrat (Headings), Poppins (Accents)
- **3D Tech Stack:** Three.js, React Three Fiber, React Three Drei
- **Animation & Motion:** Framer Motion, Lenis Smooth Scroll, GSAP
- **Full-Stack REST API:** Express.js, MongoDB (Mongoose), Multer, Express-Validator

---

## 🏗️ Architecture & Technology Stack

```
Revamp Riyadvi Software Technologies Website/
├── frontend/                     # Next.js 14 App Router Frontend
│   ├── public/                   # Static assets & SVG icons
│   ├── src/
│   │   ├── app/                  # Application Routes (Pages)
│   │   │   ├── page.js           # High-Impact 3D Homepage
│   │   │   ├── layout.js         # Root Layout (Navbar, Footer, Lenis, Fonts)
│   │   │   ├── globals.css       # Custom design tokens, glassmorphism, utilities
│   │   │   ├── about/            # Company Story, Vision, Animated Timeline
│   │   │   ├── services/         # Services Catalog
│   │   │   │   └── [slug]/       # Dynamic Service Deep Dives (6 Services)
│   │   │   ├── portfolio/        # Filterable Portfolio & Case Studies
│   │   │   │   └── [slug]/       # Dynamic Case Study Showcase
│   │   │   ├── blog/             # Insights Hub (Search, Category Filters)
│   │   │   │   └── [slug]/       # Dynamic Article Reader
│   │   │   ├── careers/          # Talent Hub, Perks, Culture
│   │   │   │   └── [slug]/       # Dynamic Job Application with Resume Upload
│   │   │   ├── contact/          # Consultation Scheduler & Contact Form
│   │   │   ├── business-health-checkup/ # Multi-Step Digital Audit Tool
│   │   │   ├── software-project-planning-guide/ # 38-Page Lead Magnet
│   │   │   └── admin/            # Executive Admin Command Center
│   │   ├── components/
│   │   │   ├── 3d/               # Interactive 3D Canvas R3F Components
│   │   │   │   ├── HeroScene.js  # Node Network & Parallax Constellation
│   │   │   │   ├── TechEcosystem.js # Orbiting 3D Tech Badges
│   │   │   │   └── ServiceScene.js  # Service-specific 3D Models
│   │   │   ├── layout/           # Navbar, Footer, SmoothScroll
│   │   │   └── ui/               # SectionHeader, StatCard, ServiceCard, etc.
│   │   ├── data/                 # Unified site data (Services, Case Studies, Blogs, Jobs)
│   │   └── utils/                # API client with seamless offline mock fallback
│   └── package.json
│
├── backend/                      # Node.js + Express.js API
│   ├── src/
│   │   ├── config/               # Database connection (MongoDB)
│   │   ├── controllers/          # Business logic & responses
│   │   ├── middleware/           # Input validators & error handlers
│   │   ├── models/               # Mongoose Schemas (Contact, Consultation, Application, etc.)
│   │   ├── routes/               # API Endpoints
│   │   └── server.js             # Express application entry point
│   ├── uploads/                  # Candidate resume file storage
│   └── package.json
│
└── README.md                     # Comprehensive Project Documentation
```

---

## 🎨 Visual Aesthetics & Brand Engineering

1. **Curated Luxury Palette**:
   - Primary Gold: `#D4AF37`
   - Light Gold: `#F5D77F`
   - Dark Gold: `#997D21`
   - Obsidian Base: `#050505` to `#111111`
   - Subtle Gold Glows & Borders: `border-gold/30`, `shadow-gold/20`
2. **Glassmorphism & Depth**:
   - Custom `.glass` and `.glass-dark` utility classes with `backdrop-filter: blur(16px)` and translucent gradient borders.
3. **Smooth Scroll Experience**:
   - Integrated **Lenis** smooth scrolling for momentum-based interaction across all long-form pages.

---

## 🌌 3D Interactive Experiences (4+ Implementations)

1. **Interactive 3D Hero Constellation (`HeroScene.js`)**:
   - Dynamic wireframe sphere with pulsating node vertices and mouse parallax.
   - Interactive gold sparkle field and orbital velocity rings.
2. **3D Technology Ecosystem (`TechEcosystem.js`)**:
   - Central glowing core surrounded by orbiting satellite rings and interactive tech orbs.
3. **Service-Specific 3D Models (`ServiceScene.js`)**:
   - Web Development: 3D interactive floating browser frame.
   - Mobile Engineering: Floating smartphone model with viewport screen.
   - Digital Marketing: 3D animated growth metric bars.
   - Cloud / DevOps: Concentric orbiting planetary rings.
4. **Interactive 3D Case Study Highlights**:
   - Custom Canvas integration for featured client deliveries.

---

## 📑 Complete Page Breakdown

| Route | Page Name | Key Features |
|---|---|---|
| `/` | **Homepage** | 3D Hero, Metric counters, Digital Transformation scroll story, 6 Services, Tech 3D constellation, Portfolio showcase, Why Riyadvi, Consultation CTA |
| `/about` | **About Riyadvi** | Company foundation story, Vision/Mission/Values, Interactive 5-Year Milestones Timeline, Awards & Recognition, 3D Tech Scene |
| `/services` | **Services Catalog** | Grid of all engineering services, phased delivery methodology, conversion CTAs |
| `/services/[slug]` | **Service Detail** | Dynamic page per service with 3D model, problem/solution, process steps, tech stack, industry use cases, and related case studies |
| `/portfolio` | **Portfolio & Work** | Filterable by category, featured client spotlight, metrics achieved, client testimonials |
| `/portfolio/[slug]` | **Case Study Detail** | In-depth engineering retrospective, before/after metrics, tech stack, related projects |
| `/blog` | **Insights & Blog** | Real-time search, category filters, featured banner, tags, newsletter subscription |
| `/blog/[slug]` | **Article Detail** | Clean typography, reading time, table of contents, copy link tool, related reads |
| `/careers` | **Careers Hub** | Culture pillars, perks & benefits grid, department filter, open positions |
| `/careers/[slug]` | **Job Detail & Apply** | Responsibilities, requirements, benefits, and working application form with resume file upload |
| `/contact` | **Contact & Strategy** | Dual-tab booking (Architecture Consultation vs. General Inquiry), HQ location, FAQ accordion |
| `/business-health-checkup` | **Health Checkup** | Multi-step interactive digital assessment wizard with automated scoring engine and tailored roadmap |
| `/software-project-planning-guide` | **Lead Magnet** | 38-page technical playbook download landing page with instant access form |
| `/admin` | **Admin Command Center**| Executive dashboard with KPI metric cards, tabs for all lead types, and JSON payload inspector |

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js** (v18.x or v20.x recommended)
- **npm** or **pnpm**
- **MongoDB** (Optional for local persistent storage; frontend automatically falls back to localStorage if backend is offline)

---

### 2. Frontend Setup & Launch

```bash
# Navigate to frontend
cd frontend

# Install dependencies (already pre-installed)
npm install

# Start Next.js development server
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

To verify a production build:
```bash
npm run build
npm start
```

---

### 3. Backend Setup & Launch

```bash
# Navigate to backend
cd backend

# Install dependencies (already pre-installed)
npm install

# Start Express server
node src/server.js
# Or with nodemon:
npm run dev
```
The REST API runs on **[http://localhost:5000](http://localhost:5000)**.
- Health Check: `http://localhost:5000/health`
- API Base: `http://localhost:5000/api`

---

## 🤖 AI-Assisted Development Teardown

This revamp was built utilizing cutting-edge **AI-assisted development methodologies**:
- **Prompt Architecture & Planning:** Structured multi-phase roadmap generated and tracked via Antigravity IDE artifacts.
- **3D Procedural Math:** Complex Three.js vector mathematics, particle distributions, and quaternion rotations in `@react-three/fiber` scenes designed with AI assistance.
- **Dynamic Routing & Architecture:** Unified JSON data schemas (`siteData.js`) mapped across Next.js 14 App Router dynamic segments (`[slug]`).
- **Resilient Fallback Design:** Implementation of dual-mode API handlers that transition between live MongoDB storage and client-side offline mock caches.

---

## 📄 License & Credits
Developed for **Riyadvi Software Technologies**. All brand assets, trademarks, and content rights belong to Riyadvi Software Technologies.
