# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api\getAccounts.spec.ts >> API - Get Accounts >> TC-API-01 - get accounts returns 200 @regression @api
- Location: tests\api\getAccounts.spec.ts:9:7

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 429
```

# Test source

```ts
  1  | 
  2  | 
  3  | import { test, expect } from '@playwright/test';
  4  | import { BASE_URL, HEADERS, CUSTOMER_ID } from '../../config/env';
  5  | 
  6  |  
  7  | test.describe('API - Get Accounts', () => {
  8  | 
  9  |   test('TC-API-01 - get accounts returns 200 @regression @api', async ({ request }) => {
  10 |     console.log('TC-API-01 - GET accounts');
  11 |     const response = await request.get(`${BASE_URL}/customers/${CUSTOMER_ID}/accounts`, {
  12 |       headers: HEADERS });
  13 |     console.log(`status: ${response.status()}`);
> 14 |     expect(response.status()).toBe(200);
     |                               ^ Error: expect(received).toBe(expected) // Object.is equality
  15 |     const body = await response.json();
  16 |     console.log(`accounts found: ${body.length}`);
  17 |     expect(body.length).toBeGreaterThan(0);});
  18 | 
  19 |   test('TC-API-NEG-01 - invalid customer ID should not return 200 @regression @api', async ({ request }) => {
  20 |     console.log('TC-API-NEG-01 - invalid customer ID');
  21 |     const response = await request.get(`${BASE_URL}/customers/99999999/accounts`,{
  22 |       headers: HEADERS});
  23 | 
  24 |     console.log(`status: ${response.status()}`);
  25 |     expect(response.status()).not.toBe(200); });
  26 | 
  27 |   test('validate account schema @regression @api', async ({ request }) => {
  28 |     console.log('TC-API-SCHEMA - validating account fields');
  29 |     const response = await request.get(`${BASE_URL}/customers/${CUSTOMER_ID}/accounts`, {
  30 |       headers: HEADERS});
  31 | 
  32 |     expect(response.status()).toBe(200);
  33 |     const body = await response.json();
  34 |     console.log(`checking ${body.length} accounts`);
  35 |     for (const account of body) {
  36 |       expect(typeof account.id).toBe('number');
  37 |       expect(typeof account.customerId).toBe('number');
  38 |       expect(typeof account.type).toBe('string');
  39 |       expect(typeof account.balance).toBe('number');
  40 |     }
  41 |     console.log('schema check passed');
  42 |   });
  43 | 
  44 | });
```