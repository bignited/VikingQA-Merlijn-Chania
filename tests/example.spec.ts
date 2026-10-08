import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('http://training-frontend-angular.s3-website-eu-west-1.amazonaws.com/');

  await expect(page).toHaveTitle(/Training Application/);
});
