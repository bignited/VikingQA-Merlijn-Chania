import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { OverviewPage } from '../pages/OverviewPage';

type Fixtures = {
  loginPage: LoginPage;
  overviewPage: OverviewPage;
};

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await use(loginPage);
  },
  overviewPage: async ({ page }, use) => {
    await use(new OverviewPage(page));
  },
});

export { expect } from '@playwright/test';
