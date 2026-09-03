import PropTypes from "prop-types";
import { motion } from "framer-motion";

import { skillCategories } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant, staggerContainer } from "../utils/motion";

const SkillTag = ({ name }) => (
  <span className="inline-block rounded-md border border-border-light bg-bg-glass px-2.5 py-1 font-mono text-[0.6875rem] font-medium text-text-primary transition-colors hover:border-accent-primary">
    {name}
  </span>
);

SkillTag.propTypes = {
  name: PropTypes.string.isRequired,
};

const SkillCard = ({ index, title, accent, evidence, skills }) => {
  const dotColor =
    accent === "secondary" ? "bg-accent-secondary" : "bg-accent-primary";

  return (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.12, 0.6)}
      className="rounded-xl border border-border-light bg-bg-glass-active p-5 shadow-card transition-colors hover:border-accent-primary sm:p-6"
    >
      <div className="mb-4 flex items-center gap-2 border-b border-border pb-3">
        <span aria-hidden="true" className={`h-2 w-2 shrink-0 rounded-full ${dotColor}`} />
        <p className="truncate font-mono text-[0.625rem] uppercase tracking-[0.14em] text-text-secondary">
          {evidence}
        </p>
      </div>

      <h3 className="mb-4 text-lg font-semibold text-text-primary">
        {title}
      </h3>

      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <SkillTag key={skill} name={skill} />
        ))}
      </div>
    </motion.div>
  );
};

SkillCard.propTypes = {
  index: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  accent: PropTypes.string,
  evidence: PropTypes.string.isRequired,
  skills: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const Skills = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className="font-mono text-[0.8125rem] uppercase tracking-[0.14em] text-text-secondary">
          What I work with
        </p>
        <h2 className="mt-2 text-4xl font-bold leading-[1.1] text-text-primary sm:text-5xl lg:text-6xl">
          Skills & tools.
        </h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-6 max-w-2xl text-base leading-relaxed text-text-secondary sm:text-lg"
      >
        Organized by what I actually do with them — not by arbitrary proficiency
        percentages. Each group maps to real projects and production systems.
      </motion.p>

      <motion.div
        variants={staggerContainer(0.1, 0.1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {skillCategories.map((category, index) => (
          <SkillCard key={category.id} index={index} {...category} />
        ))}
      </motion.div>
    </>
  );
};

export default SectionWrapper(Skills, "skills");
