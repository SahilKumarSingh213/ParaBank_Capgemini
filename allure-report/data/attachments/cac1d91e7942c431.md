# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: performance\performance.spec.ts >> Performance Tests >> TC-PERF-02 - GET accounts response time under 2 seconds @regression @performance
- Location: tests\performance\performance.spec.ts:16:7

# Error details

```
Error: expect(received).toBeLessThan(expected)

Expected: < 2000
Received:   5250
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import { BASE_URL, HEADERS, CUSTOMER_ID } from '../../config/env';
  3  | 
  4  | test.describe('Performance Tests', () => {
  5  | 
  6  |   test('TC-PERF-01 - login page load time @regression @performance', async ({ page }) => {
  7  |     console.log('TC-PERF-01 - measuring page load time');
  8  |     const start = Date.now();
  9  |     await page.goto('https://parabank.parasoft.com/parabank/index.htm');
  10 |     await page.waitForLoadState('networkidle');
  11 |     const load_time = Date.now() - start;
  12 |     console.log(`load time: ${load_time}ms`);
  13 |     expect(load_time).toBeLessThan(5000);
  14 |   });
  15 | 
  16 |   test('TC-PERF-02 - GET accounts response time under 2 seconds @regression @performance', async ({ request }) => {
  17 |     console.log('TC-PERF-02 - measuring API response time');
  18 |     const start = Date.now();
  19 |     const response = await request.get(`${BASE_URL}/customers/${CUSTOMER_ID}/accounts`, {
  20 |       headers: HEADERS
  21 |     });
  22 |     const response_time = Date.now() - start;
  23 |     console.log(`response time: ${response_time}ms`);
  24 |     expect(response.status()).toBe(200);
> 25 |     expect(response_time).toBeLessThan(2000);
     |                           ^ Error: expect(received).toBeLessThan(expected)
  26 |   });
  27 | 
  28 |   test('TC-PERF-03 - GET accounts 20 times async @regression @performance', async ({ request }) => {
  29 |     console.log('TC-PERF-03 - throughput test 20 requests');
  30 |     const all_requests = Array.from({ length: 20 }, () =>
  31 |       request.get(`${BASE_URL}/customers/${CUSTOMER_ID}/accounts`, {
  32 |         headers: HEADERS
  33 |       })
  34 |     );
  35 | 
  36 |     const start = Date.now();
  37 |     const all_responses = await Promise.all(all_requests);
  38 |     const total_time = Date.now() - start;
  39 | 
  40 |     console.log(`total time: ${total_time}ms`);
  41 |     console.log(`average time: ${total_time / 20}ms`);
  42 | 
  43 |     for (const response of all_responses) {
  44 |       expect(response.status()).toBe(200);
  45 |     }
  46 |   });
  47 | 
  48 | });
```