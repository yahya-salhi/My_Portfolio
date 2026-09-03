import { motion } from "framer-motion";

import { education, certifications } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant, staggerContainer } from "../utils/motion";
import { TimelineList } from "./Timeline";

const toTimelineItem = (entry) => ({
  node: {},
  title: entry.title,
  subtitle: entry.institution,
  meta: [entry.type, entry.location, entry.date],
  accent: entry.accent,
  points: entry.points,
});

const Certifications = ({ items }) => (
  <motion.div variants={fadeIn("up", "spring", 0.2, 0.7)}>
    <h3 className="text-2xl font-bold text-text-primary sm:text-3xl">
      Certifications.
    </h3>
    <p className="mt-2 max-w-2xl text-sm text-text-secondary">
      A curated set of hands-on AI, LLM, and engineering courses.
    </p>
    <ul className="mt-6 flex flex-wrap gap-2.5">
      {items.map((cert) => (
        <li key={cert}>
          <span className="inline-block rounded-md border border-border-light bg-bg-glass px-3 py-1.5 font-mono text-[0.6875rem] font-medium text-text-primary transition-colors hover:border-accent-primary">
            {cert}
          </span>
        </li>
      ))}
    </ul>
  </motion.div>
);

const Education = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className="font-mono text-[0.8125rem] uppercase tracking-[0.14em] text-text-secondary">
          Foundations
        </p>
        <h2 className="mt-2 text-4xl font-bold leading-[1.1] text-text-primary sm:text-5xl lg:text-6xl">
          Education.
        </h2>
      </motion.div>

      <motion.div
        variants={staggerContainer(0.1, 0.12)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mt-12"
      >
        <TimelineList items={education.map(toTimelineItem)} />

        <div className="mt-12">
          <Certifications items={certifications} />
        </div>
      </motion.div>
    </>
  );
};

export default SectionWrapper(Education, "education");
