import { test as base } from '@playwright/test';
import { WelcomePage } from '../pages/welcome';

type Options = {
  startUrl: string;
  welcomePage: WelcomePage;
};

export const test = base.extend<Options>({
  startUrl: ['http://training-frontend-angular.s3-website-eu-west-1.amazonaws.com/', { option: true }],

  page: async ({ page, startUrl }, use) => {
    await page.goto(startUrl);
    await use(page);
  },

  welcomePage: async ({ page }, use) => {
    await use(new WelcomePage(page));
  },
});
