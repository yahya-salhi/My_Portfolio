import React from "react";

// Ultra-simple Skills component for mobile fallback
const SkillsSimple = () => {
  const skills = [
    { name: "React.js", level: 90 },
    { name: "JavaScript", level: 95 },
    { name: "TypeScript", level: 85 },
    { name: "Node.js", level: 85 },
    { name: "HTML5", level: 95 },
    { name: "CSS3", level: 90 },
    { name: "MongoDB", level: 75 },
    { name: "Git", level: 90 },
  ];

  return (
    <div 
      id="skills-simple" 
      className="w-full py-16 px-4 bg-primary"
      style={{ 
        display: 'block', 
        visibility: 'visible', 
        minHeight: '100vh',
        position: 'relative',
        zIndex: 1
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
            Here's an overview of my technical skills and proficiency levels. 
            I'm constantly improving and learning new technologies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-tertiary p-6 rounded-2xl">
            <h3 className="text-white font-bold text-2xl mb-6 text-center">
              Frontend Development
            </h3>
            <div className="space-y-4">
              {skills.slice(0, 4).map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white font-medium">{skill.name}</span>
                    <span className="text-secondary text-sm">{skill.level}%</span>
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

          <div className="bg-tertiary p-6 rounded-2xl">
            <h3 className="text-white font-bold text-2xl mb-6 text-center">
              Backend & Tools
            </h3>
            <div className="space-y-4">
              {skills.slice(4).map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white font-medium">{skill.name}</span>
                    <span className="text-secondary text-sm">{skill.level}%</span>
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
              <h4 className="text-white font-semibold mb-2">Responsive Design</h4>
              <p className="text-secondary text-sm">
                Mobile-first approach
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">⚡</div>
              <h4 className="text-white font-semibold mb-2">Performance</h4>
              <p className="text-secondary text-sm">
                Fast and efficient apps
              </p>
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
              <p className="text-secondary text-sm">
                Always staying updated
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsSimple;
