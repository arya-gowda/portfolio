# Portfolio Improvement Plan

## Context

This is Arya's personal professional portfolio (React 19 + Vite + Tailwind 4), built up over several recent commits (photo gallery optimization, mobile responsiveness, resume, contact form, about-me copy). The site is functional end-to-end, but a full audit surfaced rough edges typical of fast iterative development: an unoptimized 20MB asset, unfinished JSON content, missing SEO/meta setup, thin accessibility, and leftover template scaffolding (including dead dark/light theming code that never got wired up).

Since this site's real purpose is to be seen by recruiters/hiring managers/collaborators, the goal of this plan is to close those gaps — improving load speed, discoverability, accessibility, and polish — without adding infrastructure (testing/CI/analytics) that's out of scope for this pass. This document is a prioritized punch list to execute against, tier by tier (quick wins first, since they're high ROI for low effort).

## Tier 1 — Quick Wins (high impact, low effort)

- [x] **Compress the 20MB project GIF.** `public/projects/flappy_demo.gif` is served raw and unoptimized, referenced from `public/data/projects.json`. Convert to a compressed looping `<video>` (mp4/webm) or a heavily compressed/shorter GIF. This is the single biggest load-time offender on the Projects page. *(Done: resized/recompressed to ~850KB, 97.6% smaller.)*
- [x] **Lazy-load project card images.** `src/components/ProjectCard.jsx` renders images with no `loading="lazy"`, unlike the Photography gallery (`src/pages/Photography.jsx`) which already does this correctly — mirror that pattern.
- [x] **Remove dead code left from scaffolding:**
  - Unused `count` state in `src/App.jsx` (Vite template leftover)
  - Unused `src/assets/icons/home.png` and `src/assets/react.svg`
  - Empty stray file `src/components/placeholder`
  - Dead `@media (prefers-color-scheme: light)` block in `src/index.css` (not wired to any Tailwind classes — superseded by the real theme toggle in Tier 2)
- [x] **Fill in missing/placeholder content in `public/data/projects.json`:** add `url` for the two projects currently missing GitHub links (Race Time Synthetic Optimizer, Movie Recommendation System), and rewrite the casual "This site lol" description for the Portfolio Website entry. *(URLs left blank — no public repos for those two.)*
- [x] **Add baseline SEO to `index.html`:** meta description, Open Graph tags (title/description/image/url), and a proper social preview image. Add `public/robots.txt` and `public/sitemap.xml`. *(og-image.jpg generated from headshot; domain set to arya-gowda.vercel.app.)*

## Tier 2 — High-Impact Improvements

- [x] **Wire up a real dark/light theme toggle.** Replace the dead CSS scaffolding with an actual working toggle: Tailwind `dark:` variants, a small `ThemeProvider`/context with `localStorage` persistence, and a toggle control in `src/components/Navbar.jsx`. Apply across all pages (currently everything hardcodes `bg-zinc-900`/`text-white`, etc.). *(Done: `src/context/ThemeContext.jsx`, class-based `dark:` variant via Tailwind v4 `@custom-variant`, FOUC-prevention inline script in `index.html`, sun/moon toggle in Navbar. Verified via CDP click-through in both directions.)*
- [x] **Accessibility pass on the contact form** (`src/pages/Contact.jsx`): add real `<label>` elements for each input (currently placeholder-only, a WCAG anti-pattern), add `required` and `type="email"` for native validation, and add a honeypot field for basic spam protection (no backend needed). *(Done.)*
- [x] **Accessibility pass elsewhere:** add `aria-label`s to the Photography lightbox prev/next buttons (`src/pages/Photography.jsx`, currently only the close button has one). Do a semantic HTML pass replacing generic `<div>` wrappers with `<section>`/`<article>` where appropriate across Home, Projects, Photography, and Contact (only Experience currently uses `<section>`). *(Done — also fixed missing/duplicate `<h1>` hierarchy: added h1 to Home/Projects/Experience, changed Contact's h2 to h1.)*
- [x] **Per-route document titles.** Every route currently shows the static "AG Portfolio" tab title from `index.html`. Add a lightweight `useEffect`-based title update per page (no need for a library like react-helmet at this scale) plus a per-page meta description if feasible. *(Done: `src/hooks/useDocumentTitle.js`, applied to all 5 pages.)*
- [ ] **Fix the Photography collection filter.** `public/data/photos.json` has all 56 entries tagged `"featured"` with empty title/caption/location, making the collection-filter UI a no-op. Either populate meaningful collections/metadata, or simplify the UI by removing the non-functional filter until real data exists. *(Deferred — Arya wants to supply real collection names/groupings later rather than auto-split by camera source.)*

## Tier 3 — Nice-to-Have / Polish

- [ ] **Route-based code splitting** via `React.lazy` in `src/App.jsx` to shrink the initial bundle (currently all pages are statically imported together).
- [ ] **JSON-LD structured data** (Person schema) in `index.html` for richer search results.
- [ ] **Optimize remaining `public/projects/*` images** (`Aevum_StadiumTurf.jpeg` 1.1MB, `Portfolio.png` 1MB) — move into `src/assets` and run them through the existing `vite-imagetools` pipeline already used for the Photography gallery, rather than serving raw from `public/`.
- [ ] **Micro-interaction polish:** hover/transition refinement on project cards and the tech-stack pill grid on Home.
- [ ] **Repo hygiene:** consider whether the 53MB of raw source photos in `src/assets/images/` needs to stay in the main repo history long-term (e.g. Git LFS) given it only exists to feed the imagetools pipeline.

## Verification

Once items are implemented, verify with:
- `npm run dev` and manually click through all five routes (Home, Experience, Projects, Photography, Contact) in both a mobile viewport and desktop width.
- Run a Lighthouse audit (Chrome DevTools) on Home and Projects specifically to confirm the GIF/image fixes measurably improve Performance and that Accessibility/SEO scores rise after Tier 1–2 changes.
- Submit the contact form end-to-end to confirm EmailJS still works after adding labels/validation/honeypot.
- Toggle the new dark/light theme across every page to confirm no page still hardcodes colors that break in one mode.
- Test the Photography lightbox (open/close/prev/next) with a screen reader or keyboard-only navigation to confirm the new aria-labels work.
- `npm run lint` to make sure dead-code removal didn't leave unused-import warnings.
