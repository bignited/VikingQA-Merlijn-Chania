import { expect } from '@playwright/test';
import { test } from './support/fixtures';
import { LoginPage } from './pages/login';

test.describe('A user submits the login form with required fields empty', {
  tag: '@case',
  annotation: {
    type: 'description',
    description: 'A user clicks Login without filling in any fields and the form shows an error indicating credentials are required.',
  },
}, () => {
  test.describe.configure({ mode: 'serial' });

  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
  });

  test('should show an error when both fields are left empty', async () => {
    await test.step('Submit the form without entering any credentials', async () => {
      await loginPage.submit();
    });

    await test.step('Verify error message is displayed', async () => {
      expect(await loginPage.getErrorMessage()).toContain('Incorrect Credentials');
    });
  });

  test('should show an error when only the username is filled', async () => {
    await test.step('Enter a username but leave password empty', async () => {
      await loginPage.fillUsername('someuser');
      await loginPage.submit();
    });

    await test.step('Verify error message is displayed', async () => {
      expect(await loginPage.getErrorMessage()).toContain('Incorrect Credentials');
    });
  });

  test('should show an error when only the password is filled', async () => {
    await test.step('Enter a password but leave username empty', async () => {
      await loginPage.fillPassword('somepass');
      await loginPage.submit();
    });

    await test.step('Verify error message is displayed', async () => {
      expect(await loginPage.getErrorMessage()).toContain('Incorrect Credentials');
    });
  });
});
