import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { fadeIn, staggerContainer } from "../utils/motion";

const CMD = [
  {
    cmd: "python train.py --model gpt-4o --epochs 100",
    out: "Training complete — accuracy: 97.3%\nModel saved to ./models/v2.1.pt",
  },
  {
    cmd: "npm test -- --coverage",
    out: "PASS  src/api/routes.test.ts\nTests: 48 passed, 48 total\nCoverage: 94.2%",
  },
  {
    cmd: "git push origin main",
    out: "Enumerating objects: 12, done.\nTo github.com:yahya-salhi/app.git\n   a3f..b7c  main -> main",
  },
  {
    cmd: "npm run build",
    out: "vite v5.0.11 building for production...\n✓ built in 1.82s",
  },
];

const TYPE_SPEED = 50;
const PAUSE = 2500;

const ChevronDownIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M6 9l6 6 6-6" />
  </svg>
);

const AccentBar = () => (
  <div className="flex flex-col items-center" aria-hidden="true">
    <span className="accent-dot mb-2 h-2 w-2 rounded-full" />
    <span className="accent-bar w-px flex-1" style={{ minHeight: "120px" }} />
  </div>
);

const TerminalView = () => {
  const reduced = useReducedMotion();
  const [ci, setCi] = useState(0);
  const [typed, setTyped] = useState(0);
  const timer = useRef(null);

  useEffect(() => {
    if (reduced) {
      setTyped(CMD[ci].cmd.length);
      return;
    }

    if (typed < CMD[ci].cmd.length) {
      timer.current = setTimeout(() => setTyped((t) => t + 1), TYPE_SPEED);
      return () => clearTimeout(timer.current);
    }

    timer.current = setTimeout(
      () => setCi((i) => (i + 1) % CMD.length),
      PAUSE
    );
    return () => clearTimeout(timer.current);
  }, [ci, typed, reduced]);

  const { cmd, out } = CMD[ci];
  const done = typed >= cmd.length;

  return (
    <div
      className="terminal-window w-full overflow-hidden"
      role="region"
      aria-label="Terminal demonstration"
    >
      <div className="flex items-center gap-2 border-b border-border bg-bg-secondary/60 px-4 py-2.5">
        <span className="terminal-dot terminal-dot--close h-3 w-3" />
        <span className="terminal-dot terminal-dot--min h-3 w-3" />
        <span className="terminal-dot terminal-dot--max h-3 w-3" />
        <span className="mx-auto text-xs font-medium text-text-muted">
          zsh
        </span>
      </div>

      <div className="min-h-[140px] p-5 font-mono text-sm leading-relaxed">
        <div>
          <span className="text-terminal-max">➜</span>{" "}
          <span className="text-text-secondary">~</span>{" "}
          <span className="text-text-primary">
            {cmd.slice(0, typed)}
            {!reduced && !done && (
              <span className="accent-gradient ml-px inline-block w-0.5 align-middle" style={{ height: "1em" }} />
            )}
          </span>
        </div>

        {done && (
          <pre className="mt-2 whitespace-pre-wrap text-text-muted">
            {out}
          </pre>
        )}
      </div>
    </div>
  );
};

const Hero = () => {
  const reduce = useReducedMotion();

  return (
    <section
      className="relative w-full overflow-hidden"
      aria-label="Introduction"
    >
      <div
        className="hero-gradient pointer-events-none absolute inset-0"
        aria-hidden="true"
      />

      <div className="relative mx-auto flex min-h-svh w-full max-w-(--layout-max-width) flex-col items-center justify-center gap-14 px-6 pb-24 pt-[calc(var(--layout-navbar-height)+4rem)] md:px-8 lg:items-center lg:px-12">
        <motion.div
          variants={staggerContainer(0.12, 0.1)}
          initial={reduce ? false : "hidden"}
          animate="show"
          className="grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16"
        >
          <motion.div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <motion.div
              variants={fadeIn("up", "tween", 0.05, 0.6)}
              className="mb-6 hidden lg:block"
            >
              <AccentBar />
            </motion.div>

            <motion.p
              variants={fadeIn("up", "tween", 0.1, 0.6)}
              className="mb-5 inline-flex items-center gap-2 text-[0.8125rem] font-semibold uppercase tracking-[0.14em] text-text-secondary"
            >
              <span className="h-2 w-2 rounded-full bg-accent-secondary" />
              AI Engineer · Full-Stack Developer
            </motion.p>

            <motion.h1
              variants={fadeIn("up", "tween", 0.2, 0.6)}
              className="text-5xl font-bold leading-[1.05] text-text-primary sm:text-6xl lg:text-7xl"
            >
              Yahya Salhi
            </motion.h1>

            <motion.p
              variants={fadeIn("up", "tween", 0.3, 0.6)}
              className="mt-6 max-w-xl text-lg leading-relaxed text-text-secondary sm:text-xl"
            >
              I build{" "}
              <span className="text-gradient font-semibold">
                intelligent products
              </span>{" "}
              and production-ready web apps with React, Node.js, TypeScript, and
              MongoDB — based in Tunisia, available remotely.
            </motion.p>

            <motion.div
              variants={fadeIn("up", "tween", 0.4, 0.6)}
              className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
            >
              <a
                href="#work"
                className="inline-flex min-h-11 items-center justify-center rounded-lg bg-accent-primary px-6 text-sm font-semibold text-text-primary shadow-glow transition-colors hover:bg-accent-tertiary"
              >
                View my work
              </a>
              <a
                href="#contact"
                className="inline-flex min-h-11 items-center justify-center rounded-lg border border-border-light bg-bg-glass px-6 text-sm font-semibold text-text-primary backdrop-blur-md transition-colors hover:border-accent-primary"
              >
                Get in touch
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.5 }}
            className="w-full"
          >
            <TerminalView />
          </motion.div>
        </motion.div>
      </div>

      <a
        href="#about"
        aria-label="Scroll to About section"
        className="gradient-border absolute bottom-8 left-1/2 z-10 flex h-11 w-11 -translate-x-1/2 items-center justify-center rounded-full text-text-secondary transition-colors hover:text-text-primary"
      >
        <span className="flex h-full w-full items-center justify-center rounded-full bg-bg-primary">
          <ChevronDownIcon />
        </span>
      </a>
    </section>
  );
};

export default Hero;
