import { Page } from '@playwright/test';

export class LoginPage {
  private readonly usernameInput = this.page.locator('#input-username');
  private readonly passwordInput = this.page.locator('#input-password');
  private readonly loginButton = this.page.locator('#button-login');
  private readonly errorMessage = this.page.locator('p', { hasText: 'Incorrect Credentials' });

  constructor(private readonly page: Page) {}

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async getErrorMessage(): Promise<string> {
    return this.errorMessage.innerText();
  }

  isErrorVisible(): Promise<boolean> {
    return this.errorMessage.isVisible();
  }
}
