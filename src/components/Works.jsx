import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";

const resultItemClasses =
  "flex items-start gap-2.5 text-sm leading-relaxed text-text-secondary";

const CaseStudyField = ({ label, children }) => (
  <div>
    <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-text-muted">
      {label}
    </p>
    <p className="mt-2 text-sm leading-relaxed text-text-secondary">{children}</p>
  </div>
);

CaseStudyField.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

const ResultItem = ({ children }) => (
  <li className={resultItemClasses}>
    <span
      aria-hidden="true"
      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-secondary"
    />
    {children}
  </li>
);

ResultItem.propTypes = {
  children: PropTypes.node.isRequired,
};

const CaseStudy = ({ id, title, project, reduced }) => {
  return (
    <motion.div
      id={`case-study-${id}`}
      role="region"
      aria-label={`${title} case study`}
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: reduced ? 0 : 0.35, ease: "easeOut" }}
      className="overflow-hidden"
    >
      <div className="mt-5 space-y-5 border-t border-border pt-5">
        <CaseStudyField label="Problem">{project.problem}</CaseStudyField>
        <CaseStudyField label="My role">{project.role}</CaseStudyField>
        <CaseStudyField label="Solution">{project.solution}</CaseStudyField>
        <div>
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-text-muted">
            Results
          </p>
          <ul className="mt-2 space-y-2">
            {project.results.map((result) => (
              <ResultItem key={result}>{result}</ResultItem>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

CaseStudy.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  project: PropTypes.shape({
    problem: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    solution: PropTypes.string.isRequired,
    results: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  reduced: PropTypes.bool,
};

const ProjectCard = ({ index, project, isOpen, onToggle, reduced }) => {
  const { id, title, category, summary, tags, image, imageAlt, year, liveUrl, repoUrl, featured } =
    project;

  return (
    <motion.article
      variants={fadeIn("up", "spring", index * 0.15, 0.75)}
      className="flex flex-col rounded-xl border border-border-light bg-bg-glass p-5 shadow-card transition-colors hover:border-accent-primary sm:p-6"
    >
      {image && (
        <div className="overflow-hidden rounded-lg border border-border">
          <img
            src={image}
            alt={imageAlt || `${title} preview`}
            loading="lazy"
            decoding="async"
            className="aspect-3/2 w-full object-cover"
          />
        </div>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="rounded-full border border-accent-primary/40 bg-accent-primary/10 px-2.5 py-1 font-mono text-[0.6875rem] text-text-primary">
          {category}
        </span>
        {year && (
          <span className="font-mono text-xs text-text-muted">{year}</span>
        )}
        {featured && (
          <span className="rounded-full border border-border-light bg-bg-glass px-2.5 py-1 font-mono text-[0.6875rem] text-accent-secondary">
            featured
          </span>
        )}
      </div>

      <h3 className="mt-3 text-xl font-semibold text-text-primary">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-text-secondary">{summary}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={`${id}-${tag}`}
            className="rounded-md border border-border-light bg-bg-glass px-2.5 py-1 font-mono text-[0.6875rem] text-text-primary"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-auto pt-6">
        {(liveUrl || repoUrl) && (
          <div className="mb-3 flex flex-wrap gap-3">
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center rounded-lg border border-border-light bg-bg-glass px-4 py-3 text-sm font-semibold text-text-primary transition-colors hover:border-accent-primary hover:shadow-glow"
              >
                Live demo ↗
              </a>
            )}
            {repoUrl && (
              <a
                href={repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center rounded-lg border border-border-light bg-bg-glass px-4 py-3 text-sm font-semibold text-text-primary transition-colors hover:border-accent-primary hover:shadow-glow"
              >
                Source ↗
              </a>
            )}
          </div>
        )}

        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={`case-study-${id}`}
          className="inline-flex min-h-11 w-full items-center justify-between gap-3 rounded-lg border border-border-light bg-bg-glass px-4 py-3 text-sm font-semibold text-text-primary transition-colors hover:border-accent-primary hover:bg-bg-glass-hover"
        >
          <span>Case study</span>
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`h-4 w-4 text-text-muted transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <CaseStudy id={id} title={title} project={project} reduced={reduced} />
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  );
};

ProjectCard.propTypes = {
  index: PropTypes.number.isRequired,
  project: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    image: PropTypes.string,
    imageAlt: PropTypes.string,
    year: PropTypes.number,
    liveUrl: PropTypes.string,
    repoUrl: PropTypes.string,
    featured: PropTypes.bool,
  }).isRequired,
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  reduced: PropTypes.bool,
};

const Works = () => {
  const [expandedId, setExpandedId] = useState(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (expandedId === null) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") setExpandedId(null);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [expandedId]);

  const toggle = (id) =>
    setExpandedId((current) => (current === id ? null : id));

  return (
    <div className="w-full">
      <motion.div variants={textVariant()}>
        <p className="font-mono text-[0.8125rem] uppercase tracking-[0.14em] text-text-secondary">
          Selected work
        </p>
        <h2 className="mt-2 text-4xl font-bold leading-[1.1] text-text-primary sm:text-5xl lg:text-6xl">
          Featured projects.
        </h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 max-w-3xl text-base leading-relaxed text-text-secondary"
      >
        My strongest builds, selected for depth across AI, full-stack, and
        embedded work. Open a case study to read the problem, my role, the
        solution, and the results.
      </motion.p>

      <div className="mt-12 grid items-start gap-4 sm:grid-cols-2">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            index={index}
            project={project}
            isOpen={expandedId === project.id}
            onToggle={() => toggle(project.id)}
            reduced={reduced}
          />
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(Works, "work");
