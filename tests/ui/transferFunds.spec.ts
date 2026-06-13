// import { test, expect } from '@playwright/test';
// import { RegisterPage } from '../../pages/RegisterPage';
// import { OpenAccountPage } from '../../pages/OpenAccountPage';
// import { TransferFundsPage } from '../../pages/TransferFundsPage';
// import { generateUsername } from '../../utils/testDataGenerator';
// import users from '../../test-data/users.json';

// test.describe('Transfer Funds Tests', () => {

//     test('transfer funds between accounts', async ({ page }) => {
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
//     const toAccountId = await openAccountPage.getNewAccountId();
//     const transferPage = new TransferFundsPage(page);
//     await transferPage.goto();
//     await transferPage.AccountFrom.locator('option').first().waitFor({ state: 'attached' });
//     const transferFromId = await transferPage.AccountFrom.inputValue();
//     await transferPage.transferFunds('100', transferFromId, toAccountId!);
//     await transferPage.SuccessMessage.waitFor({ state: 'visible' });
//     const message = await transferPage.getSuccessMessage();
//       expect(message).toContain('Transfer Complete!');
//   });

//     test('transfer empty amount shows error', async ({ page }) => {
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
//     const toAccountId = await openAccountPage.getNewAccountId();
//     const transferPage = new TransferFundsPage(page);
//     await transferPage.goto();
//     await transferPage.AccountFrom.locator('option').first().waitFor({ state: 'attached' });
//     await transferPage.transferFunds('', fromAccountId, toAccountId!);
//     const error = await transferPage.ErrorMessage.textContent();
//       expect(error).toContain('An internal error has occurred and has been logged.');
//   });

//       // TC-UI-TRF-04 - transfer $0 (known bug DEF-03)
//     test('transfer zero amount is accepted', async ({ page }) => {
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
//     const toAccountId = await openAccountPage.getNewAccountId();
//     const transferPage = new TransferFundsPage(page);
//     await transferPage.goto();
//     await transferPage.AccountFrom.locator('option').first().waitFor({ state: 'attached' });
//     await transferPage.transferFunds('0', fromAccountId, toAccountId!);
//     await transferPage.SuccessMessage.waitFor({ state: 'visible' });
//     const message = await transferPage.getSuccessMessage();
//       expect(message).toContain('Transfer Complete!');
//   });

//     test('transfer negative amount is accepted', async ({ page }) => {
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
//     const toAccountId = await openAccountPage.getNewAccountId();
//     const transferPage = new TransferFundsPage(page);
//     await transferPage.goto();
//     await transferPage.AccountFrom.locator('option').first().waitFor({ state: 'attached' });
//     await transferPage.transferFunds('-100', fromAccountId, toAccountId!);
//     await transferPage.SuccessMessage.waitFor({ state: 'visible' });
//     const message = await transferPage.getSuccessMessage();
//       expect(message).toContain('Transfer Complete!');
//   });
// });

// import { test, expect } from '@playwright/test';
// import { RegisterPage } from '../../pages/RegisterPage';
// import { OpenAccountPage } from '../../pages/OpenAccountPage';
// import { TransferFundsPage } from '../../pages/TransferFundsPage';
// import { generateUsername } from '../../utils/testDataGenerator';
// import users from '../../test-data/users.json';

// test.describe('Transfer Funds Tests', () => {

//   // TC-UI-TRF-01 - valid fund transfer
//   test('transfer funds between accounts @smoke @regression', async ({ page }) => {
//     const username = generateUsername();
//     const registerPage = new RegisterPage(page);
//     await registerPage.goto();
//     await registerPage.register(users, username);
//     const openAccountPage = new OpenAccountPage(page);
//     await openAccountPage.goto();
//     await openAccountPage.openAccount('1');
//     await openAccountPage.SuccessMessage.waitFor({ state: 'visible' });
//     const toAccountId = await openAccountPage.getNewAccountId();
//     const transferPage = new TransferFundsPage(page);
//     await transferPage.goto();
//     await transferPage.transferFunds('100', toAccountId!);
//     await transferPage.SuccessMessage.waitFor({ state: 'visible' });
//     const message = await transferPage.getSuccessMessage();
//     expect(message).toContain('Transfer Complete!');
//   });

//   // TC-UI-TRF-03 - transfer empty amount (known bug DEF-02)
//   test('transfer empty amount shows error @regression', async ({ page }) => {
//     const username = generateUsername();
//     const registerPage = new RegisterPage(page);
//     await registerPage.goto();
//     await registerPage.register(users, username);
//     const openAccountPage = new OpenAccountPage(page);
//     await openAccountPage.goto();
//     await openAccountPage.openAccount('1');
//     await openAccountPage.SuccessMessage.waitFor({ state: 'visible' });
//     const toAccountId = await openAccountPage.getNewAccountId();
//     const transferPage = new TransferFundsPage(page);
//     await transferPage.goto();
//     await transferPage.transferFunds('', toAccountId!);
//     const error = await transferPage.ErrorMessage.textContent();
//     expect(error).toContain('An internal error has occurred and has been logged.');
//   });

//   // TC-UI-TRF-04 - transfer $0 (known bug DEF-03)
//   test('transfer zero amount is accepted @regression', async ({ page }) => {
//     const username = generateUsername();
//     const registerPage = new RegisterPage(page);
//     await registerPage.goto();
//     await registerPage.register(users, username);
//     const openAccountPage = new OpenAccountPage(page);
//     await openAccountPage.goto();
//     await openAccountPage.openAccount('1');
//     await openAccountPage.SuccessMessage.waitFor({ state: 'visible' });
//     const toAccountId = await openAccountPage.getNewAccountId();
//     const transferPage = new TransferFundsPage(page);
//     await transferPage.goto();
//     await transferPage.transferFunds('0', toAccountId!);
//     await transferPage.SuccessMessage.waitFor({ state: 'visible' });
//     const message = await transferPage.getSuccessMessage();
//     expect(message).toContain('Transfer Complete!');
//   });

//   // TC-UI-TRF-05 - transfer negative amount (known bug DEF-04)
//   test('transfer negative amount is accepted @regression', async ({ page }) => {
//     const username = generateUsername();
//     const registerPage = new RegisterPage(page);
//     await registerPage.goto();
//     await registerPage.register(users, username);
//     const openAccountPage = new OpenAccountPage(page);
//     await openAccountPage.goto();
//     await openAccountPage.openAccount('1');
//     await openAccountPage.SuccessMessage.waitFor({ state: 'visible' });
//     const toAccountId = await openAccountPage.getNewAccountId();
//     const transferPage = new TransferFundsPage(page);
//     await transferPage.goto();
//     await transferPage.transferFunds('-100', toAccountId!);
//     await transferPage.SuccessMessage.waitFor({ state: 'visible' });
//     const message = await transferPage.getSuccessMessage();
//     expect(message).toContain('Transfer Complete!');
//   });

// });


import { test, expect } from '@playwright/test';
import { RegisterPage } from '../../pages/RegisterPage';
import { OpenAccountPage } from '../../pages/OpenAccountPage';
import { TransferFundsPage } from '../../pages/TransferFundsPage';
import { generateUsername } from '../../utils/testDataGenerator';
import users from '../../test-data/users.json';

test.describe('Transfer Funds Tests', () => {

  // TC-UI-TRF-01 - valid fund transfer
  // registers a new user, opens a second account, then transfers between them
  // openAccount simplified — no longer passes fromAccountId, ParaBank auto-selects first account
  // transferFunds simplified — no longer passes fromAccountId, only toAccountId needed
  // previously faced AJAX timeout errors reading dropdown values before options loaded
  test('transfer funds between accounts @smoke @regression', async ({ page }) => {
    const username = generateUsername();
    console.log(`[TRF-01] Starting valid transfer test for user: ${username}`);
    const registerPage = new RegisterPage(page);
    await registerPage.goto();
    await registerPage.register(users, username);
    const openAccountPage = new OpenAccountPage(page);
    await openAccountPage.goto();
    await openAccountPage.openAccount('1');
    await openAccountPage.SuccessMessage.waitFor({ state: 'visible' });
    const toAccountId = await openAccountPage.getNewAccountId();
    console.log(`[TRF-01] Transferring 100 to account: ${toAccountId}`);
    const transferPage = new TransferFundsPage(page);
    await transferPage.goto();
    await transferPage.transferFunds('100', toAccountId!);
    await transferPage.SuccessMessage.waitFor({ state: 'visible' });
    const message = await transferPage.getSuccessMessage();
    console.log(`[TRF-01] Transfer message: ${message}`);
    expect(message).toContain('Transfer Complete!');
  });

  // TC-UI-TRF-03 - transfer empty amount (known bug DEF-02)
  // ParaBank shows 'An internal error' instead of a proper validation message for empty amount
  // no waitFor on SuccessMessage since it won't appear — directly reads error message
  test('transfer empty amount shows error @regression', async ({ page }) => {
    const username = generateUsername();
    console.log(`[TRF-03] Testing empty amount transfer — confirming DEF-02 bug`);
    const registerPage = new RegisterPage(page);
    await registerPage.goto();
    await registerPage.register(users, username);
    const openAccountPage = new OpenAccountPage(page);
    await openAccountPage.goto();
    await openAccountPage.openAccount('1');
    await openAccountPage.SuccessMessage.waitFor({ state: 'visible' });
    const toAccountId = await openAccountPage.getNewAccountId();
    const transferPage = new TransferFundsPage(page);
    await transferPage.goto();
    await transferPage.transferFunds('', toAccountId!);
    const error = await transferPage.ErrorMessage.textContent();
    console.log(`[TRF-03] Error message: ${error}`);
    expect(error).toContain('An internal error has occurred and has been logged.');
  });

  // TC-UI-TRF-04 - transfer $0 (known bug DEF-03)
  // ParaBank accepts zero amount transfer — should be rejected but is not
  // test expects success message — confirms the bug is still present
  test('transfer zero amount is accepted @regression', async ({ page }) => {
    const username = generateUsername();
    console.log(`[TRF-04] Testing zero amount transfer — confirming DEF-03 bug`);
    const registerPage = new RegisterPage(page);
    await registerPage.goto();
    await registerPage.register(users, username);
    const openAccountPage = new OpenAccountPage(page);
    await openAccountPage.goto();
    await openAccountPage.openAccount('1');
    await openAccountPage.SuccessMessage.waitFor({ state: 'visible' });
    const toAccountId = await openAccountPage.getNewAccountId();
    const transferPage = new TransferFundsPage(page);
    await transferPage.goto();
    await transferPage.transferFunds('0', toAccountId!);
    await transferPage.SuccessMessage.waitFor({ state: 'visible' });
    const message = await transferPage.getSuccessMessage();
    console.log(`[TRF-04] Transfer message: ${message}`);
    expect(message).toContain('Transfer Complete!');
  });

  // TC-UI-TRF-05 - transfer negative amount (known bug DEF-04)
  // ParaBank accepts negative amount — source balance goes UP instead of down
  // test expects success message — confirms the bug is still present
  test('transfer negative amount is accepted @regression', async ({ page }) => {
    const username = generateUsername();
    console.log(`[TRF-05] Testing negative amount transfer — confirming DEF-04 bug`);
    const registerPage = new RegisterPage(page);
    await registerPage.goto();
    await registerPage.register(users, username);
    const openAccountPage = new OpenAccountPage(page);
    await openAccountPage.goto();
    await openAccountPage.openAccount('1');
    await openAccountPage.SuccessMessage.waitFor({ state: 'visible' });
    const toAccountId = await openAccountPage.getNewAccountId();
    const transferPage = new TransferFundsPage(page);
    await transferPage.goto();
    await transferPage.transferFunds('-100', toAccountId!);
    await transferPage.SuccessMessage.waitFor({ state: 'visible' });
    const message = await transferPage.getSuccessMessage();
    console.log(`[TRF-05] Transfer message: ${message}`);
    expect(message).toContain('Transfer Complete!');
  });

});






