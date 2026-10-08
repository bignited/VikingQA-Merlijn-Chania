import { test, expect } from '@playwright/test';

test.describe('A user navigates to Rick Astley – Never Gonna Give You Up on YouTube', {
  tag: '@case',
  annotation: {
    type: 'description',
    description: 'Navigates directly to the Rick Astley "Never Gonna Give You Up" official video on YouTube and verifies the page title and video heading are correct.',
  },
}, () => {
  test.describe.configure({ mode: 'serial' });

  test('opens the YouTube video page', async ({ page }) => {
    await test.step('Navigate to the video', async () => {
      await page.goto('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
    });

    await test.step('Verify the page title contains the song name', async () => {
      await expect(page).toHaveTitle(/Never Gonna Give You Up/i);
    });

    await test.step('Verify the video heading is visible on the page', async () => {
      await expect(
        page.locator('h1').filter({ hasText: /Never Gonna Give You Up/i }).first(),
      ).toBeVisible();
    });
  });
});
