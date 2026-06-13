// import { test, expect } from '@playwright/test';
// import { RegisterPage } from '../../pages/RegisterPage';
// import { OpenAccountPage } from '../../pages/OpenAccountPage';
// import { TransferFundsPage } from '../../pages/TransferFundsPage';
// import { generateUsername } from '../../utils/testDataGenerator';
// import users from '../../test-data/users.json';

// const BASE_URL = 'https://parabank.parasoft.com/parabank/services/bank';
// const HEADERS = { 'accept': 'application/json' };
// const TRANSFER_AMOUNT = 100;

// test.describe('E2E - Transfer Flow', () => {

//   // TC-E2E-02 - transfer via UI then validate both balances via API
//   test('TC-E2E-02 - transfer via UI and validate balances via API', async ({ page, request }) => {

//     let fromAccountId: string;
//     let toAccountId: string;
//     let balanceFromBefore: number;
//     let balanceToBefore: number;

//     // Step 1 - register new user via UI
//     await test.step('Register new user', async () => {
//       const username = generateUsername();
//       const registerPage = new RegisterPage(page);
//       await registerPage.goto();
//       await registerPage.register(users, username);
//       await registerPage.SuccessMessage.waitFor({ state: 'visible' });
//     });

//     // Step 2 - open second account via UI
//     await test.step('Open second account via UI', async () => {
//       const openAccountPage = new OpenAccountPage(page);
//       await openAccountPage.goto();
//       await openAccountPage.openAccount('1');
//       await openAccountPage.SuccessMessage.waitFor({ state: 'visible' });
//       toAccountId = (await openAccountPage.getNewAccountId())!;
//       fromAccountId = await openAccountPage.AccountID.inputValue();
//     });

//     // Step 3 - check balances before transfer via API
//     await test.step('Check balances before transfer via API', async () => {
//       const fromRes = await request.get(`${BASE_URL}/accounts/${fromAccountId}`, { headers: HEADERS });
//       expect(fromRes.status()).toBe(200);
//       balanceFromBefore = (await fromRes.json()).balance;

//       const toRes = await request.get(`${BASE_URL}/accounts/${toAccountId}`, { headers: HEADERS });
//       expect(toRes.status()).toBe(200);
//       balanceToBefore = (await toRes.json()).balance;
//     });

//     // Step 4 - transfer funds via UI
//     await test.step('Transfer funds via UI', async () => {
//       const transferPage = new TransferFundsPage(page);
//       await transferPage.goto();
//       await transferPage.transferFunds(String(TRANSFER_AMOUNT), toAccountId);
//       await transferPage.SuccessMessage.waitFor({ state: 'visible' });
//       const message = await transferPage.getSuccessMessage();
//       expect(message).toContain('Transfer Complete!');
//     });

//     // Step 5 - validate balances updated correctly via API
//     await test.step('Validate balances updated correctly via API', async () => {
//       const fromRes = await request.get(`${BASE_URL}/accounts/${fromAccountId}`, { headers: HEADERS });
//       expect(fromRes.status()).toBe(200);
//       const balanceFromAfter = (await fromRes.json()).balance;

//       const toRes = await request.get(`${BASE_URL}/accounts/${toAccountId}`, { headers: HEADERS });
//       expect(toRes.status()).toBe(200);
//       const balanceToAfter = (await toRes.json()).balance;

//       expect(balanceFromBefore - balanceFromAfter).toBe(TRANSFER_AMOUNT);
//       expect(balanceToAfter - balanceToBefore).toBe(TRANSFER_AMOUNT);
//     });

//   });

// });

import { test, expect } from '@playwright/test';
import { RegisterPage } from '../../pages/RegisterPage';
import { OpenAccountPage } from '../../pages/OpenAccountPage';
import { TransferFundsPage } from '../../pages/TransferFundsPage';
import { generateUsername } from '../../utils/testDataGenerator';
import users from '../../test-data/users.json';
// importing shared constants from central config instead of repeating them here
import { BASE_URL, HEADERS } from '../../config/env';

// TRANSFER_AMOUNT kept local — only used in this file
const TRANSFER_AMOUNT = 100;

test.describe('E2E - Transfer Flow', () => {

  // TC-E2E-02 - transfer via UI then validate both balances via API
  // hybrid test — transfer done via UI, balance validation done via API
  // test.step used to clearly label each phase of the test
  test('TC-E2E-02 - transfer via UI and validate balances via API @regression @e2e', async ({ page, request }) => {

    let fromAccountId: string;
    let toAccountId: string;
    let balanceFromBefore: number;
    let balanceToBefore: number;

    // Step 1 - register new user via UI
    // fresh user registration ensures no leftover data from previous runs
    await test.step('Register new user', async () => {
      const username = generateUsername();
      console.log(`[E2E-02] Registering user: ${username}`);
      const registerPage = new RegisterPage(page);
      await registerPage.goto();
      await registerPage.register(users, username);
      await registerPage.SuccessMessage.waitFor({ state: 'visible' });
      console.log(`[E2E-02] User registered successfully`);
    });

    // Step 2 - open second account via UI
    // registration auto-creates one account — we open a second to transfer between them
    // openAccount simplified — no longer needs fromAccountId parameter
    await test.step('Open second account via UI', async () => {
      console.log(`[E2E-02] Opening second account via UI`);
      const openAccountPage = new OpenAccountPage(page);
      await openAccountPage.goto();
      await openAccountPage.openAccount('1');
      await openAccountPage.SuccessMessage.waitFor({ state: 'visible' });
      toAccountId = (await openAccountPage.getNewAccountId())!;
      fromAccountId = await openAccountPage.AccountID.inputValue();
      console.log(`[E2E-02] From account: ${fromAccountId}, To account: ${toAccountId}`);
    });

    // Step 3 - check balances before transfer via API
    // capturing pre-transfer balances to compare against post-transfer values
    await test.step('Check balances before transfer via API', async () => {
      console.log(`[E2E-02] Checking balances before transfer`);
      const fromRes = await request.get(`${BASE_URL}/accounts/${fromAccountId}`, { headers: HEADERS });
      expect(fromRes.status()).toBe(200);
      balanceFromBefore = (await fromRes.json()).balance;

      const toRes = await request.get(`${BASE_URL}/accounts/${toAccountId}`, { headers: HEADERS });
      expect(toRes.status()).toBe(200);
      balanceToBefore = (await toRes.json()).balance;
      console.log(`[E2E-02] Balance before - From: ${balanceFromBefore}, To: ${balanceToBefore}`);
    });

    // Step 4 - transfer funds via UI
    // transferFunds method simplified — auto-selects from account, only needs toAccountId
    await test.step('Transfer funds via UI', async () => {
      console.log(`[E2E-02] Transferring ${TRANSFER_AMOUNT} to account: ${toAccountId}`);
      const transferPage = new TransferFundsPage(page);
      await transferPage.goto();
      await transferPage.transferFunds(String(TRANSFER_AMOUNT), toAccountId);
      await transferPage.SuccessMessage.waitFor({ state: 'visible' });
      const message = await transferPage.getSuccessMessage();
      console.log(`[E2E-02] Transfer message: ${message}`);
      expect(message).toContain('Transfer Complete!');
    });

    // Step 5 - validate balances updated correctly via API
    // verifies both accounts reflect the correct change after transfer
    await test.step('Validate balances updated correctly via API', async () => {
      console.log(`[E2E-02] Validating balances after transfer`);
      const fromRes = await request.get(`${BASE_URL}/accounts/${fromAccountId}`, { headers: HEADERS });
      expect(fromRes.status()).toBe(200);
      const balanceFromAfter = (await fromRes.json()).balance;

      const toRes = await request.get(`${BASE_URL}/accounts/${toAccountId}`, { headers: HEADERS });
      expect(toRes.status()).toBe(200);
      const balanceToAfter = (await toRes.json()).balance;
      console.log(`[E2E-02] Balance after - From: ${balanceFromAfter}, To: ${balanceToAfter}`);

      expect(balanceFromBefore - balanceFromAfter).toBe(TRANSFER_AMOUNT);
      expect(balanceToAfter - balanceToBefore).toBe(TRANSFER_AMOUNT);
    });

  });

});