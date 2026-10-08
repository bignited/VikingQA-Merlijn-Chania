import { expect } from '@playwright/test';
import { test } from '../support/fixture';

test('Welcome page has correct title', async ({ page }) => {
  await expect(page).toHaveTitle(/Training Application/);
});
