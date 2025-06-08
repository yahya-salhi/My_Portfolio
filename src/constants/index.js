import {
  mobile,
  backend,
  creator,
  web,
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
  meta,
  starbucks,
  tesla,
  shopify,
  carrent,
  jobit,
  tripguide,
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
    id: "work",
    title: "Work",
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
    title: "Web Developer",
    icon: web,
  },
  {
    title: "ReactJs  Developer",
    icon: mobile,
  },
  {
    title: "NodeJs Developer",
    icon: backend,
  },
  {
    title: "NextJs Developer",
    icon: creator,
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
    title: "Full Stack Developer",
    company_name: "Freelance",
    icon: web, // Using web icon as placeholder
    iconBg: "#383E56",
    date: "2022 - Present",
    points: [
      "Developing modern web applications using React.js, Node.js, and MongoDB.",
      "Building responsive and interactive user interfaces with TypeScript and Tailwind CSS.",
      "Creating full-stack applications with Express.js backend and React frontend.",
      "Implementing state management solutions using Context API and Redux.",
      "Working with various APIs and integrating third-party services.",
    ],
  },
  {
    title: "Frontend Developer",
    company_name: "Self-Employed",
    icon: mobile,
    iconBg: "#E6DEDD",
    date: "2021 - 2022",
    points: [
      "Specialized in React.js development and component-based architecture.",
      "Built multiple portfolio websites and landing pages using HTML5, CSS3, and JavaScript.",
      "Implemented responsive designs using Bootstrap and custom CSS frameworks.",
      "Developed interactive web applications with modern JavaScript ES6+ features.",
      "Collaborated with designers to create pixel-perfect user interfaces.",
    ],
  },
  {
    title: "Web Developer",
    company_name: "Learning & Projects",
    icon: backend,
    iconBg: "#383E56",
    date: "2020 - 2021",
    points: [
      "Mastered fundamental web technologies including HTML5, CSS3, and JavaScript.",
      "Built various template projects and landing pages to practice design skills.",
      "Learned version control with Git and collaborative development workflows.",
      "Explored modern CSS frameworks and preprocessors like SASS/SCSS.",
      "Developed problem-solving skills through coding challenges and projects.",
    ],
  },
];

const testimonials = [
  {
    testimonial:
      "Yahya delivered exceptional work on our React project. His attention to detail and modern development practices exceeded our expectations.",
    name: "Ahmed Hassan",
    designation: "Project Manager",
    company: "Tech Solutions",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    testimonial:
      "Working with Yahya was a great experience. He built a responsive and interactive web application that perfectly matched our requirements.",
    name: "Sarah Johnson",
    designation: "Product Owner",
    company: "Digital Agency",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    testimonial:
      "Yahya's expertise in React and TypeScript helped us modernize our application. His code quality and documentation are outstanding.",
    name: "Mohamed Ali",
    designation: "Lead Developer",
    company: "StartupHub",
    image: "https://randomuser.me/api/portraits/men/3.jpg",
  },
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
    image: carrent, // Using placeholder image
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
    image: jobit, // Using placeholder image
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
    image: tripguide, // Using placeholder image
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
    image: carrent, // Using placeholder image
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
    image: jobit, // Using placeholder image
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
    image: tripguide, // Using placeholder image
    source_code_link: "https://github.com/yahya-salhi/UsePopCorn",
  },
];

export { services, technologies, experiences, testimonials, projects };
