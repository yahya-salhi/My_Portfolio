import { motion } from "framer-motion";

import { experiences } from "../constants";
import { SectionWrapper } from "../hoc";
import { textVariant, staggerContainer } from "../utils/motion";
import { TimelineList } from "./Timeline";

const toTimelineItem = (experience) => ({
  node: {
    logo: experience.logo,
    company: experience.company_name,
  },
  title: experience.title,
  subtitle: experience.company_name,
  meta: [experience.location, experience.type, experience.date],
  accent: experience.accent,
  current: experience.current,
  points: experience.points,
});

const Experience = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className="font-mono text-[0.8125rem] uppercase tracking-[0.14em] text-text-secondary">
          Timeline
        </p>
        <h2 className="mt-2 text-4xl font-bold leading-[1.1] text-text-primary sm:text-5xl lg:text-6xl">
          A verified track record.
        </h2>
      </motion.div>

      <motion.div
        variants={staggerContainer(0.1, 0.12)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mt-12"
      >
        <TimelineList items={experiences.map(toTimelineItem)} />
      </motion.div>
    </>
  );
};

export default SectionWrapper(Experience, "experience");
