

import { test, expect } from '@playwright/test';
import { RegisterPage } from '../../pages/RegisterPage';
import { generateUsername } from '../../utils/testDataGenerator';
import users from '../../test-data/users.json';
import { BASE_URL, HEADERS } from '../../config/env';

const TRANSFER_AMOUNT = 50;

test.describe('API - Validate Transfer', () => {

  let username: string;
  let customer_id: string;
  let from_account: string;
  let to_account: string;

  test.beforeEach(async ({ request, browser }) => {
    console.log('setting up user and accounts');
    username = generateUsername();
    const page = await browser.newPage();
    const register_page = new RegisterPage(page);
    await register_page.goto();
    await register_page.register(users, username);
    await page.close();

    const login = await request.get(`${BASE_URL}/login/${username}/${users.password}`, {
      headers: HEADERS
    });
    const login_body = await login.json();
    customer_id = login_body.id;
    console.log(`customer id: ${customer_id}`);

    const all_accounts = await request.get(`${BASE_URL}/customers/${customer_id}/accounts`, {
      headers: HEADERS
    });
    const accounts_body = await all_accounts.json();
    const seed_account = accounts_body[0].id;

    const new_from_account = await request.post(
      `${BASE_URL}/createAccount?customerId=${customer_id}&newAccountType=1&fromAccountId=${seed_account}`,
      { headers: HEADERS }
    );
    from_account = (await new_from_account.json()).id;

    const new_to_account = await request.post(
      `${BASE_URL}/createAccount?customerId=${customer_id}&newAccountType=1&fromAccountId=${seed_account}`,
      { headers: HEADERS }
    );
    to_account = (await new_to_account.json()).id;
    console.log(`from: ${from_account}, to: ${to_account}`);
  });

  test('TC-API-06 - source balance reduced after transfer @regression @api', async ({ request }) => {
    console.log('TC-API-06 - checking source balance');
    const from_account_before = await request.get(`${BASE_URL}/accounts/${from_account}`, { headers: HEADERS });
    expect(from_account_before.status()).toBe(200);
    const balance_before = (await from_account_before.json()).balance;
    console.log(`balance before: ${balance_before}`);

    const transfer = await request.post(
      `${BASE_URL}/transfer?fromAccountId=${from_account}&toAccountId=${to_account}&amount=${TRANSFER_AMOUNT}`,
      { headers: HEADERS }
    );
    expect(transfer.status()).toBe(200);
    console.log(`transfer done: ${TRANSFER_AMOUNT}`);

    const from_account_after = await request.get(`${BASE_URL}/accounts/${from_account}`, { headers: HEADERS });
    expect(from_account_after.status()).toBe(200);
    const balance_after = (await from_account_after.json()).balance;
    console.log(`balance after: ${balance_after}`);

    expect(balance_before - balance_after).toBe(TRANSFER_AMOUNT);
  });

  test('TC-API-07 - destination balance increased after transfer @regression @api', async ({ request }) => {
    console.log('TC-API-07 - checking destination balance');
    const to_account_before = await request.get(`${BASE_URL}/accounts/${to_account}`, { headers: HEADERS });
    expect(to_account_before.status()).toBe(200);
    const balance_before = (await to_account_before.json()).balance;
    console.log(`balance before: ${balance_before}`);

    const transfer = await request.post(
      `${BASE_URL}/transfer?fromAccountId=${from_account}&toAccountId=${to_account}&amount=${TRANSFER_AMOUNT}`,
      { headers: HEADERS }
    );
    expect(transfer.status()).toBe(200);
    console.log(`transfer done: ${TRANSFER_AMOUNT}`);

    const to_account_after = await request.get(`${BASE_URL}/accounts/${to_account}`, { headers: HEADERS });
    expect(to_account_after.status()).toBe(200);
    const balance_after = (await to_account_after.json()).balance;
    console.log(`balance after: ${balance_after}`);

    expect(balance_after - balance_before).toBe(TRANSFER_AMOUNT);
  });

  test('TC-API-08 - total balance conserved after transfer @regression @api', async ({ request }) => {
    console.log('TC-API-08 - checking total balance');
    const from_account_before = await request.get(`${BASE_URL}/accounts/${from_account}`, { headers: HEADERS });
    const from_before = (await from_account_before.json()).balance;

    const to_account_before = await request.get(`${BASE_URL}/accounts/${to_account}`, { headers: HEADERS });
    const to_before = (await to_account_before.json()).balance;
    console.log(`total before: ${from_before + to_before}`);

    await request.post(
      `${BASE_URL}/transfer?fromAccountId=${from_account}&toAccountId=${to_account}&amount=${TRANSFER_AMOUNT}`,
      { headers: HEADERS }
    );

    const from_account_after = await request.get(`${BASE_URL}/accounts/${from_account}`, { headers: HEADERS });
    const from_after = (await from_account_after.json()).balance;

    const to_account_after = await request.get(`${BASE_URL}/accounts/${to_account}`, { headers: HEADERS });
    const to_after = (await to_account_after.json()).balance;
    console.log(`total after: ${from_after + to_after}`);

    expect(from_after + to_after).toBe(from_before + to_before);
  });

});