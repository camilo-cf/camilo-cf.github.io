// @ts-check
const { test, expect } = require('@playwright/test');

const BASE_URL = process.env.BASE_URL || 'http://localhost:4000';

test.describe('Homepage smoke tests', () => {
  test('homepage loads successfully', async ({ page }) => {
    await page.goto(BASE_URL);
    await expect(page).toHaveTitle(/Camilo/);
  });

  test('language selector renders clean labels', async ({ page }) => {
    await page.goto(`${BASE_URL}/en/`);

    // Open language selector
    const langSwitcher = page.locator('.lang-switcher summary');
    await langSwitcher.click();

    // Check that language labels are clean (not raw JSON)
    const englishOption = page.locator('.lang-switcher__option:has-text("English")');
    await expect(englishOption).toBeVisible();

    const spanishOption = page.locator('.lang-switcher__option:has-text("Español")');
    await expect(spanishOption).toBeVisible();

    const portugueseOption = page.locator('.lang-switcher__option:has-text("Português")');
    await expect(portugueseOption).toBeVisible();

    // Ensure no raw JSON artifacts like "XD Global" or ["en"]
    const panel = page.locator('.lang-switcher__panel');
    const panelText = await panel.textContent();
    expect(panelText).not.toContain('XD');
    expect(panelText).not.toContain('["');
    expect(panelText).not.toContain('Global');
  });
});

test.describe('Blog page tests', () => {
  test('blog page shows posts and no empty state by default', async ({ page }) => {
    await page.goto(`${BASE_URL}/en/blog/`);

    // Check that at least one post title exists
    const blogCards = page.locator('.blog-card');
    const count = await blogCards.count();
    expect(count).toBeGreaterThan(0);

    // Check that empty state message is NOT visible by default
    const emptyState = page.locator('#blog-empty');
    await expect(emptyState).toBeHidden();
  });

  test('blog filter works without errors', async ({ page }) => {
    await page.goto(`${BASE_URL}/en/blog/`);

    // Select a category filter
    const categoryFilter = page.locator('#category-filter');
    await categoryFilter.selectOption({ index: 1 }); // Select first non-"All" option

    // Page should not crash, and either posts or empty state should show
    // But NOT both at the same time
    const blogCards = page.locator('.blog-card:visible');
    const emptyState = page.locator('#blog-empty');

    const visibleCards = await blogCards.count();
    const emptyVisible = await emptyState.isVisible();

    if (visibleCards > 0) {
      expect(emptyVisible).toBe(false);
    } else {
      expect(emptyVisible).toBe(true);
    }
  });
});

test.describe('Contact page tests', () => {
  test('contact page has reveal button and email is hidden initially', async ({ page }) => {
    await page.goto(`${BASE_URL}/en/contact/`);

    // Check reveal button exists
    const revealBtn = page.locator('#reveal-email');
    await expect(revealBtn).toBeVisible();

    // Check email container exists but has no mailto link initially
    const emailContainer = page.locator('#contact-email');
    await expect(emailContainer).toBeVisible();

    const mailtoLink = emailContainer.locator('a[href^="mailto:"]');
    await expect(mailtoLink).not.toBeVisible();
  });

  test('clicking reveal button shows email address', async ({ page }) => {
    await page.goto(`${BASE_URL}/en/contact/`);

    const revealBtn = page.locator('#reveal-email');
    await revealBtn.click();

    // Email should now be visible as a mailto link
    const emailContainer = page.locator('#contact-email');
    const mailtoLink = emailContainer.locator('a[href^="mailto:"]');
    await expect(mailtoLink).toBeVisible();

    // Check that the email address is actually revealed (not empty)
    const emailText = await mailtoLink.textContent();
    expect(emailText).toContain('@');
  });
});

test.describe('Navigation consistency', () => {
  test('all pages use the same navigation header', async ({ page }) => {
    const pages = [
      `${BASE_URL}/en/`,
      `${BASE_URL}/en/blog/`,
      `${BASE_URL}/en/contact/`,
      `${BASE_URL}/newsletter/`,
    ];

    for (const url of pages) {
      await page.goto(url);

      // Check that masthead exists
      const masthead = page.locator('.masthead');
      await expect(masthead).toBeVisible();

      // Check that language switcher exists
      const langSwitcher = page.locator('.lang-switcher');
      await expect(langSwitcher).toBeVisible();
    }
  });
});
