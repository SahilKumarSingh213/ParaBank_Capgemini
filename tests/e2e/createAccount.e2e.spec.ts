

import { test, expect } from '@playwright/test';
import { RegisterPage } from '../../pages/RegisterPage';
import { OpenAccountPage } from '../../pages/OpenAccountPage';
import { generateUsername } from '../../utils/testDataGenerator';
import users from '../../test-data/users.json';
// importing shared constants from central config instead of repeating them here
import { BASE_URL, HEADERS } from '../../config/env';

test.describe('E2E Tests', () => {

  // TC-E2E-01 - create account via UI then validate via API
  // hybrid test — UI used for user actions, API used for validation
  // test.step used to clearly separate and label each phase of the test
  test('TC-E2E-01 - create account via UI and validate via API @regression @e2e', async ({ page, request }) => {

    let customerId: string;
    let newAccountId: string;

    // Step 1 - register new user via UI
    // registration auto-logs in so no separate login step needed for UI actions
    await test.step('Register new user', async () => {
      const username = generateUsername();
      console.log(`[E2E-01] Registering user: ${username}`);
      const registerPage = new RegisterPage(page);
      await registerPage.goto();
      await registerPage.register(users, username);
      await registerPage.SuccessMessage.waitFor({ state: 'visible' });

      // login API call to get customerId for subsequent API validation calls
      const loginRes = await request.get(`${BASE_URL}/login/${username}/${users.password}`, {
        headers: HEADERS
      });
      expect(loginRes.status()).toBe(200);
      const loginBody = await loginRes.json();
      customerId = loginBody.id;
      console.log(`[E2E-01] Customer ID: ${customerId}`);
    });

    // Step 2 - open new savings account via UI
    // openAccount method simplified — no longer requires fromAccountId parameter
    // previously faced AJAX timeout errors reading dropdown value before it loaded
    await test.step('Open new savings account via UI', async () => {
      console.log(`[E2E-01] Opening new savings account via UI`);
      const openAccountPage = new OpenAccountPage(page);
      await openAccountPage.goto();
      await openAccountPage.openAccount('1');
      await openAccountPage.SuccessMessage.waitFor({ state: 'visible' });
      newAccountId = (await openAccountPage.getNewAccountId())!;
      console.log(`[E2E-01] New account ID from UI: ${newAccountId}`);
    });

    // Step 3 - validate new account exists in API
    // core of hybrid testing — verifies data created via UI is visible in API
    await test.step('Validate new account exists in API', async () => {
      console.log(`[E2E-01] Validating account in API`);
      const accountsRes = await request.get(`${BASE_URL}/customers/${customerId}/accounts`, {
        headers: HEADERS
      });
      expect(accountsRes.status()).toBe(200);
      const accountsBody = await accountsRes.json();
      const found = accountsBody.some((acc: any) => String(acc.id) === String(newAccountId));
      console.log(`[E2E-01] Account found in API: ${found}`);
      expect(found).toBeTruthy();
    });

    // Step 4 - validate account type and balance via API
    // verifies account details match what was selected on UI
    await test.step('Validate account type is SAVINGS and balance is correct', async () => {
      console.log(`[E2E-01] Validating account type and balance`);
      const accountRes = await request.get(`${BASE_URL}/accounts/${newAccountId}`, {
        headers: HEADERS
      });
      expect(accountRes.status()).toBe(200);
      const accountBody = await accountRes.json();
      console.log(`[E2E-01] Account type: ${accountBody.type}, Balance: ${accountBody.balance}`);
      expect(accountBody.type).toBe('SAVINGS');
      expect(accountBody.balance).toBe(100.00);
    });

  });

});