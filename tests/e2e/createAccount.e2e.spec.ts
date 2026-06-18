

import { test, expect } from '@playwright/test';
import { RegisterPage } from '../../pages/RegisterPage';
import { OpenAccountPage } from '../../pages/OpenAccountPage';
import { generateUsername } from '../../utils/testDataGenerator';
import users from '../../test-data/users.json';
import { BASE_URL, HEADERS } from '../../config/env';

test.describe('E2E Tests', () => {

  test('TC-E2E-01 - create account via UI and validate via API ', async ({ page, request }) => {

    let customerId: string;
    let newAccountId: string;

    await test.step('Register new user', async () => {
      const username = generateUsername();
      console.log(`[E2E-01] Registering user: ${username}`);
      const registerPage = new RegisterPage(page);
      await registerPage.goto();
      await registerPage.register(users, username);
      await registerPage.SuccessMessage.waitFor({ state: 'visible' });

      const loginRes = await request.get(`${BASE_URL}/login/${username}/${users.password}`, {
        headers: HEADERS
      });
      expect(loginRes.status()).toBe(200);
      const loginBody = await loginRes.json();
      customerId = loginBody.id;
      console.log(`[E2E-01] Customer ID: ${customerId}`);
    });

    await test.step('Open new savings account via UI', async () => {
      console.log(`[E2E-01] Opening new savings account via UI`);
      const openAccountPage = new OpenAccountPage(page);
      await openAccountPage.goto();
      await openAccountPage.openAccount('1');
      await openAccountPage.SuccessMessage.waitFor({ state: 'visible' });
      newAccountId = (await openAccountPage.getNewAccountId())!;
      console.log(`[E2E-01] New account ID from UI: ${newAccountId}`);
    });

    await test.step('Validate new account exists in API', async () => {
      console.log(`[E2E-01] Validating account in API`);
      const accountsRes = await request.get(`${BASE_URL}/customers/${customerId}/accounts`, {
        headers: HEADERS
      });
      expect(accountsRes.status()).toBe(200);
      const accountsBody = await accountsRes.json();
      const found = accountsBody.some((acc: any) => String(acc.id) === String(newAccountId));
      console.log(`[E2E-01] Account found in API: ${found}`);
      expect(found).toBeTruthy();
    });


    await test.step('Validate account type is SAVINGS and balance is correct', async () => {
      console.log(`[E2E-01] Validating account type and balance`);
      const accountRes = await request.get(`${BASE_URL}/accounts/${newAccountId}`, {
        headers: HEADERS
      });
      expect(accountRes.status()).toBe(200);
      const accountBody = await accountRes.json();
      console.log(`[E2E-01] Account type: ${accountBody.type}, Balance: ${accountBody.balance}`);
      expect(accountBody.type).toBe('SAVINGS');
      expect(accountBody.balance).toBe(100.00);
    });

  });

});