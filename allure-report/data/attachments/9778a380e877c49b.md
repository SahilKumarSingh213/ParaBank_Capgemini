# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api\validateAccount.spec.ts >> API - Validate Account >> TC-API-03 - new account exists in API
- Location: tests\api\validateAccount.spec.ts:7:9

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 404
```

# Test source

```ts
  1  | 
  2  | import { test, expect } from '@playwright/test';
  3  | import { BASE_URL, HEADERS, CUSTOMER_ID, FROM_ACCOUNT_ID } from '../../config/env';
  4  | 
  5  | test.describe('API - Validate Account', () => {
  6  | 
  7  |     test('TC-API-03 - new account exists in API', async ({ request }) => {
  8  |         console.log('TC-API-03 - creating account via API');
  9  |         const new_account = await request.post(`${BASE_URL}/createAccount?customerId=${CUSTOMER_ID}&newAccountType=1&fromAccountId=${FROM_ACCOUNT_ID}`, {
  10 |             headers: HEADERS
  11 |         });
> 12 |         expect(new_account.status()).toBe(200);
     |                                      ^ Error: expect(received).toBe(expected) // Object.is equality
  13 |         const new_account_id = (await new_account.json()).id;
  14 |         console.log(`new account id: ${new_account_id}`);
  15 |         const all_account = await request.get(`${BASE_URL}/customers/${CUSTOMER_ID}/accounts`, {
  16 |           headers: HEADERS
  17 |         });
  18 |         expect(all_account.status()).toBe(200);
  19 |         const account_list = await all_account.json();
  20 |         let account_found = false;
  21 |         for (const account of account_list) {
  22 |           if (account.id === new_account_id) {
  23 |             account_found = true;
  24 |              break;
  25 |             }
  26 |         }
  27 | 
  28 |         console.log(`account found: ${account_found}`);
  29 |         expect(account_found).toBeTruthy();
  30 |     });
  31 | 
  32 |     test('TC-API-04 - new account type is SAVINGS', async ({ request }) => {
  33 |         console.log('TC-API-04 - validating account type and balance');
  34 | 
  35 |         const new_account = await request.post(`${BASE_URL}/createAccount?customerId=${CUSTOMER_ID}&newAccountType=1&fromAccountId=${FROM_ACCOUNT_ID}`, {
  36 |             headers: HEADERS
  37 |         });
  38 |         expect(new_account.status()).toBe(200);
  39 |         const body = await new_account.json();
  40 |         console.log(`type: ${body.type}, balance: ${body.balance}`);
  41 |         expect(body.type).toBe('SAVINGS');
  42 |         expect(body.customerId).toBe(CUSTOMER_ID);
  43 |         expect(typeof body.balance).toBe('number');
  44 |     });
  45 | 
  46 |     test('TC-API-05 - invalid customerId returns error', async ({ request }) => {
  47 |       const createAccountResponse = await request.post(`${BASE_URL}/createAccount?customerId=00000&newAccountType=1&fromAccountId=${FROM_ACCOUNT_ID}`, {
  48 |             headers: HEADERS
  49 |         });
  50 |         console.log(`status: ${createAccountResponse.status()}`);
  51 |         expect(createAccountResponse.status()).not.toBe(200);
  52 |     });
  53 | 
  54 | })
```