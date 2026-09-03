module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: [
    'dist',
    '.eslintrc.cjs',
    // Server-side Edge Function + build scripts are Node/Edge runtime code,
    // not browser code — validated via `node --check` instead of browser env lint.
    'api',
    'scripts',
  ],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    // Disabled (2026-09-03, F-22): `react-refresh/only-export-components` is a
    // dev-time Fast Refresh/HMR hint with zero production impact. The codebase
    // intentionally colocates a section's sub-components in a single file that
    // also default-exports its lazy/SectionWrapper re-export, which this rule
    // flags 34 times. Enforcing it would force splitting every section into
    // subdirectories with no shipped-code benefit. Kept as a documented plugin
    // rather than removed so the rule can be re-enabled selectively if desired.
    // 'react-refresh/only-export-components': [
    //   'warn',
    //   { allowConstantExport: true },
    // ],
  },
}
