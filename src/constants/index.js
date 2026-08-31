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

const projectImage = (file) => `${import.meta.env.BASE_URL}projects/${file}`;

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

const projects = [
  {
    name: "UpKeepPro",
    description:
      "A comprehensive maintenance and facility management solution designed to streamline operations, track assets, and optimize maintenance workflows. Built with modern web technologies.",
    tags: [
      {
        name: "javascript",
        color: "blue-text-gradient",
      },
      {
        name: "nodejs",
        color: "green-text-gradient",
      },
      {
        name: "mongodb",
        color: "pink-text-gradient",
      },
    ],
    image: projectImage("carrent.webp"),
    source_code_link: "https://github.com/yahya-salhi/UpKeepPro",
  },
  {
    name: "MERN Store App",
    description:
      "A modern product store built with React and advanced state management. Features include product management, shopping cart, user authentication, and responsive design.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "typescript",
        color: "green-text-gradient",
      },
      {
        name: "tailwindcss",
        color: "pink-text-gradient",
      },
    ],
    image: projectImage("jobit.webp"),
    source_code_link: "https://github.com/yahya-salhi/mern-app",
  },
  {
    name: "WorldWise",
    description:
      "A React.js application for tracking your travels around the world. Features interactive maps, city tracking, and travel statistics with a modern user interface.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "typescript",
        color: "green-text-gradient",
      },
      {
        name: "css",
        color: "pink-text-gradient",
      },
    ],
    image: projectImage("tripguide.webp"),
    source_code_link: "https://github.com/yahya-salhi/worldwise",
  },
  {
    name: "Save Gaza",
    description:
      "A web application dedicated to raising awareness and advocating for justice in Gaza. Built with React.js to spread awareness and provide information.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "javascript",
        color: "green-text-gradient",
      },
      {
        name: "css",
        color: "pink-text-gradient",
      },
    ],
    image: projectImage("carrent.webp"),
    source_code_link: "https://github.com/yahya-salhi/save_gaza",
  },
  {
    name: "React Quiz App",
    description:
      "An interactive quiz application built with React.js featuring multiple choice questions, score tracking, and responsive design for an engaging user experience.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "javascript",
        color: "green-text-gradient",
      },
      {
        name: "css",
        color: "pink-text-gradient",
      },
    ],
    image: projectImage("jobit.webp"),
    source_code_link: "https://github.com/yahya-salhi/React-Quiz",
  },
  {
    name: "UsePopCorn",
    description:
      "A movie database application built with React.js that allows users to search for movies, view details, and manage their watchlist with a clean interface.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "javascript",
        color: "green-text-gradient",
      },
      {
        name: "api",
        color: "pink-text-gradient",
      },
    ],
    image: projectImage("tripguide.webp"),
    source_code_link: "https://github.com/yahya-salhi/UsePopCorn",
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
  projects,
};
