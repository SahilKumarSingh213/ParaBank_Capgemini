# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api\validateTransfer.spec.ts >> API - Validate Transfer >> TC-API-07 - destination balance increased after transfer @regression @api
- Location: tests\api\validateTransfer.spec.ts:78:7

# Error details

```
SyntaxError: Unexpected end of JSON input
```

# Test source

```ts
  1   | 
  2   | 
  3   | import { test, expect } from '@playwright/test';
  4   | import { RegisterPage } from '../../pages/RegisterPage';
  5   | import { generateUsername } from '../../utils/testDataGenerator';
  6   | import users from '../../test-data/users.json';
  7   | import { BASE_URL, HEADERS } from '../../config/env';
  8   | 
  9   | const TRANSFER_AMOUNT = 50;
  10  | 
  11  | test.describe('API - Validate Transfer', () => {
  12  | 
  13  |   let username: string;
  14  |   let customer_id: string;
  15  |   let from_account_id: string;
  16  |   let to_account_id: string;
  17  | 
  18  |   test.beforeEach(async ({ request, browser }) => {
  19  |     console.log('setting up user and accounts');
  20  |     username = generateUsername();
  21  |     const page = await browser.newPage();
  22  |     const register_page = new RegisterPage(page);
  23  |     await register_page.goto();
  24  |     await register_page.register(users, username);
  25  |     await page.close();
  26  | 
  27  |     const login = await request.get(`${BASE_URL}/login/${username}/${users.password}`, {
  28  |       headers: HEADERS
  29  |     });
  30  |     const login_body = await login.json();
  31  |     customer_id = login_body.id;
  32  |     console.log(`customer id: ${customer_id}`);
  33  | 
  34  |     const accounts = await request.get(`${BASE_URL}/customers/${customer_id}/accounts`, {
  35  |       headers: HEADERS
  36  |     });
  37  |     const accounts_body = await accounts.json();
  38  |     const seed_account = accounts_body.id;
  39  | 
  40  |     const new_from_account = await request.post(
  41  |       `${BASE_URL}/createAccount?customerId=${customer_id}&newAccountType=1&fromAccountId=${seed_account}`,
  42  |       { headers: HEADERS }
  43  |     );
> 44  |     from_account_id = (await new_from_account.json()).id;
      |                        ^ SyntaxError: Unexpected end of JSON input
  45  | 
  46  |     const new_to_account = await request.post(
  47  |       `${BASE_URL}/createAccount?customerId=${customer_id}&newAccountType=1&fromAccountId=${seed_account}`,
  48  |       { headers: HEADERS }
  49  |     );
  50  |     to_account_id = (await new_to_account.json()).id;
  51  |     console.log(`from: ${from_account_id}, to: ${to_account_id}`);
  52  |   });
  53  | 
  54  |   test('TC-API-06 - source balance reduced after transfer @regression @api', async ({ request }) => {
  55  |     console.log('TC-API-06 - checking source balance');
  56  |     const from_account_before = await request.get(`${BASE_URL}/accounts/${from_account_id}`, { headers: HEADERS });
  57  |     expect(from_account_before.status()).toBe(200);
  58  |     const balance_before = (await from_account_before.json()).balance;
  59  |     console.log(`balance before: ${balance_before}`);
  60  | 
  61  |     const transfer = await request.post(
  62  |       `${BASE_URL}/transfer?fromAccountId=${from_account_id}&toAccountId=${to_account_id}&amount=${TRANSFER_AMOUNT}`,
  63  |       { headers: HEADERS }
  64  |     );
  65  |     expect(transfer.status()).toBe(200);
  66  |     console.log(`transfer done: ${TRANSFER_AMOUNT}`);
  67  | 
  68  |     const from_account_after = await request.get(`${BASE_URL}/accounts/${from_account_id}`, { headers: HEADERS });
  69  |     expect(from_account_after.status()).toBe(200);
  70  |     const balance_after = (await from_account_after.json()).balance;
  71  |     console.log(`balance after: ${balance_after}`);
  72  | 
  73  |     expect(balance_before - balance_after).toBe(TRANSFER_AMOUNT);
  74  |   });
  75  | 
  76  |   
  77  | 
  78  |   test('TC-API-07 - destination balance increased after transfer @regression @api', async ({ request }) => {
  79  |     console.log('TC-API-07 - checking destination balance');
  80  |     const to_account_before = await request.get(`${BASE_URL}/accounts/${to_account_id}`, { headers: HEADERS });
  81  |     expect(to_account_before.status()).toBe(200);
  82  |     const balance_before = (await to_account_before.json()).balance;
  83  |     console.log(`balance before: ${balance_before}`);
  84  | 
  85  |     const transfer = await request.post(
  86  |       `${BASE_URL}/transfer?fromAccountId=${from_account_id}&toAccountId=${to_account_id}&amount=${TRANSFER_AMOUNT}`,
  87  |       { headers: HEADERS }
  88  |     );
  89  |     expect(transfer.status()).toBe(200);
  90  |     console.log(`transfer done: ${TRANSFER_AMOUNT}`);
  91  | 
  92  |     const to_account_after = await request.get(`${BASE_URL}/accounts/${to_account_id}`, { headers: HEADERS });
  93  |     expect(to_account_after.status()).toBe(200);
  94  |     const balance_after = (await to_account_after.json()).balance;
  95  |     console.log(`balance after: ${balance_after}`);
  96  | 
  97  |     expect(balance_after - balance_before).toBe(TRANSFER_AMOUNT);
  98  |   });
  99  | 
  100 | 
  101 | });
  102 | 
  103 | 
```