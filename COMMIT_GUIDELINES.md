# Commit Message Guidelines

This project uses [Husky](https://github.com/typicode/husky) and [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) to enforce a consistent commit style. Follow these rules to keep our commit history readable and easy to understand.

---

## Table of Contents

1. [Commit Format](#commit-format)
2. [Commit Types](#commit-types)
3. [Examples](#examples)
4. [Husky Setup](#husky-setup)
5. [Enforcement with Husky](#enforcement-with-husky)

---

## 1. Commit Format

Each commit message should have the following structure:

```
<type>(<scope>): <subject>

[optional body]

[optional footer(s)]
```

### Rules:

- **type**: The category of change (e.g., `feat`, `fix`, `docs`, etc.).
- **scope** (optional): A short context or module name (e.g., `api`, `frontend`, `backend`).
- **subject**: A brief summary of the change in **imperative** mood (e.g., "add feature," not "added feature").
- **body** (optional): More details about the change, wrapped at 72 characters.
- **footer** (optional): Includes any breaking changes or issues closed (e.g., `BREAKING CHANGE` or `Closes #123`).

---

## 2. Commit Types

Here are the allowed commit types, as per [Conventional Commits](https://www.conventionalcommits.org/):

| **Type**     | **Description**                                                                 |
| ------------ | ------------------------------------------------------------------------------- |
| **feat**     | A new feature                                                                   |
| **fix**      | A bug fix                                                                       |
| **docs**     | Documentation-only changes                                                      |
| **style**    | Code style changes (spacing, formatting, etc.) that do not affect functionality |
| **refactor** | A code change that neither fixes a bug nor adds a feature                       |
| **perf**     | A code change that improves performance                                         |
| **test**     | Adding or correcting tests                                                      |
| **build**    | Changes affecting build system or dependencies                                  |
| **ci**       | Changes to our CI configuration files and scripts                               |
| **chore**    | Other changes that do not affect `src` or test files                            |
| **revert**   | Reverts a previous commit                                                       |

---

## 3. Examples

Here are sample commit messages for each type:

### Feature

```
feat: add user profile page
```

- Adds a new user profile page to the application.

With scope:

```
feat(auth): implement OAuth2 login
```

- Adds a new OAuth2 login feature to the `auth` module.

---

### Fix

```
fix: resolve crash on large image uploads
```

- Fixes a crash issue when users upload large images.

With scope:

```
fix(api): correct error handling for invalid tokens
```

- Fixes token validation errors in the API module.

---

### Documentation

```
docs: update README with installation instructions
```

- Updates the README to include setup steps.

With scope:

```
docs(api): clarify query parameters in /users endpoint
```

- Clarifies the expected query parameters for the API `/users` endpoint.

---

### Style

```
style: fix formatting in config files
```

- Fixes whitespace or formatting issues without altering functionality.

With scope:

```
style(frontend): apply consistent linting rules
```

- Fixes code style issues across the frontend.

---

### Refactor

```
refactor: rename AuthService to UserService
```

- Renames the `AuthService` class for better clarity.

With scope:

```
refactor(core): extract utility functions into helper module
```

- Restructures helper functions to improve code organization.

---

### Performance

```
perf: optimize database queries for faster user loading
```

- Improves database query performance.

With scope:

```
perf(api): cache responses for popular endpoints
```

- Adds caching for frequently accessed API endpoints.

---

### Test

```
test: add unit tests for user login functionality
```

- Adds missing unit tests for user login.

With scope:

```
test(backend): fix broken integration tests for payment service
```

- Fixes or updates integration tests in the `backend`.

---

### Build

```
build: upgrade webpack to version 5
```

- Updates the build system to use Webpack 5.

With scope:

```
build(docker): reduce image size for deployment
```

- Optimizes the Dockerfile to produce smaller images.

---

### CI

```
ci: add GitHub Actions for running tests
```

- Adds a new CI workflow for test automation.

With scope:

```
ci(deploy): update staging deployment script
```

- Modifies CI deployment scripts for the staging environment.

---

### Chore

```
chore: remove unused assets from the repository
```

- Cleans up files without affecting application code.

With scope:

```
chore(scripts): add new local dev script for debugging
```

- Adds a useful script for local development.

---

### Revert

```
revert: revert "feat: add user profile page"

This reverts commit abc123.
```

- Reverts a previously added feature.

---

## 4. Husky Setup

To enforce these guidelines, the following setup is required:

1. Install Husky and Commitlint:

   ```bash
   npm install --save-dev husky @commitlint/cli @commitlint/config-conventional
   ```

2. Add a `prepare` script in your `package.json`:

   ```json
   {
     "scripts": {
       "prepare": "husky install"
     }
   }
   ```

3. Initialize Husky:

   ```bash
   npx husky install
   ```

4. Add a Commitlint configuration file (`commitlint.config.js` or `.commitlintrc.js`):
   ```js
   module.exports = {
     extends: ['@commitlint/config-conventional'],
   };
   ```

---

## 5. Enforcement with Husky

Husky uses Git hooks to enforce commit message rules. To set this up:

1. Add a `commit-msg` hook:

   ```bash
   npx husky add .husky/commit-msg 'npx commitlint --edit "$1"'
   ```

2. Ensure this script is executable:

   ```bash
   chmod +x .husky/commit-msg
   ```

3. From now on, any commits that do not follow the guidelines will be rejected.

---
