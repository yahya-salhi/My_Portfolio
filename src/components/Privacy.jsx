import { useEffect } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

import { fadeIn, textVariant, staggerContainer } from "../utils/motion";

const BACK_LINK = "/";

const Section = ({ title, children }) => (
  <section>
    <h2 className="text-xl font-semibold text-text-primary">{title}</h2>
    <div className="mt-3 space-y-3 text-sm leading-relaxed text-text-secondary">
      {children}
    </div>
  </section>
);

Section.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

const Privacy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="mx-auto max-w-3xl px-6 py-24 sm:px-8">
      <motion.div variants={textVariant()}>
        <a
          href={BACK_LINK}
          className="mb-8 inline-flex items-center gap-1.5 text-sm text-text-secondary transition-colors hover:text-accent-primary"
        >
          <svg
            aria-hidden="true"
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Back to portfolio
        </a>
        <h1 className="text-4xl font-bold leading-[1.1] text-text-primary sm:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-3 text-sm text-text-muted">
          Last updated: September 2026
        </p>
      </motion.div>

      <motion.div
        variants={staggerContainer(0.08, 0.12)}
        initial="hidden"
        animate="show"
        className="mt-12 space-y-10"
      >
        <motion.div variants={fadeIn("up", "", 0, 0.6)}>
          <Section title="Overview">
            <p>
              This portfolio website is a personal project owned and operated by
              Yahya Salhi. It is designed to showcase professional experience,
              skills, and projects. This policy explains what little data the
              site handles and how it is used.
            </p>
          </Section>
        </motion.div>

        <motion.div variants={fadeIn("up", "", 0.08, 0.6)}>
          <Section title="Data collected">
            <p>
              This site does not use tracking cookies, analytics services, or
              advertising networks. The only data interactions are:
            </p>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                <strong className="text-text-primary">
                  Contact form submissions
                </strong>{" "}
                — When you send a message, your name, email, and message are
                transmitted to EmailJS (a third-party email delivery service)
                and forwarded to the site owner&apos;s email address. This data
                is not stored on any server controlled by this site.
              </li>
              <li>
                <strong className="text-text-primary">
                  Chatbot conversations
                </strong>{" "}
                — Messages you send to the AI assistant are processed by
                OpenAI&apos;s GPT-4o via a server-side proxy. Conversations are
                held in browser memory only and are lost when you close the
                tab. They are not stored, logged, or used for training.
              </li>
              <li>
                <strong className="text-text-primary">
                  Local browser storage
                </strong>{" "}
                — GitHub statistics are cached in your browser&apos;s{" "}
                <code className="rounded bg-bg-glass px-1.5 py-0.5 font-mono text-xs text-text-primary">
                  localStorage
                </code>{" "}
                to avoid repeated API calls. This data never leaves your device
                and can be cleared at any time through your browser settings.
              </li>
            </ul>
          </Section>
        </motion.div>

        <motion.div variants={fadeIn("up", "", 0.16, 0.6)}>
          <Section title="Third-party services">
            <p>This site integrates with the following services:</p>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                <strong className="text-text-primary">EmailJS</strong> —
                Handles contact form delivery. Subject to{" "}
                <a
                  href="https://www.emailjs.com/legal/privacy-policy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-accent underline underline-offset-2 transition-colors hover:text-accent-secondary"
                >
                  EmailJS&apos;s privacy policy
                </a>
                .
              </li>
              <li>
                <strong className="text-text-primary">OpenAI</strong> —
                Powers the chatbot assistant. Subject to{" "}
                <a
                  href="https://openai.com/policies/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-accent underline underline-offset-2 transition-colors hover:text-accent-secondary"
                >
                  OpenAI&apos;s privacy policy
                </a>
                .
              </li>
              <li>
                <strong className="text-text-primary">GitHub API</strong> —
                Fetches public profile and repository data for the GitHub Stats
                section. Subject to{" "}
                <a
                  href="https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-accent underline underline-offset-2 transition-colors hover:text-accent-secondary"
                >
                  GitHub&apos;s privacy statement
                </a>
                .
              </li>
              <li>
                <strong className="text-text-primary">Vercel</strong> —
                Hosts the site and the serverless function that proxies
                chatbot requests. Subject to{" "}
                <a
                  href="https://vercel.com/legal/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-accent underline underline-offset-2 transition-colors hover:text-accent-secondary"
                >
                  Vercel&apos;s privacy policy
                </a>
                .
              </li>
            </ul>
          </Section>
        </motion.div>

        <motion.div variants={fadeIn("up", "", 0.24, 0.6)}>
          <Section title="Your rights">
            <p>
              Since this site does not store personal data on any server, there
              is no user data to request, correct, or delete. Form messages
              delivered via EmailJS are managed by the email recipient. You can
              clear the GitHub stats cache at any time by clearing your
              browser&apos;s localStorage for this domain.
            </p>
          </Section>
        </motion.div>

        <motion.div variants={fadeIn("up", "", 0.32, 0.6)}>
          <Section title="Children&apos;s privacy">
            <p>
              This site is not directed at children under 13 and does not
              knowingly collect information from children.
            </p>
          </Section>
        </motion.div>

        <motion.div variants={fadeIn("up", "", 0.4, 0.6)}>
          <Section title="Changes to this policy">
            <p>
              This policy may be updated occasionally. The &quot;Last
              updated&quot; date at the top reflects the most recent revision.
              Continued use of the site after changes implies acceptance of the
              updated policy.
            </p>
          </Section>
        </motion.div>

        <motion.div variants={fadeIn("up", "", 0.48, 0.6)}>
          <Section title="Contact">
            <p>
              If you have questions about this policy, you can reach the site
              owner at{" "}
              <a
                href="mailto:pcclub10@gmail.com"
                className="text-text-accent underline underline-offset-2 transition-colors hover:text-accent-secondary"
              >
                pcclub10@gmail.com
              </a>
              .
            </p>
          </Section>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Privacy;
