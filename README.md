# Yahya Salhi — AI Engineer & Full-Stack Developer Portfolio

[![Vite](https://img.shields.io/badge/Vite-5.0+-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18.2+-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Three.js](https://img.shields.io/badge/Three.js-r160-black?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-10.18+-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Deployed on Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://portfolio-yahya-salhi.com)

A high-performance, responsive portfolio single-page application built for **Yahya Salhi**, an **AI Engineer & Full-Stack Developer** with 11+ years of experience. Designed with a modern dark glassmorphism aesthetic, interactive 3D elements, fluid animations, real-time GitHub stats, and an AI-powered conversational assistant.

---

## 🌐 Live Demo

- **Production URL:** [https://yahya-salhi.vercel.app/](https://yahya-salhi.vercel.app/)
- **Alternative Mirror:** [https://yahya-salhi.github.io/My_Portfolio/](https://yahya-salhi.github.io/My_Portfolio/)

---

## ✨ Key Features

- 🌌 **Premium Dark Glassmorphism UI:** Design system powered by Tailwind CSS v4 custom tokens, custom glassmorphism surfaces, and neon accent highlights.
- 🎮 **Interactive 3D Visuals:** Three.js / React Three Fiber & Drei integration with desktop 3D computer model and interactive 3D planet. Automatically adapts with performance fallbacks and respects `prefers-reduced-motion`.
- 🤖 **AI Portfolio Assistant:** Integrated Chatbot powered by OpenAI GPT-4o via secure Vercel Edge Function (`/api/chat`), with RAG context support and rate-limiting safeguards.
- 📊 **Real-time GitHub Statistics:** Live synchronization with GitHub REST API displaying public repositories, languages breakdown, and contribution metrics.
- 💼 **Case-Study Works Showcase:** Detailed project cards with live links, source code, role breakdowns, and technology badges.
- 📨 **Direct Contact & EmailJS Integration:** Client-side contact form with real-time feedback, toasts via `react-hot-toast`, and direct fallback email options.
- ⚡ **Optimized Performance & Accessibility:** WCAG 2.2 AA compliant, full keyboard navigation, automated image optimization pipeline (`sharp`), and route/component code splitting.

---

## 🛠️ Tech Stack

| Layer | Technology | Version / Details |
|---|---|---|
| **Core Framework** | React.js | `^18.2.0` (Client-Side SPA) |
| **Build Tooling** | Vite | `^5.0.8` (Fast HMR & Rollup bundling) |
| **Styling** | Tailwind CSS | `v4` (`@theme` design tokens) |
| **3D Rendering** | Three.js / R3F / Drei | `^0.160.0` / `^8.15.14` / `^9.93.0` |
| **Animation** | Framer Motion | `^10.18.0` (Fluid scroll and stagger animations) |
| **Notifications** | React Hot Toast | `^2.5.2` |
| **Contact Service** | EmailJS Browser | `^3.12.1` |
| **Chatbot Backend** | Vercel Edge Function | Node / Edge runtime with OpenAI GPT-4o proxy |
| **Image Processing** | Sharp | `^0.33.5` (WebP/AVIF image optimization script) |
| **Deployment** | Vercel | Production Hosting with Serverless / Edge APIs |

---

## 📁 Project Structure

```text
portfolio/
├── api/                     # Vercel Serverless / Edge Functions
│   ├── chat.js              # OpenAI GPT-4o Chatbot proxy & rate limiting
│   ├── health.js            # API health check endpoint
│   ├── prompts/             # System prompts and personas
│   └── rag/                 # RAG retrieval context and embeddings
├── context/                 # Architectural specifications and UI tokens
├── public/                  # Static assets & 3D models (.gltf / .bin)
│   ├── desktop_pc/          # 3D Computer model assets
│   ├── planet/              # 3D Earth model assets
│   └── images/              # Static media & optimized imagery
├── scripts/                 # Build & maintenance automation scripts
│   ├── build-rag-index.mjs  # Compiles RAG knowledge index for chatbot
│   ├── fetch-github-stats.mjs # Pre-fetches GitHub statistics
│   └── optimize-images.mjs  # Image compression and WebP conversion
├── src/
│   ├── assets/              # Icons and component imagery
│   ├── components/          # Modular React components
│   │   ├── canvas/          # Three.js 3D canvas modules
│   │   ├── chatbot/         # AI assistant interface & modal
│   │   ├── About.jsx        # Professional summary and strengths
│   │   ├── Contact.jsx      # Contact form & 3D planet section
│   │   ├── Education.jsx    # Education & certifications
│   │   ├── Experience.jsx   # Interactive career timeline
│   │   ├── GitHubStats.jsx  # GitHub analytics cards
│   │   ├── Hero.jsx         # Hero header & 3D canvas viewport
│   │   ├── Navbar.jsx       # Fixed blur header & mobile drawer
│   │   ├── Skills.jsx       # Categorized skill chips & levels
│   │   └── Works.jsx        # Filterable project case studies
│   ├── constants/           # Source of truth for portfolio data
│   │   └── index.js         # Projects, experience, and bio data
│   ├── hoc/                 # Higher-Order Components (SectionWrapper)
│   ├── utils/               # Helpers, motion variants & API clients
│   ├── App.jsx              # Main SPA layout & lazy component loader
│   ├── index.css            # Tailwind v4 theme tokens & glassmorphism
│   ├── main.jsx             # React entrypoint
│   └── styles.js            # Standardized typography & layout helpers
├── .env.example             # Environment variable template
├── package.json
├── tailwind.config.js
└── vite.config.js
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: `v18.x` or later (LTS recommended)
- **npm** / **pnpm** / **yarn**

### 1. Clone & Install

```bash
# Clone repository
git clone https://github.com/yahya-salhi/portfolio.git
cd portfolio

# Install dependencies
npm install
```

### 2. Configure Environment Variables

Create `.env` in the root directory:

```env
# EmailJS configuration (Client-side)
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key

# OpenAI API Key (For Edge Functions / Local Vercel CLI)
OPENAI_API_KEY=your_openai_api_key
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts Vite local development server with HMR. |
| `npm run build` | Optimizes images and creates a production build in `/dist`. |
| `npm run preview` | Locally serves the built production `/dist` bundle. |
| `npm run lint` | Runs ESLint to check for code quality and styling errors. |
| `npm run optimize-images` | Compresses public assets to WebP/AVIF formats via Sharp. |
| `npm run update:github-stats` | Updates cached GitHub activity and language metrics. |
| `npm run build:rag` | Builds indexed context chunks for the AI chatbot. |

---

## ⚙️ Customization Guide

### 1. Portfolio Content & Projects
All static portfolio content (bio, skills, career timeline, projects, and social links) is centralized in:
- `src/constants/index.js`

### 2. Design Tokens & Styling
Design tokens (primary colors, glass surfaces, border radii, shadows) follow Tailwind CSS v4 syntax defined in:
- `src/index.css`
- `context/ui-tokens.md`

### 3. 3D Scenes
3D models and canvas setups are located in `src/components/canvas/`. Adjust lighting, camera angles, or performance thresholds directly within these components.

---

## 🚀 Deployment

### Vercel (Recommended)

This project is tailored for zero-config deployment on Vercel:

1. Push your repository to GitHub.
2. Import your repository in the [Vercel Dashboard](https://vercel.com).
3. Add your production environment variables (`OPENAI_API_KEY`, `VITE_EMAILJS_*`).
4. Click **Deploy**. Vercel will automatically build the client SPA and expose the `/api/chat` Edge Function.

---

## 👨‍💻 Author

**Yahya Salhi**  
*AI Engineer & Full-Stack Developer*

- 🌐 **Portfolio:** [yahya-salhi.vercel.app/](https://yahya-salhi.vercel.app/)
- 💼 **LinkedIn:** [linkedin.com/in/yahya-salhi-ai-engineer](https://www.linkedin.com/in/yahya-salhi-ai-engineer/)
- 🐙 **GitHub:** [@yahya-salhi](https://github.com/yahya-salhi)
- ✉️ **Email:** [pcclub10@gmail.com](mailto:pcclub10@gmail.com)

---

## 📄 License

This project is open-source and licensed under the [MIT License](LICENSE).
