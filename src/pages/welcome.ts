import { Page } from '@playwright/test';

export class WelcomePage {
  readonly header = this.page.locator('.login-card h3');

  constructor(private readonly page: Page) {}
}
