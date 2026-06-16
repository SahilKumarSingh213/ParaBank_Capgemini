import { test, expect } from '@playwright/test';
import { BASE_URL, HEADERS, CUSTOMER_ID } from '../../config/env';

test.describe('Performance Tests', () => {

  test('TC-PERF-01 - login page load time', async ({ page }) => {
    console.log('TC-PERF-01 - measuring page load time');
    const start = Date.now();
    await page.goto('https://parabank.parasoft.com/parabank/index.htm');
    await page.waitForLoadState('networkidle');
    const load_time = Date.now() - start;
    console.log(`load time: ${load_time}ms`);
    expect(load_time).toBeLessThan(5000);
  });

  test('TC-PERF-02 - GET accounts response time under 2 seconds', async ({ request }) => {
    console.log('TC-PERF-02 - measuring API response time');
    const start = Date.now();
    const response = await request.get(`${BASE_URL}/customers/${CUSTOMER_ID}/accounts`, {
      headers: HEADERS
    });
    const response_time = Date.now() - start;
    console.log(`response time: ${response_time}ms`);
    expect(response.status()).toBe(200);
    expect(response_time).toBeLessThan(2000);
  });

  test('TC-PERF-03 - GET accounts 20 times async', async ({ request }) => {
    console.log('TC-PERF-03 - throughput test 20 requests');
    const all_requests = Array.from({ length: 20 }, () =>
      request.get(`${BASE_URL}/customers/${CUSTOMER_ID}/accounts`, {
        headers: HEADERS
      })
    );

    const start = Date.now();
    const all_responses = await Promise.all(all_requests);
    const total_time = Date.now() - start;

    console.log(`total time: ${total_time}ms`);
    console.log(`average time: ${total_time / 20}ms`);

    for (const response of all_responses) {
      expect(response.status()).toBe(200);
    }
  });

});