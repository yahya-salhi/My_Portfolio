// GitHub API utilities for fetching repository data

const GITHUB_USERNAME = "yahya-salhi";
const GITHUB_API_BASE = "https://api.github.com";

/**
 * Fetch user's GitHub repositories
 * @param {number} limit - Number of repositories to fetch
 * @returns {Promise<Array>} Array of repository objects
 */
export const fetchGitHubRepos = async (limit = 10) => {
  try {
    const response = await fetch(
      `${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=${limit}`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
      }
    );

    if (!response.ok) {
      if (response.status === 403) {
        throw new Error("GitHub API rate limit exceeded");
      }
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const repos = await response.json();

    // Filter and format the repositories
    return repos
      .filter((repo) => !repo.fork) // Exclude forked repositories
      .map((repo) => ({
        id: repo.id,
        name: repo.name,
        description: repo.description || "No description available",
        html_url: repo.html_url,
        homepage: repo.homepage,
        language: repo.language,
        languages_url: repo.languages_url,
        stargazers_count: repo.stargazers_count,
        forks_count: repo.forks_count,
        created_at: repo.created_at,
        updated_at: repo.updated_at,
        topics: repo.topics || [],
        size: repo.size,
        default_branch: repo.default_branch,
      }));
  } catch (error) {
    console.error("Error fetching GitHub repositories:", error);
    return [];
  }
};

/**
 * Fetch languages used in a specific repository
 * @param {string} repoName - Repository name
 * @returns {Promise<Object>} Object with language statistics
 */
export const fetchRepoLanguages = async (repoName) => {
  try {
    const response = await fetch(
      `${GITHUB_API_BASE}/repos/${GITHUB_USERNAME}/${repoName}/languages`
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching languages for ${repoName}:`, error);
    return {};
  }
};

/**
 * Fetch user's GitHub profile information
 * @returns {Promise<Object>} User profile object
 */
export const fetchGitHubProfile = async () => {
  try {
    const response = await fetch(
      `${GITHUB_API_BASE}/users/${GITHUB_USERNAME}`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
      }
    );

    if (!response.ok) {
      if (response.status === 403) {
        throw new Error("GitHub API rate limit exceeded");
      }
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const profile = await response.json();

    return {
      login: profile.login,
      name: profile.name,
      bio: profile.bio,
      avatar_url: profile.avatar_url,
      html_url: profile.html_url,
      public_repos: profile.public_repos,
      followers: profile.followers,
      following: profile.following,
      created_at: profile.created_at,
      updated_at: profile.updated_at,
      location: profile.location,
      blog: profile.blog,
      company: profile.company,
    };
  } catch (error) {
    console.error("Error fetching GitHub profile:", error);
    return null;
  }
};

/**
 * Fetch user's GitHub contribution statistics
 * @returns {Promise<Object>} Contribution statistics
 */
export const fetchGitHubStats = async () => {
  try {
    // Note: GitHub doesn't provide a direct API for contribution graphs
    // This is a simplified version that fetches recent activity
    const response = await fetch(
      `${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/events/public?per_page=100`
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const events = await response.json();

    // Process events to get basic statistics
    const stats = {
      totalEvents: events.length,
      pushEvents: events.filter((event) => event.type === "PushEvent").length,
      createEvents: events.filter((event) => event.type === "CreateEvent")
        .length,
      issueEvents: events.filter((event) => event.type === "IssuesEvent")
        .length,
      pullRequestEvents: events.filter(
        (event) => event.type === "PullRequestEvent"
      ).length,
    };

    return stats;
  } catch (error) {
    console.error("Error fetching GitHub stats:", error);
    return {
      totalEvents: 0,
      pushEvents: 0,
      createEvents: 0,
      issueEvents: 0,
      pullRequestEvents: 0,
    };
  }
};

/**
 * Get the most used programming languages across all repositories
 * @param {Array} repos - Array of repository objects
 * @returns {Promise<Object>} Object with aggregated language statistics
 */
export const getTopLanguages = async (repos) => {
  try {
    const languagePromises = repos.map((repo) => fetchRepoLanguages(repo.name));
    const languageResults = await Promise.all(languagePromises);

    // Aggregate language statistics
    const aggregatedLanguages = {};

    languageResults.forEach((languages) => {
      Object.entries(languages).forEach(([language, bytes]) => {
        aggregatedLanguages[language] =
          (aggregatedLanguages[language] || 0) + bytes;
      });
    });

    // Sort by usage (bytes)
    const sortedLanguages = Object.entries(aggregatedLanguages)
      .sort(([, a], [, b]) => b - a)
      .reduce((obj, [language, bytes]) => {
        obj[language] = bytes;
        return obj;
      }, {});

    return sortedLanguages;
  } catch (error) {
    console.error("Error aggregating languages:", error);
    return {};
  }
};

/**
 * Format repository data for portfolio display
 * @param {Array} repos - Array of repository objects
 * @returns {Array} Formatted repository data for portfolio
 */
export const formatReposForPortfolio = (repos) => {
  return repos.map((repo) => ({
    name: repo.name,
    description: repo.description,
    tags: [
      {
        name: repo.language?.toLowerCase() || "javascript",
        color: "blue-text-gradient",
      },
      ...repo.topics.slice(0, 2).map((topic) => ({
        name: topic,
        color: "green-text-gradient",
      })),
    ],
    image: null, // Will use placeholder images
    source_code_link: repo.html_url,
    live_demo_link: repo.homepage,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    updated_at: repo.updated_at,
  }));
};
