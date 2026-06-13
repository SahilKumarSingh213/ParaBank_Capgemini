// import { test, expect } from '@playwright/test';
// import { RegisterPage } from '../../pages/RegisterPage';
// import { OpenAccountPage } from '../../pages/OpenAccountPage';
// import { TransferFundsPage } from '../../pages/TransferFundsPage';
// import { generateUsername } from '../../utils/testDataGenerator';
// import users from '../../test-data/users.json';

// const BASE_URL = 'https://parabank.parasoft.com/parabank/services/bank';
// const HEADERS = { 'accept': 'application/json' };
// const TRANSFER_AMOUNT = 50;

// test.describe('API - Validate Transfer', () => {

// let username: string; 
// let customerId: string;
// let fromAccountId: string;
// let toAccountId: string;
//     test.beforeEach(async ({ request, browser  }) => {
//     username = generateUsername();
//     const page = await browser.newPage();
//     const registerPage = new RegisterPage(page);
//     await registerPage.goto();
//     await registerPage.register(users, username);

//     // open second account
//     const openAccountPage = new OpenAccountPage(page);
//     await openAccountPage.goto();
//     await openAccountPage.AccountID.locator('option').first().waitFor({ state: 'attached' });
//     fromAccountId = await openAccountPage.AccountID.inputValue();
//     await openAccountPage.openAccount('1', fromAccountId);
//     await openAccountPage.SuccessMessage.waitFor({ state: 'visible' });
//     toAccountId = (await openAccountPage.getNewAccountId())!;
//     await page.close();

//     const response = await request.get(`${BASE_URL}/login/${username}/${users.password}`, {
//       headers: HEADERS
//     });
//     const body = await response.json();
//     customerId = body.id;
//     });


//     test('TC-API-06 - source balance reduced after transfer', async ({ request, browser }) => {
//     const beforeRes = await request.get(`${BASE_URL}/accounts/${fromAccountId}`, { headers: HEADERS });
//     const beforeBody = await beforeRes.json();
//     const balanceBefore = beforeBody.balance;

//     // do transfer via UI
//     const page = await browser.newPage();
//     const transferPage = new TransferFundsPage(page);
//     await page.goto('https://parabank.parasoft.com/parabank/login.htm');
//     await page.fill('input[name="username"]', username);
//     await page.fill('input[name="password"]', users.password);
//     await page.click('input[value="Log In"]');
//     await transferPage.goto();
//     await transferPage.AccountFrom.locator('option').first().waitFor({ state: 'attached' });
//     await transferPage.transferFunds(String(TRANSFER_AMOUNT), fromAccountId, toAccountId);
//     await transferPage.SuccessMessage.waitFor({ state: 'visible' });
//     await page.close();

//     const afterRes = await request.get(`${BASE_URL}/accounts/${fromAccountId}`, { headers: HEADERS });
//     const afterBody = await afterRes.json();
//     const balanceAfter = afterBody.balance;

//     expect(balanceBefore - balanceAfter).toBe(TRANSFER_AMOUNT);
//   });

//   // TC-API-07 - destination balance increased after transfer
//     test('TC-API-07 - destination balance increased after transfer', async ({ request, browser }) => {
//     const beforeRes = await request.get(`${BASE_URL}/accounts/${toAccountId}`, { headers: HEADERS });
//     const beforeBody = await beforeRes.json();
//     const balanceBefore = beforeBody.balance;

//     const page = await browser.newPage();
//     const transferPage = new TransferFundsPage(page);
//     await page.goto('https://parabank.parasoft.com/parabank/login.htm');
//     await page.fill('input[name="username"]', username);
//     await page.fill('input[name="password"]', users.password);
//     await page.click('input[value="Log In"]');
//     await transferPage.goto();
//     await transferPage.AccountFrom.locator('option').first().waitFor({ state: 'attached' });
//     await transferPage.transferFunds(String(TRANSFER_AMOUNT), fromAccountId, toAccountId);
//     await transferPage.SuccessMessage.waitFor({ state: 'visible' });
//     await page.close();

//     const afterRes = await request.get(`${BASE_URL}/accounts/${toAccountId}`, { headers: HEADERS });
//     const afterBody = await afterRes.json();
//     const balanceAfter = afterBody.balance;

//     expect(balanceAfter - balanceBefore).toBe(TRANSFER_AMOUNT);
//   });

// })


// import { test, expect } from '@playwright/test';
// import { RegisterPage } from '../../pages/RegisterPage';
// import { generateUsername } from '../../utils/testDataGenerator';
// import users from '../../test-data/users.json';

// const BASE_URL = 'https://parabank.parasoft.com/parabank/services/bank';
// const HEADERS = { 'accept': 'application/json' };
// const TRANSFER_AMOUNT = 50;

// test.describe('API - Validate Transfer', () => {

//   let username: string;
//   let customerId: string;
//   let fromAccountId: string;
//   let toAccountId: string;

//   test.beforeEach(async ({ request, browser }) => {
//     username = generateUsername();
//     const page = await browser.newPage();
//     const registerPage = new RegisterPage(page);
//     await registerPage.goto();
//     await registerPage.register(users, username);
//     await page.close();

//     // Login via API to get customerId
//     const loginRes = await request.get(`${BASE_URL}/login/${username}/${users.password}`, {
//       headers: HEADERS
//     });
//     const loginBody = await loginRes.json();
//     customerId = loginBody.id;

//     // Get default account from customer
//     const accountsRes = await request.get(`${BASE_URL}/customers/${customerId}/accounts`, {
//       headers: HEADERS
//     });
//     const accountsBody = await accountsRes.json();
//     const seedAccountId = accountsBody[0].id;

//     // Open first account via API
//     const fromRes = await request.post(
//       `${BASE_URL}/createAccount?customerId=${customerId}&newAccountType=1&fromAccountId=${seedAccountId}`,
//       { headers: HEADERS }
//     );
//     const fromBody = await fromRes.json();
//     fromAccountId = fromBody.id;

//     // Open second account via API
//     const toRes = await request.post(
//       `${BASE_URL}/createAccount?customerId=${customerId}&newAccountType=1&fromAccountId=${seedAccountId}`,
//       { headers: HEADERS }
//     );
//     const toBody = await toRes.json();
//     toAccountId = toBody.id;
//   });


//   test('TC-API-06 - source balance reduced after transfer @regression @api', async ({ request }) => {
//     const beforeRes = await request.get(`${BASE_URL}/accounts/${fromAccountId}`, { headers: HEADERS });
//     expect(beforeRes.status()).toBe(200);
//     const beforeBody = await beforeRes.json();
//     const balanceBefore = beforeBody.balance;

//     // Transfer via API
//     const transferRes = await request.post(
//       `${BASE_URL}/transfer?fromAccountId=${fromAccountId}&toAccountId=${toAccountId}&amount=${TRANSFER_AMOUNT}`,
//       { headers: HEADERS }
//     );
//     expect(transferRes.status()).toBe(200);

//     const afterRes = await request.get(`${BASE_URL}/accounts/${fromAccountId}`, { headers: HEADERS });
//     expect(afterRes.status()).toBe(200);
//     const afterBody = await afterRes.json();
//     const balanceAfter = afterBody.balance;

//     expect(balanceBefore - balanceAfter).toBe(TRANSFER_AMOUNT);
//   });


//   test('TC-API-07 - destination balance increased after transfer @regression @api', async ({ request }) => {
//     const beforeRes = await request.get(`${BASE_URL}/accounts/${toAccountId}`, { headers: HEADERS });
//     expect(beforeRes.status()).toBe(200);
//     const beforeBody = await beforeRes.json();
//     const balanceBefore = beforeBody.balance;

//     // Transfer via API
//     const transferRes = await request.post(
//       `${BASE_URL}/transfer?fromAccountId=${fromAccountId}&toAccountId=${toAccountId}&amount=${TRANSFER_AMOUNT}`,
//       { headers: HEADERS }
//     );
//     expect(transferRes.status()).toBe(200);

//     const afterRes = await request.get(`${BASE_URL}/accounts/${toAccountId}`, { headers: HEADERS });
//     expect(afterRes.status()).toBe(200);
//     const afterBody = await afterRes.json();
//     const balanceAfter = afterBody.balance;

//     expect(balanceAfter - balanceBefore).toBe(TRANSFER_AMOUNT);
//   });

//   // TC-API-08 - total balance conserved after transfer
//   test('TC-API-08 - total balance conserved after transfer @regression @api', async ({ request }) => {
//    const fromBefore = (await (await request.get(`${BASE_URL}/accounts/${fromAccountId}`, { headers: HEADERS })).json()).balance;
//    const toBefore = (await (await request.get(`${BASE_URL}/accounts/${toAccountId}`, { headers: HEADERS })).json()).balance;
//    await request.post(
//     `${BASE_URL}/transfer?fromAccountId=${fromAccountId}&toAccountId=${toAccountId}&amount=${TRANSFER_AMOUNT}`,
//     { headers: HEADERS }
//   );
//   const fromAfter = (await (await request.get(`${BASE_URL}/accounts/${fromAccountId}`, { headers: HEADERS })).json()).balance;
//   const toAfter = (await (await request.get(`${BASE_URL}/accounts/${toAccountId}`, { headers: HEADERS })).json()).balance;
//   expect(fromAfter + toAfter).toBe(fromBefore + toBefore);
// });


// });


import { test, expect } from '@playwright/test';
import { RegisterPage } from '../../pages/RegisterPage';
import { generateUsername } from '../../utils/testDataGenerator';
import users from '../../test-data/users.json';
// importing shared constants from central config instead of repeating them here
import { BASE_URL, HEADERS } from '../../config/env';

// TRANSFER_AMOUNT kept local — only used in this file
const TRANSFER_AMOUNT = 50;

test.describe('API - Validate Transfer', () => {

  let username: string;
  let customerId: string;
  let fromAccountId: string;
  let toAccountId: string;

  // beforeEach registers a fresh user and creates two accounts via API before each test
  // using API to create accounts instead of UI — avoids AJAX dropdown timeout issues
  // we previously tried UI approach but faced timeouts on dropdown selection
  test.beforeEach(async ({ request, browser }) => {
    console.log(`[API-SETUP] Setting up new user and accounts for transfer tests`);
    username = generateUsername();
    const page = await browser.newPage();
    const registerPage = new RegisterPage(page);
    await registerPage.goto();
    await registerPage.register(users, username);
    await page.close();

    // login API used to get customerId for the newly registered user
    const loginRes = await request.get(`${BASE_URL}/login/${username}/${users.password}`, {
      headers: HEADERS
    });
    const loginBody = await loginRes.json();
    customerId = loginBody.id;
    console.log(`[API-SETUP] Customer ID: ${customerId}`);

    // get seed account from customer to use as fromAccountId for creating new accounts
    const accountsRes = await request.get(`${BASE_URL}/customers/${customerId}/accounts`, {
      headers: HEADERS
    });
    const accountsBody = await accountsRes.json();
    const seedAccountId = accountsBody[0].id;

    // create two accounts via API — one to transfer from, one to transfer to
    const fromRes = await request.post(
      `${BASE_URL}/createAccount?customerId=${customerId}&newAccountType=1&fromAccountId=${seedAccountId}`,
      { headers: HEADERS }
    );
    fromAccountId = (await fromRes.json()).id;

    const toRes = await request.post(
      `${BASE_URL}/createAccount?customerId=${customerId}&newAccountType=1&fromAccountId=${seedAccountId}`,
      { headers: HEADERS }
    );
    toAccountId = (await toRes.json()).id;
    console.log(`[API-SETUP] From account: ${fromAccountId}, To account: ${toAccountId}`);
  });

  // TC-API-06 - source balance reduced after transfer
  // verifies that the source account balance is correctly deducted after transfer
  test('TC-API-06 - source balance reduced after transfer @regression @api', async ({ request }) => {
    console.log(`[API-06] Checking balance before transfer for account: ${fromAccountId}`);
    const beforeRes = await request.get(`${BASE_URL}/accounts/${fromAccountId}`, { headers: HEADERS });
    expect(beforeRes.status()).toBe(200);
    const balanceBefore = (await beforeRes.json()).balance;
    console.log(`[API-06] Balance before: ${balanceBefore}`);

    const transferRes = await request.post(
      `${BASE_URL}/transfer?fromAccountId=${fromAccountId}&toAccountId=${toAccountId}&amount=${TRANSFER_AMOUNT}`,
      { headers: HEADERS }
    );
    expect(transferRes.status()).toBe(200);
    console.log(`[API-06] Transfer of ${TRANSFER_AMOUNT} completed`);

    const afterRes = await request.get(`${BASE_URL}/accounts/${fromAccountId}`, { headers: HEADERS });
    expect(afterRes.status()).toBe(200);
    const balanceAfter = (await afterRes.json()).balance;
    console.log(`[API-06] Balance after: ${balanceAfter}, Difference: ${balanceBefore - balanceAfter}`);

    expect(balanceBefore - balanceAfter).toBe(TRANSFER_AMOUNT);
  });

  // TC-API-07 - destination balance increased after transfer
  // verifies that the destination account balance is correctly credited after transfer
  test('TC-API-07 - destination balance increased after transfer @regression @api', async ({ request }) => {
    console.log(`[API-07] Checking balance before transfer for account: ${toAccountId}`);
    const beforeRes = await request.get(`${BASE_URL}/accounts/${toAccountId}`, { headers: HEADERS });
    expect(beforeRes.status()).toBe(200);
    const balanceBefore = (await beforeRes.json()).balance;
    console.log(`[API-07] Balance before: ${balanceBefore}`);

    const transferRes = await request.post(
      `${BASE_URL}/transfer?fromAccountId=${fromAccountId}&toAccountId=${toAccountId}&amount=${TRANSFER_AMOUNT}`,
      { headers: HEADERS }
    );
    expect(transferRes.status()).toBe(200);
    console.log(`[API-07] Transfer of ${TRANSFER_AMOUNT} completed`);

    const afterRes = await request.get(`${BASE_URL}/accounts/${toAccountId}`, { headers: HEADERS });
    expect(afterRes.status()).toBe(200);
    const balanceAfter = (await afterRes.json()).balance;
    console.log(`[API-07] Balance after: ${balanceAfter}, Difference: ${balanceAfter - balanceBefore}`);

    expect(balanceAfter - balanceBefore).toBe(TRANSFER_AMOUNT);
  });

  // TC-API-08 - total balance conserved after transfer
  // verifies money is not created or destroyed during transfer
  // total of both accounts should be same before and after
  test('TC-API-08 - total balance conserved after transfer @regression @api', async ({ request }) => {
    console.log(`[API-08] Checking total balance conservation`);
    const fromBefore = (await (await request.get(`${BASE_URL}/accounts/${fromAccountId}`, { headers: HEADERS })).json()).balance;
    const toBefore = (await (await request.get(`${BASE_URL}/accounts/${toAccountId}`, { headers: HEADERS })).json()).balance;
    console.log(`[API-08] Total before: ${fromBefore + toBefore}`);

    await request.post(
      `${BASE_URL}/transfer?fromAccountId=${fromAccountId}&toAccountId=${toAccountId}&amount=${TRANSFER_AMOUNT}`,
      { headers: HEADERS }
    );

    const fromAfter = (await (await request.get(`${BASE_URL}/accounts/${fromAccountId}`, { headers: HEADERS })).json()).balance;
    const toAfter = (await (await request.get(`${BASE_URL}/accounts/${toAccountId}`, { headers: HEADERS })).json()).balance;
    console.log(`[API-08] Total after: ${fromAfter + toAfter}`);

    expect(fromAfter + toAfter).toBe(fromBefore + toBefore);
  });

});