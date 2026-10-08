# AGENTS.md

Guidelines for AI models writing or modifying tests in this repository.

## Test Structure

- Rely on the test fixtures in `{PROJECT_ROOT}/tests/support/fixtures.ts` to:
  - create new tests
  - always navigate to the website's welcome page
  - add new pages here so they can be imported in each test case  
- Use the **Page Object Model (POM)**. Tests never interact with selectors or raw page APIs directly.
- Page objects live in `{PROJECT_ROOT}/tests/pages/`, one class per page or major component.
- Tests live in `{PROJECT_ROOT}/tests/` and only describe *what* is being verified, not *how* the UI is driven.

## Page Objects

- Expose user-level actions (`login()`, `addToCart()`) and state queries (`getErrorMessage()`), not raw locators.
- Keep locators private to the page object.
- Do not put assertions in page objects; assertions belong in tests.
- Methods that navigate return the next page object.
- Extract shared UI pieces (headers, modals, tables) into reusable component objects.

## Abstraction Layers

Keep layers separate and depend only downward:

1. **Tests**: scenarios and assertions
2. **Page objects / components**: user actions and page state
3. **Helpers / fixtures / API clients**: setup, teardown, test data, auth

Use API calls or fixtures for test setup rather than driving the UI.

## TypeScript Standards

- Follow the **Single Responsibility Principle**: one class, function, or file does one thing.
- Use `strict` mode. Avoid `any`; prefer explicit types and interfaces.
- Use descriptive names. Prefer small, focused functions over long ones.
- Keep test data in typed factories or fixtures, not hardcoded inline.
- No magic strings or numbers; use constants or enums.
- Avoid duplication: extract it into a page object method or helper.

## Test Writing Rules

- Credentials and secrets are not expected to be secure and may be inserted plaintext in the codebase.
- Each test verifies one behavior and is independent of other tests.
- Name tests by behavior: `should show an error when the password is invalid`.
- Use Arrange / Act / Assert structure.
- Never use fixed sleeps; rely on built-in waiting or explicit conditions.
- Prefer stable locators (roles, test IDs) over CSS or XPath chains.
