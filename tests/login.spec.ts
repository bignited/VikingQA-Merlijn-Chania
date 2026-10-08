import { expect } from '@playwright/test';
import { test } from '../support/fixtures';
import { LoginPage } from './pages/login.page';
import { OverviewPage } from './pages/overview.page';

const USERNAME = 'aa1';
const PASSWORD = 'ab';

test.describe('A user logs in with valid credentials', {
  tag: '@case',
  annotation: {
    type: 'description',
    description: 'A user enters valid credentials on the login page and sees the Logout button, confirming they are logged in.',
  },
}, () => {
  test('should show the logout button after logging in', async ({ page }) => {
    await test.step('Fill in username and password', async () => {
      const loginPage = new LoginPage(page);
      await loginPage.login(USERNAME, PASSWORD);
    });

    await test.step('Verify the logout button is visible', async () => {
      const overviewPage = new OverviewPage(page);
      await expect(overviewPage.logoutButton).toBeVisible();
    });
  });
});
