import {
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  docker,
  threejs,
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "skills",
    title: "Skills",
  },
  {
    id: "experience",
    title: "Experience",
  },
  {
    id: "work",
    title: "Projects",
  },
  {
    id: "education",
    title: "Education",
  },
  {
    id: "github",
    title: "GitHub",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Agentic AI & RAG Pipelines",
    description:
      "Design Agentic AI and RAG pipelines with Claude, GPT-4o, and Gemini for secure document analysis and reasoning over complex datasets.",
    tag: "AI",
  },
  {
    title: "Full-Stack Production Apps",
    description:
      "Ship production full-stack apps with Next.js, React, Node.js, and Python (FastAPI) on PostgreSQL and Supabase.",
    tag: "WEB",
  },
  {
    title: "Hardware ↔ Software Bridge",
    description:
      "Bridge hardware and software — from ESP32 telemetry dashboards to custom UAV flight logic in C.",
    tag: "EMBED",
  },
  {
    title: "Problem to Shipped System",
    description:
      "Translate ambiguous problems into shipped systems, and teach others to do the same.",
    tag: "SHIP",
  },
];

const stackLayers = [
  {
    layer: "01",
    name: "SILICON",
    note: "ESP32 · sensors",
  },
  {
    layer: "02",
    name: "FIRMWARE",
    note: "Embedded C · PID",
  },
  {
    layer: "03",
    name: "DATA",
    note: "RAG · LLMs",
  },
  {
    layer: "04",
    name: "SCREEN",
    note: "React · pixels",
  },
];

const proofPoints = [
  {
    title: "RAG intelligence systems",
    detail: "Claude 3.5 · GPT-4o — internal secure document analysis",
  },
  {
    title: "40% efficiency gain",
    detail: "Legacy portal modernization with React & Node",
  },
  {
    title: "Project TITANZ",
    detail: "From-scratch UAV — 250Hz sensor-fusion + PID loop",
  },
  {
    title: "50+ staff trained",
    detail: "JavaScript, Python, and embedded C at the Ministry of Defense",
  },
];

const skillCategories = [
  {
    id: "ai",
    title: "AI & Intelligent Systems",
    accent: "primary",
    evidence: "Claude 3.5 · GPT-4o · secure document analysis",
    skills: [
      "Agentic AI",
      "RAG",
      "LLMs",
      "Prompt Engineering",
      "Computer Vision",
      "Anthropic Claude",
      "Python",
    ],
  },
  {
    id: "fullstack",
    title: "Full-Stack Development",
    accent: "secondary",
    evidence: "production apps · PostgreSQL · real-time systems",
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "MongoDB",
      "GraphQL",
      "REST APIs",
      "WebSocket",
      "Redux Toolkit",
      "Zustand",
      "TanStack Query",
      "Tailwind CSS",
      "shadcn/ui",
    ],
  },
  {
    id: "infra",
    title: "Infrastructure & DevOps",
    accent: "primary",
    evidence: "deployed services · containerized workloads",
    skills: [
      "Docker",
      "Kubernetes",
      "Git",
      "GitHub",
      "CI/CD",
    ],
  },
  {
    id: "embedded",
    title: "Embedded & Hardware",
    accent: "secondary",
    evidence: "Project TITANZ · 250Hz sensor-fusion · PID loop",
    skills: [
      "Embedded C",
      "C++",
      "ESP32",
      "Arduino",
      "ATmega328P",
      "IoT",
      "UAV Flight Dynamics",
      "Sensor Fusion",
      "PID Control",
    ],
  },
  {
    id: "leadership",
    title: "Training & Leadership",
    accent: "primary",
    evidence: "50+ staff trained at the Ministry of Defense",
    skills: [
      "Technical Training",
      "Mentoring",
      "Curriculum Development",
    ],
  },
];

const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Redux Toolkit",
    icon: redux,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "Three JS",
    icon: threejs,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "figma",
    icon: figma,
  },
  {
    name: "docker",
    icon: docker,
  },
];

const experiences = [
  {
    title: "Senior Full-Stack Developer & AI Engineer",
    company_name: "Ministry of National Defense — Tunisia",
    location: "Tunis, Tunisia",
    type: "Full-time · On-site",
    date: "Jan 2015 — Present",
    logo: `${import.meta.env.BASE_URL}company/min-nd.svg`,
    accent: "primary",
    current: true,
    points: [
      "Architected internal intelligence systems using Claude 3.5 & GPT-4o, implementing RAG pipelines for secure document analysis and automated reasoning over classified datasets.",
      "Delivered full-stack platforms for defense-grade internal operations using Next.js, FastAPI, and PostgreSQL, serving 500+ internal users.",
      "Built IoT telemetry dashboards for real-time monitoring of field assets via ESP32 and WebSocket-based streaming, reducing incident response time by 40%.",
      "Led the Project TITANZ UAV initiative — designed custom flight controllers in C combining sensor fusion (250Hz) and PID stabilization for autonomous flight.",
      "Modernized legacy internal portals with React and Node.js, improving system efficiency by 40% and reducing maintenance overhead.",
    ],
  },
  {
    title: "IT Instructor",
    company_name: "Ministry of National Defense — Tunisia",
    location: "Tunis, Tunisia",
    type: "Full-time · On-site",
    date: "Dec 2018 — Present",
    logo: `${import.meta.env.BASE_URL}company/min-nd.svg`,
    accent: "secondary",
    current: true,
    points: [
      "Trained 50+ technical staff on full-stack JavaScript (React, Node.js), Python, and embedded C.",
      "Designed advanced curricula bridging web development and hardware/embedded programming.",
      "Developed hands-on labs covering ESP32, Arduino, and IoT sensor integration.",
      "Mentored 10+ junior developers through structured code review and pair-programming sessions.",
    ],
  },
];

const education = [
  {
    title: "DUT Industrie Informatique",
    institution: "Higher Institute of Computer Science and Multimedia of Gabes (ISIMG)",
    location: "Gabes, Tunisia",
    type: "Diplôme Universitaire de Technologie",
    date: "Sep 2005 — Aug 2010",
    accent: "secondary",
    points: [
      "Diplôme Universitaire de Technologie (DUT) in Informatique Industrielle.",
      "Founded the technical foundation in software engineering, computer science, and industrial/embedded computing during the ISIMG programme.",
    ],
  },
];

const certifications = [
  "Building AI Applications with Pinecone",
  "Software Engineering Principles in Python",
  "LLMOps Concepts",
  "Working with Hugging Face",
  "JavaScript Essentials",
  "Python Essentials",
  "Developing LLM Applications with LangChain",
  "Model Context Protocol (MCP)",
  "Claude Code in Action",
  "Working with the OpenAI API",
  "Prompt Engineering with the OpenAI API",
  "English for IT 2",
];

const contactInfo = {
  email: "pcclub10@gmail.com",
  phone: "+216 20 089 732",
  location: "Tunisia",
};

const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/yahya-salhi",
    icon: "github",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/yahya-salhi-ai-engineer/",
    icon: "linkedin",
  },
  {
    name: "Upwork",
    url: "https://www.upwork.com/freelancers/~01fde061103dd6cd24",
    icon: "upwork",
  },
];

const availability = {
  enabled: true,
  label: "Available for Work",
  description:
    "I'm currently available for freelance projects and full-time opportunities. Let's discuss how I can help bring your ideas to life!",
};

const projects = [
  {
    id: "jobpilot",
    title: "JobPilot",
    category: "AI Full-Stack",
    summary:
      "Your AI-powered job-hunting assistant — automated discovery, GPT-4o match scoring, and autonomous company research.",
    problem:
      "Job hunting is one of the most repetitive and time-consuming tasks a developer faces: reading dozens of postings, judging fit, and researching companies from scratch takes hours.",
    role:
      "Designed and built the entire product — onboarding, the GPT-4o scoring pipeline, the autonomous research agents, and the analytics layer.",
    solution:
      "A Next.js 16 (App Router, Turbopack) + TypeScript app backed by InsForge (PostgreSQL, OAuth, Storage, Edge Functions). GPT-4o scores each job against the candidate's profile and resume via OpenRouter; Adzuna supplies live job data; Browserbase + Stagehand power the company dossiers; PostHog (with HogQL) drives the analytics dashboard.",
    results: [
      "Automates the full pre-apply pipeline: discovery → AI match scoring → company research → informed apply.",
      "Scores every job 0–100 with GPT-4o against the profile and uploaded resume, with skill-by-skill reasoning.",
      "Builds live company dossiers (culture, tech stack, interview prep) via autonomous browser agents.",
    ],
    tags: ["next.js", "typescript", "tailwind", "gpt-4o", "postgresql", "posthog"],
    image: "/projects/jop.png",
    imageAlt: "JobPilot job match scoring dashboard",
    year: 2026,
    liveUrl: null,
    repoUrl: null,
    featured: true,
    // TODO: Owner input needed — JobPilot live demo + repository URLs
  },
  {
    id: "titanz-drone",
    title: "DIY Quadcopter Drone",
    category: "Embedded",
    summary:
      "A custom-built quadcopter flight controller — sensor-fused attitude estimation and PID stabilization in C.",
    problem:
      "Off-the-shelf flight controllers are opaque and unmodifiable. Building the control loop from scratch means owning the maths, the sensor pipeline, and the tuning — no black boxes.",
    role:
      "Designed the custom flight controller in C — combining sensor fusion and PID stabilization for autonomous flight.",
    solution:
      "A hand-built quadcopter running a custom C flight controller with 250Hz sensor fusion and closed-loop PID stabilization, developed as part of the Project TITANZ UAV initiative.",
    results: [
      "250Hz sensor-fused attitude estimation for stable, responsive flight.",
      "Closed-loop PID control tuned for autonomous stabilization.",
      "Ground-up ownership of the flight-control stack — no proprietary black boxes.",
    ],
    tags: ["c", "embedded", "pwm", "pid", "imu", "sensor-fusion"],
    image: "/projects/drone.png",
    imageAlt: "Custom-built quadcopter drone with flight controller",
    year: null,
    liveUrl: null,
    repoUrl: null,
    featured: false,
    // TODO: Owner input needed — confirm year + any demo/repo links for the drone build
  },
  {
    id: "worldwise",
    title: "WorldWise",
    category: "Full-Stack",
    summary:
      "A React application for tracking travels around the world — interactive maps, city tracking, and travel statistics.",
    problem:
      "Keeping track of everywhere you've been and planning where to go next is scattered across notes, photos, and memory.",
    role:
      "Built the application end-to-end — the interactive map, city tracking, and travel statistics.",
    solution:
      "A React.js (TypeScript) application with an interactive map, city logging, and aggregated travel statistics behind a modern, responsive interface.",
    results: [
      "Pin and manage visited cities on an interactive world map.",
      "Aggregate travel statistics across your logged destinations.",
      "Clean, responsive UI for planning and reviewing trips.",
    ],
    tags: ["react", "typescript", "maps", "css"],
    image: "/projects/world.png",
    imageAlt: "WorldWise travel tracking interactive map",
    year: null,
    liveUrl: null,
    repoUrl: "https://github.com/yahya-salhi/worldwise",
    featured: false,
    // TODO: Owner input needed — confirm WorldWise year + live demo URL (repo is verified)
  },
  {
    id: "yezz",
    title: "YeZZi",
    category: "Mobile + AI",
    summary:
      "A mobile-first diabetes management companion — glucose tracking, GPT-4o Vision food logging, and exercise, all on-device.",
    problem:
      "Managing diabetes means tracking blood sugar, food choices, and physical activity with constant vigilance. People piece together a glucose log, a food diary, and a fitness tracker — YeZZ brings all three into one app and connects the dots: high post-meal glucose? Here's what you ate.",
    role:
      "Designed and built the entire product — the on-device data model, GPT-4o Vision food pipeline, IDF-based decision support, and the freemium monetization layer.",
    solution:
      "An Expo React Native app with all data on-device via exo-sqlite (no account, no cloud). GPT-4o Vision identifies meals from a photo and estimates nutrition + blood-glucose impact through an anonymous, quota'd API proxy. Readings are classified against IDF thresholds with pattern detection and color-coded decision cards; RevenueCat powers the YeZZi Plus subscription; Aptabase tracks anonymous feature usage only.",
    results: [
      "Log a fasting or post-meal reading in under 10 seconds, with mg/dL ⇄ mmol/L support.",
      "GPT-4o Vision food recognition with carb/protein/fat + glucose-impact estimates, linked to real post-meal readings for actual-vs-estimated comparison.",
      "Rolling averages (7/14/30/90-day), trend chart, and 3+ consecutive-high pattern alerts.",
      "100% on-device storage (SQLite) — no sign-up, backup/export to a local file, CSV export free + PDF doctor report with YeZZi Plus.",
    ],
    tags: ["react-native", "expo", "expo-sqlite", "typescript", "gpt-4o", "revenuecat"],
    image: "/projects/yezzi.png",
    imageAlt: "YeZZ diabetes management app screens",
    year: 2026,
    liveUrl: null,
    repoUrl: null,
    featured: false,
    // TODO: Owner input needed — YeZZ app screenshots + any demo/repo links (schema is verified from the product spec)
  },
];

export {
  services,
  stackLayers,
  proofPoints,
  skillCategories,
  technologies,
  experiences,
  education,
  certifications,
  contactInfo,
  socialLinks,
  availability,
  projects,
};
