/**
 * GitHub stats data layer (F-18).
 *
 * Hybrid-lite sourcing:
 *   - live:    2 unauthenticated API calls (/users/:user, /users/:user/repos)
 *              only when the localStorage cache is stale.
 *   - cache:   localStorage copy with a 12h TTL.
 *   - static:  committed public/data/github-stats.json snapshot (real data
 *              regenerated via `npm run update:github-stats`).
 *
 * Rate-limit handling: HTTP 403 or X-RateLimit-Remaining: 0 fails the live
 * path fast and the caller falls back to cache → snapshot, with a notice.
 * No invented data is ever rendered.
 */

export const GITHUB_USERNAME = "yahya-salhi";
export const GITHUB_PROFILE_URL = `https://github.com/${GITHUB_USERNAME}`;

const GITHUB_API_BASE = "https://api.github.com";
const CACHE_KEY = "gh-stats-cache:v1";
const CACHE_TTL_MS = 12 * 60 * 60 * 1000;
const FETCH_TIMEOUT_MS = 8000;

const fetchWithTimeout = (url, timeoutMs = FETCH_TIMEOUT_MS) => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  return fetch(url, {
    headers: { Accept: "application/vnd.github.v3+json" },
    signal: controller.signal,
  })
    .catch((error) => {
      if (error.name === "AbortError") {
        throw new Error("GitHub request timed out");
      }
      throw error;
    })
    .finally(() => clearTimeout(timer));
};

const isRateLimited = (response) => {
  const remaining = response.headers.get("x-ratelimit-remaining");
  return (
    response.status === 403 ||
    (remaining !== null && Number(remaining) === 0)
  );
};

const toCanonical = ({ profile, totals, languages, updatedAt }) => ({
  publicRepos: profile.public_repos,
  followers: profile.followers,
  stars: totals.stars,
  forks: totals.forks,
  languages: languages || [],
  updatedAt,
  profileUrl: profile.html_url || GITHUB_PROFILE_URL,
});

export const fetchLiveGitHubStats = async () => {
  const [profileRes, reposRes] = await Promise.all([
    fetchWithTimeout(`${GITHUB_API_BASE}/users/${GITHUB_USERNAME}`),
    fetchWithTimeout(
      `${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`
    ),
  ]);

  if (isRateLimited(profileRes) || isRateLimited(reposRes)) {
    const error = new Error("GitHub API rate limit exceeded");
    error.rateLimited = true;
    throw error;
  }

  if (!profileRes.ok || !reposRes.ok) {
    throw new Error(
      `GitHub API error: ${profileRes.status} / ${reposRes.status}`
    );
  }

  const [profile, repos] = await Promise.all([
    profileRes.json(),
    reposRes.json(),
  ]);

  const ownedRepos = repos.filter((repo) => !repo.fork);
  const totals = ownedRepos.reduce(
    (acc, repo) => ({
      stars: acc.stars + repo.stargazers_count,
      forks: acc.forks + repo.forks_count,
    }),
    { stars: 0, forks: 0 }
  );

  return toCanonical({
    profile: {
      public_repos: profile.public_repos,
      followers: profile.followers,
      html_url: profile.html_url,
    },
    totals,
    languages: [],
    updatedAt: new Date().toISOString(),
  });
};

export const loadSnapshot = async () => {
  const response = await fetchWithTimeout(
    `${import.meta.env.BASE_URL}data/github-stats.json`
  );
  if (!response.ok) {
    throw new Error(`GitHub stats snapshot error: ${response.status}`);
  }
  const snapshot = await response.json();
  return toCanonical({
    profile: snapshot.profile,
    totals: snapshot.totals,
    languages: snapshot.languages,
    updatedAt: snapshot.fetchedAt,
  });
};

const readCache = () => {
  try {
    const raw = window.localStorage.getItem(CACHE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const writeCache = (payload) => {
  try {
    window.localStorage.setItem(CACHE_KEY, JSON.stringify(payload));
  } catch {
    // localStorage unavailable (private mode) — cache is best-effort
  }
};

const readSnapshotSafe = async () => {
  try {
    return await loadSnapshot();
  } catch {
    return null;
  }
};

const readSnapshotLanguages = async () => {
  try {
    const snapshot = await loadSnapshot();
    return snapshot.languages || [];
  } catch {
    return [];
  }
};

/**
 * Resolve GitHub stats: fresh cache → live API → stale cache → snapshot → null.
 * @returns {Promise<{ stats: object|null, source: string|null, notice: string|null }>}
 *   source is one of "cache" | "live" | "snapshot" | null.
 */
export const loadGitHubStats = async () => {
  const cached = readCache();

  if (cached && Date.now() - new Date(cached.savedAt).getTime() < CACHE_TTL_MS) {
    return { stats: cached.stats, source: "cache", notice: null };
  }

  try {
    const stats = await fetchLiveGitHubStats();
    const languages = await readSnapshotLanguages();
    if (languages.length > 0) {
      stats.languages = languages;
    }
    writeCache({ savedAt: new Date().toISOString(), stats });
    return { stats, source: "live", notice: null };
  } catch (liveError) {
    const fallbackStats = cached ? cached.stats : await readSnapshotSafe();
    if (!fallbackStats) {
      return { stats: null, source: null, notice: null };
    }
    return {
      stats: fallbackStats,
      source: cached ? "cache" : "snapshot",
      notice: liveError.rateLimited
        ? "GitHub API rate limit reached — showing the latest saved stats."
        : null,
    };
  }
};

/**
 * Human-readable freshness label for the stats chip.
 * @param {string} isoDate - ISO timestamp the stats were produced at.
 * @param {boolean} synced - true renders "Synced <date>" (snapshot source).
 */
export const formatFreshness = (isoDate, synced = false) => {
  if (!isoDate) return "";
  const then = new Date(isoDate);
  if (Number.isNaN(then.getTime())) return "";

  const minutesAgo = Math.floor((Date.now() - then.getTime()) / 60000);
  if (minutesAgo < 1) return "Updated just now";
  if (minutesAgo < 60) {
    return minutesAgo === 1 ? "Updated 1 minute ago" : `Updated ${minutesAgo} minutes ago`;
  }

  const hoursAgo = Math.floor(minutesAgo / 60);
  if (hoursAgo < 24) {
    return hoursAgo === 1 ? "Updated 1 hour ago" : `Updated ${hoursAgo} hours ago`;
  }

  if (synced) {
    return `Synced ${then.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    })}`;
  }

  const daysAgo = Math.floor(hoursAgo / 24);
  if (daysAgo < 7) {
    return daysAgo === 1 ? "Updated 1 day ago" : `Updated ${daysAgo} days ago`;
  }

  return `Synced ${then.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  })}`;
};