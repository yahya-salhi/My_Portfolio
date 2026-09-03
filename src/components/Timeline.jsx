import { motion } from "framer-motion";
import PropTypes from "prop-types";

import { fadeIn } from "../utils/motion";

export const accentShape = PropTypes.oneOf(["primary", "secondary"]);

export const TimelineNode = ({ logo, accent, company }) => (
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
  company: PropTypes.string,
};

const CurrentBadge = ({ accent }) => (
  <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border-light px-2 py-0.5 font-mono text-[0.625rem] font-medium uppercase tracking-[0.12em] text-text-muted">
    <span
      aria-hidden="true"
      className={`h-1.5 w-1.5 rounded-full ${
        accent === "primary" ? "bg-accent-primary" : "bg-accent-secondary"
      }`}
    />
    Current
  </span>
);

CurrentBadge.propTypes = {
  accent: accentShape.isRequired,
};

export const TimelineCard = ({ item, index }) => {
  const { node, title, subtitle, meta, accent, current, points } = item;
  const isPrimary = accent === "primary";
  const dotColor = isPrimary ? "bg-accent-primary" : "bg-accent-secondary";
  const dateColor = isPrimary ? "text-accent-primary" : "text-accent-secondary";
  const parts = meta.filter(Boolean);
  const metaParts = parts.map((part, partIndex) => {
    const isLast = partIndex === parts.length - 1;
    return [
      <span key={`part-${partIndex}`} className={isLast ? dateColor : undefined}>
        {part}
      </span>,
      !isLast && (
        <span key={`dot-${partIndex}`} aria-hidden="true" className="text-border-light">
          ·
        </span>
      ),
    ];
  });

  return (
    <li className="relative grid grid-cols-[3rem_1fr] gap-4 sm:gap-6">
      {/* Timeline rail */}
      <div className="flex flex-col items-center">
        <TimelineNode
          logo={node.logo}
          accent={accent}
          company={node.company}
        />
        <div
          aria-hidden="true"
          className="mt-3 w-px flex-1 self-stretch bg-gradient-to-b from-accent-primary/30 to-accent-secondary/30"
        />
      </div>

      {/* Entry card */}
      <motion.div
        variants={fadeIn("up", "spring", index * 0.12, 0.7)}
        className="rounded-xl border border-border-light bg-bg-glass px-5 py-6 shadow-card sm:px-6"
      >
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-lg font-semibold leading-snug text-text-primary">
            {title}
          </h3>
          {current && <CurrentBadge accent={accent} />}
        </div>

        {subtitle && (
          <p className="mt-1 text-sm font-medium text-text-secondary">
            {subtitle}
          </p>
        )}

        {metaParts.length > 0 && (
          <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-text-muted">
            {metaParts}
          </div>
        )}

        <ul className="mt-5 space-y-2.5">
          {points.map((point, pointIndex) => (
            <li
              key={`point-${index}-${pointIndex}`}
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

TimelineCard.propTypes = {
  item: PropTypes.shape({
    node: PropTypes.shape({
      logo: PropTypes.string,
      company: PropTypes.string,
    }),
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    meta: PropTypes.arrayOf(PropTypes.string),
    accent: accentShape.isRequired,
    current: PropTypes.bool,
    points: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export const TimelineList = ({ items }) => (
  <ul className="flex flex-col">
    {items.map((item, index) => (
      <TimelineCard key={item.title} item={item} index={index} />
    ))}
  </ul>
);

TimelineList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};
