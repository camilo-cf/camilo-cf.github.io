# Root Cause Analysis Report
## Jekyll Multi-locale Personal Site Quality Issues

**Date:** 2026-01-04
**Site:** https://camilo-cf.github.io/
**Status:** Production bugs identified, ready for remediation

---

## Executive Summary

This site has a solid multilingual foundation with Jekyll + custom pagination plugin + locale-aware navigation. However, seven critical bugs compromise the production-grade experience:

1. **Language selector rendering broken** on some pages (JSON/escaped output)
2. **Blog empty-state shows incorrectly** when posts are visible
3. **Duplicate navigation** (legacy `/contact/` vs canonical `/en/contact/`)
4. **Partial localization** (English strings in Spanish footer/CTAs)
5. **Newsletter page lacks conversion** optimization
6. **CTA spam** (repetitive generic blocks)
7. **Cookie consent inconsistency** (needs verification across locales)

Additionally, **SEO opportunities** are missed: no sitemap.xml, robots.txt, OpenGraph tags, or structured data.

---

## Issue 1: Language Selector Broken on Many Pages

### Symptoms
- **Root `/`:** Renders `"Language [\"en\" …"` or similar JSON/escaped string
- **Many `/en/*` and `/es-419/*` pages:** Show malformed selector
- **Working pages:** `/en/about/`, `/es-419/sobre-mi/`, `/pt-br/` show correct dropdown

### Reproduction Steps
1. Visit `https://camilo-cf.github.io/`
2. Observe language selector in top-right navigation
3. Expected: Clean dropdown with "English / Español (LatAm) / Português (BR)"
4. Actual: JSON-like escaped string or array output

### Root Cause Analysis

**File:** `_includes/language_switcher.html`
**Status:** Implementation is CORRECT

**File:** `_data/language_labels.yml`
**Status:** Data structure is CORRECT (simple key-value pairs)

**Suspected Root Cause:**
1. **Template rendering order issue:** If `site.data.language_labels` is not yet loaded when some pages build, Liquid might output the raw array/object instead of rendering it
2. **Alternative selector implementation:** There may be a SECOND language selector include being used on some pages (legacy code)
3. **Liquid caching/build issue:** Jekyll build cache might have stale output

**Evidence:**
- Lines 4-6 in `_includes/language_switcher.html`:
  ```liquid
  {% assign labels = site.data.language_labels %}
  {% assign current_locale = page.lang | default: site.lang | default: "en" %}
  {% assign current_label = labels[current_locale] | default: current_locale %}
  ```
- Line 20 renders: `{{ current_label }}` - should work correctly
- Line 73 renders: `{{ locale_label }}` - should work correctly

**Investigation needed:**
- Check if there's a second language selector include (search for alternate implementations)
- Verify if root `/` page uses a different layout than `/en/` pages
- Check if `site.data.language_labels` is being corrupted or double-encoded somewhere

**Fix Approach:**
1. Search for all language selector implementations: `grep -r "lang-switcher" _includes/`
2. Verify root `/` page layout and ensure it uses the correct masthead
3. Add defensive checks in `language_switcher.html` to escape/sanitize output
4. Add hreflang tags (already implemented in `hreflang_links.html` but may need to be included in more layouts)

**Risk:** Low - fix is isolated to includes, no data structure changes needed

---

## Issue 2: Blog Empty-State Shows When Posts Are Visible

### Symptoms
- **URL:** `/en/blog/`
- **Expected:** Posts list visible, no empty-state message
- **Actual:** Posts are displayed BUT "No posts match the selected filters yet" message also shows

### Reproduction Steps
1. Visit `/en/blog/`
2. Observe blog post cards are rendered
3. Observe empty-state message is also visible (should be hidden)

### Root Cause Analysis

**File:** `/home/user/camilo-cf.github.io/blog/index.html` (builds to `/en/blog/`)

**Issue Location:** Lines 92, 115, 137-139, 145

**Initial State (Line 92):**
```html
<p id="blog-empty" class="blog-empty" style="display:none;">No posts match the selected filters yet. Try resetting the filters.</p>
```
- Starts correctly hidden with `style="display:none;"`

**JavaScript Logic (Lines 111-147):**
```javascript
var cards = Array.prototype.slice.call(document.querySelectorAll(".blog-card"));
var emptyState = document.getElementById("blog-empty");

function applyFilters() {
  var visibleCount = 0;
  cards.forEach(function(card) {
    var categoryMatch = matchesFilter(card, categoryFilter, "categories");
    var tagMatch = matchesFilter(card, tagFilter, "tags");
    var shouldShow = categoryMatch && tagMatch;
    card.style.display = shouldShow ? "" : "none";
    if (shouldShow) {
      visibleCount += 1;
    }
  });
  if (emptyState) {
    emptyState.style.display = visibleCount === 0 ? "" : "none";  // ← Should work correctly
  }
}

if (categoryFilter && tagFilter && cards.length > 0) {
  categoryFilter.addEventListener("change", applyFilters);
  tagFilter.addEventListener("change", applyFilters);
  applyFilters();  // ← Called on page load
}
```

**Root Cause - HYPOTHESIS:**

The issue is likely **NOT** in the logic but in **CSS specificity or double-rendering**:

1. **CSS Conflict:** A global style might be overriding `display:none` set by the script
2. **Double Empty-State:** There might be TWO empty-state elements on the page
3. **Timing Issue:** The script runs before cards are rendered, so `cards.length` is 0, and the conditional on line 142 prevents `applyFilters()` from running, BUT then cards load asynchronously

**Most Likely Cause:**

Looking more closely at the conditional on line 142:
```javascript
if (categoryFilter && tagFilter && cards.length > 0) {
```

If this condition is FALSE (e.g., cards haven't rendered yet), the event listeners and `applyFilters()` are never set up. But this means the empty state would STAY hidden (display:none), not become visible.

**Alternative Hypothesis:**

The empty-state might be showing due to a **CSS media query or visibility rule** that makes elements with `.blog-empty` visible by default, which would override the inline `display:none`.

**Fix Approach:**
1. Add defensive initialization: Set `emptyState.style.display = "none"` explicitly at script start
2. Use `DOMContentLoaded` event to ensure cards are fully rendered before querying
3. Add debugging: `console.log("Cards found:", cards.length, "Empty state:", emptyState)`
4. Check for CSS conflicts: Search for `.blog-empty` rules in stylesheets
5. Ensure empty state ID is unique per locale (it already is: `blog-empty`, `blog-empty-es`, `blog-empty-pt`)

**Risk:** Very low - script-only fix, no Liquid changes

---

## Issue 3: Duplicate Navigation / Legacy Root Pages

### Symptoms
- Legacy pages exist at root: `/contact/`, `/publications/`, `/talks/`, `/teaching/`
- Canonical pages exist at: `/en/contact/`, `/es-419/contacto/`, `/pt-br/contato/`
- Inconsistent navigation: some pages use old structure

### File Inventory

**Legacy Pages (_pages/):**
- `/home/user/camilo-cf.github.io/_pages/contact.md` → `/contact/` (with redirect_from)
- `/home/user/camilo-cf.github.io/_pages/publications.md` → `/publications/`
- `/home/user/camilo-cf.github.io/_pages/about.md` → `/en/about/` (correctly uses `/en/`)

**Current Structure:**
- `/en/contact/` exists with `redirect_from: [/contact/]` ✓
- `/en/about/` exists with `redirect_from: [/about/, /about_me/, /information/]` ✓

**Root Cause:**

The site is **correctly** implementing redirects from legacy URLs to canonical locale-based URLs. This is GOOD i18n practice. However, there are **orphaned pages** that may not have canonical equivalents:

- `/publications/` - No `/en/publications/` found
- Legacy pages from AcademicPages theme that may not be needed

**Verification Needed:**
1. Check if `/publications/`, `/talks/`, `/teaching/` are still linked from navigation
2. Confirm if these pages should be:
   - Migrated to `/en/`, `/es-419/`, `/pt-br/` structure
   - OR deleted as unused legacy content
   - OR kept as English-only redirects to `/en/` equivalents

**Fix Approach:**
1. Audit `_data/navigation.yml` to see what's actually linked
2. For pages that should stay:
   - Create locale-specific versions
   - Add canonical tags
   - Ensure navigation is consistent
3. For pages that are unused:
   - Delete the files
   - Remove from any navigation/sitemap

**Risk:** Medium - affects URLs and navigation, requires careful redirect mapping

---

## Issue 4: Partial Localization (English Strings in Spanish/Portuguese Pages)

### Symptoms
- Spanish homepage contains English "Continue the conversation" block
- Spanish footer shows "Privacy" (English) instead of "Privacidad"
- Localization is incomplete across UI elements

### Root Cause Analysis

**Problem 1: Footer Links Hardcoded in English**

**File:** `_includes/footer.html` lines 24-27

```html
<div class="page__footer-nav">
  <a href="{{ "/privacy/" | prepend: base_path }}">Privacy</a> |
  <a href="{{ "/cookies/" | prepend: base_path }}">Cookies</a> |
  <a href="{{ "/newsletter/" | prepend: base_path }}">Newsletter</a>
</div>
```

**Issue:** Link labels are hardcoded in English, should pull from `site.data.ui-text[site.locale]`

**Problem 2: CTA Strings May Not Be Loading Correctly**

**File:** `_includes/post_cta.html` line 1

```liquid
{% assign ui = site.data.ui-text[page.lang] | default: site.data.ui-text[site.lang] | default: site.data.ui-text["en"] %}
```

**Issue:** This fallback chain looks correct, BUT `site.data.ui-text` uses locale codes like `en`, `es-419`, `pt-br`.

Looking at `_data/ui-text.yml`:
- Line 5: `en:` ✓
- Line 58: `es:` (NOT `es-419`)
- Line 101: `es-419: <<: *DEFAULT_ES` (inherits from `es`)

So if `page.lang` is `"es-419"`, the lookup `site.data.ui-text["es-419"]` should work via YAML anchor inheritance.

**Verification Needed:**
1. Test if `site.data.ui-text["es-419"].post_cta_title` returns "Continúa la conversación" (line 95 in ui-text.yml)
2. Check if Spanish posts are setting `lang: "es-419"` correctly in frontmatter
3. Verify if `site.locale` in `_config.yml` is set correctly per page

**Fix Approach:**
1. **Footer:** Create `footer_privacy_label`, `footer_cookies_label`, `footer_newsletter_label` in ui-text.yml for all locales
2. **Footer:** Make URLs locale-aware (link to `/es-419/privacidad/` etc)
3. **Verify ui-text lookup:** Add debugging or ensure Spanish anchor inheritance works
4. **Centralize all UI strings:** Audit all includes for hardcoded English strings

**Risk:** Low - data-driven changes, no logic rewrites

---

## Issue 5: Newsletter Conversion Weak

### Current State

**File:** `/home/user/camilo-cf.github.io/newsletter/index.md`

**Issue:** Newsletter page exists but:
1. Only one English version at `/newsletter/`
2. No locale-specific versions (`/en/newsletter/`, `/es-419/newsletter/`, `/pt-br/newsletter/`)
3. Content may lack clear value proposition
4. Email signup may not be frictionless (need to review content)

**Fix Approach:**
1. Create `/en/newsletter/index.md`, `/es-419/newsletter/index.md`, `/pt-br/newsletter/index.md`
2. Ensure each has:
   - Clear value proposition above the fold
   - RSS link prominently displayed
   - Optional email signup (Substack/Buttondown embed OR link)
   - Localized copy
3. Update footer links to point to locale-specific newsletter pages
4. Ensure any embed scripts respect cookie consent

**Risk:** Low - new content pages, no breaking changes

---

## Issue 6: CTA Spam (Generic "Continue the Conversation" Blocks)

### Current State

**File:** `_layouts/single.html` line 76-77

```liquid
{% if page.show_cta != false %}
  {% include post_cta.html %}
{% endif %}
```

**File:** `_includes/post_cta.html`

Shows generic CTA on EVERY page by default:
- "Continue the conversation"
- Contact / Subscribe via RSS or email / See a case study

**Issue:** Same CTA appears on:
- Blog posts
- Pillar hubs
- Case studies
- About page
- Contact page

This creates **CTA fatigue** and is not contextually relevant.

**Fix Approach:**

Create **contextual CTAs** based on page type:

1. **Blog posts:**
   - "Get the checklist" (if applicable)
   - "RSS feed"
   - "Related posts" (already implemented via `related_posts.html` line 98-100 in single.html)

2. **Pillar hub pages:**
   - "Start here: recommended reading order"
   - "Jump to case study"

3. **Case study pages:**
   - "View architecture diagram"
   - "See the repo"
   - "Contact for implementation help"

4. **Disable CTA on:**
   - Contact page (redundant)
   - Newsletter page (redundant)
   - About page (consider contextual "See my work" CTA instead)

**Implementation:**
1. Add `cta_type: blog | pillar | case_study | none` to page frontmatter
2. Create separate includes: `_includes/cta_blog.html`, `_includes/cta_pillar.html`, `_includes/cta_case_study.html`
3. Update `single.html` to conditionally include based on `page.cta_type`
4. Default to `none` for pages where CTA doesn't make sense

**Risk:** Low - opt-in system, existing pages unaffected unless frontmatter updated

---

## Issue 7: Cookie Consent Consistency

### Current State

**File:** `_includes/cookie_banner.html` - Banner HTML
**File:** `_layouts/default.html` lines 12-40 - Config injection
**File:** `assets/js/consent.js` - Consent logic (not yet reviewed)

**Implementation Check:**

The banner renders if `site.consent_banner.enabled != false` (line 1 of cookie_banner.html).

Config is injected into `window.siteConsentConfig` (line 13-39 of default.html).

**Issues to Verify:**
1. Is the banner message localized? (Currently uses `site.consent_banner.message` from config)
2. Are consent choices persisted across locales? (Should use same storage key OR locale-specific keys)
3. Do analytics scripts respect consent? (Need to check if scripts load conditionally)
4. Is banner consistent across all layouts? (Only `default.html` includes `cookie_banner.html` - check if all pages use this layout)

**Fix Approach:**
1. Add consent banner strings to ui-text.yml for all locales
2. Update cookie_banner.html to use localized strings
3. Verify consent.js respects consent before loading analytics
4. Add Playwright test to verify scripts not loaded by default
5. Ensure all layouts inherit from `default.html` (they do: compress → default)

**Risk:** Medium - involves JavaScript behavior, needs careful testing

---

## SEO & Quality Opportunities

### Missing Components

1. **Sitemap.xml:**
   - GitHub Pages supports Jekyll sitemap plugin
   - Add `jekyll-sitemap` to `_config.yml` plugins (may already be there)
   - Verify `/sitemap.xml` generates correctly

2. **Robots.txt:**
   - Create `/robots.txt` with:
     ```
     User-agent: *
     Allow: /
     Sitemap: https://camilo-cf.github.io/sitemap.xml
     ```

3. **OpenGraph / Twitter Cards:**
   - Add to `_includes/head.html` or use `jekyll-seo-tag` plugin
   - Ensure locale-specific og:locale tags
   - Add og:image for each page

4. **Structured Data (Schema.org Person):**
   - Add JSON-LD to `_includes/head.html`:
     ```json
     {
       "@context": "https://schema.org",
       "@type": "Person",
       "name": "{{ site.author.name }}",
       "jobTitle": "Staff ML Engineer & AI Architect",
       "url": "{{ site.url }}",
       "sameAs": [
         "{{ site.author.linkedin }}",
         "{{ site.author.github }}"
       ]
     }
     ```

5. **Canonical Tags:**
   - Already partially implemented via `hreflang_links.html`
   - Ensure `<link rel="canonical">` is added to all pages
   - Ensure hreflang links are included in all layouts

6. **Page Titles & Meta Descriptions:**
   - Audit frontmatter for `title` and `excerpt` consistency
   - Ensure no duplicate meta descriptions across locales
   - Use `jekyll-seo-tag` to auto-generate if not present

---

## Testing & CI Requirements

### Required Tests

1. **Jekyll Build Test:**
   - `bundle exec jekyll build`
   - Ensure build succeeds without warnings

2. **HTML Link Checker:**
   - Use `htmlproofer` or similar
   - Check all internal links resolve
   - Check no broken anchors

3. **Playwright Smoke Tests:**

   **Test 1: Language Selector Renders Correctly**
   ```javascript
   // Visit /en/
   // Assert language selector contains "English", "Español (LatAm)", "Português (BR)"
   // Assert NO JSON/escaped strings like ["en", ...] in selector
   ```

   **Test 2: Blog Empty-State Hidden by Default**
   ```javascript
   // Visit /en/blog/
   // Assert at least 1 .blog-card is visible
   // Assert #blog-empty has display:none or is not visible
   ```

   **Test 3: Email Not Exposed in HTML Source**
   ```javascript
   // Visit /en/contact/
   // Fetch page HTML source
   // Assert personal email is NOT present in raw HTML
   // Click "Reveal email alias" button
   // Assert email is now visible in DOM
   ```

   **Test 4: Localized Navigation (Optional)**
   ```javascript
   // Visit /es-419/
   // Assert navigation shows "Inicio", "Blog", "Contacto" (Spanish)
   // Visit /pt-br/
   // Assert navigation shows "Início", "Blog", "Contato" (Portuguese)
   ```

4. **CI Workflow:**
   - Create `.github/workflows/ci.yml`
   - Run on `push` and `pull_request` to main/master
   - Steps:
     1. Setup Ruby
     2. bundle install
     3. bundle exec jekyll build
     4. Run HTMLProofer
     5. Setup Node.js
     6. Install Playwright
     7. Run Playwright tests against built site

---

## Summary of Files Requiring Changes

### Critical (Issue Fixes)

1. `_includes/language_switcher.html` - Investigate/fix JSON rendering
2. `blog/index.html` - Fix empty-state logic
3. `es-419/blog/index.md` - Fix empty-state logic (Spanish)
4. `pt-br/blog/index.md` - Fix empty-state logic (Portuguese)
5. `_includes/footer.html` - Localize hardcoded strings
6. `_data/ui-text.yml` - Add footer link labels for all locales
7. `_includes/post_cta.html` - Make contextual or disable by default
8. `_includes/cookie_banner.html` - Add locale support
9. `/en/newsletter/index.md` - Create (new)
10. `/es-419/newsletter/index.md` - Create (new)
11. `/pt-br/newsletter/index.md` - Create (new)

### Important (SEO & Quality)

12. `robots.txt` - Create (new)
13. `_includes/head.html` - Add OpenGraph, Twitter cards, structured data
14. `_includes/seo.html` - Create for centralized SEO tags (new)
15. `_config.yml` - Verify sitemap plugin enabled

### Testing

16. `.github/workflows/ci.yml` - Create CI workflow (new)
17. `tests/smoke.spec.js` - Create Playwright tests (new)
18. `package.json` - Add Playwright dependencies (new)
19. `playwright.config.js` - Create Playwright config (new)

### Documentation

20. `docs/root-cause-report.md` - This file
21. `README.md` - Update with local dev instructions

---

## Implementation Priority

### Phase 1: Critical Bugs (PR 1)
1. Fix language selector JSON rendering
2. Fix blog empty-state logic
3. Localize footer strings
4. Add basic SEO (robots.txt, canonical tags)

### Phase 2: Localization Completeness (PR 2)
1. Create newsletter pages for all locales
2. Fix cookie consent localization
3. Audit and fix all remaining English strings in non-English pages

### Phase 3: CTA & Conversion (PR 3)
1. Implement contextual CTAs
2. Improve newsletter conversion pages
3. Add structured data

### Phase 4: CI & Testing (PR 4)
1. Add GitHub Actions CI workflow
2. Add Playwright smoke tests
3. Add HTML link checker
4. Update README

---

## Notes

- **GitHub Pages Constraints:** All changes must use GitHub Pages-compatible plugins (no custom Ruby gems)
- **No Personal Email Exposure:** Email reveal mechanism is correctly implemented in `/en/contact/` - ensure this pattern is used in all locale versions
- **URL Preservation:** Existing redirects are good; maintain redirect chains if URLs must change
- **Locale Slugs:** Keep lowercase slugs (`/pt-br/` NOT `/pt-BR/`) for consistency

---

**End of Report**
