// import { test, expect } from '@playwright/test';
// import { RegisterPage } from '../../pages/RegisterPage';
// import { OpenAccountPage } from '../../pages/OpenAccountPage';
// import { generateUsername } from '../../utils/testDataGenerator';
// import users from '../../test-data/users.json';

// const BASE_URL = 'https://parabank.parasoft.com/parabank/services/bank';
// const HEADERS = { 'accept': 'application/json' };

// test.describe('API - Validate Account', () => {

//   let customerId: string;
//   let username: string;

//     test.beforeEach(async ({ request, browser }) => {
//     username = generateUsername();
//     const page = await browser.newPage();
//     const registerPage = new RegisterPage(page);
//     await registerPage.goto();
//     await registerPage.register(users, username);
//     await page.close();

//     const response = await request.get(`${BASE_URL}/login`, {
//   headers: HEADERS,
//   params: {
//     username: username,
//     password: users.password
//   }
// });
//     const body = await response.json();
//     customerId = body.id;
//   });

//   // TC-API-03 - newly opened account exists in API
//     test('TC-API-03 - new account exists in API', async ({ request, browser }) => {
//     const page = await browser.newPage();
//     const openAccountPage = new OpenAccountPage(page);
//     await page.goto('https://parabank.parasoft.com/parabank/login.htm');
//     await page.fill('input[name="username"]', username);
//     await page.fill('input[name="password"]', users.password);
//     await page.click('input[value="Log In"]');
//     await openAccountPage.goto();
//     await openAccountPage.AccountID.locator('option').first().waitFor({ state: 'attached' });
//     const fromAccountId = await openAccountPage.AccountID.inputValue();
//     await openAccountPage.openAccount('1', fromAccountId);
//     await openAccountPage.SuccessMessage.waitFor({ state: 'visible' });
//     const newAccountId = await openAccountPage.getNewAccountId();
//     await page.close();

//     const response = await request.get(`${BASE_URL}/customers/${customerId}/accounts`, {
//       headers: HEADERS
//     });
//     console.log('status:', response.status());
//     console.log('body:', await response.text());
//     const body = await response.json();
//     const found = body.some((acc: any) => String(acc.id) === String(newAccountId));
//     expect(found).toBeTruthy();
//   });

// });

// import { test, expect } from '@playwright/test';

// const BASE_URL = 'https://parabank.parasoft.com/parabank/services/bank';
// const HEADERS = { 'Accept': 'application/json' };
// const CUSTOMER_ID = 12212;
// const FROM_ACCOUNT_ID = 13344;

// test.describe('API - Validate Account', () => {

//     // TC-API-03 - newly opened account exists in API
//     test('TC-API-03 - new account exists in API', async ({ request }) => {
//     const createRes = await request.post(`${BASE_URL}/createAccount?customerId=${CUSTOMER_ID}&newAccountType=1&fromAccountId=${FROM_ACCOUNT_ID}`, {
//       headers: HEADERS
//     });
//     expect(createRes.status()).toBe(200);
//     const newAccountId = (await createRes.json()).id;

//     const accountsRes = await request.get(`${BASE_URL}/customers/${CUSTOMER_ID}/accounts`, {
//       headers: HEADERS
//     });
//     expect(accountsRes.status()).toBe(200);
//     const body = await accountsRes.json();
//     const found = body.some((acc: any) => String(acc.id) === String(newAccountId));
//     expect(found).toBeTruthy();
//     });

//     test('TC-API - validate new account type is SAVINGS @regression @api', async ({ request }) => {
//   const createRes = await request.post(`${BASE_URL}/createAccount?customerId=${CUSTOMER_ID}&newAccountType=1&fromAccountId=${FROM_ACCOUNT_ID}`, {
//     headers: HEADERS
//   });
//   expect(createRes.status()).toBe(200);
//   const body = await createRes.json();
//   expect(body.type).toBe('SAVINGS');
//   expect(body.customerId).toBe(CUSTOMER_ID);
//   expect(typeof body.balance).toBe('number');
// });

// })

import { test, expect } from '@playwright/test';
// importing shared constants from central config instead of repeating them here
import { BASE_URL, HEADERS, CUSTOMER_ID, FROM_ACCOUNT_ID } from '../../config/env';

test.describe('API - Validate Account', () => {

    // TC-API-03 - newly opened account exists in API
    // creates a new account via API and verifies it appears in the accounts list
    // using API directly instead of UI to avoid AJAX dropdown timeout issues
    test('TC-API-03 - new account exists in API @regression @api', async ({ request }) => {
    console.log(`[API-03] Creating new account via API for customer: ${CUSTOMER_ID}`);
    const createRes = await request.post(`${BASE_URL}/createAccount?customerId=${CUSTOMER_ID}&newAccountType=1&fromAccountId=${FROM_ACCOUNT_ID}`, {
      headers: HEADERS
    });
    expect(createRes.status()).toBe(200);
    const newAccountId = (await createRes.json()).id;
    console.log(`[API-03] New account ID: ${newAccountId}`);

    const accountsRes = await request.get(`${BASE_URL}/customers/${CUSTOMER_ID}/accounts`, {
      headers: HEADERS
    });
    expect(accountsRes.status()).toBe(200);
    const body = await accountsRes.json();
    const found = body.some((acc: any) => String(acc.id) === String(newAccountId));
    console.log(`[API-03] Account found in list: ${found}`);
    expect(found).toBeTruthy();
    });

    // TC-API - validate new account type and balance in API response
    // verifies the newly created account has correct type SAVINGS and numeric balance
    test('TC-API - validate new account type is SAVINGS @regression @api', async ({ request }) => {
    console.log(`[API-VALIDATE] Creating SAVINGS account and validating response`);
    const createRes = await request.post(`${BASE_URL}/createAccount?customerId=${CUSTOMER_ID}&newAccountType=1&fromAccountId=${FROM_ACCOUNT_ID}`, {
        headers: HEADERS
    });
    expect(createRes.status()).toBe(200);
    const body = await createRes.json();
    console.log(`[API-VALIDATE] Account type: ${body.type}, Balance: ${body.balance}`);
    expect(body.type).toBe('SAVINGS');
    expect(body.customerId).toBe(CUSTOMER_ID);
    expect(typeof body.balance).toBe('number');
    });

})