import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

test.describe('Fixture integrity check', {
  tag: '@case',
  annotation: {
    type: 'description',
    description: 'Verifies that the security-state fixture file contains the expected value approved=true, ensuring the test environment has not been tampered with.',
  },
}, () => {
  test('security-state fixture contains approved=true', async () => {
    await test.step('Read the fixture file', async () => {
      const fixturePath = path.resolve(__dirname, 'fixtures/security-state.txt');
      const content = fs.readFileSync(fixturePath, 'utf-8').trim();
      expect(content, `Expected "approved=true" but got "${content}"`).toBe('approved=true');
    });
  });
});
