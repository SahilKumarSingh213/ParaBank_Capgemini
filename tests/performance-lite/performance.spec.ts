// import { test, expect } from '@playwright/test';

// const BASE_URL = 'https://parabank.parasoft.com/parabank/services/bank';
// const HEADERS = { 'Accept': 'application/json' };
// const CUSTOMER_ID = 12212;

// test.describe('Performance Tests', () => {

//   // UI page load time
//   test('UI - login page load time', async ({ page }) => {
//     const start = Date.now();
//     await page.goto('https://parabank.parasoft.com/parabank/index.htm');
//     await page.waitForLoadState('networkidle');
//     const loadTime = Date.now() - start;
//     console.log(`Login page load time: ${loadTime}ms`);
//     expect(loadTime).toBeLessThan(5000); // fail if page takes more than 5 seconds
//   });

//   // API response time
//   test('API - GET accounts response time under 2 seconds', async ({ request }) => {
//     const start = Date.now();
//     const response = await request.get(`${BASE_URL}/customers/${CUSTOMER_ID}/accounts`, {
//       headers: HEADERS
//     });
//     const responseTime = Date.now() - start;
//     console.log(`API response time: ${responseTime}ms`);
//     expect(response.status()).toBe(200);
//     expect(responseTime).toBeLessThan(2000); // fail if API takes more than 2 seconds
//   });

//   // Repeated GET accounts 20 times asynchronously
//   test('API - throughput - GET accounts 20 times async', async ({ request }) => {
//     const requests = Array.from({ length: 20 }, () =>
//       request.get(`${BASE_URL}/customers/${CUSTOMER_ID}/accounts`, {
//         headers: HEADERS
//       })
//     );

//     const start = Date.now();
//     const responses = await Promise.all(requests);
//     const totalTime = Date.now() - start;

//     console.log(`20 requests completed in: ${totalTime}ms`);
//     console.log(`Average response time: ${totalTime / 20}ms`);

//     // verify all 20 returned 200
//     responses.forEach(response => {
//       expect(response.status()).toBe(200);
//     });
//   });

// });


import { test, expect } from '@playwright/test';
// importing shared constants from central config instead of repeating them here
import { BASE_URL, HEADERS, CUSTOMER_ID } from '../../config/env';

test.describe('Performance Tests', () => {

  // UI page load time test
  // captures how long the login page takes to fully load
  // fails if page takes more than 5 seconds — acceptable threshold for demo site
  test('UI - login page load time @regression @performance', async ({ page }) => {
    console.log(`[PERF-01] Measuring login page load time`);
    const start = Date.now();
    await page.goto('https://parabank.parasoft.com/parabank/index.htm');
    await page.waitForLoadState('networkidle');
    const loadTime = Date.now() - start;
    console.log(`[PERF-01] Login page load time: ${loadTime}ms`);
    expect(loadTime).toBeLessThan(5000);
  });

  // API response time test
  // captures how long the GET accounts API takes to respond
  // capstone guide requirement: fail if API response > 2 seconds
  test('API - GET accounts response time under 2 seconds @regression @performance', async ({ request }) => {
    console.log(`[PERF-02] Measuring API response time`);
    const start = Date.now();
    const response = await request.get(`${BASE_URL}/customers/${CUSTOMER_ID}/accounts`, {
      headers: HEADERS
    });
    const responseTime = Date.now() - start;
    console.log(`[PERF-02] API response time: ${responseTime}ms`);
    expect(response.status()).toBe(200);
    expect(responseTime).toBeLessThan(2000);
  });

  // throughput test — sends 20 GET requests simultaneously using Promise.all
  // capstone guide requirement: basic throughput validation with 20 async requests
  // Promise.all fires all requests at once and waits for all to complete
  test('API - throughput - GET accounts 20 times async @regression @performance', async ({ request }) => {
    console.log(`[PERF-03] Starting throughput test - 20 async requests`);
    const requests = Array.from({ length: 20 }, () =>
      request.get(`${BASE_URL}/customers/${CUSTOMER_ID}/accounts`, {
        headers: HEADERS
      })
    );

    const start = Date.now();
    const responses = await Promise.all(requests);
    const totalTime = Date.now() - start;

    console.log(`[PERF-03] 20 requests completed in: ${totalTime}ms`);
    console.log(`[PERF-03] Average response time: ${totalTime / 20}ms`);

    // verify all 20 requests returned 200
    responses.forEach(response => {
      expect(response.status()).toBe(200);
    });
  });

});