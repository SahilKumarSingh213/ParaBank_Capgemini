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


// import { test, expect } from '@playwright/test';

// const BASE_URL = 'https://parabank.parasoft.com/parabank/services/bank';
// const HEADERS = { 'Accept': 'application/json' };
// const CUSTOMER_ID = 12212;

// test.describe('API - Get Accounts', () => {

//     // TC-API-01 - GET accounts returns 200 OK
//     test('TC-API-01 - GET accounts returns 200 OK @regression @api', async ({ request }) => {
//     const response = await request.get(`${BASE_URL}/customers/${CUSTOMER_ID}/accounts`, {
//       headers: HEADERS
//     });
//     expect(response.status()).toBe(200);
//     const body = await response.json();
//     expect(Array.isArray(body)).toBeTruthy();
//     expect(body.length).toBeGreaterThan(0);
//     });

//     // TC-API-NEG-01 - invalid customer ID returns error
//     test('TC-API-NEG-01 - invalid customer ID returns error @regression @api', async ({ request }) => {
//     const response = await request.get(`${BASE_URL}/customers/99999999/accounts`, {
//       headers: HEADERS
//     });
//     expect(response.status()).not.toBe(200);
//     });

//     // TC-API - validate all account fields have correct data types
// test('TC-API - validate account schema and data types @regression @api', async ({ request }) => {
//   const response = await request.get(`${BASE_URL}/customers/${CUSTOMER_ID}/accounts`, {
//     headers: HEADERS
//   });
//   expect(response.status()).toBe(200);
//   const body = await response.json();
//   for (const account of body) {
//     expect(typeof account.id).toBe('number');
//     expect(typeof account.customerId).toBe('number');
//     expect(typeof account.type).toBe('string');
//     expect(typeof account.balance).toBe('number');
//   }
// });

// })

import { test, expect } from '@playwright/test';
// importing shared constants from central config instead of repeating them here
import { BASE_URL, HEADERS, CUSTOMER_ID } from '../../config/env';

test.describe('API - Get Accounts', () => {

    // TC-API-01 - GET accounts returns 200 OK
    // validates that the GET accounts API returns a successful response with account data
    test('TC-API-01 - GET accounts returns 200 OK @regression @api', async ({ request }) => {
    console.log(`[API-01] Calling GET accounts for customer: ${CUSTOMER_ID}`);
    const response = await request.get(`${BASE_URL}/customers/${CUSTOMER_ID}/accounts`, {
      headers: HEADERS
    });
    console.log(`[API-01] Response status: ${response.status()}`);
    expect(response.status()).toBe(200);
    const body = await response.json();
    console.log(`[API-01] Total accounts found: ${body.length}`);
    expect(Array.isArray(body)).toBeTruthy();
    expect(body.length).toBeGreaterThan(0);
    });

    // TC-API-NEG-01 - invalid customer ID returns error
    // negative test — verifies API returns an error for non-existent customer
    test('TC-API-NEG-01 - invalid customer ID returns error @regression @api', async ({ request }) => {
    console.log(`[API-NEG-01] Testing invalid customer ID: 99999999`);
    const response = await request.get(`${BASE_URL}/customers/99999999/accounts`, {
      headers: HEADERS
    });
    console.log(`[API-NEG-01] Response status: ${response.status()}`);
    expect(response.status()).not.toBe(200);
    });

    // TC-API-SCHEMA - validates all account fields have correct data types
    // schema validation ensures the API response structure matches expected format
    // checks id, customerId, type and balance are present with correct types
    test('TC-API - validate account schema and data types @regression @api', async ({ request }) => {
    console.log(`[API-SCHEMA] Validating account schema for customer: ${CUSTOMER_ID}`);
    const response = await request.get(`${BASE_URL}/customers/${CUSTOMER_ID}/accounts`, {
        headers: HEADERS
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    console.log(`[API-SCHEMA] Validating ${body.length} accounts`);
    for (const account of body) {
        expect(typeof account.id).toBe('number');
        expect(typeof account.customerId).toBe('number');
        expect(typeof account.type).toBe('string');
        expect(typeof account.balance).toBe('number');
    }
    console.log(`[API-SCHEMA] All accounts passed schema validation`);
    });

})
