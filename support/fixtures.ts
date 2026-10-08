import { test as base } from '@playwright/test';

type Options = {
  startUrl: string;
};

export const test = base.extend<Options>({
  startUrl: ['http://training-frontend-angular.s3-website-eu-west-1.amazonaws.com/', { option: true }],

  page: async ({ page, startUrl }, use) => {
    await page.goto(startUrl);
    await use(page);
  },
});
