// import { test, expect } from '@playwright/test';
// import { RegisterPage } from '../../pages/RegisterPage';
// import { generateUsername } from '../../utils/testDataGenerator';
// import users from '../../test-data/users.json';

// const BASE_URL = 'https://parabank.parasoft.com/parabank/services/bank';
// const HEADERS = { 'accept': 'application/json' };

// test.describe('Registration Tests', () => {

// let username: string; 
// let customerId: string;

//     test.beforeEach(async ({ request, browser  }) => {
//     username = generateUsername();
//     const page = await browser.newPage();
//     const registerPage = new RegisterPage(page);
//     await registerPage.goto();
//     await registerPage.register(users, username);
//     await page.close();
//     const response = await request.get(`${BASE_URL}/login/${username}/${users.password}`, {
//       headers: HEADERS
//     });
//     const body = await response.json();
//     customerId = body.id;
//     });


//     test('TC-API-01 - GET accounts returns 200 OK', async ({ request }) => {
//     const response = await request.get(`${BASE_URL}/customers/${customerId}/accounts`, {
//       headers: HEADERS
//     });
//     expect(response.status()).toBe(200);
//     const body = await response.json();
//      expect(Array.isArray(body)).toBeTruthy();
//      expect(body.length).toBeGreaterThan(0);
// });

//     test('TC-API-NEG-01 - invalid customer ID returns error', async ({ request }) => {
//     const response = await request.get(`${BASE_URL}/customers/99999999/accounts`, {
//       headers: HEADERS
//     });
//     expect(response.status()).not.toBe(200);
//   });

// })


import { test, expect } from '@playwright/test';

const BASE_URL = 'https://parabank.parasoft.com/parabank/services/bank';
const HEADERS = { 'Accept': 'application/json' };
const CUSTOMER_ID = 12212;

test.describe('API - Get Accounts', () => {

    // TC-API-01 - GET accounts returns 200 OK
    test('TC-API-01 - GET accounts returns 200 OK', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/customers/${CUSTOMER_ID}/accounts`, {
      headers: HEADERS
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(Array.isArray(body)).toBeTruthy();
    expect(body.length).toBeGreaterThan(0);
    });

    // TC-API-NEG-01 - invalid customer ID returns error
    test('TC-API-NEG-01 - invalid customer ID returns error', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/customers/99999999/accounts`, {
      headers: HEADERS
    });
    expect(response.status()).not.toBe(200);
    });

})
