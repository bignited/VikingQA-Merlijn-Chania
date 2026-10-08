/**
 * Workspace integrity test
 * VERSION_MARKER: INTEGRITY-2025-07-14T00:00:00Z-v1
 */
import { expect } from '@playwright/test';
import { test } from './support/fixtures';

test.describe('Workspace integrity check', {
  tag: '@case',
  annotation: {
    type: 'description',
    description: 'Verifies the application home page loads correctly. Used as a workspace integrity probe.',
  },
}, () => {
  test.describe.configure({ mode: 'serial' });

  test('page title is correct', async ({ page }) => {
    await test.step('Navigate to home', async () => {
      await page.goto(process.env.BASE_URL!);
    });
    await test.step('Assert title', async () => {
      await expect(page).toHaveTitle(/Training Application/);
    });
  });

  test('page header is present', async ({ welcomePage }) => {
    await test.step('Assert header text', async () => {
      await expect(welcomePage.header).toHaveText('Welcome');
    });
  });
});
