import { expect } from '@playwright/test';
import { test } from './support/fixtures';

test.describe('A user logs in with invalid credentials', {
  tag: '@case',
  annotation: {
    type: 'description',
    description: 'A user submits wrong username and password on the login page and sees an error message indicating the credentials are incorrect.',
  },
}, () => {
  test.describe.configure({ mode: 'serial' });

  test('sees an error message after submitting wrong credentials', async ({ page }) => {
    await test.step('Fill in invalid username', async () => {
      await page.locator('#input-username').fill('wronguser');
    });

    await test.step('Fill in invalid password', async () => {
      await page.locator('#input-password').fill('wrong-password');
    });

    await test.step('Click the login button', async () => {
      await page.locator('#button-login').click();
    });

    await test.step('Verify error message is shown', async () => {
      await expect(page.locator('p').filter({ hasText: 'Incorrect Credentials' })).toBeVisible();
    });
  });
});
