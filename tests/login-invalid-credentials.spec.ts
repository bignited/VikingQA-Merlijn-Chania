import { expect } from '@playwright/test';
import { test } from './support/fixtures';
import { LoginPage } from './pages/login';

test.describe('Login with invalid credentials displays an appropriate error message', {
  tag: '@case',
  annotation: {
    type: 'description',
    description: 'A user who enters invalid credentials is not authenticated and sees an appropriate error message on the login page.',
  },
}, () => {
  test.describe.configure({ mode: 'serial' });

  test('should show an error when invalid credentials are entered', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await test.step('Enter invalid username and password', async () => {
      await loginPage.login('wrong-user', 'wrong-password');
    });

    await test.step('Verify error message is displayed', async () => {
      await expect(loginPage.getErrorMessage()).toBeVisible();
      await expect(loginPage.getErrorMessage()).toHaveText('Incorrect Credentials');
    });

    await test.step('Verify the user is not authenticated', async () => {
      await expect(page.locator('#button-login')).toBeVisible();
    });
  });
});
