# Playwright - Web Functional Tests

This project is to e2e test the Product Purchase web application

## Getting Started

- ### Prerequisites
    - Node.js
    - npm

## Installing dependencies

 ```
 npm install
 ```

 ## Installing Playwright

```
 npm init playwright@latest
```
Run the install command and select the following to get started:
- Choose between TypeScript or JavaScript (default is TypeScript)
- Name of your Tests folder (default is tests or e2e if you already have a tests folder in your project)
- Add a GitHub Actions workflow to easily run tests on CI
- Install Playwright browsers (default is true)
- or alternatively can install browser with command `npx playwright install --with-deps chromium`

## Running the tests in headless mode

 ```
 npx playwright test
 ```

## Running the tests in headed mode

 ```
 npx playwright test --headed
 ```
## Running the tests with debugging

 ```
 npx playwright test --debug
 ```

 ## Generate test report

 ```
 npx playwright show-report
```
