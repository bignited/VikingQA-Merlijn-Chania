import { test, expect, Page } from '@playwright/test';

const BASE_URL = 'http://training-frontend-angular.s3-website-eu-west-1.amazonaws.com/';

// ---------------------------------------------------------------------------
// Inline page object
// ---------------------------------------------------------------------------
class LoginPage {
  constructor(private readonly page: Page) {}

  async goto() {
    await this.page.goto(BASE_URL);
  }

  async fillUsername(value: string) {
    await this.page.locator('#input-username').fill(value);
  }

  async fillPassword(value: string) {
    await this.page.locator('#input-password').fill(value);
  }

  async submit() {
    await this.page.locator('#button-login').click();
  }

  async login(username: string, password: string) {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.submit();
  }

  /** Error paragraph shown inside the login card */
  errorMessage() {
    return this.page.locator('.login-card p');
  }

  usernameInput() {
    return this.page.locator('#input-username');
  }

  passwordInput() {
    return this.page.locator('#input-password');
  }

  loginButton() {
    return this.page.locator('#button-login');
  }
}

// ---------------------------------------------------------------------------
// LOGIN SCENARIOS
// ---------------------------------------------------------------------------

test.describe('Login: wrong password for a non-existent user', {
  tag: '@case',
  annotation: {
    type: 'description',
    description: 'A user submits credentials that do not match any account and is rejected with a clear error message, remaining on the login page.',
  },
}, () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('should show an error when the credentials are wrong', async ({ page }) => {
    await test.step('Submit with a non-existent username and wrong password', async () => {
      await loginPage.login('no_such_user_xyz_123', 'wrong-password');
    });
    await test.step('Assert error is displayed and user stays on login page', async () => {
      await expect(loginPage.errorMessage()).toBeVisible();
      await expect(loginPage.errorMessage()).toHaveText('Incorrect Credentials');
      await expect(page).toHaveURL(BASE_URL);
    });
  });
});

test.describe('Login: unregistered username with plausible password', {
  tag: '@case',
  annotation: {
    type: 'description',
    description: 'A user submits an email address that is not registered; the app rejects without revealing whether the account exists.',
  },
}, () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('should show an error for a non-existent username', async ({ page }) => {
    await test.step('Submit with a username that is not registered', async () => {
      await loginPage.login('ghost_user_99999', 'SomePass1!');
    });
    await test.step('Assert rejection and no detail about account existence', async () => {
      await expect(loginPage.errorMessage()).toBeVisible();
      await expect(loginPage.errorMessage()).toHaveText('Incorrect Credentials');
      await expect(page).toHaveURL(BASE_URL);
    });
  });
});

test.describe('Login: empty fields', {
  tag: '@case',
  annotation: {
    type: 'description',
    description: 'A user submits the login form without filling in either field and the app prevents navigation away from the login page.',
  },
}, () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('should not proceed when username and password are both empty', async ({ page }) => {
    await test.step('Click login without entering any credentials', async () => {
      await loginPage.submit();
    });
    await test.step('Assert the user stays on the login page', async () => {
      await expect(page).toHaveURL(BASE_URL);
      await expect(loginPage.usernameInput()).toBeVisible();
      await expect(loginPage.passwordInput()).toBeVisible();
    });
  });
});

test.describe('Login: username filled but password left blank', {
  tag: '@case',
  annotation: {
    type: 'description',
    description: 'A user fills in only the username and leaves the password blank — the app must not log them in.',
  },
}, () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('should reject login when password field is empty', async ({ page }) => {
    await test.step('Fill username but leave password blank', async () => {
      await loginPage.fillUsername('some_user');
      await loginPage.submit();
    });
    await test.step('Assert the user is not navigated away from the login page', async () => {
      await expect(page).toHaveURL(BASE_URL);
      await expect(loginPage.loginButton()).toBeVisible();
    });
  });
});

test.describe('Login: SQL injection attempt is rejected', {
  tag: '@case',
  annotation: {
    type: 'description',
    description: 'A malicious user submits a classic SQL injection string in the username field; the login must be rejected and the page must remain stable.',
  },
}, () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('should reject a SQL injection payload and show an error', async ({ page }) => {
    await test.step('Submit a SQL injection string as the username', async () => {
      await loginPage.login("' OR '1'='1", 'irrelevant');
    });
    await test.step('Assert the page remains on login with an error, not a bypass', async () => {
      await expect(page).toHaveURL(BASE_URL);
      await expect(loginPage.errorMessage()).toBeVisible();
      await expect(loginPage.errorMessage()).toHaveText('Incorrect Credentials');
    });
  });
});

// ---------------------------------------------------------------------------
// PASSWORD RESET SCENARIOS — placeholders (no reset feature exists on this app)
// ---------------------------------------------------------------------------

test.describe('Password reset: request link for registered email', {
  tag: '@case',
  annotation: {
    type: 'description',
    description: 'A registered user requests a password reset link; the app sends an email and shows a generic confirmation to prevent user enumeration.',
  },
}, () => {
  test.fixme('should send a reset email and show a generic confirmation', async () => {});
});

test.describe('Password reset: expired reset link is rejected', {
  tag: '@case',
  annotation: {
    type: 'description',
    description: 'A user clicks a password reset link after it has expired; the app rejects it and prompts the user to request a new one.',
  },
}, () => {
  test.fixme('should reject an expired reset link and prompt the user to request a new one', async () => {});
});

test.describe('Password reset: new password must meet complexity rules', {
  tag: '@case',
  annotation: {
    type: 'description',
    description: 'A user submits a new password that is too short or lacks required character types; the app rejects it with inline validation.',
  },
}, () => {
  test.fixme('should reject a weak new password and list unmet requirements', async () => {});
});

test.describe('Password reset: cannot reuse the current password', {
  tag: '@case',
  annotation: {
    type: 'description',
    description: 'A user attempts to set their new password to the same value as their current password; the app must block this.',
  },
}, () => {
  test.fixme('should reject a new password that matches the current password', async () => {});
});

test.describe('Password reset: reset link can only be used once', {
  tag: '@case',
  annotation: {
    type: 'description',
    description: 'After a user successfully resets their password, clicking the same link again must be rejected as already used.',
  },
}, () => {
  test.fixme('should reject a previously used reset link as invalid', async () => {});
});
