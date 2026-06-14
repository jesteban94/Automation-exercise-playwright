import { test, expect } from '@playwright/test';

test.describe('Test group', () => {
  test('seed', async ({ page }) => {
    // generate code here.
    const pageUrl = 'https://automationexercise.com/';
    await page.goto(pageUrl);
  });
});
