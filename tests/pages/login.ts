import { Page } from '@playwright/test';

export class LoginPage {
  private readonly usernameInput = this.page.locator('#input-username');
  private readonly passwordInput = this.page.locator('#input-password');
  private readonly loginButton = this.page.locator('#button-login');
  private readonly errorMessage = this.page.locator('p');

  constructor(private readonly page: Page) {}

  async fillUsername(username: string): Promise<void> {
    await this.usernameInput.fill(username);
  }

  async fillPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  async submit(): Promise<void> {
    await this.loginButton.click();
  }

  async login(username: string, password: string): Promise<void> {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.submit();
  }

  async getErrorMessage(): Promise<string | null> {
    return this.errorMessage.textContent();
  }

  async isErrorVisible(): Promise<boolean> {
    return this.errorMessage.isVisible();
  }
}
