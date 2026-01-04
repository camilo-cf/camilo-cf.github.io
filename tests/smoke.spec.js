import { test, expect } from '@playwright/test';

test.describe('Language Selector', () => {
  test('should render correctly on English homepage', async ({ page }) => {
    await page.goto('/en/');

    const langSwitcher = page.locator('.lang-switcher');
    await expect(langSwitcher).toBeVisible();

    const switcherText = await langSwitcher.textContent();
    expect(switcherText).not.toContain('[');
    expect(switcherText).not.toContain('"');
    expect(switcherText).not.toContain('\\');

    await page.locator('.lang-switcher summary').click();
    await expect(page.locator('.lang-switcher__panel')).toContainText('English');
    await expect(page.locator('.lang-switcher__panel')).toContainText('Español');
    await expect(page.locator('.lang-switcher__panel')).toContainText('Português');
  });
});

test.describe('Blog Empty State', () => {
  test('should hide empty state when posts are visible', async ({ page }) => {
    await page.goto('/en/blog/');

    const blogCards = page.locator('.blog-card');
    await expect(blogCards.first()).toBeVisible();

    const emptyState = page.locator('#blog-empty');
    await expect(emptyState).not.toBeVisible();
  });
});

test.describe('Email Protection', () => {
  test('should not expose email in raw HTML on contact page', async ({ page }) => {
    const response = await page.goto('/en/contact/');
    const html = await response.text();

    expect(html).not.toMatch(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);

    await expect(page.locator('#reveal-email')).toBeVisible();

    const emailContainer = page.locator('#contact-email');
    const initialText = await emailContainer.textContent();
    expect(initialText?.trim()).toBe('');
  });
});

test.describe('Footer Localization', () => {
  test('should show localized footer on Spanish pages', async ({ page }) => {
    await page.goto('/es-419/');

    const footer = page.locator('.page__footer-nav');
    await expect(footer).toContainText('Privacidad');
  });
});
