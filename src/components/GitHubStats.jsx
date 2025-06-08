import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import {
  fetchGitHubProfile,
  fetchGitHubRepos,
  fetchGitHubStats,
  getTopLanguages,
} from "../utils/github";

const StatCard = ({ title, value, icon, delay }) => (
  <motion.div
    variants={fadeIn("up", "spring", delay, 0.75)}
    className="bg-tertiary p-6 rounded-2xl w-full sm:w-[250px]"
  >
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-white font-bold text-[24px]">{value}</h3>
        <p className="text-secondary text-[14px]">{title}</p>
      </div>
      <div className="text-[40px]">{icon}</div>
    </div>
  </motion.div>
);

const LanguageBar = ({ language, percentage, delay }) => (
  <motion.div
    variants={fadeIn("right", "spring", delay, 0.75)}
    className="mb-4"
  >
    <div className="flex justify-between items-center mb-2">
      <span className="text-white text-[14px] font-medium">{language}</span>
      <span className="text-secondary text-[12px]">{percentage}%</span>
    </div>
    <div className="w-full bg-black-200 rounded-full h-2">
      <div
        className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-1000"
        style={{ width: `${percentage}%` }}
      />
    </div>
  </motion.div>
);

const GitHubStats = () => {
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [stats, setStats] = useState(null);
  const [languages, setLanguages] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fallback data in case GitHub API fails
  const fallbackData = {
    profile: {
      public_repos: 25,
      followers: 5,
      html_url: "https://github.com/yahya-salhi",
    },
    repos: [
      { stargazers_count: 2, forks_count: 1 },
      { stargazers_count: 1, forks_count: 0 },
      { stargazers_count: 0, forks_count: 0 },
    ],
    stats: {
      pushEvents: 45,
      pullRequestEvents: 8,
      issueEvents: 3,
      createEvents: 12,
    },
    languages: {
      JavaScript: 45000,
      TypeScript: 32000,
      CSS: 18000,
      HTML: 12000,
      Python: 8000,
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Try to fetch GitHub data with timeout
        const fetchWithTimeout = (promise, timeout = 10000) => {
          return Promise.race([
            promise,
            new Promise((_, reject) =>
              setTimeout(() => reject(new Error("Request timeout")), timeout)
            ),
          ]);
        };

        // Fetch all GitHub data with timeout
        const [profileData, reposData, statsData] = await Promise.all([
          fetchWithTimeout(fetchGitHubProfile()),
          fetchWithTimeout(fetchGitHubRepos(10)),
          fetchWithTimeout(fetchGitHubStats()),
        ]);

        // Use fetched data if available, otherwise use fallback
        setProfile(profileData || fallbackData.profile);
        setRepos(reposData || fallbackData.repos);
        setStats(statsData || fallbackData.stats);

        // Fetch language statistics
        if (reposData && reposData.length > 0) {
          try {
            const languageData = await fetchWithTimeout(
              getTopLanguages(reposData)
            );
            setLanguages(languageData || fallbackData.languages);
          } catch (langError) {
            console.warn("Using fallback language data:", langError);
            setLanguages(fallbackData.languages);
          }
        } else {
          setLanguages(fallbackData.languages);
        }
      } catch (error) {
        console.warn("GitHub API failed, using fallback data:", error);
        setError("Using cached data - GitHub API temporarily unavailable");

        // Use fallback data
        setProfile(fallbackData.profile);
        setRepos(fallbackData.repos);
        setStats(fallbackData.stats);
        setLanguages(fallbackData.languages);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Calculate language percentages
  const getLanguagePercentages = () => {
    const totalBytes = Object.values(languages).reduce(
      (sum, bytes) => sum + bytes,
      0
    );
    return Object.entries(languages)
      .slice(0, 5) // Top 5 languages
      .map(([language, bytes]) => ({
        language,
        percentage: Math.round((bytes / totalBytes) * 100),
      }));
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[400px]">
        <div className="text-white text-xl mb-4">Loading GitHub data...</div>
        <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const languagePercentages = getLanguagePercentages();

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>My coding activity</p>
        <h2 className={styles.sectionHeadText}>GitHub Stats.</h2>
      </motion.div>

      <div className="w-full flex flex-col">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]"
        >
          Here's a snapshot of my GitHub activity and the technologies I work
          with most frequently. These statistics reflect my coding journey and
          the projects I've been working on.
        </motion.p>

        {error && (
          <motion.div
            variants={fadeIn("", "", 0.2, 1)}
            className="mt-4 p-4 bg-yellow-900/20 border border-yellow-500/30 rounded-lg"
          >
            <p className="text-yellow-400 text-sm">⚠️ {error}</p>
          </motion.div>
        )}
      </div>

      {/* GitHub Profile Stats */}
      <div className="mt-20 flex flex-wrap gap-7 justify-center">
        <StatCard
          title="Public Repositories"
          value={profile?.public_repos || 0}
          icon="📁"
          delay={0.1}
        />
        <StatCard
          title="GitHub Followers"
          value={profile?.followers || 0}
          icon="👥"
          delay={0.2}
        />
        <StatCard
          title="Total Stars"
          value={repos.reduce((sum, repo) => sum + repo.stargazers_count, 0)}
          icon="⭐"
          delay={0.3}
        />
        <StatCard
          title="Total Forks"
          value={repos.reduce((sum, repo) => sum + repo.forks_count, 0)}
          icon="🍴"
          delay={0.4}
        />
      </div>

      {/* Top Languages */}
      {languagePercentages.length > 0 && (
        <div className="mt-20">
          <motion.div variants={textVariant()}>
            <h3 className="text-white font-bold text-[30px] mb-10">
              Most Used Languages
            </h3>
          </motion.div>

          <div className="max-w-2xl">
            {languagePercentages.map((lang, index) => (
              <LanguageBar
                key={lang.language}
                language={lang.language}
                percentage={lang.percentage}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      )}

      {/* Recent Activity */}
      {stats && (
        <div className="mt-20">
          <motion.div variants={textVariant()}>
            <h3 className="text-white font-bold text-[30px] mb-10">
              Recent Activity
            </h3>
          </motion.div>

          <div className="flex flex-wrap gap-7 justify-center">
            <StatCard
              title="Push Events"
              value={stats.pushEvents}
              icon="📤"
              delay={0.1}
            />
            <StatCard
              title="Pull Requests"
              value={stats.pullRequestEvents}
              icon="🔄"
              delay={0.2}
            />
            <StatCard
              title="Issues"
              value={stats.issueEvents}
              icon="🐛"
              delay={0.3}
            />
            <StatCard
              title="New Repos"
              value={stats.createEvents}
              icon="🆕"
              delay={0.4}
            />
          </div>
        </div>
      )}

      {/* GitHub Profile Link */}
      <motion.div
        variants={fadeIn("up", "spring", 0.5, 0.75)}
        className="mt-20 flex justify-center"
      >
        <a
          href={profile?.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-tertiary py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary hover:bg-[#151030] transition-colors"
        >
          View Full GitHub Profile
        </a>
      </motion.div>
    </>
  );
};

export default SectionWrapper(GitHubStats, "github");
