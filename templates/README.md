# Starter Templates for New Projects

This directory provides standardized starter files and templates for new repositories created in the EIM Research Laboratory.

---

## Files Included

| File | Purpose | When to Use |
| :--- | :--- | :--- |
| [`README.template.md`](README.template.md) | Standardized Project README | Base README template for every new project / repository. |
| [`AGENTS.template.md`](AGENTS.template.md) | AI Agent Guidelines & Workflow | Standardized rules, architecture, and operational guidelines for AI coding agents. |
| [`CLAUDE.template.md`](CLAUDE.template.md) | Claude Code Guidelines & Overrides | Claude Code operational rules, worktrees, scratch directories, and task path overrides. |
| [`GEMINI.template.md`](GEMINI.template.md) | Gemini & Antigravity Instructions Pointer | Pointer instructing Gemini CLI / Antigravity to adhere to `AGENTS.md`. |
| [`CODE_OF_CONDUCT.template.md`](CODE_OF_CONDUCT.template.md) | Contributor Code of Conduct | Standardized community pledge and enforcement rules for contributors. |
| [`CONTRIBUTING.template.md`](CONTRIBUTING.template.md) | Contributing Guidelines | Standardized contribution workflows, git branching, commit standards, and PR lifecycle. |
| [`SECURITY.template.md`](SECURITY.template.md) | Security Policy | Standardized vulnerability reporting, disclosure SLOs, and CVD practices. |
| [`robots.template.txt`](robots.template.txt) | Search & AI Crawler Rules | Crawler guidance for Google, Bing, GPTBot, ClaudeBot, and sitemap reference. |
| [`sitemap.template.xml`](sitemap.template.xml) | XML Sitemap | Standardized bilingual XML sitemap for SEO discovery and canonical URLs. |
| [`llms.template.txt`](llms.template.txt) | LLM / AI Summary | Standard markdown document providing AI coding assistants structured project context. |
| [`llms-full.template.txt`](llms-full.template.txt) | Comprehensive LLM Context | Extended technical specifications, architecture diagrams, and full context for AI agents. |
| [`security.template.txt`](security.template.txt) | RFC 9116 Security Disclosure | Canonical `.well-known/security.txt` file for vulnerability contact declarations. |
| [`manifest.template.webmanifest`](manifest.template.webmanifest) | Web App Manifest | PWA manifest defining project branding, theme colors, and icons. |
| [`.editorconfig.template`](.editorconfig.template) | EditorConfig Code Style Rules | Standardized cross-editor formatting rules (indentation, line endings, trim trailing whitespace). |
| [`LICENSE.MIT`](LICENSE.MIT) | Open Source MIT License | For open-source tools, public templates, and reusable libraries. |
| [`LICENSE.ALL-RIGHTS-RESERVED`](LICENSE.ALL-RIGHTS-RESERVED) | Proprietary / Internal License | For proprietary lab web apps, internal services, and confidential research portals. |

---

## How to Setup for a New Project Repository

When creating a new repository using **Use this template**:

### 1. Remove Central Hub Files & Initialize Web Framework
> [!NOTE]
> In EIM's centralized edge gateway architecture, the **Coming Soon** landing page is handled centrally by the Cloudflare Edge Worker (`eim-edge-router`) from `maintenance-eim.pages.dev`. New project repositories contain only their actual application code and governance files.

Remove the centralized hub files and initialize your application framework:
```bash
# 1. Remove Central Hub static files & configuration
rm -rf index.html config.js css tailwind.config.js SETUP.md robots.txt sitemap.xml manifest.webmanifest llms.txt llms-full.txt .well-known

# 2. Scaffold your web framework (or copy your application code)
# Example A (Vite): npm create vite@latest . -- --template react-ts
# Example B (Next.js): npx create-next-app@latest .
# Example C (Astro): npm create astro@latest .
```

---

### 2. Apply Project README
Copy [`README.template.md`](README.template.md) to replace the root `README.md`:
```bash
cp templates/README.template.md README.md
```
Open `README.md` and fill in:
- `[Project Name / Service Title]`
- `[REPOSITORY-NAME]`
- `[YOUR_DOMAIN]` (e.g. `smart-campus.eimlab.org`)
- `[YEAR]`
- Select either **Option A (MIT)** or **Option B (All Rights Reserved)** for badges and license info.

---

### 3. Apply Agent Workflow Guidelines (AGENTS, CLAUDE & GEMINI)
Copy [`AGENTS.template.md`](AGENTS.template.md), [`CLAUDE.template.md`](CLAUDE.template.md), and [`GEMINI.template.md`](GEMINI.template.md) to the root directory:
```bash
cp templates/AGENTS.template.md AGENTS.md
cp templates/CLAUDE.template.md CLAUDE.md
cp templates/GEMINI.template.md GEMINI.md
```
Open `AGENTS.md` and configure:
- `[PROJECT_NAME]`
- `[FRAMEWORK_CONFIG]`, `[BUILD_COMMAND]`, `[LINT_COMMAND]`, `[TEST_COMMAND]`
- Framework & Tech Stack in Section 2 (e.g. Next.js, Astro, Vite, Fastify, etc.)
- Directory layout and component roles

Open `CLAUDE.md` and configure:
- `[PROJECT_PATH]` (e.g. your workspace absolute path for `_artifacts/`)

---

### 4. Choose and Apply Project License

#### Option A: MIT License (Open Source Projects)
```bash
cp templates/LICENSE.MIT LICENSE
```
Replace `[YEAR]` with the current year (e.g. `2026`).

#### Option B: All Rights Reserved (Proprietary / Internal Lab Systems)
```bash
cp templates/LICENSE.ALL-RIGHTS-RESERVED LICENSE
```
Replace `[YEAR]` with the current year (e.g. `2026`).

---

### 5. Apply Contributor Code of Conduct
Copy [`CODE_OF_CONDUCT.template.md`](CODE_OF_CONDUCT.template.md) to the root directory:
```bash
cp templates/CODE_OF_CONDUCT.template.md CODE_OF_CONDUCT.md
```
Open `CODE_OF_CONDUCT.md` and configure:
- `[PROJECT_NAME]` (e.g. `Smart Campus IoT`)
- `[INSERT CONTACT EMAIL]` (default: `lab@eimlab.org`)

---

### 6. Apply Contributing Guidelines
Copy [`CONTRIBUTING.template.md`](CONTRIBUTING.template.md) to the root directory:
```bash
cp templates/CONTRIBUTING.template.md CONTRIBUTING.md
```
Open `CONTRIBUTING.md` and configure:
- `[PROJECT_NAME]` (e.g. `Smart Campus IoT`)
- `[REPOSITORY-NAME]` (e.g. `smart-campus-web`)
- `[INSTALL_COMMAND]`, `[DEV_SERVER_COMMAND]`, `[BUILD_COMMAND]`, `[LINT_COMMAND]`, `[TEST_COMMAND]`
- `[CONTACT_EMAIL]` (default: `lab@eimlab.org`)
- Under **Intellectual Property & Licensing**, uncomment **Option A** (for MIT projects) or **Option B** (for All Rights Reserved projects) matching your chosen `LICENSE`.

---

### 7. Apply Security Policy
Copy [`SECURITY.template.md`](SECURITY.template.md) to the root directory:
```bash
cp templates/SECURITY.template.md SECURITY.md
```
Open `SECURITY.md` and configure:
- `[PROJECT_NAME]` (e.g. `Smart Campus IoT`)
- `[REPOSITORY-NAME]` (e.g. `smart-campus-web`)
- `[MAIN_BRANCH]` (default: `main`)
- `[CONTACT_EMAIL]` (default: `lab@eimlab.org`)

---

### 8. Apply Web Discovery, SEO & AI Standards
For web apps and public-facing services, copy the standard discovery and metadata templates into your public/static root (or `public/` folder):

```bash
# Create public and public/.well-known Directory
mkdir -p public/.well-known

# Web search and AI bot directives
cp templates/robots.template.txt public/robots.txt

# Canonical XML sitemap
cp templates/sitemap.template.xml public/sitemap.xml

# AI coding assistants & agent context
cp templates/llms.template.txt public/llms.txt
cp templates/llms-full.template.txt public/llms-full.txt

# RFC 9116 security declaration
cp templates/security.template.txt public/.well-known/security.txt

# Progressive Web App manifest
cp templates/manifest.template.webmanifest public/manifest.webmanifest
```

Configure placeholders (`[YOUR_DOMAIN]`, `[PROJECT_NAME]`, `[PROJECT_DESCRIPTION]`, `[REPOSITORY-NAME]`) in each file to match your project.

---

### 9. Apply EditorConfig Code Style Rules
Copy [`.editorconfig.template`](.editorconfig.template) to standardize indentation, line endings, and whitespace across team editors:

```bash
cp templates/.editorconfig.template .editorconfig
```

---

### 10. Clean Up Starter Templates Directory (Optional)
Once all starter files and guidelines have been copied to their final locations, you can remove the `templates/` folder to keep the repository root clean:
```bash
rm -rf templates
```
