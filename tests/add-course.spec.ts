import { expect } from '@playwright/test';
import { test } from '../support/fixtures';

const BASE_URL = 'http://training-frontend-angular.s3-website-eu-west-1.amazonaws.com';
const USERNAME = 'aa1';
const PASSWORD = 'ab';

test.describe('A user adds a new course', {
  tag: '@case',
  annotation: {
    type: 'description',
    description: 'A logged-in user fills in the create-course form with valid data, reviews the summary, approves it, and sees the new course listed on the overview.',
  },
}, () => {
  test.describe.configure({ mode: 'serial' });

  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
    await page.locator('#input-username').fill(USERNAME);
    await page.locator('#input-password').fill(PASSWORD);
    await page.locator('#button-login').click();
    await page.waitForURL(`${BASE_URL}/overview`);
  });

  test('navigates to the create-course page', async ({ page }) => {
    await test.step('Click the Create button in the navbar', async () => {
      await page.locator('#create-course-button').click();
      await expect(page).toHaveURL(`${BASE_URL}/create-course`);
    });
  });

  test('fills in the course form and submits it', async ({ page }) => {
    await test.step('Open the create-course page', async () => {
      await page.locator('#create-course-button').click();
      await page.waitForURL(`${BASE_URL}/create-course`);
    });

    await test.step('Fill in course details', async () => {
      await page.locator('#input-course-name').fill('Test Automation Course');
      await page.locator('#textarea-description').fill('A comprehensive course on test automation.');
      await page.locator('#radio-course-Hands\\ On').click();
    });

    await test.step('Fill in logistics', async () => {
      await page.locator('#select-location').selectOption('Antwerpen');
      await page.locator('#input-date').fill('2027-01-15');
      await page.locator('#input-time-start').fill('09:00');
      await page.locator('#input-time-end').fill('17:00');
    });

    await test.step('Fill in trainer contact details', async () => {
      await page.locator('#input-teacher').fill('Jane Doe');
      await page.locator('#input-contact-phone').fill('+32412345678');
      await page.locator('#input-contact-email').fill('jane.doe@example.com');
    });

    await test.step('Submit the form and land on the summary page', async () => {
      await page.locator('#button-add-course').click();
      await expect(page).toHaveURL(`${BASE_URL}/summary`);
    });
  });

  test('approves the course and sees it on the overview', async ({ page }) => {
    await test.step('Open the create-course page and fill in the form', async () => {
      await page.locator('#create-course-button').click();
      await page.waitForURL(`${BASE_URL}/create-course`);
      await page.locator('#input-course-name').fill('Test Automation Course');
      await page.locator('#textarea-description').fill('A comprehensive course on test automation.');
      await page.locator('#radio-course-Hands\\ On').click();
      await page.locator('#select-location').selectOption('Antwerpen');
      await page.locator('#input-date').fill('2027-01-15');
      await page.locator('#input-time-start').fill('09:00');
      await page.locator('#input-time-end').fill('17:00');
      await page.locator('#input-teacher').fill('Jane Doe');
      await page.locator('#input-contact-phone').fill('+32412345678');
      await page.locator('#input-contact-email').fill('jane.doe@example.com');
      await page.locator('#button-add-course').click();
      await page.waitForURL(`${BASE_URL}/summary`);
    });

    await test.step('Approve the course on the summary page', async () => {
      await page.locator('#button-approve').click();
      await expect(page).toHaveURL(`${BASE_URL}/overview`);
    });

    await test.step('Verify the new course appears on the overview', async () => {
      await expect(page.getByRole('heading', { name: 'Test Automation Course' })).toBeVisible();
    });
  });
});
