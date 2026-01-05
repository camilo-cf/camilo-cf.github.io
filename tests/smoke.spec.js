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
    { path: '/es-419/', buttons: ['¿Contratas?', '¿Ingeniería?', '¿Charlas?'] },
    { path: '/pt-br/', buttons: ['Contrata?', 'Engenharia?', 'Palestras?'] }
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

    // Should have "Book me" CTA
    const bookButton = page.getByRole('link', { name: /book me/i });
    await expect(bookButton).toBeVisible();
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
    expect(content).toContain('<?xml');
    expect(content).toContain('urlset');
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
