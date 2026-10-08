import { type Page, type Locator, expect } from '@playwright/test';

const VIDEO_URL = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';

export class YouTubeVideoPage {
  private readonly page: Page;
  private readonly videoHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.videoHeading = page.locator('h1').filter({ hasText: /Never Gonna Give You Up/i }).first();
  }

  async navigate(): Promise<void> {
    await this.page.goto(VIDEO_URL);
  }

  async assertTitleContainsSongName(): Promise<void> {
    await expect(this.page).toHaveTitle(/Never Gonna Give You Up/i);
  }

  async assertVideoHeadingIsVisible(): Promise<void> {
    await expect(this.videoHeading).toBeVisible();
  }
}
