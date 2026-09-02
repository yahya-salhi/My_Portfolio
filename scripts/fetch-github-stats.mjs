/**
 * Fetch a real GitHub stats snapshot → public/data/github-stats.json
 * Run: node scripts/fetch-github-stats.mjs  (or npm run update:github-stats)
 *
 * Uses only unauthenticated GitHub API calls (60 req/hr per IP). This is a
 * build-time/generation script — never run this from the browser.
 */
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const outFile = path.join(root, "public", "data", "github-stats.json");

const USERNAME = "yahya-salhi";
const API_BASE = "https://api.github.com";
const TOP_LANGUAGES = 5;

async function fetchJson(url) {
  const response = await fetch(url, {
    headers: {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "portfolio-stats-script",
    },
  });
  if (!response.ok) {
    if (response.status === 403) {
      throw new Error("GitHub API rate limit exceeded (403)");
    }
    throw new Error(`GitHub API error ${response.status} for ${url}`);
  }
  return response.json();
}

const [profile, repos] = await Promise.all([
  fetchJson(`${API_BASE}/users/${USERNAME}`),
  fetchJson(
    `${API_BASE}/users/${USERNAME}/repos?per_page=100&sort=updated`
  ),
]);

const ownedRepos = repos.filter((repo) => !repo.fork);

const totals = ownedRepos.reduce(
  (acc, repo) => ({
    stars: acc.stars + repo.stargazers_count,
    forks: acc.forks + repo.forks_count,
  }),
  { stars: 0, forks: 0 }
);

const languageBytes = {};
for (const repo of ownedRepos) {
  try {
    const languages = await fetchJson(
      `${API_BASE}/repos/${USERNAME}/${repo.name}/languages`
    );
    for (const [language, bytes] of Object.entries(languages)) {
      languageBytes[language] = (languageBytes[language] || 0) + bytes;
    }
  } catch (error) {
    console.warn(`Skipped languages for ${repo.name}: ${error.message}`);
  }
}

const languages = Object.entries(languageBytes)
  .sort(([, a], [, b]) => b - a)
  .slice(0, TOP_LANGUAGES)
  .map(([name, bytes]) => ({ name, bytes }));

const snapshot = {
  username: USERNAME,
  profile: {
    public_repos: profile.public_repos,
    followers: profile.followers,
    html_url: profile.html_url,
  },
  totals,
  languages,
  fetchedAt: new Date().toISOString(),
};

await mkdir(path.dirname(outFile), { recursive: true });
await writeFile(outFile, `${JSON.stringify(snapshot, null, 2)}\n`, "utf8");
console.log(
  `Wrote ${outFile} (${ownedRepos.length} repos, ${languages.length} languages)`
);