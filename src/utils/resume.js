// Resume download utility

/**
 * Download resume file
 * Place your resume PDF in the public folder as 'resume.pdf'
 */
export const downloadResume = () => {
  // Check if resume file exists
  const resumeUrl = "/resume.pdf";

  // Create a temporary link element
  const link = document.createElement("a");
  link.href = resumeUrl;
  link.download = "Yahya_Salhi_Resume.pdf";
  link.target = "_blank";

  // Append to body, click, and remove
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * Open resume in new tab
 */
export const viewResume = () => {
  const resumeUrl = "/resume.pdf";
  window.open(resumeUrl, "_blank");
};

/**
 * Check if resume file exists
 */
export const checkResumeExists = async () => {
  try {
    const response = await fetch("/resume.pdf", { method: "HEAD" });
    return response.ok;
  } catch (error) {
    return false;
  }
};

/**
 * Generate a simple text-based resume (fallback)
 */
export const generateTextResume = () => {
  const resumeText = `================================================================================
                                YAHYA SALHI
                           Full Stack Developer
================================================================================

CONTACT INFORMATION
-------------------
📧 Email: pcclub10@gmail.com
📱 Phone: +216 20 089 732
📍 Location: Tunisia
🐙 GitHub: https://github.com/yahya-salhi
💼 LinkedIn: https://linkedin.com/in/salhi-yahya-365176168
💚 Upwork: https://www.upwork.com/freelancers/~01fde061103dd6cd24

PROFESSIONAL SUMMARY
--------------------
Passionate Full Stack Developer with expertise in modern web technologies.
Specializing in React.js, Node.js, TypeScript, and MongoDB. Creating dynamic
and responsive web applications with excellent user experiences. Committed to
continuous learning and staying current with industry best practices.

TECHNICAL SKILLS
----------------
Frontend Development:
• React.js, TypeScript, JavaScript (ES6+)
• HTML5, CSS3, Tailwind CSS, SASS/SCSS
• Bootstrap, Responsive Design
• State Management (Redux, Context API)

Backend Development:
• Node.js, Express.js
• MongoDB, Database Design
• RESTful APIs, GraphQL
• JWT Authentication

Tools & Technologies:
• Git & GitHub, VS Code
• Figma, Webpack, Vite
• Docker, Linux
• NPM/Yarn Package Management

Frameworks & Libraries:
• Next.js, Redux Toolkit
• React Router, Framer Motion
• Three.js, Material-UI

PROFESSIONAL EXPERIENCE
-----------------------
Full Stack Developer (Freelance)                              2022 - Present
• Developing modern web applications using React.js, Node.js, and MongoDB
• Building responsive and interactive user interfaces with TypeScript and
  Tailwind CSS
• Creating full-stack applications with Express.js backend and React frontend
• Implementing state management solutions using Context API and Redux
• Collaborating with clients to deliver high-quality, scalable solutions

Frontend Developer (Self-Employed)                            2021 - 2022
• Specialized in React.js development and component-based architecture
• Built multiple portfolio websites and landing pages using modern frameworks
• Implemented responsive designs using Bootstrap and custom CSS frameworks
• Developed interactive web applications with modern JavaScript ES6+ features
• Focused on performance optimization and user experience enhancement

FEATURED PROJECTS
-----------------
UpKeepPro
• Comprehensive maintenance and facility management solution
• Technologies: JavaScript, Node.js, MongoDB
• GitHub: https://github.com/yahya-salhi/UpKeepPro

MERN Store App
• Modern product store with React and advanced state management
• Technologies: React, TypeScript, Tailwind CSS
• GitHub: https://github.com/yahya-salhi/mern-app

WorldWise
• React.js application for tracking travels with interactive maps
• Technologies: React, TypeScript, CSS
• GitHub: https://github.com/yahya-salhi/worldwise

Save Gaza
• Web application for raising awareness and advocacy
• Technologies: React, JavaScript, CSS
• GitHub: https://github.com/yahya-salhi/save_gaza

React Quiz App
• Interactive quiz application with score tracking
• Technologies: React, JavaScript, CSS
• GitHub: https://github.com/yahya-salhi/React-Quiz

UsePopCorn
• Movie database application with search and watchlist features
• Technologies: React, JavaScript, API Integration
• GitHub: https://github.com/yahya-salhi/UsePopCorn

EDUCATION & LEARNING
--------------------
Self-Taught Full Stack Developer                              2020 - Present
• Completed comprehensive courses in React.js, Node.js, and modern web
  development through various online platforms
• Mastered TypeScript, MongoDB, Express.js, and various frontend frameworks
• Built numerous projects to practice and demonstrate skills in real-world
  scenarios
• Continuously learning new technologies and staying updated with industry
  trends and best practices
• Participated in coding challenges and open-source contributions

ADDITIONAL COMPETENCIES
-----------------------
• UI/UX Design - Creating intuitive and visually appealing interfaces
• Responsive Design - Building applications that work across all devices
• Performance Optimization - Optimizing applications for speed and efficiency
• Problem Solving - Analytical thinking and debugging complex issues
• Team Collaboration - Working effectively in team environments
• Continuous Learning - Staying updated with latest technologies

================================================================================
                        Generated from Portfolio - ${new Date().toLocaleDateString()}
================================================================================`;

  const blob = new Blob([resumeText], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "Yahya_Salhi_Resume.txt";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Generate and open HTML resume in new tab (can be printed as PDF)
 */
export const generateHTMLResume = () => {
  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Yahya Salhi - Resume</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background: white;
        }

        .header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 3px solid #915EFF;
            padding-bottom: 20px;
        }

        .header h1 {
            font-size: 2.5em;
            color: #915EFF;
            margin-bottom: 5px;
        }

        .header h2 {
            font-size: 1.3em;
            color: #666;
            font-weight: normal;
        }

        .contact-info {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 20px;
            margin-top: 15px;
        }

        .contact-item {
            font-size: 0.9em;
            color: #555;
        }

        .section {
            margin-bottom: 25px;
        }

        .section h3 {
            font-size: 1.3em;
            color: #915EFF;
            border-bottom: 2px solid #915EFF;
            padding-bottom: 5px;
            margin-bottom: 15px;
        }

        .experience-item, .project-item {
            margin-bottom: 20px;
        }

        .experience-title {
            font-weight: bold;
            color: #333;
        }

        .experience-date {
            float: right;
            color: #666;
            font-style: italic;
        }

        .experience-company {
            color: #915EFF;
            font-weight: 500;
        }

        .experience-description {
            margin-top: 8px;
        }

        .experience-description li {
            margin-bottom: 5px;
        }

        .skills-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
        }

        .skill-category h4 {
            color: #915EFF;
            margin-bottom: 8px;
        }

        .skill-category ul {
            list-style: none;
        }

        .skill-category li {
            padding: 2px 0;
            font-size: 0.9em;
        }

        .skill-category li:before {
            content: "• ";
            color: #915EFF;
            font-weight: bold;
        }

        .project-title {
            font-weight: bold;
            color: #915EFF;
        }

        .project-tech {
            font-style: italic;
            color: #666;
            font-size: 0.9em;
        }

        @media print {
            body {
                padding: 0;
                font-size: 12px;
            }

            .header h1 {
                font-size: 2em;
            }

            .contact-info {
                font-size: 0.8em;
            }

            .section {
                margin-bottom: 20px;
            }
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>YAHYA SALHI</h1>
        <h2>Full Stack Developer</h2>
        <div class="contact-info">
            <div class="contact-item">📧 pcclub10@gmail.com</div>
            <div class="contact-item">📱 +216 20 089 732</div>
            <div class="contact-item">📍 Tunisia</div>
            <div class="contact-item">🐙 github.com/yahya-salhi</div>
        </div>
    </div>

    <div class="section">
        <h3>PROFESSIONAL SUMMARY</h3>
        <p>Passionate Full Stack Developer with expertise in modern web technologies. Specializing in React.js, Node.js, TypeScript, and MongoDB. Creating dynamic and responsive web applications with excellent user experiences. Committed to continuous learning and staying current with industry best practices.</p>
    </div>

    <div class="section">
        <h3>TECHNICAL SKILLS</h3>
        <div class="skills-grid">
            <div class="skill-category">
                <h4>Frontend Development</h4>
                <ul>
                    <li>React.js & TypeScript</li>
                    <li>JavaScript (ES6+)</li>
                    <li>HTML5 & CSS3</li>
                    <li>Tailwind CSS & SASS</li>
                    <li>Responsive Design</li>
                </ul>
            </div>
            <div class="skill-category">
                <h4>Backend Development</h4>
                <ul>
                    <li>Node.js & Express.js</li>
                    <li>MongoDB & Database Design</li>
                    <li>RESTful APIs & GraphQL</li>
                    <li>JWT Authentication</li>
                </ul>
            </div>
            <div class="skill-category">
                <h4>Tools & Technologies</h4>
                <ul>
                    <li>Git & GitHub</li>
                    <li>VS Code & Figma</li>
                    <li>Webpack & Vite</li>
                    <li>Docker & Linux</li>
                </ul>
            </div>
            <div class="skill-category">
                <h4>Frameworks & Libraries</h4>
                <ul>
                    <li>Next.js & Redux Toolkit</li>
                    <li>React Router</li>
                    <li>Framer Motion</li>
                    <li>Three.js & Material-UI</li>
                </ul>
            </div>
        </div>
    </div>

    <div class="section">
        <h3>PROFESSIONAL EXPERIENCE</h3>

        <div class="experience-item">
            <div class="experience-title">Full Stack Developer (Freelance) <span class="experience-date">2022 - Present</span></div>
            <div class="experience-description">
                <ul>
                    <li>Developing modern web applications using React.js, Node.js, and MongoDB</li>
                    <li>Building responsive and interactive user interfaces with TypeScript and Tailwind CSS</li>
                    <li>Creating full-stack applications with Express.js backend and React frontend</li>
                    <li>Implementing state management solutions using Context API and Redux</li>
                    <li>Collaborating with clients to deliver high-quality, scalable solutions</li>
                </ul>
            </div>
        </div>

        <div class="experience-item">
            <div class="experience-title">Frontend Developer (Self-Employed) <span class="experience-date">2021 - 2022</span></div>
            <div class="experience-description">
                <ul>
                    <li>Specialized in React.js development and component-based architecture</li>
                    <li>Built multiple portfolio websites and landing pages using modern frameworks</li>
                    <li>Implemented responsive designs using Bootstrap and custom CSS frameworks</li>
                    <li>Developed interactive web applications with modern JavaScript ES6+ features</li>
                </ul>
            </div>
        </div>
    </div>

    <div class="section">
        <h3>FEATURED PROJECTS</h3>

        <div class="project-item">
            <div class="project-title">UpKeepPro</div>
            <div class="project-tech">JavaScript, Node.js, MongoDB</div>
            <p>Comprehensive maintenance and facility management solution designed to streamline operations and track assets.</p>
        </div>

        <div class="project-item">
            <div class="project-title">MERN Store App</div>
            <div class="project-tech">React, TypeScript, Tailwind CSS</div>
            <p>Modern product store with advanced state management, featuring product management and user authentication.</p>
        </div>

        <div class="project-item">
            <div class="project-title">WorldWise</div>
            <div class="project-tech">React, TypeScript, CSS</div>
            <p>React.js application for tracking travels around the world with interactive maps and travel statistics.</p>
        </div>
    </div>

    <div class="section">
        <h3>EDUCATION & LEARNING</h3>
        <div class="experience-item">
            <div class="experience-title">Self-Taught Full Stack Developer <span class="experience-date">2020 - Present</span></div>
            <div class="experience-description">
                <ul>
                    <li>Completed comprehensive courses in React.js, Node.js, and modern web development</li>
                    <li>Mastered TypeScript, MongoDB, Express.js, and various frontend frameworks</li>
                    <li>Built numerous projects to practice and demonstrate skills in real-world scenarios</li>
                    <li>Continuously learning new technologies and staying updated with industry trends</li>
                </ul>
            </div>
        </div>
    </div>
</body>
</html>`;

  const blob = new Blob([htmlContent], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const newWindow = window.open(url, "_blank");

  // Clean up the URL after a delay
  setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 1000);

  // Focus the new window
  if (newWindow) {
    newWindow.focus();
  }
};
