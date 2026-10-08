import { Page, Locator } from '@playwright/test';

export class OverviewPage {
  readonly logoutButton: Locator = this.page.getByRole('button', { name: 'Logout' });

  constructor(private readonly page: Page) {}

  isLoggedIn(): Locator {
    return this.logoutButton;
  }
}
