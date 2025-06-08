import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { motion } from "framer-motion";
import "react-vertical-timeline-component/style.min.css";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";

const educationData = [
  {
    title: "Self-Taught Full Stack Developer",
    institution: "Online Learning Platforms",
    icon: "🎓", // Using emoji as placeholder
    iconBg: "#383E56",
    date: "2020 - Present",
    points: [
      "Completed comprehensive courses in React.js, Node.js, and modern web development.",
      "Mastered TypeScript, MongoDB, Express.js, and various frontend frameworks.",
      "Built numerous projects to practice and demonstrate skills in real-world scenarios.",
      "Continuously learning new technologies and staying updated with industry trends.",
      "Participated in coding challenges and open-source contributions.",
    ],
  },
  {
    title: "Web Development Fundamentals",
    institution: "Various Online Courses",
    icon: "💻",
    iconBg: "#E6DEDD",
    date: "2020 - 2021",
    points: [
      "Learned HTML5, CSS3, and JavaScript fundamentals through structured courses.",
      "Studied responsive design principles and modern CSS frameworks.",
      "Practiced version control with Git and collaborative development workflows.",
      "Built multiple static websites and landing pages to apply learned concepts.",
      "Explored web accessibility and performance optimization techniques.",
    ],
  },
  {
    title: "Advanced JavaScript & React",
    institution: "Specialized Courses",
    icon: "⚛️",
    iconBg: "#383E56",
    date: "2021 - 2022",
    points: [
      "Deep dive into ES6+ features and modern JavaScript development patterns.",
      "Mastered React.js including hooks, context API, and component lifecycle.",
      "Learned state management with Redux and modern alternatives.",
      "Studied testing methodologies and best practices for React applications.",
      "Built complex single-page applications with routing and API integration.",
    ],
  },
];

const EducationCard = ({ education }) => {
  return (
    <VerticalTimelineElement
      contentStyle={{
        background: "#1d1836",
        color: "#fff",
      }}
      contentArrowStyle={{ borderRight: "7px solid #232631" }}
      date={education.date}
      iconStyle={{ background: education.iconBg, fontSize: "1.5rem" }}
      icon={
        <div className="flex justify-center items-center w-full h-full">
          <span style={{ fontSize: "1.5rem" }}>{education.icon}</span>
        </div>
      }
    >
      <div>
        <h3 className="text-white text-[24px] font-bold">{education.title}</h3>
        <p
          className="text-secondary text-[16px] font-semibold"
          style={{ margin: 0 }}
        >
          {education.institution}
        </p>
      </div>

      <ul className="mt-5 list-disc ml-5 space-y-2">
        {education.points.map((point, index) => (
          <li
            key={`education-point-${index}`}
            className="text-white-100 text-[14px] pl-1 tracking-wider"
          >
            {point}
          </li>
        ))}
      </ul>
    </VerticalTimelineElement>
  );
};

const Education = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>My learning journey</p>
        <h2 className={styles.sectionHeadText}>Education.</h2>
      </motion.div>
      <div className="mt-20 flex flex-col">
        <VerticalTimeline>
          {educationData.map((education, index) => (
            <EducationCard key={`education-${index}`} education={education} />
          ))}
        </VerticalTimeline>
      </div>
    </>
  );
};

export default SectionWrapper(Education, "education");
