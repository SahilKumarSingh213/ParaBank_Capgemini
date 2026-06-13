# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api\validateTransfer.spec.ts >> API - Validate Transfer >> TC-API - validate new account type is SAVINGS
- Location: tests\api\validateTransfer.spec.ts:208:5

# Error details

```
ReferenceError: CUSTOMER_ID is not defined
```

# Test source

```ts
  109 |   let fromAccountId: string;
  110 |   let toAccountId: string;
  111 | 
  112 |   test.beforeEach(async ({ request, browser }) => {
  113 |     username = generateUsername();
  114 |     const page = await browser.newPage();
  115 |     const registerPage = new RegisterPage(page);
  116 |     await registerPage.goto();
  117 |     await registerPage.register(users, username);
  118 |     await page.close();
  119 | 
  120 |     // Login via API to get customerId
  121 |     const loginRes = await request.get(`${BASE_URL}/login/${username}/${users.password}`, {
  122 |       headers: HEADERS
  123 |     });
  124 |     const loginBody = await loginRes.json();
  125 |     customerId = loginBody.id;
  126 | 
  127 |     // Get default account from customer
  128 |     const accountsRes = await request.get(`${BASE_URL}/customers/${customerId}/accounts`, {
  129 |       headers: HEADERS
  130 |     });
  131 |     const accountsBody = await accountsRes.json();
  132 |     const seedAccountId = accountsBody[0].id;
  133 | 
  134 |     // Open first account via API
  135 |     const fromRes = await request.post(
  136 |       `${BASE_URL}/createAccount?customerId=${customerId}&newAccountType=1&fromAccountId=${seedAccountId}`,
  137 |       { headers: HEADERS }
  138 |     );
  139 |     const fromBody = await fromRes.json();
  140 |     fromAccountId = fromBody.id;
  141 | 
  142 |     // Open second account via API
  143 |     const toRes = await request.post(
  144 |       `${BASE_URL}/createAccount?customerId=${customerId}&newAccountType=1&fromAccountId=${seedAccountId}`,
  145 |       { headers: HEADERS }
  146 |     );
  147 |     const toBody = await toRes.json();
  148 |     toAccountId = toBody.id;
  149 |   });
  150 | 
  151 | 
  152 |   test('TC-API-06 - source balance reduced after transfer', async ({ request }) => {
  153 |     const beforeRes = await request.get(`${BASE_URL}/accounts/${fromAccountId}`, { headers: HEADERS });
  154 |     expect(beforeRes.status()).toBe(200);
  155 |     const beforeBody = await beforeRes.json();
  156 |     const balanceBefore = beforeBody.balance;
  157 | 
  158 |     // Transfer via API
  159 |     const transferRes = await request.post(
  160 |       `${BASE_URL}/transfer?fromAccountId=${fromAccountId}&toAccountId=${toAccountId}&amount=${TRANSFER_AMOUNT}`,
  161 |       { headers: HEADERS }
  162 |     );
  163 |     expect(transferRes.status()).toBe(200);
  164 | 
  165 |     const afterRes = await request.get(`${BASE_URL}/accounts/${fromAccountId}`, { headers: HEADERS });
  166 |     expect(afterRes.status()).toBe(200);
  167 |     const afterBody = await afterRes.json();
  168 |     const balanceAfter = afterBody.balance;
  169 | 
  170 |     expect(balanceBefore - balanceAfter).toBe(TRANSFER_AMOUNT);
  171 |   });
  172 | 
  173 | 
  174 |   test('TC-API-07 - destination balance increased after transfer', async ({ request }) => {
  175 |     const beforeRes = await request.get(`${BASE_URL}/accounts/${toAccountId}`, { headers: HEADERS });
  176 |     expect(beforeRes.status()).toBe(200);
  177 |     const beforeBody = await beforeRes.json();
  178 |     const balanceBefore = beforeBody.balance;
  179 | 
  180 |     // Transfer via API
  181 |     const transferRes = await request.post(
  182 |       `${BASE_URL}/transfer?fromAccountId=${fromAccountId}&toAccountId=${toAccountId}&amount=${TRANSFER_AMOUNT}`,
  183 |       { headers: HEADERS }
  184 |     );
  185 |     expect(transferRes.status()).toBe(200);
  186 | 
  187 |     const afterRes = await request.get(`${BASE_URL}/accounts/${toAccountId}`, { headers: HEADERS });
  188 |     expect(afterRes.status()).toBe(200);
  189 |     const afterBody = await afterRes.json();
  190 |     const balanceAfter = afterBody.balance;
  191 | 
  192 |     expect(balanceAfter - balanceBefore).toBe(TRANSFER_AMOUNT);
  193 |   });
  194 | 
  195 |   // TC-API-08 - total balance conserved after transfer
  196 |   test('TC-API-08 - total balance conserved after transfer', async ({ request }) => {
  197 |    const fromBefore = (await (await request.get(`${BASE_URL}/accounts/${fromAccountId}`, { headers: HEADERS })).json()).balance;
  198 |    const toBefore = (await (await request.get(`${BASE_URL}/accounts/${toAccountId}`, { headers: HEADERS })).json()).balance;
  199 |    await request.post(
  200 |     `${BASE_URL}/transfer?fromAccountId=${fromAccountId}&toAccountId=${toAccountId}&amount=${TRANSFER_AMOUNT}`,
  201 |     { headers: HEADERS }
  202 |   );
  203 |   const fromAfter = (await (await request.get(`${BASE_URL}/accounts/${fromAccountId}`, { headers: HEADERS })).json()).balance;
  204 |   const toAfter = (await (await request.get(`${BASE_URL}/accounts/${toAccountId}`, { headers: HEADERS })).json()).balance;
  205 |   expect(fromAfter + toAfter).toBe(fromBefore + toBefore);
  206 | });
  207 |   // TC-API - validate newly created account type is SAVINGS
  208 | test('TC-API - validate new account type is SAVINGS', async ({ request }) => {
> 209 |   const createRes = await request.post(`${BASE_URL}/createAccount?customerId=${CUSTOMER_ID}&newAccountType=1&fromAccountId=${FROM_ACCOUNT_ID}`, {
      |                                                                                ^ ReferenceError: CUSTOMER_ID is not defined
  210 |     headers: HEADERS
  211 |   });
  212 |   expect(createRes.status()).toBe(200);
  213 |   const body = await createRes.json();
  214 |   expect(body.type).toBe('SAVINGS');
  215 |   expect(body.customerId).toBe(CUSTOMER_ID);
  216 |   expect(typeof body.balance).toBe('number');
  217 | });
  218 | 
  219 | });
```