# AGENTS.md

## Section 1: Agent Operational Workflow

### 1.1 Startup Workflow
Before writing any code, the agent must complete these steps:
1. Confirm the working directory using `pwd`.
2. Inspect the repository structure and key files (`README.md`, `CONTRIBUTING.md`, `public/`, `.github/workflows/ci-cd.yml`) to understand the current architecture and state.
3. Review recent repository history by checking the last 5 commits using `git log --oneline -5`.
4. Run baseline verification using the commands documented in Section 4.2 once the project toolchain is set up. Until then, baseline verification means checking the static metadata in `public/` for well-formed XML/JSON and working links. If baseline verification fails, fix that issue first before stacking new feature work on top of a broken starting state.

### 1.2 Working Rules
1. Focus entirely on one feature or task at a time.
2. Do not mark a task or feature complete just because code was added. Ensure it compiles, passes linting/tests, and is verified.
3. Adhere to `.editorconfig` and project linter/formatter conventions.
4. Keep all changes within the selected task scope unless a critical blocker forces a narrow supporting fix.
5. Do not silently alter verification rules or relax tests during implementation.
6. Prefer durable repository artifacts and updated documentation over transient chat summaries.
7. When making structural updates, dependency version bumps, framework configuration changes, schema updates, or directory layout shifts, the agent must update corresponding repository documentation (`AGENTS.md`, `README.md`, `CONTRIBUTING.md`) and the static metadata in `public/` (`llms.txt`, `llms-full.txt`, `sitemap.xml`, `manifest.webmanifest`, `.well-known/security.txt`) to reflect the new state.

### 1.3 Required Artifacts & Key Files
1. `README.md`: Canonical project description, overview, live links, and ownership terms.
2. `AGENTS.md`: Single source of truth for agent rules; `CLAUDE.md` and `GEMINI.md` point here.
3. `public/`: Deployable static root — `llms.txt`, `llms-full.txt`, `sitemap.xml`, `robots.txt`, `manifest.webmanifest`, and `.well-known/security.txt`.
4. `.github/workflows/ci-cd.yml`: CI/CD pipeline for verification and deployment.
5. `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `SECURITY.md`, `LICENSE`: Governance, contribution, and security documents.

### 1.4 Definition Of Done
A feature achieves the status of completed only when all of the following conditions are met:
1. The target behavior is fully implemented and satisfies requirements.
2. The project compiles/builds successfully locally using the build command documented in Section 4.2. Until the toolchain exists, this means the files in `public/` are valid (well-formed XML/JSON) and all links resolve.
3. Diagnostics, linter, and type checks run successfully with zero errors once the toolchain is configured (see Section 4.2).
4. Automated unit/integration tests pass once the toolchain is configured (see Section 4.2).
5. If testing dynamic logic, client UI, or API endpoints, manually verify correct DOM rendering, HTTP status codes, and fallback states.
6. Web audit compliance: Client UI pages meet Google Lighthouse / PageSpeed audit benchmarks (Target: >= 90 across Performance, Accessibility, Best Practices, and SEO).

### 1.5 End Of Session Workflow
Before ending a session, the agent must perform these tasks:
1. Confirm no trailing linter, compiler, or type errors remain by running validation tasks.
2. Explicitly record any unresolved risk, technical debt, or workflow blocker in the session handoff.
3. Commit the changes with a descriptive message adhering to the Conventional Commits specification once the work is in a safe state.

---

## Section 2: Tech Stack & Architecture

### 2.1 Framework & Core Stack
- **Framework**: Astro 7. The public page is prerendered; Keystatic admin/API routes are server-rendered through `@astrojs/cloudflare`.
- **Language**: TypeScript (strict) for data and config; Astro components for markup.
- **UI Components & Library**: Semantic Tailwind design tokens; accessible Astro components. React is loaded only inside the Keystatic admin at `/keystatic` — the public page has no React runtime.
- **Styling**: Tailwind CSS v4 via `@tailwindcss/vite`; a centered neutral card on a white canvas, ink and a single AA-safe teal accent sampled from the emblem, a drifting binary field in light tones, and fine film grain.
- **State Management & Data Fetching**: None on the public page; Keystatic handles content reads/writes inside the admin.
- **Database / CMS / ORM**: Keystatic CMS with Cloud storage (`keystatic.config.ts`). Content is YAML in `src/content/` (site settings singleton + link group collection), validated and loaded at build time by `src/data/site.ts`. Site settings hold the editable lab logo (`public/images/brand/`), the reorderable highlighted-links list, and social links (built-in platform, or custom label + SVG path). Link icons come from the shared registry, a custom 24×24 SVG path (`d` attribute only), an uploaded square image (`public/images/icons/`), or none. Links may carry an optional 16:9 image with alt text, a description line, or a `highlight` flag that renders the list row with the accent treatment; groups choose a vertical list or horizontal-scroll layout (scroll requires an image on every link, enforced by the build).
- **Typography & Icons**: Self-hosted Instrument Serif (display) plus IBM Plex Sans/Mono via Fontsource; inline Lucide SVG icons; brand assets sourced from `eimlab.org`.
- **Runtime & Package Manager**: Node.js 20+ (verified on 24), npm.
- **Deployment**: Cloudflare Workers at `link.eimlab.org`. `npm run build` emits `dist/client/` (prerendered page and static assets) plus `dist/server/wrangler.json` (Worker entry); deploy with `npx wrangler deploy --config dist/server/wrangler.json`.

### 2.2 Directory Layout & Component Roles
- `src/`: Application source.
  - `src/pages/index.astro`: Single-page link hub (layout, hero, groups, footer).
  - `src/components/`: `Icon.astro` (inline SVG map), `LinkCard.astro` (row or image card), and `LinkScroller.astro` (horizontal, snap-scrolling group with accessible controls).
  - `src/content/site.yaml`: Site settings singleton — edit via `/keystatic` or directly.
  - `src/content/groups/*.yaml`: Link groups; filename is the slug, `order` controls rendering order.
  - `src/data/site.ts`: Build-time YAML loader and validation for the page.
  - `src/data/icons.ts`: Shared icon registry used by Keystatic fields and `Icon.astro`.
  - `src/styles/global.css`: Tailwind import, shadcn/ui tokens, background treatment.
  - `keystatic.config.ts`: CMS schema, Cloud project, admin branding.
  - `src/env.d.ts`: `PUBLIC_KEYSTATIC_CLOUD_PROJECT` typing.
  - `.env.example`: Documented environment template (no secrets committed).
- `public/`: Deployable static root — assets plus crawler and AI metadata (`llms.txt`, `llms-full.txt`, `sitemap.xml`, `robots.txt`, `manifest.webmanifest`).
- `public/assets/`: Lab emblem and favicon (downloaded from `eimlab.org`).
- `public/.well-known/`: RFC 9116 `security.txt` disclosure file.
- `.github/workflows/`: CI/CD pipelines.
- Root documentation: `README.md`, `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `SECURITY.md`, `LICENSE`.

### 2.3 Role-Based Access Control & Security Scoping
- **Authentication**: None (public static application).
- **Authorization / RBAC**: Public only.
- **Protected Routes**: None.

### 2.4 Service & Business Logic Layer
- **API Endpoints**: `/api/keystatic/*` — generated by the Keystatic integration for authenticated content reads/writes; not part of the public page.
- **External Services & Integrations**: Cloudflare Workers (hosting and SSR Worker); Keystatic Cloud (`api.keystatic.cloud`) for CMS authentication and GitHub commits; brand assets from `eimlab.org`.

---

## Section 3: Privacy, Security & Specifications

### 3.1 Privacy & Environment Safety
1. Do not hardcode personal user data, private keys, or credentials in source code, comments, or documentation. Keep contact references public and generic.
2. Secrets management: Never commit active environment secrets. Keep `.env`, `.env.local`, and credential files excluded via `.gitignore`. Provide documented template examples in `.env.example`.

### 3.2 Security Rules
1. **Input Sanitization & Injection Prevention**: Sanitize and escape all dynamic user inputs. Validate incoming request payloads with strict schemas (e.g. Zod).
2. **CORS & Security Headers**: Enforce restrictive CORS policies and recommended security headers (CSP, HSTS, X-Frame-Options).
3. **Session & Token Storage**: Store sensitive authentication tokens in secure, HTTP-only cookies rather than client-accessible local storage.

### 3.3 Database Status & State Codes (If Applicable)
- Not applicable — static content, no database or server-side state.

---

## Section 4: Development, Testing & Operations

### 4.1 Best Coding Practices & Standards
1. **Type Safety**:
   - Use strict typing where the chosen language supports it; avoid `any`-equivalent escapes.
   - Data contracts: Maintain shared interfaces in a central types module rather than redefining data structures locally.
2. **Clean Code & Maintainability**:
   - DRY & Single Responsibility: Keep components and helper functions modular, readable, and focused on a single responsibility.
   - Clear naming: Use descriptive, self-documenting names for variables, functions, and components.
   - Defensive coding & error handling: Handle edge cases, network timeouts, and missing data gracefully. Never swallow exceptions silently without logging or fallback UI.
3. **Performance & Core Web Vitals (PageSpeed / Lighthouse)**:
   - Asset optimization: Optimize and lazy-load non-critical media assets (images, fonts, third-party libraries); specify explicit `width`/`height` on images to prevent Cumulative Layout Shift (CLS).
   - Core Web Vitals: Optimize for fast Largest Contentful Paint (LCP), minimal CLS, and low Interaction to Next Paint (INP).
   - Island architecture / Minimal JS: Minimize client-side JavaScript execution; prefer static rendering where dynamic interactivity is not required. Defer non-critical scripts.
4. **Accessibility (a11y) & SEO**:
   - Semantic HTML: Enforce HTML5 semantic tags (`<main>`, `<header>`, `<footer>`, `<nav>`, `<article>`, `<section>`).
   - Accessible UI: Ensure all interactive elements have accessible labels (`aria-label`), keyboard navigation support, and meaningful `alt` text for images. Maintain minimum 48x48px touch target sizes on mobile.
   - Color contrast: Maintain WCAG AA compliant contrast ratios in both light and dark themes.
   - Heading hierarchy & Meta: Maintain a single `<h1>` per page, structured heading levels (`<h2>` -> `<h3>`), valid OpenGraph/Twitter cards, and canonical links.
5. **Modular CSS & Styling**:
   - Component styles: Keep styles scoped or organized cleanly in dedicated component stylesheets or framework utility classes.
   - Design system tokens: Use consistent CSS variables / theme tokens for colors, spacing, and typography instead of magic numbers or raw hex values.
6. **Formatting & Commit Conventions**:
   - Indentation: 2 spaces for HTML, CSS, JS, TS, JSON, XML, and YAML configurations.
   - Formatting: Enforced using standard framework formatters once the toolchain is configured.
   - Commit conventions: All commits must follow the [Conventional Commits](https://www.conventionalcommits.org/) specification (`feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `test:`, `chore:`).

### 4.2 Testing & Portability
1. **Verification Commands** (run from the repository root):
   - `npm install` — install dependencies.
   - `npm run build` — production build to `dist/` (client assets plus the SSR Worker); must succeed with zero errors.
   - `npm run check` — Astro/TypeScript diagnostics; must report zero errors and warnings.
   - `npm run dev` — local dev server at `http://localhost:4321/`; CMS admin at `/keystatic`.
   - Static metadata sanity: `sitemap.xml` is well-formed XML and `manifest.webmanifest` is valid JSON.
   - Content sanity: `src/content/site.yaml` and `src/content/groups/*.yaml` must parse and pass `src/data/site.ts` validation during the build.
   - CMS sanity: `/keystatic` returns the Keystatic Cloud sign-in screen when unauthenticated. Authenticated editing requires the Keystatic Cloud project and cannot be verified without its credentials.
2. **Test Isolation**: Local development environments must run on isolated local ports without conflicting with existing services. Astro defaults to port `4321`; override with `npm run dev -- --port <port>` when that port is occupied.

### 4.3 Containerization & Ports (If Applicable)
- **Dev Server**: Local port `4321` (Astro default); override with `--port` if occupied.
- **Production / Deployment Target**: Cloudflare Workers at `link.eimlab.org`; build output in `dist/`. Deploy with `npx wrangler deploy --config dist/server/wrangler.json` or the shared CI workflow v2 (`cloudflare_mode: 'ssr'` and `dist_dir: 'dist'` in `.github/workflows/ci-cd.yml`). The Worker serves `dist/client/` statically and runs `/keystatic` and `/api/keystatic/*` from `dist/server/`. The `link.eimlab.org` custom domain must be pointed from the old Pages project to the `link-eim` Worker.
