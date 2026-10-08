import { Page } from '@playwright/test';
import { OverviewPage } from './overview.page';

export class LoginPage {
  private readonly usernameInput = this.page.locator('#input-username');
  private readonly passwordInput = this.page.locator('#input-password');
  private readonly loginButton = this.page.locator('#button-login');

  constructor(private readonly page: Page) {}

  async login(username: string, password: string): Promise<OverviewPage> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    return new OverviewPage(this.page);
  }
}
