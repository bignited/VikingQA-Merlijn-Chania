import { test, expect } from '../support/fixtures';

test.describe('A user logs in with valid credentials', {
  tag: '@case',
  annotation: {
    type: 'description',
    description: 'A user navigates to the application, fills in correct credentials, clicks Login, and sees the Logout button confirming a successful login.',
  },
}, () => {
  test.describe.configure({ mode: 'serial' });

  test('should show the logout button after a successful login', async ({ loginPage, overviewPage }) => {
    await test.step('Fill in username and password and click Login', async () => {
      await loginPage.login(process.env.USERNAME_CORRECT!, process.env.PASSWORD_CORRECT!);
    });

    await test.step('Verify the Logout button is visible', async () => {
      await expect(overviewPage.logoutButton).toBeVisible();
    });
  });
});
