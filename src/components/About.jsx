import PropTypes from "prop-types";
import { motion } from "framer-motion";

import { services, stackLayers, proofPoints } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant, staggerContainer } from "../utils/motion";

const CapabilityRow = ({ index, title, description, tag }) => (
  <motion.div
    variants={fadeIn("up", "spring", index * 0.1, 0.6)}
    className="rounded-lg border border-border bg-bg-glass px-5 py-4 transition-colors hover:border-accent-primary"
  >
    <div className="flex items-start justify-between gap-4">
      <h3 className="text-base font-semibold text-text-primary">{title}</h3>
      <span className="shrink-0 rounded-full border border-border-light px-2 py-0.5 font-mono text-[0.625rem] font-medium uppercase tracking-[0.14em] text-accent-secondary">
        {tag}
      </span>
    </div>
    <p className="mt-2 text-sm leading-relaxed text-text-secondary">{description}</p>
  </motion.div>
);

CapabilityRow.propTypes = {
  index: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
};

const StackLayer = ({ layer, name, note, last }) => (
  <div className="flex min-w-0 flex-1 items-center">
    <div className="flex flex-1 flex-col items-start gap-2">
      <span className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-text-muted">
        {layer}
      </span>
      <span className="font-mono text-sm font-semibold text-text-primary">{name}</span>
      <span className="text-xs text-text-secondary">{note}</span>
    </div>
    {!last && (
      <div aria-hidden="true" className="mx-3 hidden h-px flex-1 bg-gradient-to-r from-accent-primary/40 to-accent-secondary/40 sm:block" />
    )}
  </div>
);

StackLayer.propTypes = {
  layer: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  note: PropTypes.string.isRequired,
  last: PropTypes.bool,
};

const ProofPoint = ({ index, title, detail }) => (
  <motion.div
    variants={fadeIn("right", "spring", index * 0.1, 0.6)}
    className="flex items-baseline gap-3 rounded-lg border border-border bg-bg-glass px-4 py-3"
  >
    <span aria-hidden="true" className="font-mono text-accent-secondary">
      ▸
    </span>
    <div>
      <p className="text-sm font-medium text-text-primary">{title}</p>
      <p className="mt-0.5 text-xs text-text-secondary">{detail}</p>
    </div>
  </motion.div>
);

ProofPoint.propTypes = {
  index: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  detail: PropTypes.string.isRequired,
};

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className="font-mono text-[0.8125rem] uppercase tracking-[0.14em] text-text-secondary">
          The full span
        </p>        <h2 className="mt-2 text-4xl font-bold leading-[1.1] text-text-primary sm:text-5xl lg:text-6xl">
          From silicon to screen.
        </h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-6 max-w-2xl text-base leading-relaxed text-text-secondary sm:text-lg"
      >
        I build intelligent systems that span from the silicon of a microcontroller to the
        pixels on a user&apos;s screen — combining <span className="text-text-primary">Agentic AI</span>,{" "}
        <span className="text-text-primary">RAG pipelines</span>, and{" "}
        <span className="text-text-primary">embedded systems</span> into one unified skill set.
      </motion.p>
      <motion.p
        variants={fadeIn("", "", 0.2, 1)}
        className="mt-4 max-w-2xl text-base leading-relaxed text-text-secondary"
      >
        For 11+ years at the Ministry of National Defense (Tunisia), I&apos;ve worked at the
        intersection most engineers keep separate: sophisticated AI orchestration and low-level
        embedded systems.
      </motion.p>

      <motion.div
        variants={staggerContainer(0.1, 0.1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="mt-10 rounded-xl border border-border bg-bg-glass p-5 sm:p-6"
      >
        <div className="mb-4 flex items-center gap-2">
          <span aria-hidden="true" className="h-2 w-2 rounded-full bg-accent-secondary" />
          <p className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-text-muted">
            one stack, every layer in house
          </p>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-stretch">
          {stackLayers.map((item, index) => (
            <StackLayer key={item.name} {...item} last={index === stackLayers.length - 1} />
          ))}
        </div>
      </motion.div>

      <motion.div
        variants={staggerContainer(0.1, 0.1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="mt-12 grid gap-4 md:grid-cols-2"
      >
        {services.map((service, index) => (
          <CapabilityRow key={service.title} index={index} {...service} />
        ))}
      </motion.div>

      <div className="mt-14">
        <motion.p
          variants={textVariant()}
          className="font-mono text-[0.8125rem] uppercase tracking-[0.14em] text-text-secondary"
        >
          Track record
        </motion.p>
        <motion.div
          variants={staggerContainer(0.1, 0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="mt-5 grid gap-4 sm:grid-cols-2"
        >
          {proofPoints.map((point, index) => (
            <ProofPoint key={point.title} index={index} {...point} />
          ))}
        </motion.div>
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
