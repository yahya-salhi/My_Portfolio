import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import {
  GITHUB_PROFILE_URL,
  formatFreshness,
  loadGitHubStats,
} from "../utils/github";

const StatCard = ({ label, value, delay }) => (
  <motion.div
    variants={fadeIn("up", "spring", delay, 0.75)}
    className="rounded-xl border border-border-light border-l-2 border-l-accent-primary bg-bg-glass p-5 shadow-card"
  >
    <p className="text-3xl font-bold text-text-primary">{value}</p>
    <p className="mt-1 text-sm text-text-secondary">{label}</p>
  </motion.div>
);

StatCard.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  delay: PropTypes.number.isRequired,
};

const GitHubStats = () => {
  const [stats, setStats] = useState(null);
  const [source, setSource] = useState(null);
  const [notice, setNotice] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    loadGitHubStats().then((result) => {
      if (cancelled) return;
      setStats(result.stats);
      setSource(result.source);
      setNotice(result.notice);
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const profileUrl = stats?.profileUrl || GITHUB_PROFILE_URL;

  const statsCards = stats
    ? [
        { label: "Public Repositories", value: stats.publicRepos },
        { label: "Followers", value: stats.followers },
        { label: "Total Stars", value: stats.stars },
        { label: "Total Forks", value: stats.forks },
      ]
    : [];

  const freshness =
    stats && source
      ? formatFreshness(stats.updatedAt, source === "snapshot")
      : "";

  const freshnessDot =
    source === "live" || source === "cache" ? "bg-success" : "bg-warning";

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className="font-mono text-[0.8125rem] uppercase tracking-[0.14em] text-text-secondary">
          My coding activity
        </p>
        <h2 className="mt-2 text-4xl font-bold leading-[1.1] text-text-primary sm:text-5xl lg:text-6xl">
          GitHub Stats.
        </h2>
      </motion.div>

      <motion.div
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-6 flex max-w-3xl flex-col gap-4"
      >
        <p className="text-base leading-relaxed text-text-secondary">
          A snapshot of public GitHub activity — repositories, followers, stars,
          and the languages I build with most. Live data when available, saved
          data otherwise.
        </p>

        {notice && (
          <div className="flex items-center gap-2 rounded-lg border border-warning/30 bg-warning-bg px-4 py-3 text-sm text-warning">
            <span
              aria-hidden="true"
              className="h-2 w-2 shrink-0 rounded-full bg-warning"
            />
            {notice}
          </div>
        )}

        {freshness && (
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border-light bg-bg-glass px-3 py-1 font-mono text-[0.6875rem] text-text-muted">
            <span
              aria-hidden="true"
              className={`h-1.5 w-1.5 rounded-full ${freshnessDot}`}
            />
            {freshness}
          </span>
        )}
      </motion.div>

      {loading ? (
        <p className="mt-12 font-mono text-sm text-text-secondary">
          Loading GitHub data…
        </p>
      ) : stats ? (
        <>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {statsCards.map((card, index) => (
              <StatCard key={card.label} {...card} delay={index * 0.1} />
            ))}
          </div>

          {stats.languages?.length > 0 && (
            <div className="mt-10">
              <h3 className="text-2xl font-bold text-text-primary sm:text-3xl">
                Most-used languages
              </h3>
              <div className="mt-6 flex flex-wrap gap-2.5">
                {stats.languages.map((language) => (
                  <span
                    key={language.name}
                    className="inline-block rounded-md border border-border-light bg-bg-glass px-3 py-1.5 font-mono text-[0.6875rem] font-medium text-text-primary transition-colors hover:border-accent-primary"
                  >
                    {language.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="mt-10">
          <p className="rounded-xl border border-border-light bg-bg-glass p-6 text-sm text-text-secondary">
            GitHub stats are temporarily unavailable.
          </p>
        </div>
      )}

      <motion.div variants={fadeIn("up", "spring", 0.5, 0.75)} className="mt-10">
        <a
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center justify-center rounded-lg border border-border-light bg-bg-glass px-6 py-3 text-sm font-semibold text-text-primary transition-all hover:border-accent-primary hover:shadow-glow"
        >
          View Full GitHub Profile
        </a>
      </motion.div>
    </>
  );
};

export default SectionWrapper(GitHubStats, "github");