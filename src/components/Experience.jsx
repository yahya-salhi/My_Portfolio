import { motion } from "framer-motion";
import PropTypes from "prop-types";

import { experiences } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant, staggerContainer } from "../utils/motion";

const accentShape = PropTypes.oneOf(["primary", "secondary"]);

const TimelineNode = ({ logo, accent, company }) => (
  <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border bg-bg-primary shadow-card">
    {logo ? (
      <img
        src={logo}
        alt={`${company} logo`}
        className="h-7 w-7 rounded-full object-contain"
      />
    ) : (
      <span
        aria-hidden="true"
        className={`h-2.5 w-2.5 rounded-full ${
          accent === "primary" ? "bg-accent-primary" : "bg-accent-secondary"
        }`}
      />
    )}
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

TimelineNode.propTypes = {
  logo: PropTypes.string,
  accent: accentShape.isRequired,
  company: PropTypes.string.isRequired,
};

const ExperienceCard = ({ experience, index }) => {
  const accent = experience.accent === "primary" ? "primary" : "secondary";
  const dotColor = accent === "primary" ? "bg-accent-primary" : "bg-accent-secondary";

  return (
    <li className="relative grid grid-cols-[3rem_1fr] gap-4 sm:gap-6">
      {/* Timeline rail */}
      <div className="flex flex-col items-center">
        <TimelineNode
          logo={experience.logo}
          accent={experience.accent}
          company={experience.company_name}
        />
        <div
          aria-hidden="true"
          className="mt-3 w-px flex-1 self-stretch bg-gradient-to-b from-accent-primary/30 to-accent-secondary/30"
        />
      </div>

      {/* Role card */}
      <motion.div
        variants={fadeIn("up", "spring", index * 0.12, 0.7)}
        className="rounded-xl border border-border-light bg-bg-glass px-5 py-6 shadow-card sm:px-6"
      >
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-lg font-semibold leading-snug text-text-primary">
            {experience.title}
          </h3>
          {experience.current && (
            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border-light px-2 py-0.5 font-mono text-[0.625rem] font-medium uppercase tracking-[0.12em] text-text-muted">
              <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${dotColor}`} />
              Current
            </span>
          )}
        </div>

        <p className="mt-1 text-sm font-medium text-text-secondary">
          {experience.company_name}
        </p>
        <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-text-muted">
          <span>{experience.location}</span>
          <span aria-hidden="true" className="text-border-light">·</span>
          <span>{experience.type}</span>
          <span aria-hidden="true" className="text-border-light">·</span>
          <span
            className={
              accent === "primary"
                ? "text-accent-primary"
                : "text-accent-secondary"
            }
          >
            {experience.date}
          </span>
        </div>

        <ul className="mt-5 space-y-2.5">
          {experience.points.map((point, pointIndex) => (
            <li
              key={`exp-point-${index}-${pointIndex}`}
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

ExperienceCard.propTypes = {
  experience: PropTypes.shape({
    title: PropTypes.string.isRequired,
    company_name: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    logo: PropTypes.string,
    accent: accentShape.isRequired,
    current: PropTypes.bool,
    points: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

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
        <ul className="flex flex-col">
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={experience.title}
              experience={experience}
              index={index}
            />
          ))}
        </ul>
      </motion.div>
    </>
  );
};

export default SectionWrapper(Experience, "experience");
