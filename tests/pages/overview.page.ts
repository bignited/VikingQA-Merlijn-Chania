import { Page, Locator } from '@playwright/test';

const COURSE_BUTTON_SUFFIX = '-course-button';

export class OverviewPage {
  constructor(private readonly page: Page) {}

  private courseButton(courseName: string): Locator {
    return this.page.locator(`[id="${courseName.toLowerCase()}${COURSE_BUTTON_SUFFIX}"]`);
  }

  async enrollInCourse(courseName: string): Promise<void> {
    await this.courseButton(courseName).click();
  }

  getCourseButton(courseName: string): Locator {
    return this.courseButton(courseName);
  }

  getSuccessToast(): Locator {
    return this.page.getByText('Enrolled successfully');
  }
}
