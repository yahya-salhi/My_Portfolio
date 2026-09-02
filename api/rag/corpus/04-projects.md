# Projects

Yahya's featured projects:

## JobPilot
- **Category:** AI Full-Stack
- **Year:** 2026
- **Summary:** Your AI-powered job-hunting assistant — automated discovery, GPT-4o match scoring, and autonomous company research.
- **Problem:** Job hunting is one of the most repetitive and time-consuming tasks a developer faces: reading dozens of postings, judging fit, and researching companies from scratch takes hours.
- **Role:** Designed and built the entire product — onboarding, the GPT-4o scoring pipeline, the autonomous research agents, and the analytics layer.
- **Solution:** A Next.js 16 (App Router, Turbopack) + TypeScript app backed by InsForge (PostgreSQL, OAuth, Storage, Edge Functions). GPT-4o scores each job against the candidate's profile and resume via OpenRouter; Adzuna supplies live job data; Browserbase + Stagehand power the company dossiers; PostHog (with HogQL) drives the analytics dashboard.
- **Results:**
  - Automates the full pre-apply pipeline: discovery → AI match scoring → company research → informed apply.
  - Scores every job 0–100 with GPT-4o against the profile and uploaded resume, with skill-by-skill reasoning.
  - Builds live company dossiers (culture, tech stack, interview prep) via autonomous browser agents.
- **Tags:** next.js, typescript, tailwind, gpt-4o, postgresql, posthog
- Featured.

## DIY Quadcopter Drone
- **Category:** Embedded
- **Summary:** A custom-built quadcopter flight controller — sensor-fused attitude estimation and PID stabilization in C.
- **Problem:** Off-the-shelf flight controllers are opaque and unmodifiable. Building the control loop from scratch means owning the maths, the sensor pipeline, and the tuning — no black boxes.
- **Role:** Designed the custom flight controller in C — combining sensor fusion and PID stabilization for autonomous flight.
- **Solution:** A hand-built quadcopter running a custom C flight controller with 250Hz sensor fusion and closed-loop PID stabilization, developed as part of the Project TITANZ UAV initiative.
- **Results:**
  - 250Hz sensor-fused attitude estimation for stable, responsive flight.
  - Closed-loop PID control tuned for autonomous stabilization.
  - Ground-up ownership of the flight-control stack — no proprietary black boxes.
- **Tags:** c, embedded, pwm, pid, imu, sensor-fusion

## WorldWise
- **Category:** Full-Stack
- **Summary:** A React application for tracking travels around the world — interactive maps, city tracking, and travel statistics.
- **Problem:** Keeping track of everywhere you've been and planning where to go next is scattered across notes, photos, and memory.
- **Role:** Built the application end-to-end — the interactive map, city tracking, and travel statistics.
- **Solution:** A React.js (TypeScript) application with an interactive map, city logging, and aggregated travel statistics behind a modern, responsive interface.
- **Results:**
  - Pin and manage visited cities on an interactive world map.
  - Aggregate travel statistics across your logged destinations.
  - Clean, responsive UI for planning and reviewing trips.
- **Tags:** react, typescript, maps, css
- **Repo:** https://github.com/yahya-salhi/worldwise

## YeZZi
- **Category:** Mobile + AI
- **Year:** 2026
- **Summary:** A mobile-first diabetes management companion — glucose tracking, GPT-4o Vision food logging, and exercise, all on-device.
- **Problem:** Managing diabetes means tracking blood sugar, food choices, and physical activity with constant vigilance. People piece together a glucose log, a food diary, and a fitness tracker — YeZZ brings all three into one app and connects the dots.
- **Role:** Designed and built the entire product — the on-device data model, GPT-4o Vision food pipeline, IDF-based decision support, and the freemium monetization layer.
- **Solution:** An Expo React Native app with all data on-device via expo-sqlite (no account, no cloud). GPT-4o Vision identifies meals from a photo and estimates nutrition + blood-glucose impact through an anonymous, quota'd API proxy. Readings are classified against IDF thresholds with pattern detection and color-coded decision cards; RevenueCat powers the YeZZi Plus subscription; Aptabase tracks anonymous feature usage only.
- **Results:**
  - Log a fasting or post-meal reading in under 10 seconds, with mg/dL ⇄ mmol/L support.
  - GPT-4o Vision food recognition with carb/protein/fat + glucose-impact estimates, linked to real post-meal readings for actual-vs-estimated comparison.
  - Rolling averages (7/14/30/90-day), trend chart, and 3+ consecutive-high pattern alerts.
  - 100% on-device storage (SQLite) — no sign-up, backup/export to a local file, CSV export free + PDF doctor report with YeZZi Plus.
- **Tags:** react-native, expo, expo-sqlite, typescript, gpt-4o, revenuecat
