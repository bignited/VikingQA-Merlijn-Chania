import { expect } from '@playwright/test';
import { test } from '../support/fixtures';
import { LoginPage } from './pages/login.page';
import { OverviewPage } from './pages/overview.page';

const CREDENTIALS = { username: 'a', password: '19' } as const;
const COURSE_NAME = 'introduction to angular';

test.describe('A user enrolls in a training course', {
  tag: '@case',
  annotation: {
    type: 'description',
    description:
      'A logged-in user opens the training overview, clicks Enroll on a course, and verifies the success notification appears and the button changes to Already Enrolled.',
  },
}, () => {
  test.describe.configure({ mode: 'serial' });

  let overviewPage: OverviewPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    overviewPage = await loginPage.login(CREDENTIALS.username, CREDENTIALS.password);
  });

  test('should redirect to the overview page after login', async ({ page }) => {
    await test.step('Verify the URL is the overview page', async () => {
      await expect(page).toHaveURL(/\/overview$/);
    });
  });

  test('should show a success notification after enrolling', async () => {
    await test.step('Click Enroll on the course', async () => {
      await overviewPage.enrollInCourse(COURSE_NAME);
    });

    await test.step('Verify the success toast is visible', async () => {
      await expect(overviewPage.getSuccessToast()).toBeVisible();
    });
  });

  test('should disable the Enroll button after enrolling', async () => {
    await test.step('Click Enroll on the course', async () => {
      await overviewPage.enrollInCourse(COURSE_NAME);
    });

    await test.step('Verify the button is disabled and reads Already Enrolled', async () => {
      const button = overviewPage.getCourseButton(COURSE_NAME);
      await expect(button).toBeDisabled();
      await expect(button).toHaveText('Already Enrolled');
    });
  });
});
