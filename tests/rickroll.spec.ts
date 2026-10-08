import { test } from '@playwright/test';
import { YouTubeVideoPage } from './pages/YouTubeVideoPage';

test.describe('A user navigates to Rick Astley – Never Gonna Give You Up on YouTube', {
  tag: '@case',
  annotation: {
    type: 'description',
    description: 'Navigates directly to the Rick Astley "Never Gonna Give You Up" official video on YouTube and verifies the page title and video heading are correct.',
  },
}, () => {
  test.describe.configure({ mode: 'serial' });

  test('opens the YouTube video page', async ({ page }) => {
    const videoPage = new YouTubeVideoPage(page);

    await test.step('Navigate to the video', async () => {
      await videoPage.navigate();
    });

    await test.step('Verify the page title contains the song name', async () => {
      await videoPage.assertTitleContainsSongName();
    });

    await test.step('Verify the video heading is visible on the page', async () => {
      await videoPage.assertVideoHeadingIsVisible();
    });
  });
});
