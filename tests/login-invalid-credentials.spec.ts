import { expect } from '@playwright/test';
import { test } from './support/fixtures';
import { LoginPage } from './pages/login';

test.describe('Invalid login credentials are rejected', {
  tag: '@case',
  annotation: {
    type: 'description',
    description: 'A user who provides wrong credentials on the login page is shown an error and is not authenticated.',
  },
}, () => {
  test.describe.configure({ mode: 'serial' });

  test('should show an error when the username is invalid', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await test.step('Enter invalid credentials and submit', async () => {
      await loginPage.login('invalid-user', 'invalid-pass');
    });

    await test.step('Verify the error message is displayed', async () => {
      await expect(page.locator('p', { hasText: 'Incorrect Credentials' })).toBeVisible();
    });
  });

  test('should remain on the login page after a failed attempt', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await test.step('Submit with wrong credentials', async () => {
      await loginPage.login('wrong-user', 'wrong-pass');
    });

    await test.step('Verify the user stays on the login page', async () => {
      await expect(page.locator('.login-card h3')).toBeVisible();
    });
  });
});
