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
The project toolchain has not been chosen yet. Update this section when the initial scaffold lands.
- **Framework**: Not yet finalized.
- **Language**: Not yet finalized.
- **UI Components & Library**: Not yet finalized.
- **Styling**: Not yet finalized.
- **State Management & Data Fetching**: None planned — the link hub is static content.
- **Database / CMS / ORM**: None — link data is maintained in the repository.
- **Typography & Icons**: Not yet finalized; brand assets are sourced from `eimlab.org`.
- **Runtime & Package Manager**: Not yet finalized.
- **Deployment**: Self-hosted static site served at `link.eimlab.org`.

### 2.2 Directory Layout & Component Roles
- `public/`: Deployable static root — page assets plus crawler and AI metadata (`llms.txt`, `llms-full.txt`, `sitemap.xml`, `robots.txt`, `manifest.webmanifest`).
- `public/.well-known/`: RFC 9116 `security.txt` disclosure file.
- `.github/workflows/`: CI/CD pipelines.
- `src/` (or equivalent): Application source and link data, to be added when the initial scaffold lands.
- Root documentation: `README.md`, `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `SECURITY.md`, `LICENSE`.

### 2.3 Role-Based Access Control & Security Scoping
- **Authentication**: None (public static application).
- **Authorization / RBAC**: Public only.
- **Protected Routes**: None.

### 2.4 Service & Business Logic Layer
- **API Endpoints**: None — the link hub is static content.
- **External Services & Integrations**: Self-hosted web server / static host (to be confirmed); brand assets from `eimlab.org`.

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
1. **Verification Commands**:
   - Not yet configured. Once the toolchain lands, document the lint, test, and build commands here and run them in CI.
   - Until then, validate static output: well-formed XML (`sitemap.xml`), valid JSON (`manifest.webmanifest`), and resolvable links in `public/`.
2. **Test Isolation**: Local development environments must run on isolated local ports without conflicting with existing services.

### 4.3 Containerization & Ports (If Applicable)
- **Dev Server**: Local port not yet decided; document it here once the toolchain lands.
- **Production / Deployment Target**: Self-hosted static host at `link.eimlab.org`.
