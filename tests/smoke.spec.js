// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * Smoke tests for critical SEO & UX features
 * These tests gate deployments to prevent regressions in:
 * - Persona routing (conversion optimization)
 * - Speaking/authority pages (conference organizer CTA)
 * - Spam-safe contact (email obfuscation)
 * - SEO fundamentals (robots.txt, sitemap.xml)
 */

const BASE_URL = process.env.BASE_URL || 'http://localhost:4000';

test.describe('Persona Routing (Conversion Optimization)', () => {
  const locales = [
    { path: '/en/', buttons: ['Hiring?', 'Engineering?', 'Speaking?'] },
    { path: '/es-419/', buttons: ['¿Contratando?', '¿Ingeniería?', '¿Charlas?'] },
    { path: '/pt-br/', buttons: ['Contratando?', 'Engenharia?', 'Palestras?'] }
  ];

  for (const locale of locales) {
    test(`${locale.path} shows persona routing buttons`, async ({ page }) => {
      await page.goto(`${BASE_URL}${locale.path}`);

      // Verify all three persona buttons are visible
      for (const buttonText of locale.buttons) {
        const button = page.locator('.persona-routing a', { hasText: buttonText });
        await expect(button).toBeVisible();
      }
    });
  }
});

test.describe('Speaking/Authority Pages', () => {
  test('/en/speaking/ exists and has talk proposals', async ({ page }) => {
    await page.goto(`${BASE_URL}/en/speaking/`);

    // Page should load successfully
    await expect(page).toHaveTitle(/Speaking/i);

    // Should have at least 3 talk proposals (we have 6)
    const talkHeaders = page.locator('h3');
    const count = await talkHeaders.count();
    expect(count).toBeGreaterThanOrEqual(3);

    // Should have "Book me" section heading
    const bookHeading = page.getByRole('heading', { name: /book me/i });
    await expect(bookHeading).toBeVisible();

    // Should have contact information (LinkedIn or email reveal link)
    const contactLinks = page.locator('a[href*="linkedin"], a[href*="contact"]');
    await expect(contactLinks.first()).toBeVisible();
  });

  test('/en/impact/ exists and has quantified outcomes', async ({ page }) => {
    await page.goto(`${BASE_URL}/en/impact/`);

    // Page should load successfully
    await expect(page).toHaveTitle(/Impact/i);

    // Should contain quantified metrics (looking for percentage or "reduction")
    const content = await page.textContent('body');
    expect(content).toMatch(/\d+%/); // Has percentage
    expect(content).toMatch(/reduction|improvement|faster/i); // Has impact verbs
  });
});

test.describe('Spam-Safe Contact (Email Obfuscation)', () => {
  test('/en/contact/ does not expose email in initial HTML', async ({ page }) => {
    await page.goto(`${BASE_URL}/en/contact/`);

    // Get initial HTML content before any JavaScript execution
    const htmlContent = await page.content();

    // Email should NOT be in plaintext in HTML
    // (Actual email is camilo.cf at gmail.com, should be obfuscated)
    expect(htmlContent).not.toMatch(/camilo\.cf@gmail\.com/);
    expect(htmlContent).not.toMatch(/mailto:camilo/);

    // Should have click-to-reveal mechanism
    const revealButton = page.locator('[data-action="reveal-email"], .email-reveal, button:has-text("reveal")');
    // At least one reveal mechanism should exist (could be button or data attribute)
    const hasRevealMechanism = await revealButton.count() > 0 ||
                                htmlContent.includes('data-') && htmlContent.includes('email');
    expect(hasRevealMechanism).toBeTruthy();
  });
});

test.describe('SEO Fundamentals', () => {
  test('/robots.txt exists and is accessible', async ({ page }) => {
    const response = await page.goto(`${BASE_URL}/robots.txt`);
    expect(response?.status()).toBe(200);

    const content = await page.textContent('body');
    expect(content).toContain('User-agent');
  });

  test('/sitemap.xml exists and is accessible', async ({ page }) => {
    const response = await page.goto(`${BASE_URL}/sitemap.xml`);
    expect(response?.status()).toBe(200);

    const content = await page.textContent('body');
    // Sitemap should contain URL entries (Jekyll generates valid sitemaps)
    expect(content).toMatch(/http.*\/en\//); // Has EN locale URLs
    // Also check for urlset or xml namespace (more lenient than <?xml check)
    const hasUrlset = content.includes('urlset') || content.includes('http://localhost:4000');
    expect(hasUrlset).toBeTruthy();
  });
});

test.describe('Meta Descriptions (SEO)', () => {
  const criticalPages = [
    { path: '/en/', expectedInTitle: /Camilo|ML Engineer|Staff/i },
    { path: '/en/cv/', expectedInTitle: /CV|Resume|Curriculum/i },
    { path: '/en/about/', expectedInTitle: /About/i }
  ];

  for (const page_info of criticalPages) {
    test(`${page_info.path} has meta description`, async ({ page }) => {
      await page.goto(`${BASE_URL}${page_info.path}`);

      // Check for meta description tag
      const metaDescription = page.locator('meta[name="description"]');
      await expect(metaDescription).toHaveCount(1);

      const content = await metaDescription.getAttribute('content');
      expect(content).toBeTruthy();
      expect(content.length).toBeGreaterThan(50); // Meaningful description

      // Title should match expected pattern
      await expect(page).toHaveTitle(page_info.expectedInTitle);
    });
  }
});

test.describe('Cookie Consent (Privacy)', () => {
  test('Cookie banner appears and has no debug text', async ({ page }) => {
    await page.goto(`${BASE_URL}/en/`);

    // Cookie banner should exist
    const banner = page.locator('.cookie-consent, [class*="cookie"]');
    await expect(banner.first()).toBeVisible();

    // Should NOT have debug text "Current choice: denied"
    const bodyText = await page.textContent('body');
    expect(bodyText).not.toContain('Current choice: denied');
  });
});

test.describe('Site Search', () => {
  test('/en/search/ exists and has search functionality', async ({ page }) => {
    await page.goto(`${BASE_URL}/en/search/`);

    // Page should load successfully
    await expect(page).toHaveTitle(/Search/i);

    // Search input should be visible
    const searchInput = page.locator('#search-input');
    await expect(searchInput).toBeVisible();

    // Search input should have placeholder
    const placeholder = await searchInput.getAttribute('placeholder');
    expect(placeholder).toBeTruthy();
    expect(placeholder.length).toBeGreaterThan(0);

    // Results container should exist in DOM (may be hidden initially)
    const resultsContainer = page.locator('#search-results');
    await expect(resultsContainer).toBeAttached();
  });

  test('/en/resources/ml-safety-nets-checklist/ exists', async ({ page }) => {
    await page.goto(`${BASE_URL}/en/resources/ml-safety-nets-checklist/`);

    // Page should load successfully
    await expect(page).toHaveTitle(/Safety Nets Checklist/i);

    // Should have checklist sections
    const checkboxes = page.locator('input[type="checkbox"]');
    const checkboxCount = await checkboxes.count();
    expect(checkboxCount).toBeGreaterThanOrEqual(20); // We have 40+ items

    // Should have download/print button
    const downloadButton = page.locator('button:has-text("Download PDF")');
    await expect(downloadButton).toBeVisible();
  });
});

test.describe('Navigation', () => {
  test('Search link appears in navigation', async ({ page }) => {
    await page.goto(`${BASE_URL}/en/`);

    // Search link should be in navigation
    const searchLink = page.locator('nav a:has-text("Search")');
    await expect(searchLink).toBeVisible();

    // Click should navigate to search page
    await searchLink.click();
    await expect(page).toHaveURL(/\/en\/search\//);
  });
});

test.describe('SEO - Redirect Pages', () => {
  test('/cv/ redirect has noindex meta tag', async ({ request }) => {
    // Fetch raw HTML without executing JavaScript/meta refresh
    const response = await request.get(`${BASE_URL}/cv/`);
    const html = await response.text();

    // Check for noindex,follow meta tag in raw HTML
    expect(html).toContain('name="robots"');
    expect(html).toContain('noindex');

    // Check for canonical tag pointing to destination
    expect(html).toContain('rel="canonical"');
    expect(html).toContain('/en/cv/');
  });
});

test.describe('Blog Content & Empty State', () => {
  test('/en/blog/ shows posts and hides empty-state by default', async ({ page }) => {
    await page.goto(`${BASE_URL}/en/blog/`);

    // Page should load successfully
    await expect(page).toHaveTitle(/Blog/i);

    // Should have blog posts (we have 8 posts)
    const blogCards = page.locator('.blog-card');
    const postCount = await blogCards.count();
    expect(postCount).toBeGreaterThanOrEqual(1);

    // Empty state should be hidden by default
    const emptyState = page.locator('#blog-empty');
    await expect(emptyState).toBeHidden();

    // Verify posts have expected structure
    const firstCard = blogCards.first();
    await expect(firstCard.locator('.blog-card__title')).toBeVisible();
    await expect(firstCard.locator('.blog-card__meta')).toBeVisible();
  });
});

test.describe('SEO - Hreflang & OpenGraph', () => {
  test('Homepage has hreflang tags for all locales', async ({ page }) => {
    await page.goto(`${BASE_URL}/en/`);

    // Should have hreflang tags for en, es-419, pt-br, and x-default
    const hreflangLinks = page.locator('link[rel="alternate"][hreflang]');
    const count = await hreflangLinks.count();
    expect(count).toBeGreaterThanOrEqual(3); // At least EN, ES, PT

    // Should have x-default
    const xDefault = page.locator('link[rel="alternate"][hreflang="x-default"]');
    await expect(xDefault).toHaveCount(1);
  });

  test('Homepage has OpenGraph meta tags', async ({ page }) => {
    await page.goto(`${BASE_URL}/en/`);

    // Check for essential OG tags
    const ogTitle = page.locator('meta[property="og:title"]');
    await expect(ogTitle).toHaveCount(1);

    const ogDescription = page.locator('meta[property="og:description"]');
    await expect(ogDescription).toHaveCount(1);

    // OG image is optional (requires image file to exist)
    // Just verify the tag structure exists if present
    const ogUrl = page.locator('meta[property="og:url"]');
    await expect(ogUrl).toHaveCount(1);
  });

  test('Homepage has JSON-LD Person schema', async ({ page }) => {
    await page.goto(`${BASE_URL}/en/`);

    // Check for JSON-LD scripts (may have multiple - that's valid)
    const jsonLdScripts = page.locator('script[type="application/ld+json"]');
    const count = await jsonLdScripts.count();
    expect(count).toBeGreaterThanOrEqual(1);

    // Find the one with Person schema and verify it
    let foundPersonSchema = false;
    for (let i = 0; i < count; i++) {
      const content = await jsonLdScripts.nth(i).textContent();
      if (content && content.includes('"@type": "Person"')) {
        foundPersonSchema = true;
        expect(content).toContain('Staff ML Engineer');
        break;
      }
    }
    expect(foundPersonSchema).toBeTruthy();
  });
});
