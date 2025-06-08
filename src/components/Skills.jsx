import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const skillsData = {
  "Frontend Development": [
    { name: "React.js", level: 90 },
    { name: "TypeScript", level: 85 },
    { name: "JavaScript (ES6+)", level: 95 },
    { name: "HTML5", level: 95 },
    { name: "CSS3", level: 90 },
    { name: "Tailwind CSS", level: 85 },
    { name: "SASS/SCSS", level: 80 },
    { name: "Bootstrap", level: 85 },
  ],
  "Backend Development": [
    { name: "Node.js", level: 85 },
    { name: "Express.js", level: 80 },
    { name: "MongoDB", level: 75 },
    { name: "RESTful APIs", level: 85 },
    { name: "GraphQL", level: 70 },
    { name: "JWT Authentication", level: 80 },
  ],
  "Tools & Technologies": [
    { name: "Git & GitHub", level: 90 },
    { name: "VS Code", level: 95 },
    { name: "Figma", level: 75 },
    { name: "Webpack", level: 70 },
    { name: "Vite", level: 85 },
    { name: "NPM/Yarn", level: 90 },
    { name: "Linux", level: 75 },
    { name: "Docker", level: 65 },
  ],
  "Frameworks & Libraries": [
    { name: "Next.js", level: 80 },
    { name: "Redux Toolkit", level: 75 },
    { name: "React Router", level: 90 },
    { name: "Framer Motion", level: 80 },
    { name: "Three.js", level: 70 },
    { name: "Material-UI", level: 75 },
    { name: "Styled Components", level: 80 },
  ],
};

const SkillBar = ({ skill, delay }) => (
  <motion.div
    variants={fadeIn("right", "spring", delay, 0.75)}
    className="mb-6"
  >
    <div className="flex justify-between items-center mb-2">
      <span className="text-white text-[16px] font-medium">{skill.name}</span>
      <span className="text-secondary text-[14px]">{skill.level}%</span>
    </div>
    <div className="w-full bg-black-200 rounded-full h-3">
      <motion.div
        className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full"
        initial={{ width: 0 }}
        whileInView={{ width: `${skill.level}%` }}
        transition={{ duration: 1, delay: delay }}
        viewport={{ once: true }}
      />
    </div>
  </motion.div>
);

const SkillCategory = ({ category, skills, index }) => (
  <motion.div
    variants={fadeIn("up", "spring", index * 0.2, 0.75)}
    className="bg-tertiary p-4 sm:p-6 rounded-2xl w-full lg:w-[48%]"
  >
    <h3 className="text-white font-bold text-[24px] mb-6 text-center">
      {category}
    </h3>
    <div className="space-y-4">
      {skills.map((skill, skillIndex) => (
        <SkillBar
          key={skill.name}
          skill={skill}
          delay={index * 0.2 + skillIndex * 0.1}
        />
      ))}
    </div>
  </motion.div>
);

const Skills = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Add error boundary and debugging
  console.log("Skills component rendering on mobile:", isMobile);

  // Simple mobile version without complex animations
  if (isMobile) {
    return (
      <div
        className="w-full min-h-screen py-8 px-4"
        style={{ display: "block", visibility: "visible" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-secondary text-sm uppercase tracking-wider mb-2">
              My capabilities
            </p>
            <h2 className="text-white font-black text-3xl">
              Skills & Expertise.
            </h2>
          </div>

          <div className="mb-8">
            <p className="text-secondary text-base leading-relaxed text-center max-w-3xl mx-auto">
              Here's an overview of my technical skills and proficiency levels.
              I'm constantly improving and learning new technologies to stay
              current with industry standards and best practices.
            </p>
          </div>

          <div className="space-y-6">
            {Object.entries(skillsData).map(([category, skills], index) => (
              <div key={category} className="bg-tertiary p-4 rounded-2xl">
                <h3 className="text-white font-bold text-xl mb-4 text-center">
                  {category}
                </h3>
                <div className="space-y-3">
                  {skills.map((skill) => (
                    <div key={skill.name} className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-white text-sm font-medium">
                          {skill.name}
                        </span>
                        <span className="text-secondary text-xs">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="w-full bg-black-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-1000"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Additional Skills Summary - Mobile */}
          <div className="mt-8 bg-black-100 p-6 rounded-2xl">
            <h3 className="text-white font-bold text-xl mb-4 text-center">
              Additional Competencies
            </h3>
            <div className="grid grid-cols-1 gap-4">
              <div className="text-center">
                <div className="text-3xl mb-2">🎨</div>
                <h4 className="text-white font-semibold mb-1">UI/UX Design</h4>
                <p className="text-secondary text-xs">
                  Creating intuitive and visually appealing user interfaces
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">📱</div>
                <h4 className="text-white font-semibold mb-1">
                  Responsive Design
                </h4>
                <p className="text-secondary text-xs">
                  Building applications that work seamlessly across all devices
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">⚡</div>
                <h4 className="text-white font-semibold mb-1">
                  Performance Optimization
                </h4>
                <p className="text-secondary text-xs">
                  Optimizing applications for speed and efficiency
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">🔧</div>
                <h4 className="text-white font-semibold mb-1">
                  Problem Solving
                </h4>
                <p className="text-secondary text-xs">
                  Analytical thinking and debugging complex issues
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">🤝</div>
                <h4 className="text-white font-semibold mb-1">
                  Team Collaboration
                </h4>
                <p className="text-secondary text-xs">
                  Working effectively in team environments and code reviews
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">📚</div>
                <h4 className="text-white font-semibold mb-1">
                  Continuous Learning
                </h4>
                <p className="text-secondary text-xs">
                  Staying updated with latest technologies and best practices
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Desktop version with animations
  return (
    <div className="w-full">
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>My capabilities</p>
        <h2 className={styles.sectionHeadText}>Skills & Expertise.</h2>
      </motion.div>

      <div className="w-full flex">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]"
        >
          Here's an overview of my technical skills and proficiency levels. I'm
          constantly improving and learning new technologies to stay current
          with industry standards and best practices.
        </motion.p>
      </div>

      <div className="mt-12 sm:mt-20 flex flex-col gap-4 sm:gap-7 sm:flex-row sm:flex-wrap sm:justify-between">
        {Object.entries(skillsData).map(([category, skills], index) => (
          <SkillCategory
            key={category}
            category={category}
            skills={skills}
            index={index}
          />
        ))}
      </div>

      {/* Additional Skills Summary */}
      <motion.div
        variants={fadeIn("up", "spring", 0.8, 0.75)}
        className="mt-20 bg-black-100 p-8 rounded-2xl"
      >
        <h3 className="text-white font-bold text-[24px] mb-6 text-center">
          Additional Competencies
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-[40px] mb-2">🎨</div>
            <h4 className="text-white font-semibold mb-2">UI/UX Design</h4>
            <p className="text-secondary text-[14px]">
              Creating intuitive and visually appealing user interfaces
            </p>
          </div>
          <div className="text-center">
            <div className="text-[40px] mb-2">📱</div>
            <h4 className="text-white font-semibold mb-2">Responsive Design</h4>
            <p className="text-secondary text-[14px]">
              Building applications that work seamlessly across all devices
            </p>
          </div>
          <div className="text-center">
            <div className="text-[40px] mb-2">⚡</div>
            <h4 className="text-white font-semibold mb-2">
              Performance Optimization
            </h4>
            <p className="text-secondary text-[14px]">
              Optimizing applications for speed and efficiency
            </p>
          </div>
          <div className="text-center">
            <div className="text-[40px] mb-2">🔧</div>
            <h4 className="text-white font-semibold mb-2">Problem Solving</h4>
            <p className="text-secondary text-[14px]">
              Analytical thinking and debugging complex issues
            </p>
          </div>
          <div className="text-center">
            <div className="text-[40px] mb-2">🤝</div>
            <h4 className="text-white font-semibold mb-2">
              Team Collaboration
            </h4>
            <p className="text-secondary text-[14px]">
              Working effectively in team environments and code reviews
            </p>
          </div>
          <div className="text-center">
            <div className="text-[40px] mb-2">📚</div>
            <h4 className="text-white font-semibold mb-2">
              Continuous Learning
            </h4>
            <p className="text-secondary text-[14px]">
              Staying updated with latest technologies and best practices
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Create a mobile-friendly wrapper
const SkillsWithWrapper = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // On mobile, render without SectionWrapper to avoid potential issues
  if (isMobile) {
    return (
      <section id="skills" className="relative z-0 py-8 px-4 max-w-7xl mx-auto">
        <Skills />
      </section>
    );
  }

  // On desktop, use SectionWrapper
  return SectionWrapper(Skills, "skills")();
};

export default SkillsWithWrapper;
