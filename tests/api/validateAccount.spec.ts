
import { test, expect } from '@playwright/test';
import { BASE_URL, HEADERS, CUSTOMER_ID, FROM_ACCOUNT_ID } from '../../config/env';

test.describe('API - Validate Account', () => {

    test('TC-API-03 - new account exists in API', async ({ request }) => {
        console.log('TC-API-03 - creating account via API');
        const new_account = await request.post(`${BASE_URL}/createAccount?customerId=${CUSTOMER_ID}&newAccountType=1&fromAccountId=${FROM_ACCOUNT_ID}`, {
            headers: HEADERS
        });
        expect(new_account.status()).toBe(200);
        const new_account_id = (await new_account.json()).id;
        console.log(`new account id: ${new_account_id}`);
        const all_account = await request.get(`${BASE_URL}/customers/${CUSTOMER_ID}/accounts`, {
          headers: HEADERS
        });
        expect(all_account.status()).toBe(200);
        const account_list = await all_account.json();
        let account_found = false;
        for (const account of account_list) {
          if (account.id === new_account_id) {
            account_found = true;
             break;
            }
        }

        console.log(`account found: ${account_found}`);
        expect(account_found).toBeTruthy();
    });

    test('TC-API-04 - new account type is SAVINGS', async ({ request }) => {
        console.log('TC-API-04 - validating account type and balance');

        const new_account = await request.post(`${BASE_URL}/createAccount?customerId=${CUSTOMER_ID}&newAccountType=1&fromAccountId=${FROM_ACCOUNT_ID}`, {
            headers: HEADERS
        });
        expect(new_account.status()).toBe(200);
        const body = await new_account.json();
        console.log(`type: ${body.type}, balance: ${body.balance}`);
        expect(body.type).toBe('SAVINGS');
        expect(body.customerId).toBe(CUSTOMER_ID);
        expect(typeof body.balance).toBe('number');
    });

    test('TC-API-05 - invalid customerId returns error', async ({ request }) => {
      const createAccountResponse = await request.post(`${BASE_URL}/createAccount?customerId=00000&newAccountType=1&fromAccountId=${FROM_ACCOUNT_ID}`, {
            headers: HEADERS
        });
        console.log(`status: ${createAccountResponse.status()}`);
        expect(createAccountResponse.status()).not.toBe(200);
    });

})