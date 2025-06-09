// Ultra-simple Skills component for mobile fallback
const SkillsSimple = () => {
  const skills = {
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

  return (
    <div
      id="skills-simple"
      className="w-full py-16 px-4 bg-primary"
      style={{
        display: "block",
        visibility: "visible",
        minHeight: "100vh",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-secondary text-sm uppercase tracking-wider mb-4">
            My capabilities
          </p>
          <h2 className="text-white font-black text-4xl mb-8">
            Skills & Expertise
          </h2>
          <p className="text-secondary text-lg leading-relaxed max-w-2xl mx-auto">
            Here&apos;s an overview of my technical skills and proficiency
            levels. I&apos;m constantly improving and learning new technologies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {Object.entries(skills).map(([category, skillList]) => (
            <div key={category} className="bg-tertiary p-6 rounded-2xl">
              <h3 className="text-white font-bold text-2xl mb-6 text-center">
                {category}
              </h3>
              <div className="space-y-4">
                {skillList.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white font-medium">
                        {skill.name}
                      </span>
                      <span className="text-secondary text-sm">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full bg-black-200 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-black-100 p-8 rounded-2xl">
          <h3 className="text-white font-bold text-2xl mb-8 text-center">
            Additional Competencies
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-3">🎨</div>
              <h4 className="text-white font-semibold mb-2">UI/UX Design</h4>
              <p className="text-secondary text-sm">
                Creating beautiful interfaces
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">📱</div>
              <h4 className="text-white font-semibold mb-2">
                Responsive Design
              </h4>
              <p className="text-secondary text-sm">Mobile-first approach</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">⚡</div>
              <h4 className="text-white font-semibold mb-2">Performance</h4>
              <p className="text-secondary text-sm">Fast and efficient apps</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">🔧</div>
              <h4 className="text-white font-semibold mb-2">Problem Solving</h4>
              <p className="text-secondary text-sm">
                Debugging and optimization
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">🤝</div>
              <h4 className="text-white font-semibold mb-2">Team Work</h4>
              <p className="text-secondary text-sm">
                Collaborative development
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">📚</div>
              <h4 className="text-white font-semibold mb-2">Learning</h4>
              <p className="text-secondary text-sm">Always staying updated</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsSimple;
