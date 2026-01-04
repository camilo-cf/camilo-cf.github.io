# Root Cause Analysis Report: Production-Grade SEO & Authority Building
## Jekyll + GitHub Pages Personal Site Optimization

**Date:** 2026-01-04
**Site:** https://camilo-cf.github.io/
**Engineer:** Staff+ Jekyll/SEO Specialist
**Status:** INCIDENT-STYLE ROOT CAUSE ANALYSIS - Required before implementation

---

## Executive Summary

The site has solid i18n infrastructure (EN/ES-419/PT-BR), basic SEO plugins (jekyll-seo-tag, jekyll-sitemap), and spam-safe contact patterns. However, **seven critical issues prevent it from being production-grade for positioning Camilo as a reference in ML/AI/DS/MLOps/GenAI**:

### CRITICAL ISSUES (P0)
1. **SEO Snippet Mismatch** — Google shows outdated "Mechatronic Engineer… PhD student" instead of "Staff ML Engineer & AI Architect"
2. **Redirect Stubs Unpolished** — Legacy `/cv/`, `/about_me/` show bare redirect pages (bad UX, questionable SEO)
3. **Missing Authority Features** — No Speaking/Media Kit, no Impact page, no lead magnets
4. **Outdated Talks Archive** — Only 2012-2017 talks visible; no "book me" CTA or current speaking credentials
5. **Template Incoherence** — Publication pages show generic academic template; doesn't match modern AI brand
6. **No Persona Routing** — Welcome page lacks hiring/engineering/speaking persona CTAs
7. **Meta Description Staleness** — Some pages lack locale-specific descriptions; OG images missing

---

## ISSUE 1: SEO Snippet Mismatch (Critical)

### What Google Shows vs What Site Says

**Current State (as of 2026-01-04):**
- **Google SERP for homepage and /cv/:** "Mechatronic Engineer focused on mechatronics, AI, and assistive robotics. PhD student of Mechatronics from UNICAMP"
- **Actual site description (_config.yml line 15):** "Staff ML Engineer & AI Architect (Data Science Expert) leading GenAI, MLOps, and applied data science at scale | Ph.D. in Mechanical Engineering (Mechatronics) from UNICAMP | EMBA (Strategic Leadership)"

**Why the Mismatch Exists:**

1. **Google Cache Staleness:** The site description was recently updated (likely within the last 30-90 days based on commit history), but Google hasn't re-crawled and re-indexed the pages yet.

2. **Meta Description Priority:** Google's snippet selection hierarchy:
   - Meta description tag (if present and relevant)
   - OpenGraph description
   - First paragraph of content
   - Schema.org description

3. **Current Meta Implementation:**
   - **File:** `_includes/head.html` line 5 uses `{% seo %}` tag from `jekyll-seo-tag` plugin
   - **File:** `_includes/seo.html` exists but appears to be legacy (custom implementation)
   - **File:** `_includes/seo_schema.html` has JSON-LD Person schema with correct description
   - **Plugin Behavior:** `jekyll-seo-tag` generates meta description from:
     - `page.description` (frontmatter)
     - OR `page.excerpt` (frontmatter)
     - OR `site.description` (_config.yml line 15)

4. **Per-Page Frontmatter Audit:**
   - `/en/index.md` line 9: `excerpt: "Production ML, causal measurement for ads, MLOps, and GenAI in one place."` ✓ Good
   - `/en/cv/` (_pages/cv.md): No explicit `description` or custom excerpt; relies on site.description fallback
   - `/about_me/` (_pages/about_me.md): No frontmatter description; uses old narrative in content

**Root Causes:**
- **RC1:** Old content indexed before recent site description update
- **RC2:** `/about_me/` page content starts with old narrative ("Mechatronic Engineer… PhD student") which Google may prefer over site.description
- **RC3:** No explicit per-page meta descriptions in frontmatter for critical pages (CV, About)
- **RC4:** No active sitemap resubmission or search console ping after description update

### Evidence Files
- `_config.yml` line 15 (current description: ✓ correct)
- `_pages/about_me.md` line 10 (starts with outdated narrative: ✗ problem)
- `_pages/cv.md` (no explicit description: ⚠ relying on fallback)
- `_includes/seo_schema.html` line 12 (schema description: ✓ correct, uses site.description)

### Fix Approach (Priority 1)
1. **Immediate:** Add explicit `description` frontmatter to critical pages:
   - `/en/index.md` (already has good excerpt ✓)
   - `_pages/cv.md` → Add: `description: "Staff ML Engineer & AI Architect with production GenAI, MLOps, and causal ads experience"`
   - `_pages/about_me.md` → Add description + rewrite first paragraph
2. **Force Re-Crawl:** Submit sitemap to Google Search Console after deploy
3. **Add OpenGraph:** Ensure `jekyll-seo-tag` generates og:description (verify in HTML output)
4. **Monitor:** Use Google Search Console to track snippet updates (typically 2-7 days after re-crawl)

**Risk:** Very low - additive only, no breaking changes
**Impact:** High - fixes primary brand positioning issue

---

## ISSUE 2: Redirect Stub Pages Unpolished

### Current State

**Redirect Mechanism:**
- **Plugin:** `jekyll-redirect-from` (GitHub Pages compatible, line 354 in _config.yml)
- **How it works:** Generates HTML pages at old URLs with `<meta http-equiv="refresh">` tags pointing to new URLs

**Current Redirect Mappings:**
- `/cv/` → `/en/cv/` (defined in `_pages/cv.md` line 10)
- `/about_me/` → (no explicit redirect defined; page exists at `/about_me/` with old content)
- `/contact/` → `/en/contact/` (defined in `_pages/contact.md` line 10)
- `/resume/` → `/en/cv/` (defined in `_pages/cv.md` line 11)

**What Users See:**
When visiting `/cv/` or `/contact/`, the `jekyll-redirect-from` plugin generates a bare HTML page:
```html
<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="refresh" content="0; url=/en/cv/">
  <link rel="canonical" href="/en/cv/">
</head>
<body>
  <p>Redirecting...</p>
</body>
</html>
```

**Problems:**
1. **Bare UX:** No site header, footer, or branding during redirect
2. **SEO Ambiguity:** While `<link rel="canonical">` is present, the redirect page itself could be indexed if Google is slow to process the redirect
3. **No Language Preservation:** `/cv/` redirects to `/en/cv/` always, even if user came from Spanish or Portuguese context

### Why This Exists
- **Historical:** Site migrated from single-language structure to locale-based URLs
- **Good Practice:** Using redirects to preserve old URLs (prevents 404s)
- **Plugin Limitation:** `jekyll-redirect-from` generates minimal HTML by default; doesn't use site layout

### Root Causes
- **RC1:** Plugin default template is intentionally minimal (not a bug, design choice)
- **RC2:** No custom redirect template implemented to brand the interim page
- **RC3:** No locale detection/preservation logic in redirect mappings

### Evidence Files
- `_pages/cv.md` line 9-11 (redirect_from definitions)
- `_pages/contact.md` line 9-10 (redirect_from definitions)
- Plugin docs: https://github.com/jekyll/jekyll-redirect-from (default template is minimal)

### Fix Approach (Priority 2)
**Option A: Custom Redirect Template (Recommended)**
1. Create `_layouts/redirect.html` with:
   - Site header (simplified, logo + tagline)
   - "Taking you to the new location…" message
   - Meta refresh + canonical (preserve existing)
   - Optional: JavaScript redirect with locale detection
   - Site footer (minimal)
2. Configure `jekyll-redirect-from` to use custom layout (if plugin supports, else use Option B)

**Option B: Client-Side Smart Redirect (Fallback)**
1. Create custom redirect pages manually (e.g., `/cv/index.html`)
2. Use JavaScript to:
   - Detect browser language
   - Redirect to matching locale version (/en/cv/, /es-419/cv/, /pt-br/cv/)
   - Fallback to /en/ if no match
3. Show branded loading state during redirect

**Option C: Noindex Redirect Pages**
1. Keep current minimal redirect pages
2. Add `<meta name="robots" content="noindex,follow">` to redirect pages
3. Ensures Google doesn't index the redirect stubs

**Recommended:** Option B (smart redirect) + Option C (noindex) for best UX and SEO

**Risk:** Low - redirect pages aren't critical content, failures gracefully degrade to working redirects
**Impact:** Medium - improves polish and brand consistency

---

## ISSUE 3: Where Meta Description / OG / Schema Are Defined

### Current Implementation Architecture

**Layer 1: Jekyll SEO Tag Plugin (Primary)**
- **File:** `_includes/head.html` line 5: `{% seo %}`
- **Plugin:** `jekyll-seo-tag` (line 355 in _config.yml)
- **What it generates:**
  - `<title>` tag
  - `<meta name="description">`
  - OpenGraph tags (og:title, og:description, og:url, og:type)
  - Twitter Card tags (twitter:card, twitter:title, twitter:description)
  - Canonical link (`<link rel="canonical">`)
- **Data Sources (priority order):**
  1. `page.description` or `page.excerpt` (frontmatter)
  2. Falls back to `site.description` (_config.yml line 15)
  3. For og:image: `page.header.image` or `site.og_image` (_config.yml line 80, currently empty)

**Layer 2: Custom SEO Schema (JSON-LD)**
- **File:** `_includes/seo_schema.html` (included in head.html line 7)
- **What it generates:** Person schema with:
  - name, jobTitle, description (from site.author and site.description)
  - sameAs links (LinkedIn, GitHub, Google Scholar)
  - alumniOf, knowsAbout fields
- **Status:** ✓ Correctly implemented, uses updated site.description

**Layer 3: Legacy Custom SEO Include (Unused?)**
- **File:** `_includes/seo.html` (exists but NOT included in head.html)
- **Status:** ⚠ Potentially obsolete; verify if any layouts include it directly
- **Contents:** Custom meta tag generation (likely redundant with jekyll-seo-tag)

**Layer 4: Hreflang Links**
- **File:** `_includes/hreflang_links.html` (included in head.html line 6)
- **What it generates:** `<link rel="alternate" hreflang="...">` tags for language variants
- **Status:** ✓ Correctly implemented, uses translation_targets helper

**Layer 5: Config Defaults**
- **File:** `_config.yml`
  - Line 15: `description` (site-wide default) ✓ Updated correctly
  - Line 80: `og_image` (currently empty) ✗ Missing
  - Lines 83-90: `social` (Person schema links) ✓ Correct

### Why It's Stale

**Problem 1: Missing Per-Page Descriptions**
- Most pages rely on site.description fallback
- Generic site description isn't optimized for specific page types (CV vs About vs Home)
- Result: Google may ignore generic descriptions and extract from content instead

**Problem 2: No OG Images**
- `site.og_image` is empty (line 80)
- No per-page og:image definitions
- Result: Social media shares show no preview image; Twitter cards are "summary" type instead of "summary_large_image"

**Problem 3: Outdated Content Indexed**
- Old pages (/about_me/) have outdated narrative in content
- Even with correct meta tags, Google may prefer content snippets over meta descriptions
- `/about_me/` page starts with "Mechatronic Engineer… PhD student" (line 10) which Google indexes

**Problem 4: No Description in Locale Variants**
- `/es-419/index.md` and `/pt-br/index.md` may not have locale-specific descriptions
- Falls back to English site.description

### Evidence Files
- `_includes/head.html` lines 5-8 (SEO stack)
- `_includes/seo.html` (legacy, not in use)
- `_includes/seo_schema.html` (JSON-LD, correct)
- `_config.yml` line 80 (og_image: empty)
- `_pages/about_me.md` line 10 (outdated content)

### Fix Approach (Priority 1)
1. **Add per-page descriptions to all critical pages:**
   - CV, About, Home (all locales)
   - Pillar hubs, Case study index
   - Format: `description: "40-160 chars, focus on value + keywords"`
2. **Add OG images:**
   - Create default: `/images/og-default.jpg` (1200x630px, branded)
   - Add to _config.yml: `og_image: "/images/og-default.jpg"`
   - Optional: Per-page og:image via `header.image` frontmatter
3. **Rewrite /about_me/ first paragraph:**
   - Current: "I'm a Staff ML Engineer… [old narrative]"
   - New: Lead with current role, then progression
4. **Audit locale-specific descriptions:**
   - Verify `/es-419/index.md` has Spanish description
   - Verify `/pt-br/index.md` has Portuguese description

**Risk:** Very low - additive frontmatter + config changes
**Impact:** High - fixes SEO snippet mismatch and social sharing

---

## ISSUE 4: What Pages Are Being Indexed Unintentionally

### Current Indexing State (Hypotheses)

**Potentially Over-Indexed:**
1. **Legacy redirect stubs:** `/cv/`, `/contact/`, `/resume/` (if Google hasn't processed redirects)
2. **Old talks archive:** `/talks/` shows only 2012-2017 conference papers (outdated authority signal)
3. **Old about_me narrative:** `/about_me/` with mechatronics-focused content (dilutes modern AI brand)
4. **Publication pages:** Individual `/publications/YYYY-MM-DD-title/` pages (academic template, may not match brand)
5. **Teaching pages:** `/teaching/` (if exists) with old content
6. **Language selector pages:** Root `/` (x-default welcome page) - should be indexed with correct hreflang
7. **Blog filter states:** `/en/blog/?category=foo` (if using query params, not an issue with current implementation)

**Correctly Indexed (Should Stay):**
- `/en/`, `/es-419/`, `/pt-br/` (locale homepages)
- `/en/pillars/`, `/en/case-studies/` (modern content)
- `/en/cv/`, `/en/about/` (canonical locale versions)
- Blog post permalinks

### How to Verify

**Check Current Index:**
```
site:camilo-cf.github.io
site:camilo-cf.github.io/talks/
site:camilo-cf.github.io/publications/
site:camilo-cf.github.io/cv/
site:camilo-cf.github.io/about_me/
```

**Expected Results:**
- `/cv/` should redirect to `/en/cv/` or show canonical tag (may still be in index if redirect is recent)
- `/talks/` should be indexed BUT needs update to modern speaking page
- `/about_me/` should redirect to `/en/about/` (verify if redirect is configured)

### Root Causes

**RC1: Legacy Content Not Migrated**
- Old talks (2012-2017) are in `_talks/` collection
- No modern speaking/media kit page exists
- Navigation links to `/talks/` (line 4 in _pages/talks.html)

**RC2: No Noindex on Redirect Stubs**
- Redirect pages generated by `jekyll-redirect-from` don't have `<meta name="robots" content="noindex,follow">`
- Google may index them before processing redirect

**RC3: About_me Not Redirecting**
- `_pages/about_me.md` has `permalink: /about_me/` (line 2)
- Has `redirect_from: /about_me.html` (line 5) but doesn't redirect TO anywhere
- Page exists with old content, no redirect to `/en/about/`

**RC4: Publications Use Generic Template**
- `_publications/` collection uses single.html layout
- Shows academic template with comments, share buttons
- Doesn't match modern AI/ML brand narrative

### Evidence Files
- `_pages/talks.html` (shows old talks only)
- `_talks/` collection (2012, 2013, 2017 papers)
- `_pages/about_me.md` (exists, no redirect, old content)
- `_config.yml` lines 239-252 (collections config)

### Fix Approach (Priority 2)

**Action 1: Fix /about_me/ Redirect**
```yaml
# _pages/about_me.md frontmatter
redirect_to: /en/about/  # Add this
# OR delete the file and add redirect_from to _pages/about.md
```

**Action 2: Create Modern Speaking Page**
- Create `/en/speaking/index.md` (new)
- Create `/es-419/charlas/index.md` (new)
- Create `/pt-br/palestras/index.md` (new)
- Content: Talk proposals, bio, headshot, "book me" CTA
- Update `/talks/` to redirect to `/en/speaking/` OR keep as archive with link to new speaking page

**Action 3: Noindex Legacy Pages (Option A)**
```yaml
# _pages/talks.html frontmatter
title: "Talks Archive (2012-2017)"
robots: noindex,follow  # Add this
```

**Action 3: Redirect Legacy Pages (Option B - Recommended)**
```yaml
# _pages/talks.html
redirect_to: /en/speaking/
```

**Action 4: Update Navigation**
- Replace "Talks" with "Speaking" in navigation.yml
- Point to `/en/speaking/` instead of `/talks/`

**Risk:** Low - redirect/noindex changes, no content deletion
**Impact:** Medium - improves brand coherence, removes outdated authority signals

---

## ISSUE 5: Missing Authority-Building Features

### Current State vs Required

**MISSING (Must Implement):**

**1. Speaking / Media Kit Page**
- **Status:** ✗ Does not exist
- **Current:** Only `/talks/` archive with 2012-2017 academic papers
- **Required:** `/en/speaking/`, `/es-419/charlas/`, `/pt-br/palestras/` with:
  - 4-6 talk proposals (title, abstract, audience, duration)
  - Bio (short/medium/long)
  - Headshot assets
  - "Book me" CTA
  - Recent appearances section

**2. Impact / Proof of Outcomes Page**
- **Status:** ✗ Does not exist
- **Required:** `/en/impact/` (+ locales) with:
  - 5 quantified outcomes (sanitized)
  - Links to 2-3 case studies
  - CTA: speaking, hiring, contact

**3. Lead Magnet / Resources**
- **Status:** ✗ No lead magnets
- **Current:** Blog exists but no gated content
- **Required:** At least 1 resource page:
  - Example: "Ads ML Systems at Scale – Checklist"
  - Format: Ungated (trust-building) or email-gated (list-building)

**4. Newsletter Page (Locale-Specific)**
- **Status:** ⚠ Partial - `/newsletter/` exists but no locale versions
- **Files:** `/newsletter/index.md` exists (line 266 in file listing)
- **Missing:** `/en/newsletter/`, `/es-419/newsletter/`, `/pt-br/newsletter/`
- **Required:** Locale-specific pages with:
  - Value proposition above fold
  - RSS link prominent
  - Email signup (Substack embed OR link)
  - Localized copy

**5. Persona Routing on Welcome Page**
- **Status:** ✗ Not implemented
- **Current:** `_pages/home.md` (root `/`) shows language selection only
- **Required:** Add persona routing AFTER language selection on locale homepages:
  - "Hiring" → /en/cv/ + top case studies
  - "Engineering" → /en/pillars/
  - "Speaking" → /en/speaking/

### Why This Matters

**For Hiring Managers:**
- Need proof of impact (quantified outcomes)
- Need case studies (already exist ✓)
- Need clear CV (exists ✓)

**For Peers:**
- Need technical depth (pillars exist ✓)
- Need credibility signals (publications exist ✓, but need modern framing)
- Need contact/collaboration path (exists ✓)

**For Conference Organizers:**
- **CRITICAL GAP:** No speaking page, no talk proposals, no bio kit
- Current `/talks/` shows 2012-2017 academic papers (outdated, wrong signal)
- No "book me" CTA or speaking topics listed

### Root Causes

**RC1: Site Evolved from Academic Template**
- Originally based on AcademicPages Jekyll theme
- Focused on publications/teaching, not modern ML leadership
- Speaking = past conference papers, not forward-looking talk proposals

**RC2: No Conversion Funnel Strategy**
- Blog exists but no lead magnets
- Newsletter exists but not localized or prominently featured
- No persona-based routing (hiring vs speaking vs engineering)

**RC3: Privacy-First Approach (Good) Without Conversion Optimization**
- Contact page has spam-safe email (✓ correct)
- But no scheduling link, no "book me" for speaking
- No frictionless paths for different personas

### Evidence Files
- `_pages/home.md` (welcome page, no persona routing)
- `_pages/talks.html` (archive only, no media kit)
- `/newsletter/index.md` (exists but not localized)
- Navigation.yml (no speaking link)

### Fix Approach (Priority 1 - Required for Spec)

**Must Implement:**
1. **Create Speaking Pages (EN/ES/PT)** - See detailed spec in deliverables
2. **Create Impact Page (EN/ES/PT)** - See detailed spec in deliverables
3. **Add Persona Routing to Locale Homepages** - Not root `/`, but `/en/`, `/es-419/`, `/pt-br/`
4. **Localize Newsletter Pages** - Create `/en/newsletter/`, etc.
5. **Create 1 Lead Magnet Page** - Example: "Ads ML Systems Checklist"

**Implementation Priority:**
- **Week 1:** Speaking pages (highest gap for conference organizers)
- **Week 1:** Impact page (hiring managers)
- **Week 2:** Persona routing (UX improvement)
- **Week 2:** Newsletter localization (conversion)
- **Week 3:** Lead magnet (optional, nice-to-have)

**Risk:** Low - new pages, no breaking changes
**Impact:** Critical - unlocks conference/speaking opportunities, improves hiring positioning

---

## ISSUE 6: Template Incoherence (Publications)

### Current State

**Publications Collection:**
- **Files:** `_publications/*.md` (academic papers)
- **Layout:** Uses `single.html` layout (line 295-302 in _config.yml defaults)
- **Template Features:**
  - Author profile sidebar ✓
  - Share buttons (Twitter, Facebook, LinkedIn)
  - Comments (Giscus enabled, line 26-38 in _config.yml)
  - Generic CTA block ("Continue the conversation")
  - Related posts (if enabled)

**Problem:**
- Academic publications are framed with blog-style social sharing and comments
- CTA block is generic ("Subscribe to newsletter, see case study") - not contextual
- Doesn't match modern AI/ML brand narrative
- Feels like academic blog posts, not professional portfolio pieces

### Why This Exists

**RC1: Inherited from AcademicPages Theme**
- Default publication layout was designed for academic blogs
- Assumes readers want to comment/discuss papers
- Share buttons optimized for academic Twitter

**RC2: No Custom Publication Layout**
- Currently uses generic `single.html` (same as blog posts)
- No publication-specific layout exists

**RC3: Generic CTA on Every Page**
- `_layouts/single.html` line 76-77: `{% include post_cta.html %}`
- Applies to publications, blog posts, pages, case studies
- Not contextually relevant

### Evidence Files
- `_config.yml` line 295-302 (publications defaults)
- `_layouts/single.html` line 76-77 (CTA inclusion)
- `_includes/post_cta.html` (generic CTA content)

### Fix Approach (Priority 3 - Polish)

**Option A: Custom Publication Layout**
1. Create `_layouts/publication.html` (extends single.html)
2. Override:
   - Remove comments section (publications don't need discussion)
   - Custom CTA: "See how this research applies to production ML" → link to related pillar
   - Muted share buttons (keep LinkedIn, remove Facebook)
   - Add "Citation" box (BibTeX, APA)
3. Update `_config.yml` line 296: `layout: publication`

**Option B: Contextual CTA System**
1. Create `_includes/cta_publication.html`
2. Update `single.html` to detect page.collection:
   ```liquid
   {% if page.collection == "publications" %}
     {% include cta_publication.html %}
   {% elsif page.collection == "talks" %}
     {% include cta_speaking.html %}
   {% else %}
     {% include post_cta.html %}
   {% endif %}
   ```

**Recommended:** Option B (contextual CTA) - more flexible, applies to talks/teaching too

**Risk:** Low - layout changes, no data migration
**Impact:** Medium - improves brand coherence, reduces CTA fatigue

---

## ISSUE 7: Cookie Banner UX (Minor)

### Current State

**Cookie Consent Implementation:**
- **File:** `_includes/cookie_banner.html`
- **Config:** `_config.yml` lines 133-141
- **Message:** "This site uses cookies… Ads and analytics stay off until you accept."
- **Current Choice Display:** Shows "Current choice: denied" (debug-like text)

**Problem:**
- "Current choice: denied" reads like debug output
- Creates compliance noise (correct behavior, but poor UX)
- Banner is functional but not polished

### Why This Exists

**RC1: Debug Text Left in Production**
- Likely added during development to verify consent state
- Forgot to remove or polish before deploy

**RC2: Compliance-First, UX-Second**
- Correctly implements GDPR/privacy requirements ✓
- But UX polish is lacking

### Evidence Files
- `_includes/cookie_banner.html` (check for "Current choice" text)
- `assets/js/consent.js` (if exists, verify it's updating banner state)

### Fix Approach (Priority 4 - Nice-to-Have)

**Quick Fix:**
1. Remove "Current choice: denied" text from banner
2. Show banner only if consent not yet given (hide after accept/reject)
3. Optional: Add small status indicator in footer ("Privacy settings") instead of inline banner text

**Better Fix:**
1. Move consent status to footer: "Privacy settings: Minimal cookies | Change"
2. Hide banner entirely after user makes choice
3. Allow re-opening banner via footer link

**Risk:** Very low - UX polish only
**Impact:** Low - minor polish, doesn't affect functionality

---

## Summary: SEO & Metadata Architecture

### Where Things Are Defined (Map)

| Component | File | Status | Priority to Fix |
|-----------|------|--------|-----------------|
| Site-wide description | `_config.yml` line 15 | ✓ Correct | - |
| Per-page description | Page frontmatter `description:` | ⚠ Missing on most pages | P1 |
| OG image (default) | `_config.yml` line 80 | ✗ Empty | P1 |
| OG image (per-page) | Page frontmatter `header.image:` | ⚠ Not used | P2 |
| Meta tags (auto) | `{% seo %}` in head.html | ✓ Working | - |
| JSON-LD schema | `_includes/seo_schema.html` | ✓ Correct | - |
| Hreflang tags | `_includes/hreflang_links.html` | ✓ Correct | - |
| Canonical tags | `jekyll-seo-tag` (auto) | ✓ Working | - |
| Sitemap | `jekyll-sitemap` plugin | ✓ Generates /sitemap.xml | - |
| Robots.txt | `/robots.txt` | ✓ Exists | - |
| Redirect stubs | `jekyll-redirect-from` | ⚠ Unpolished | P2 |
| Legacy seo.html | `_includes/seo.html` | ⚠ Unused? | P3 (verify/delete) |

### What's Being Indexed (Hypothesis)

**Should Be Indexed:**
- ✓ `/en/`, `/es-419/`, `/pt-br/` (locale homes)
- ✓ `/en/cv/`, `/en/about/`, `/en/pillars/`, `/en/case-studies/`
- ✓ Blog posts (`/en/blog/YYYY/MM/DD/title/`)
- ✓ Root `/` (x-default with hreflang)

**Should NOT Be Indexed (Fix Required):**
- ✗ `/cv/`, `/contact/`, `/resume/` (redirect stubs) → Add noindex
- ✗ `/about_me/` (old content) → Redirect to `/en/about/`

**Needs Update (Content Refresh):**
- ⚠ `/talks/` (2012-2017 archive) → Redirect to `/en/speaking/` OR add "Archive" notice + link to speaking page
- ⚠ Individual publication pages → Polish template, contextual CTA

---

## Implementation Roadmap

### PHASE 0: Root Cause Complete ✓
- This document

### PHASE 1: Critical SEO Fixes (Week 1)
**PR #1: SEO Snippet Mismatch + Meta Descriptions**
1. Add `description` frontmatter to:
   - `_pages/cv.md`
   - `_pages/about.md`
   - `/en/index.md` (already has excerpt, verify)
   - `/es-419/index.md`, `/pt-br/index.md`
2. Rewrite `_pages/about_me.md` first paragraph OR redirect to `/en/about/`
3. Add OG default image: `/images/og-default.jpg`
4. Update `_config.yml` line 80: `og_image: "/images/og-default.jpg"`
5. Submit sitemap to Google Search Console

**PR #2: Redirect Polish + Noindex**
1. Add noindex to redirect stubs (custom redirect layout OR manual)
2. Fix `/about_me/` redirect
3. Test all legacy URLs redirect correctly

### PHASE 2: Authority Features (Week 2)
**PR #3: Speaking / Media Kit Pages**
1. Create `/en/speaking/index.md` with:
   - 4-6 talk proposals
   - Bio (short/medium/long)
   - Headshot link
   - "Book me" CTA
2. Create `/es-419/charlas/index.md` (localized)
3. Create `/pt-br/palestras/index.md` (localized)
4. Update navigation.yml: Replace "Talks" with "Speaking"
5. Update `/talks/` to redirect OR show "Archive (2012-2017) | See current speaking topics"

**PR #4: Impact Page**
1. Create `/en/impact/index.md` with:
   - 5 quantified outcomes
   - Links to case studies
   - CTA: speaking + hiring + contact
2. Create `/es-419/impacto/index.md` (localized)
3. Create `/pt-br/impacto/index.md` (localized)

### PHASE 3: Conversion Optimization (Week 3)
**PR #5: Persona Routing + Newsletter**
1. Add persona routing to `/en/index.md`, `/es-419/index.md`, `/pt-br/index.md`:
   - Hiring → CV + case studies
   - Engineering → Pillars
   - Speaking → Speaking page
2. Create `/en/newsletter/index.md` (localized)
3. Create `/es-419/newsletter/index.md` (localized)
4. Create `/pt-br/newsletter/index.md` (localized)

**PR #6: Lead Magnet (Optional)**
1. Create `/en/resources/ads-ml-checklist/index.md`
2. Add to navigation or pillar CTAs

### PHASE 4: Template Polish (Week 4)
**PR #7: Contextual CTAs**
1. Create `_includes/cta_publication.html`
2. Create `_includes/cta_speaking.html`
3. Create `_includes/cta_case_study.html`
4. Update `_layouts/single.html` to use contextual CTAs

**PR #8: Cookie Banner Polish**
1. Remove debug text
2. Add footer privacy settings link

### PHASE 5: CI & Testing (Week 5)
**PR #9: Playwright Tests**
1. Setup Playwright
2. Add quality gate tests:
   - Welcome page has persona routing ✗ (after PR #5)
   - `/en/speaking/` exists with ≥3 talk proposals ✗ (after PR #3)
   - `/en/contact/` email not in HTML ✓ (already implemented, verify)
   - `/robots.txt` exists ✓
   - `/sitemap.xml` exists ✓
3. Add to `.github/workflows/ci.yml`

**PR #10: README + Docs**
1. Update README with:
   - Local dev instructions
   - How to add new talk/post in all locales
   - Cookie consent gating for embeds
2. Document persona routing customization

---

## Appendix: File Locations Reference

### Critical Files for SEO

```
_config.yml                    # Site description (line 15), og_image (line 80)
_includes/head.html            # SEO stack (seo tag, hreflang, schema)
_includes/seo_schema.html      # JSON-LD Person schema
_includes/hreflang_links.html  # Language variant tags
_includes/seo.html             # Legacy (verify if used)

_pages/cv.md                   # Add description frontmatter
_pages/about.md                # Add description frontmatter
_pages/about_me.md             # Redirect to /en/about/ OR rewrite

/en/index.md                   # Verify excerpt/description
/es-419/index.md               # Add description
/pt-br/index.md                # Add description

/robots.txt                    # ✓ Exists
/sitemap.xml                   # ✓ Auto-generated by jekyll-sitemap
```

### Files to Create

```
/en/speaking/index.md          # Media kit
/es-419/charlas/index.md       # Localized
/pt-br/palestras/index.md      # Localized

/en/impact/index.md            # Proof of outcomes
/es-419/impacto/index.md       # Localized
/pt-br/impacto/index.md        # Localized

/en/newsletter/index.md        # Conversion
/es-419/newsletter/index.md    # Localized
/pt-br/newsletter/index.md     # Localized

/images/og-default.jpg         # 1200x630px OpenGraph image

_layouts/redirect.html         # Custom redirect template (optional)
_includes/cta_publication.html # Contextual CTA
_includes/cta_speaking.html    # Contextual CTA
_includes/cta_case_study.html  # Contextual CTA

.github/workflows/ci.yml       # CI with Playwright
tests/smoke.spec.js            # Playwright tests
playwright.config.js           # Playwright config
```

---

**END OF ROOT CAUSE REPORT**

**Next Steps:**
1. Review this report with stakeholder (Camilo)
2. Prioritize PRs based on business goals (conference speaking = prioritize PR #3)
3. Begin Phase 1 implementation
4. Measure: Google Search Console snippet updates, social share previews, speaking inquiries

**Approval Required Before Proceeding to Implementation.**
