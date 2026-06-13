// import { test, expect } from '@playwright/test';
// import { RegisterPage } from '../../pages/RegisterPage';
// import { OpenAccountPage } from '../../pages/OpenAccountPage';
// import { generateUsername } from '../../utils/testDataGenerator';
// import users from '../../test-data/users.json';

// test.describe('Open Account Tests', () => {

//   // TC-UI-ACC-01 - open new savings account
//   test('open savings account', async ({ page }) => {
//     const username = generateUsername();
//     const registerPage = new RegisterPage(page);
//     await registerPage.goto();
//     await registerPage.register(users, username);
//     const openAccountPage = new OpenAccountPage(page);
//     await openAccountPage.goto();
//     await openAccountPage.AccountID.locator('option').first().waitFor({ state: 'attached' });
//     const fromAccountId = await openAccountPage.AccountID.inputValue();
//     await openAccountPage.openAccount('1', fromAccountId);
//     await openAccountPage.SuccessMessage.waitFor({ state: 'visible' });
//     const message = await openAccountPage.getSuccessMessage();
//     expect(message).toContain('Congratulations, your account is now open.');
//   });

//   // TC-UI-ACC-02 - open new checking account
//   test('open new checking account', async ({ page }) => {
//     const username = generateUsername();
//     const registerPage = new RegisterPage(page);
//     await registerPage.goto();
//     await registerPage.register(users, username);
//     const openAccountPage = new OpenAccountPage(page);
//     await openAccountPage.goto();
//     await openAccountPage.AccountID.locator('option').first().waitFor({ state: 'attached' });
//     const fromAccountId = await openAccountPage.AccountID.inputValue();
//     await openAccountPage.openAccount('0', fromAccountId);
//     await openAccountPage.SuccessMessage.waitFor({ state: 'visible' });
//     const message = await openAccountPage.getSuccessMessage();
//     expect(message).toContain('Congratulations, your account is now open.');
//   });

//   // TC-UI-ACC-03 - account overview balance updated after opening
//   test('account overview balance updated after opening', async ({ page }) => {
//     const username = generateUsername();
//     const registerPage = new RegisterPage(page);
//     await registerPage.goto();
//     await registerPage.register(users, username);
//     const openAccountPage = new OpenAccountPage(page);
//     await openAccountPage.goto();
//     await openAccountPage.AccountID.locator('option').first().waitFor({ state: 'attached' });
//     const fromAccountId = await openAccountPage.AccountID.inputValue();
//     await openAccountPage.openAccount('1', fromAccountId);
//     await openAccountPage.SuccessMessage.waitFor({ state: 'visible' });
//     await page.getByRole('link', { name: 'Accounts Overview' }).click();
//     await page.waitForLoadState('networkidle');
//     const accounts = page.locator('#accountTable tbody tr');
//     await expect(accounts).toHaveCount(3);
//   });

// })

// import { test, expect } from '@playwright/test';
// import { RegisterPage } from '../../pages/RegisterPage';
// import { OpenAccountPage } from '../../pages/OpenAccountPage';
// import { generateUsername } from '../../utils/testDataGenerator';
// import users from '../../test-data/users.json';

// test.describe('Open Account Tests', () => {

//   // TC-UI-ACC-01 - open new savings account
//   test('open savings account @smoke @regression', async ({ page }) => {
//     const username = generateUsername();
//     const registerPage = new RegisterPage(page);
//     await registerPage.goto();
//     await registerPage.register(users, username);
//     const openAccountPage = new OpenAccountPage(page);
//     await openAccountPage.goto();
//     await openAccountPage.openAccount('1');
//     await openAccountPage.SuccessMessage.waitFor({ state: 'visible' });
//     const message = await openAccountPage.getSuccessMessage();
//     expect(message).toContain('Congratulations, your account is now open.');
//   });

//   // TC-UI-ACC-02 - open new checking account
//   test('open new checking account @regression', async ({ page }) => {
//     const username = generateUsername();
//     const registerPage = new RegisterPage(page);
//     await registerPage.goto();
//     await registerPage.register(users, username);
//     const openAccountPage = new OpenAccountPage(page);
//     await openAccountPage.goto();
//     await openAccountPage.openAccount('0');
//     await openAccountPage.SuccessMessage.waitFor({ state: 'visible' });
//     const message = await openAccountPage.getSuccessMessage();
//     expect(message).toContain('Congratulations, your account is now open.');
//   });

//   // TC-UI-ACC-03 - account overview balance updated after opening
//   test('account overview balance updated after opening @regression', async ({ page }) => {
//     const username = generateUsername();
//     const registerPage = new RegisterPage(page);
//     await registerPage.goto();
//     await registerPage.register(users, username);
//     const openAccountPage = new OpenAccountPage(page);
//     await openAccountPage.goto();
//     await openAccountPage.openAccount('1');
//     await openAccountPage.SuccessMessage.waitFor({ state: 'visible' });
//     await page.getByRole('link', { name: 'Accounts Overview' }).click();
//     await page.waitForLoadState('networkidle');
//     const accounts = page.locator('#accountTable tbody tr');
//     await expect(accounts).toHaveCount(3);
//   });
//   // TC-UI-MSG-01 - account creation success message contains new account ID
//    test('account creation success message contains new account ID @regression', async ({ page }) => {
//     const username = generateUsername();
//     const registerPage = new RegisterPage(page);
//     await registerPage.goto();
//     await registerPage.register(users, username);
//     const openAccountPage = new OpenAccountPage(page);
//     await openAccountPage.goto();
//     await openAccountPage.openAccount('1');
//     await openAccountPage.SuccessMessage.waitFor({ state: 'visible' });
//     const message = await openAccountPage.getSuccessMessage();
//     const newAccountId = await openAccountPage.getNewAccountId();
//     expect(message).toContain('Congratulations, your account is now open.');
//     expect(newAccountId).toBeTruthy();
// });

// })

import { test, expect } from '@playwright/test';
import { RegisterPage } from '../../pages/RegisterPage';
import { OpenAccountPage } from '../../pages/OpenAccountPage';
import { generateUsername } from '../../utils/testDataGenerator';
import users from '../../test-data/users.json';

test.describe('Open Account Tests', () => {

  // TC-UI-ACC-01 - open new savings account
  // registration auto-logs in so we go directly to open account page
  // openAccount method simplified — previously took fromAccountId as second parameter
  // removed fromAccountId because we faced AJAX timeout errors reading dropdown value
  // before options loaded — now openAccount waits internally using not.toBeEmpty()
  test('open savings account @smoke @regression', async ({ page }) => {
    const username = generateUsername();
    console.log(`[ACC-01] Opening SAVINGS account for user: ${username}`);
    const registerPage = new RegisterPage(page);
    await registerPage.goto();
    await registerPage.register(users, username);
    const openAccountPage = new OpenAccountPage(page);
    await openAccountPage.goto();
    await openAccountPage.openAccount('1');
    await openAccountPage.SuccessMessage.waitFor({ state: 'visible' });
    const message = await openAccountPage.getSuccessMessage();
    console.log(`[ACC-01] Success message: ${message}`);
    expect(message).toContain('Congratulations, your account is now open.');
  });

  // TC-UI-ACC-02 - open new checking account
  // same flow as ACC-01 but with type '0' for CHECKING account
  test('open new checking account @regression', async ({ page }) => {
    const username = generateUsername();
    console.log(`[ACC-02] Opening CHECKING account for user: ${username}`);
    const registerPage = new RegisterPage(page);
    await registerPage.goto();
    await registerPage.register(users, username);
    const openAccountPage = new OpenAccountPage(page);
    await openAccountPage.goto();
    await openAccountPage.openAccount('0');
    await openAccountPage.SuccessMessage.waitFor({ state: 'visible' });
    const message = await openAccountPage.getSuccessMessage();
    console.log(`[ACC-02] Success message: ${message}`);
    expect(message).toContain('Congratulations, your account is now open.');
  });

  // TC-UI-ACC-03 - account overview balance updated after opening
  // verifies newly opened account appears in the accounts overview table
  // waitForLoadState networkidle used because overview table loads via AJAX
  test('account overview balance updated after opening @regression', async ({ page }) => {
    const username = generateUsername();
    console.log(`[ACC-03] Verifying account overview after opening new account`);
    const registerPage = new RegisterPage(page);
    await registerPage.goto();
    await registerPage.register(users, username);
    const openAccountPage = new OpenAccountPage(page);
    await openAccountPage.goto();
    await openAccountPage.openAccount('1');
    await openAccountPage.SuccessMessage.waitFor({ state: 'visible' });
    await page.getByRole('link', { name: 'Accounts Overview' }).click();
    await page.waitForLoadState('networkidle');
    const accounts = page.locator('#accountTable tbody tr');
    console.log(`[ACC-03] Verifying account count in overview table`);
    await expect(accounts).toHaveCount(3);
  });

  // TC-UI-MSG-01 - account creation success message contains new account ID
  // verifies success message is shown and new account ID is displayed after creation
  test('account creation success message contains new account ID @regression', async ({ page }) => {
    const username = generateUsername();
    console.log(`[MSG-01] Verifying success message after account creation`);
    const registerPage = new RegisterPage(page);
    await registerPage.goto();
    await registerPage.register(users, username);
    const openAccountPage = new OpenAccountPage(page);
    await openAccountPage.goto();
    await openAccountPage.openAccount('1');
    await openAccountPage.SuccessMessage.waitFor({ state: 'visible' });
    const message = await openAccountPage.getSuccessMessage();
    const newAccountId = await openAccountPage.getNewAccountId();
    console.log(`[MSG-01] Message: ${message}, New account ID: ${newAccountId}`);
    expect(message).toContain('Congratulations, your account is now open.');
    expect(newAccountId).toBeTruthy();
  });

})