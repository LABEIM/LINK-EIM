# Contributing to Maintain-EIM

Thank you for your interest in contributing to **Maintain-EIM** (Central Coming Soon & Maintenance Hub, `Maintain-EIM`), an initiative by the **Enterprise Infrastructure Management (EIM) Research Laboratory**, Telkom University.

We welcome contributions from researchers, lab members, students, and external collaborators. Whether you are adding new site profiles, improving performance, refining accessibility, fixing a bug, or expanding multilingual support, this guide outlines the workflow and standards to make your contribution smooth and effective.

---

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Intellectual Property & Contributor Agreement](#intellectual-property--contributor-agreement)
- [How Can I Contribute?](#how-can-i-contribute)
  - [Reporting Bugs](#reporting-bugs)
  - [Suggesting Features & Enhancements](#suggesting-features--enhancements)
  - [Adding or Updating Site Profiles](#adding-or-updating-site-profiles)
  - [Expanding Internationalization (i18n)](#expanding-internationalization-i18n)
  - [Improving Templates](#improving-templates)
- [Getting Started & Local Development](#getting-started--local-development)
  - [Prerequisites](#prerequisites)
  - [Local Testing Workflow](#local-testing-workflow)
- [Git Workflow & Commit Standards](#git-workflow--commit-standards)
  - [Branch Naming Conventions](#branch-naming-conventions)
  - [Conventional Commits](#conventional-commits)
  - [Signed Commits](#signed-commits)
- [Pull Request (PR) Process](#pull-request-pr-process)
  - [Pre-Submission Checklist](#pre-submission-checklist)
  - [CI/CD & Automated PR Previews](#cicd--automated-pr-previews)
  - [Review & Merge Process](#review--merge-process)
- [Coding Standards & Guidelines](#coding-standards--guidelines)
- [Security Vulnerability Disclosures](#security-vulnerability-disclosures)
- [Getting Help](#getting-help)

---

## Code of Conduct

All contributors, maintainers, and participants are expected to adhere to our [Code of Conduct](CODE_OF_CONDUCT.md). Please read it to ensure a respectful, collaborative, and inclusive environment.

---

## Intellectual Property & Contributor Agreement

This repository, its design, code, and documentation are proprietary and licensed under [All Rights Reserved](LICENSE) by **Enterprise Infrastructure Management (EIM) Research Laboratory**, Telkom University.

We welcome contributions from external collaborators, researchers, and students. By submitting a contribution, you agree to the following contributor terms:

1. **Grant of Rights & Assignment:** By submitting a Pull Request, issue, patch, or code snippet, you agree that your contribution is provided to the Enterprise Infrastructure Management (EIM) Research Laboratory, and you grant the laboratory all necessary rights, title, and interest to use, modify, integrate, and distribute the contributed work under the repository's proprietary terms.
2. **Original Work & Warranty:** You represent that all contributed materials are your original creation, or that you have full legal right and authorization from the copyright holder to contribute them.
3. **No Royalties or Licensing Encumbrances:** Contributions are made on a voluntary basis without expectation of monetary compensation, royalties, or separate proprietary encumbrances. Appropriate attribution will be maintained in commit history and release notes.

---

## How Can I Contribute?

### Reporting Bugs

If you find a visual glitch, routing discrepancy, broken link, or JavaScript exception:
1. Search existing [GitHub Issues](https://github.com/LABEIM/Maintain-EIM/issues) to verify if the issue has already been reported.
2. If not, open a new issue using a descriptive title.
3. Include:
   - Steps to reproduce the issue
   - Expected vs. actual behavior
   - Browser name, version, and operating system
   - URL parameters used (e.g. `?site=smart-campus&mode=maintenance&lang=id`)
   - Console error screenshots or logs if applicable

### Suggesting Features & Enhancements

Feature requests are warmly welcomed:
1. Open a new issue outlining the proposal.
2. Detail the motivation, target use case, and proposed interface or configuration schema.
3. Discuss with maintainers before undertaking major architectural changes.

### Adding or Updating Site Profiles

To register a new research initiative, lab service, or project subdomain:
1. Edit `config.js` and add a new entry under `SITE_PROFILES`.
2. Ensure all required metadata keys are populated (`name`, `badge`, `title`, `description`, `eta`, `launchDate`, `socials`, `status`, `customAction`).
3. Provide bilingual localized strings (`en` and `id`) for headline titles, badges, and descriptions.
4. Verify rendering locally by navigating to `http://localhost:8000/?site=<your-slug>`.

### Expanding Internationalization (i18n)

When introducing new UI strings or improving translation accuracy:
1. Update `I18N_DICTIONARY` in `config.js` ensuring key parity across both `en` and `id`.
2. Use descriptive semantic keys (e.g. `days`, `hours`, `statusActive`, `learnMoreBtn`).
3. Add appropriate `data-i18n="<key>"` or `data-i18n-attr="placeholder:<key>"` attributes in `index.html`.

### Improving Templates

Templates in `templates/` serve as the foundation for new EIM Lab repositories:
- Keep templates clean, modular, and easy to configure.
- Ensure all placeholders are consistently formatted in brackets (e.g. `[PROJECT_NAME]`, `[CONTACT_EMAIL]`).
- Update `templates/README.md` whenever adding or modifying starter templates.

---

## Getting Started & Local Development

### Prerequisites

This repository uses a **zero-build static web architecture**. You do not need Node.js, Webpack, or npm build steps to develop locally. All you need is:
- Git
- A modern web browser (Chrome, Firefox, Safari, Edge)
- Python 3 (or any static HTTP server of your choice)

### Local Testing Workflow

1. **Fork and clone the repository:**
   ```bash
   git clone https://github.com/LABEIM/Maintain-EIM.git
   cd Maintain-EIM
   ```

2. **Start the local HTTP server:**
   ```bash
   python3 -m http.server 8000
   ```

3. **Open the test matrix in your browser:**
   - **Default profile:** `http://localhost:8000/`
   - **Custom profile:** `http://localhost:8000/?site=smart-campus`
   - **Alternative profile:** `http://localhost:8000/?site=sensor-net`
   - **Maintenance mode:** `http://localhost:8000/?mode=maintenance`
   - **Indonesian translation:** `http://localhost:8000/?site=smart-campus&lang=id`
   - **Combined parameters:** `http://localhost:8000/?site=smart-campus&mode=maintenance&lang=id`

4. **Verify dark/light theme switching:** Test the theme toggle in the top-right navigation and verify contrast across both modes.

---

## Git Workflow & Commit Standards

### Branch Naming Conventions

Create a dedicated feature or fix branch from `main`:

```text
feat/add-smart-campus-profile
fix/countdown-timer-timezone-offset
docs/update-setup-gateway-sop
refactor/i18n-dictionary-loader
chore/template-license-sync
```

Prefix convention:
- `feat/`: New feature, page profile, or interactive capability
- `fix/`: Bug fix or visual correction
- `docs/`: Documentation updates (`README.md`, `SETUP.md`, `templates/`)
- `refactor/`: Code cleanup with no functional change
- `style/`: Cosmetic or formatting changes
- `chore/`: Maintenance, workflow, or dependency adjustments

### Conventional Commits

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification for clear, structured git history:

```text
<type>(<optional scope>): <short description in imperative mood>

[optional body]

[optional footer(s)]
```

**Examples:**
```text
feat(profiles): add smart-campus IoT showcase profile
fix(i18n): resolve missing Indonesian translation key for countdown
docs(setup): document edge gateway retry-after header behavior
chore(templates): synchronize MIT and proprietary license templates
```

### Signed Commits

To ensure provenance and repository security, signed commits (GPG or SSH) are strongly encouraged for all contributions:

```bash
git commit -S -m "feat(config): add new sensor-grid profile"
```

---

## Pull Request (PR) Process

### Pre-Submission Checklist

Before submitting your Pull Request, verify that:
- [ ] The change is tested locally with zero console errors or unhandled DOM exceptions.
- [ ] Multilingual key parity is maintained between `EN` and `ID` in `config.js`.
- [ ] Responsive UI works cleanly across mobile, tablet, and desktop viewports.
- [ ] Both Dark and Light themes render with proper color contrast.
- [ ] Corresponding documentation (`README.md`, `SETUP.md`, or `templates/README.md`) is updated if new configuration keys or templates were added.
- [ ] Git commit messages follow Conventional Commits and are signed.

### CI/CD & Automated PR Previews

1. When you open a Pull Request, the repository's GitHub Actions workflow runs automated validation.
2. For team members, an isolated **Cloudflare Pages Preview deployment** is automatically triggered.
3. The preview URL is posted directly as a comment on your PR, allowing real-time visual inspection across devices.

### Review & Merge Process

1. Lab maintainers will review your PR, test the preview deployment, and may provide constructive feedback.
2. Address any requested changes by pushing additional commits to your feature branch.
3. Once approved and CI checks pass, maintainers will squash and merge your contribution into `main`.

---

## Coding Standards & Guidelines

- **Code Formatting & EditorConfig:** Maintain consistent styling by adhering to [`.editorconfig`](.editorconfig) (UTF-8 encoding, LF line endings, 2-space indentation, trimmed whitespace).
- **Zero-Build Compatibility:** Keep `index.html` and `config.js` pure and static without requiring bundling tools or transpilers.
- **Tailwind CSS Utility Design:** Use Tailwind CSS utility classes and semantic variables for dark/light theming. Avoid hardcoded hex colors when Tailwind palette tokens are available.
- **Accessibility (a11y):** Ensure interactive elements have accessible labels (`aria-label`), readable color contrast, and keyboard navigation support.
- **SEO Optimization:** Dynamic meta tags (`title`, `meta description`, `og:image`, `twitter:card`) must be dynamically populated by `config.js` during profile resolution.
- **Performance:** Keep asset sizes small and avoid introducing heavy external libraries unless strictly required.

---

## Security Vulnerability Disclosures

If you discover a security vulnerability, sensitive bug, or routing loophole:
- **Do not report security issues via public GitHub issues, discussions, or PRs.**
- Report the vulnerability privately according to our [Security Policy](SECURITY.md).
- Contact our security team at [lab@eimlab.org](mailto:lab@eimlab.org).

---

## Getting Help

Have questions or need guidance on contributing?
- Open a topic on [GitHub Discussions / Issues](https://github.com/LABEIM/Maintain-EIM/issues)
- Email the laboratory team: [lab@eimlab.org](mailto:lab@eimlab.org)
- Visit our organization portal: [https://eimlab.org](https://eimlab.org)
