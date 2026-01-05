# Camilo Cáceres Flórez - Personal Website

Multilingual Jekyll site (English, Spanish LatAm, Portuguese BR) with consent-aware analytics and ads.

## Local Development

### Prerequisites

- Ruby 3.2+ (check with `ruby --version`)
- Bundler (`gem install bundler`)
- Node.js 18+ (for testing)

### Setup

1. Install Ruby dependencies:
```bash
bundle install
```

2. Install Node dependencies (for testing):
```bash
npm install
```

3. Run local server:
```bash
bundle exec jekyll serve
```

Site will be available at `http://localhost:4000`

For live reload during development:
```bash
bundle exec jekyll serve --livereload
```

### Running Tests

**Playwright smoke tests:**
```bash
npx playwright test
```

**With UI mode:**
```bash
npx playwright test --ui
```

**Run specific test file:**
```bash
npx playwright test tests/smoke.spec.js
```

## Multilingual Structure

The site supports three locales:
- `en`: English (canonical)
- `es-419`: Spanish (Latin America)
- `pt-br`: Portuguese (Brazil)

### Adding Localized Content

1. **Pages:** Create in `_pages/` or locale folders (`en/`, `es-419/`, `pt-br/`)
2. **Posts:** Add to `_posts/` with `lang: "en"` front matter
3. **UI Text:** Update `_data/ui-text.yml`
4. **Navigation:** Update `_data/navigation.yml` with locale-specific labels

### Locale Linking

Use `ref` and `i18n_key` in front matter to link equivalent pages across locales:

```yaml
---
lang: "en"
ref: "contact"
i18n_key: "contact"
---
```

The language selector uses these keys to build translation links.

## Configuration

Main config: `_config.yml`
Locale-specific overrides: `_config.es-419.yml`, `_config.pt-BR.yml`

### Key Settings

- `supported_locales`: Array of enabled locales
- `consent_banner`: Cookie consent configuration
- `analytics`: Plausible or Google Analytics setup
- `adsense`: AdSense configuration (disabled by default)
- `newsletter`: Newsletter provider settings
- `contact`: Contact email alias and form settings

## Privacy & Consent

This site follows a **consent-first approach**:
- Analytics and ads are **disabled by default**
- Scripts only load **after explicit user consent**
- Cookie banner managed by `assets/js/consent.js`
- No tracking without consent

### Cookie Consent Implementation

**How it works**:
1. User sees banner on first visit with "Accept" / "Decline" options
2. Choice stored in `localStorage` as `cookie-consent` (value: `granted` or `denied`)
3. If granted, `assets/js/consent.js` dynamically loads:
   - Plausible Analytics (`plausible.io/js/script.js`)
   - Google Analytics (if configured in `_config.yml`)
   - Google AdSense (if enabled in `_config.yml`)
4. If denied, no third-party scripts load

**Gating logic** (`_includes/cookie_banner.html`):
- Banner only shows if no prior consent decision exists
- User can revoke consent via "Manage preferences" link (footer)
- Banner does NOT show debug text in production (removed in Phase 4)

**Testing consent gating**:
```bash
# Clear consent state in browser DevTools
localStorage.removeItem('cookie-consent')
# Reload page - banner should appear
```

## Deployment

Site deploys automatically via GitHub Pages on push to `main` or `master`.

**CI/CD Pipeline** (`.github/workflows/ci.yml`):
1. **Build Check**: Jekyll build with strict front matter validation
2. **Smoke Tests**: Playwright tests verify critical features:
   - Persona routing buttons on all locale homepages
   - Speaking/Impact pages exist with required content
   - Email obfuscation on contact page (spam protection)
   - SEO fundamentals (robots.txt, sitemap.xml)
   - Meta descriptions on critical pages
   - Cookie banner UX (no debug text)
3. **File Verification**: Ensures required files are generated
4. **Deploy**: GitHub Pages auto-deploy on success

**Quality gates block deployment if**:
- Persona routing broken
- Speaking page missing talk proposals
- Contact email exposed in raw HTML
- robots.txt or sitemap.xml missing
- Meta descriptions missing on homepage/CV/about

## Project Structure

```
.
├── _config.yml               # Main configuration
├── _data/
│   ├── navigation.yml        # Site navigation (multilingual)
│   ├── language_labels.yml   # Language selector labels
│   ├── ui-text.yml          # Localized UI strings
│   └── newsletter.yml        # Newsletter copy per locale
├── _includes/
│   ├── language_switcher.html
│   ├── post_cta.html        # Localized CTAs
│   └── ...
├── _layouts/
├── _pages/                   # Main content pages
├── _posts/                   # Blog posts
├── en/, es-419/, pt-br/     # Locale-specific pages
├── assets/
│   ├── js/
│   │   ├── consent.js       # Cookie consent logic
│   │   └── contact.js       # Email reveal logic
│   └── ...
├── tests/
│   └── smoke.spec.js        # Playwright tests
└── .github/workflows/
    └── ci.yml               # CI pipeline
```

## Maintaining i18n

### Adding a New Locale

1. Add locale code to `supported_locales` in `_config.yml`
2. Create config override: `_config.NEW-LOCALE.yml`
3. Add labels in `_data/language_labels.yml`
4. Add UI strings in `_data/ui-text.yml`
5. Add navigation in `_data/navigation.yml`
6. Create locale folder: `NEW-LOCALE/`
7. Translate key pages (blog index, about, contact, newsletter)

### Translating a Page

1. Duplicate English version
2. Update front matter:
   ```yaml
   lang: "es-419"
   ref: "shared-key"
   permalink: /es-419/page-slug/
   ```
3. Translate content
4. Ensure CTA and UI elements use `ui-text` lookups

### Adding a New Talk Proposal (Speaking Page)

To add a new talk to the Speaking/Media Kit pages in all locales:

1. **English** (`en/speaking/index.md`):
   - Add new `### Talk Title` section
   - Include abstract (2-3 paragraphs)
   - Target audience description
   - Key takeaways (3-5 bullets)

2. **Spanish** (`es-419/charlas/index.md`):
   - Translate talk title, abstract, and bullets
   - Maintain same structure as English version

3. **Portuguese** (`pt-br/palestras/index.md`):
   - Translate all content
   - Ensure consistency across all three locales

**Best practices**:
- Keep abstracts concise (150-200 words)
- Include quantified outcomes when possible
- Match talk level to target audience (Beginner/Intermediate/Advanced)
- Update bio sections if credentials change

### Adding a New Blog Post in Multiple Locales

1. Create post in `_posts/` with lang front matter:
   ```yaml
   ---
   title: "Your Post Title"
   date: 2026-01-05
   lang: "en"
   ref: "unique-post-key"
   i18n_key: "unique-post-key"
   categories: [pillar-name]
   tags: [tag1, tag2]
   ---
   ```

2. Create translated versions with same `ref` and `i18n_key`

3. Ensure each version links to correct locale pillar pages

## Contact Email Security

Contact pages use **obfuscated email reveal**:
- Email split into user + reversed domain in HTML
- Only revealed after user clicks button
- Uses alias email (not personal inbox)
- Accessible via keyboard (Enter/Space)

Implemented in `assets/js/contact.js`

## Testing

The CI pipeline runs automated tests on every push to ensure quality gates.

### Smoke Tests (`tests/smoke.spec.js`)

Comprehensive Playwright tests covering critical features:

**1. Persona Routing (Conversion Optimization)**
- Verifies "Hiring?", "Engineering?", "Speaking?" buttons exist on EN/ES/PT homepages
- Ensures visitors can navigate by intent

**2. Speaking/Authority Pages**
- `/en/speaking/` has ≥3 talk proposals with abstracts
- `/en/impact/` has quantified outcomes (percentages, metrics)
- "Book me" CTA is visible

**3. Spam-Safe Contact (Email Obfuscation)**
- Contact page does NOT expose email in raw HTML
- Email reveal mechanism exists (click-to-reveal)
- Protects against scraper bots

**4. SEO Fundamentals**
- `/robots.txt` returns 200 and contains User-agent
- `/sitemap.xml` returns 200 and valid XML
- Critical pages (home, CV, about) have meta descriptions >50 chars

**5. Cookie Consent (Privacy)**
- Cookie banner appears on first visit
- Does NOT show debug text "Current choice: denied"

### Running Tests Locally

**Run all tests:**
```bash
npm test
```

**Run with UI mode (interactive debugging):**
```bash
npm run test:headed
```

**Debug specific test:**
```bash
npm run test:debug
```

**Run against local Jekyll server:**
```bash
# Terminal 1: Start Jekyll
bundle exec jekyll serve

# Terminal 2: Run tests
BASE_URL=http://localhost:4000 npm test
```

---

## Original academicpages.github.io Template

This site is built on the Academic Pages template, forked from [Minimal Mistakes Jekyll Theme](https://mmistakes.github.io/minimal-mistakes/).

### Original Setup Instructions

A Github Pages template for academic websites. This was forked (then detached) by [Stuart Geiger](https://github.com/staeiou) from the [Minimal Mistakes Jekyll Theme](https://mmistakes.github.io/minimal-mistakes/), which is © 2016 Michael Rose and released under the MIT License. See LICENSE.md.

I think I've got things running smoothly and fixed some major bugs, but feel free to file issues or make pull requests if you want to improve the generic template / theme.

See more info at https://academicpages.github.io/

### Verification checklist

- `sitemap.xml` and `feed.xml` are generated (after `bundle exec jekyll build`, check `_site/sitemap.xml` and `_site/feed.xml`).
- SEO meta tags (Open Graph + JSON-LD) render via `{% seo %}`.
- `/en/blog/`, `/es-419/blog/`, and `/pt-br/blog/` paginate per locale and support category/tag filters; pillar pages list matching posts.
- Reading time, related posts, and CTAs appear on post pages.
- Cookie/consent banner appears, stores consent, and only loads GA/Ads after acceptance (ads are off by default).
- Pagination, category/tag pages, and consent banner behave as expected when running `bundle exec jekyll serve`.

## SEO & Conversion Features

This site is optimized for search engines and conversion. Here's what's implemented:

### Search Engine Optimization

**Structured Data (JSON-LD)**:
- Person schema with jobTitle, worksFor, alumniOf, knowsAbout
- Automatically included on all pages via `_includes/seo_schema.html`
- Helps Google understand expertise and authority

**Meta Tags** (via `jekyll-seo-tag`):
- OpenGraph tags for social sharing
- Twitter cards for tweet previews
- Meta descriptions on all critical pages (homepage, CV, about)
- Canonical tags to prevent duplicate content

**Multi-locale SEO**:
- hreflang tags for EN / ES-419 / PT-BR
- x-default hreflang pointing to root
- Locale-aware sitemaps via `jekyll-sitemap`

**robots.txt**:
- Allows all search engines
- Points to sitemap.xml
- Located at `/robots.txt`

**Branded Redirects**:
- Legacy URLs (/cv/, /contact/, /newsletter/, /about_me/) use custom redirect layout
- Include `noindex,follow` meta tag to prevent SEO pollution
- Professional UX with branding instead of bare "Redirecting..." pages

### Conversion Optimization

**Persona Routing**:
- Homepage has intent-based navigation: "Hiring?", "Engineering?", "Speaking?"
- Guides visitors to relevant content based on their goals
- Implemented on all locale homepages

**Lead Magnet**:
- Production ML Safety Nets Checklist at `/en/resources/ml-safety-nets-checklist/`
- 40+ actionable items across 7 categories
- Print-friendly PDF (no email gate)
- Builds trust and demonstrates expertise

**Site Search**:
- Full-text search via simple-jekyll-search
- Indexes blog posts, pages, and case studies by locale
- Available at `/en/search/`, `/es-419/buscar/`, `/pt-br/busca/`

**Contextual CTAs**:
- Publications → Production ML pillars
- Talks → Speaking page
- Blog posts → Newsletter signup
- Reduces generic "contact me" fatigue

**Authority Pages**:
- Speaking page with 6 conference-ready talk proposals
- Impact page with quantified outcomes
- Newsletter pages (RSS-first, email optional)

### Social Sharing

Share buttons cleaned up to include only:
- Twitter (high engagement for tech content)
- LinkedIn (professional audience)

Removed obsolete platforms:
- Google+ (service shut down in 2019)
- Facebook (low engagement, privacy concerns)

### Privacy & Compliance

**Cookie Consent**:
- Analytics and ads disabled by default
- Scripts load only after explicit consent
- No debug text in production
- See "Cookie Consent Implementation" section above for details

**Email Protection**:
- Contact page uses click-to-reveal for email
- Alias email (not personal inbox)
- Protected from scraper bots

## Maintenance Guide

### Adding New Content

**Blog Posts** (with SEO):
```yaml
---
title: "Your Post Title"
description: "150-character summary for meta description and search results"
date: 2026-01-05
categories: [pillar-name]
tags: [tag1, tag2]
lang: "en"
ref: "unique-post-key"
i18n_key: "unique-post-key"
---
```

**New Pages** (with locale support):
1. Create in `en/`, `es-419/`, `pt-br/` directories
2. Include front matter:
```yaml
---
layout: single
title: "Page Title"
permalink: /en/page-slug/
lang: "en"
ref: "page-ref"
i18n_key: "page-ref"
description: "Meta description for SEO"
---
```

**Talk Proposals** (Speaking page):
See "Adding a New Talk Proposal" section above

### SEO Checklist for New Pages

- [ ] Meta description (150-160 characters)
- [ ] Title tag (50-60 characters)
- [ ] Hreflang tags (automatic if `ref` is set)
- [ ] Canonical tag (automatic)
- [ ] JSON-LD schema (automatic on all pages)
- [ ] OpenGraph image configured (set in `_config.yml`)

### Testing SEO Changes

```bash
# Build site
bundle exec jekyll build

# Check generated HTML
cat _site/en/your-page/index.html | grep -E "meta|hreflang|canonical"

# Run smoke tests
npm test
```

### Verifying Search Index

After adding new posts:
```bash
# Build site
bundle exec jekyll build

# Check search.json
cat _site/search.json | jq '.'
```

---

## Performance & Quality

**Automated Quality Gates** (`.github/workflows/ci.yml`):
- Jekyll build with strict front matter validation
- 20+ Playwright smoke tests
- Required file verification (robots.txt, sitemap.xml, speaking pages)
- Tests run on every push to prevent regressions

**What the tests verify**:
- Persona routing buttons on all locales
- Speaking/Impact pages have required content
- Email obfuscation on contact page
- SEO fundamentals (robots.txt, sitemap.xml, meta descriptions)
- Redirect pages have noindex tags
- hreflang and OpenGraph tags present
- JSON-LD Person schema exists
- Search functionality works
- Lead magnet checklist loads

