import { motion } from "framer-motion";
import PropTypes from "prop-types";

import { education, certifications } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant, staggerContainer } from "../utils/motion";

const accentShape = PropTypes.oneOf(["primary", "secondary"]);

const EducationNode = ({ accent }) => (
  <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border bg-bg-primary shadow-card">
    <span
      aria-hidden="true"
      className={`h-2.5 w-2.5 rounded-full ${
        accent === "primary" ? "bg-accent-primary" : "bg-accent-secondary"
      }`}
    />
    <span
      aria-hidden="true"
      className={`absolute -inset-1 -z-10 rounded-full ${
        accent === "primary"
          ? "border border-accent-primary/40"
          : "border border-accent-secondary/40"
      }`}
    />
  </div>
);

EducationNode.propTypes = {
  accent: accentShape.isRequired,
};

const EducationCard = ({ education, index }) => {
  const accent = education.accent === "primary" ? "primary" : "secondary";
  const dotColor = accent === "primary" ? "bg-accent-primary" : "bg-accent-secondary";

  return (
    <li className="relative grid grid-cols-[3rem_1fr] gap-4 sm:gap-6">
      {/* Timeline rail */}
      <div className="flex flex-col items-center">
        <EducationNode accent={education.accent} />
        <div
          aria-hidden="true"
          className="mt-3 w-px flex-1 self-stretch bg-gradient-to-b from-accent-primary/30 to-accent-secondary/30"
        />
      </div>

      {/* Education card */}
      <motion.div
        variants={fadeIn("up", "spring", index * 0.12, 0.7)}
        className="rounded-xl border border-border-light bg-bg-glass px-5 py-6 shadow-card sm:px-6"
      >
        <h3 className="text-lg font-semibold leading-snug text-text-primary">
          {education.title}
        </h3>
        <p className="mt-1 text-sm font-medium text-text-secondary">
          {education.institution}
        </p>
        <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-text-muted">
          <span>{education.type}</span>
          <span aria-hidden="true" className="text-border-light">·</span>
          <span>{education.location}</span>
          <span aria-hidden="true" className="text-border-light">·</span>
          <span
            className={
              accent === "primary"
                ? "text-accent-primary"
                : "text-accent-secondary"
            }
          >
            {education.date}
          </span>
        </div>

        <ul className="mt-5 space-y-2.5">
          {education.points.map((point, pointIndex) => (
            <li
              key={`edu-point-${index}-${pointIndex}`}
              className="flex items-start gap-2.5 text-sm leading-relaxed text-text-secondary"
            >
              <span
                aria-hidden="true"
                className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${dotColor}`}
              />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </li>
  );
};

EducationCard.propTypes = {
  education: PropTypes.shape({
    title: PropTypes.string.isRequired,
    institution: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    accent: accentShape.isRequired,
    points: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

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

Certifications.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
};

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
        <ul className="flex flex-col">
          {education.map((entry, index) => (
            <EducationCard
              key={entry.title}
              education={entry}
              index={index}
            />
          ))}
        </ul>

        <div className="mt-12">
          <Certifications items={certifications} />
        </div>
      </motion.div>
    </>
  );
};

export default SectionWrapper(Education, "education");
