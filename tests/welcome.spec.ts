import { expect } from '@playwright/test';
import { test } from '../support/fixtures';

test('Welcome page has correct title', async ({ page }) => {
  await expect(page).toHaveTitle(/Training Application/);
});

test('Welcome page has correct header', async ({ welcomePage }) => {
  await expect(welcomePage.header).toHaveText('Welcome');
});
