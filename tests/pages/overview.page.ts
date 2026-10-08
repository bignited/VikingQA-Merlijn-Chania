import { Page } from '@playwright/test';

export class OverviewPage {
  readonly logoutButton = this.page.locator('#logout-button');

  constructor(private readonly page: Page) {}

  isLoggedIn(): Promise<boolean> {
    return this.logoutButton.isVisible();
  }
}
