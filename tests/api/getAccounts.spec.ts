

import { test, expect } from '@playwright/test';
import { BASE_URL, HEADERS, CUSTOMER_ID } from '../../config/env';

 
test.describe('API - Get Accounts', () => {

  test('TC-API-01 - get accounts returns 200 ', async ({ request }) => {
    console.log('TC-API-01 - GET accounts');
    const response = await request.get(`${BASE_URL}/customers/${CUSTOMER_ID}/accounts`, {
      headers: HEADERS });
    console.log(`status: ${response.status()}`);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.length).toBeGreaterThan(0);});

  test('TC-API-NEG-01 - invalid customer ID should not return 200 ', async ({ request }) => {
    console.log('TC-API-NEG-01 - invalid customer ID');
    const response = await request.get(`${BASE_URL}/customers/99999999/accounts`,{
      headers: HEADERS});
    console.log(`status: ${response.status()}`);
    expect(response.status()).not.toBe(200); });

  test('TC-API-02-SCHEMA - validate account schema', async ({ request }) => {
    console.log('TC-API-SCHEMA - validating account fields');
    const response = await request.get(`${BASE_URL}/customers/${CUSTOMER_ID}/accounts`, {
      headers: HEADERS});

    expect(response.status()).toBe(200);
    const body = await response.json();
    console.log(`checking ${body.length} accounts`);
    for (const account of body) {
      expect(typeof account.id).toBe('number');
      expect(typeof account.customerId).toBe('number');
      expect(typeof account.type).toBe('string');
      expect(typeof account.balance).toBe('number');
    }
    console.log('schema check passed');
  });

});