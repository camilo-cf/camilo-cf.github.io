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

## Deployment

Site deploys automatically via GitHub Pages on push to `main` or `master`.

Build process:
1. GitHub Actions runs Jekyll build
2. Runs Playwright smoke tests
3. Checks internal links
4. Deploys to GitHub Pages

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

## Contact Email Security

Contact pages use **obfuscated email reveal**:
- Email split into user + reversed domain in HTML
- Only revealed after user clicks button
- Uses alias email (not personal inbox)
- Accessible via keyboard (Enter/Space)

Implemented in `assets/js/contact.js`

## Testing

The CI pipeline runs automated tests on every push:

- **Smoke tests** (`tests/smoke.spec.js`): Verify homepage, language selector, blog filters, contact reveal, and navigation consistency
- **Link checking**: Detect broken internal links

Run tests locally before pushing:
```bash
npx playwright test
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
