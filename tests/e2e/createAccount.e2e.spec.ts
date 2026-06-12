// import { test, expect } from '@playwright/test';
// import { RegisterPage } from '../../pages/RegisterPage';
// import { OpenAccountPage } from '../../pages/OpenAccountPage';
// import { generateUsername } from '../../utils/testDataGenerator';
// import users from '../../test-data/users.json';

// const BASE_URL = 'https://parabank.parasoft.com/parabank/services/bank';
// const HEADERS = { 'accept': 'application/json' };

// test.describe('E2E Tests', () => {

//   // TC-E2E-01 - create account via UI then validate via API
//   test('TC-E2E-01 - create account via UI and validate via API', async ({ page, request }) => {
    
//     // Step 1 - register new user
//     const username = generateUsername();
//     const registerPage = new RegisterPage(page);
//     await registerPage.goto();
//     await registerPage.register(users, username);

//     // Step 2 - get customer ID via API
//     const loginRes = await request.get(`${BASE_URL}/login/${username}/${users.password}`, {
//       headers: HEADERS
//     });
//     expect(loginRes.status()).toBe(200);
//     const loginBody = await loginRes.json();
//     const customerId = loginBody.id;

//     // Step 3 - open new savings account via UI
//     const openAccountPage = new OpenAccountPage(page);
//     await openAccountPage.goto();
//     await openAccountPage.AccountID.locator('option').first().waitFor({ state: 'attached' });
//     const fromAccountId = await openAccountPage.AccountID.inputValue();
//     await openAccountPage.openAccount('1', fromAccountId);
//     await openAccountPage.SuccessMessage.waitFor({ state: 'visible' });
//     const newAccountId = await openAccountPage.getNewAccountId();

//     // Step 4 - validate account exists in API
//     const accountsRes = await request.get(`${BASE_URL}/customers/${customerId}/accounts`, {
//       headers: HEADERS
//     });
//     expect(accountsRes.status()).toBe(200);
//     const accountsBody = await accountsRes.json();
//     const found = accountsBody.some((acc: any) => String(acc.id) === String(newAccountId));
//     expect(found).toBeTruthy();

//     // Step 5 - validate account type and balance via API
//     const accountRes = await request.get(`${BASE_URL}/accounts/${newAccountId}`, {
//       headers: HEADERS
//     });
//     expect(accountRes.status()).toBe(200);
//     const accountBody = await accountRes.json();
//     expect(accountBody.type).toBe('SAVINGS');
//     expect(accountBody.balance).toBe(100.00);
//   });

// });

import { test, expect } from '@playwright/test';
import { RegisterPage } from '../../pages/RegisterPage';
import { OpenAccountPage } from '../../pages/OpenAccountPage';
import { generateUsername } from '../../utils/testDataGenerator';
import users from '../../test-data/users.json';

const BASE_URL = 'https://parabank.parasoft.com/parabank/services/bank';
const HEADERS = { 'accept': 'application/json' };

test.describe('E2E Tests', () => {

  // TC-E2E-01 - create account via UI then validate via API
  test('TC-E2E-01 - create account via UI and validate via API', async ({ page, request }) => {

    let customerId: string;
    let newAccountId: string;

    // Step 1 - register new user via UI
    await test.step('Register new user', async () => {
      const username = generateUsername();
      const registerPage = new RegisterPage(page);
      await registerPage.goto();
      await registerPage.register(users, username);
      await registerPage.SuccessMessage.waitFor({ state: 'visible' });
      
      await page.waitForTimeout(2000)
      // Step 2 - get customer ID via login API
      const loginRes = await request.get(`${BASE_URL}/login/${username}/${users.password}`, {
        headers: HEADERS
      });
      expect(loginRes.status()).toBe(200);
      const loginBody = await loginRes.json();
      customerId = loginBody.id;
    });

    // Step 3 - open new savings account via UI
    await test.step('Open new savings account via UI', async () => {
      const openAccountPage = new OpenAccountPage(page);
      await openAccountPage.goto();
      await openAccountPage.AccountID.locator('option').first().waitFor({ state: 'attached' });
      const fromAccountId = await openAccountPage.AccountID.inputValue();
      await openAccountPage.openAccount('1', fromAccountId);
      await openAccountPage.SuccessMessage.waitFor({ state: 'visible' });
      newAccountId = (await openAccountPage.getNewAccountId())!;
    });

    // Step 4 - validate new account exists in API
    await test.step('Validate new account exists in API', async () => {
      const accountsRes = await request.get(`${BASE_URL}/customers/${customerId}/accounts`, {
        headers: HEADERS
      });
      expect(accountsRes.status()).toBe(200);
      const accountsBody = await accountsRes.json();
      const found = accountsBody.some((acc: any) => String(acc.id) === String(newAccountId));
      expect(found).toBeTruthy();
    });

    // Step 5 - validate account type and balance via API
    await test.step('Validate account type is SAVINGS and balance is correct', async () => {
      const accountRes = await request.get(`${BASE_URL}/accounts/${newAccountId}`, {
        headers: HEADERS
      });
      expect(accountRes.status()).toBe(200);
      const accountBody = await accountRes.json();
      expect(accountBody.type).toBe('SAVINGS');
      expect(accountBody.balance).toBe(100.00);
    });

  });

});