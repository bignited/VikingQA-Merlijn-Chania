import { expect } from '@playwright/test';
import { test } from './support/fixtures';
import { LoginPage } from './pages/login';

test.describe('A user attempts to log in with invalid credentials', {
  tag: '@case',
  annotation: {
    type: 'description',
    description: 'A user submits the login form with an incorrect username and password and sees an error message.',
  },
}, () => {
  test.describe.configure({ mode: 'serial' });

  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
  });

  test('should show an error when the password is invalid', async () => {
    await test.step('Enter incorrect credentials', async () => {
      await loginPage.login('wronguser', 'wrongpass');
    });

    await test.step('Verify error message is displayed', async () => {
      expect(await loginPage.getErrorMessage()).toContain('Incorrect Credentials');
    });
  });
});
