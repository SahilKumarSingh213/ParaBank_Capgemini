

import { test, expect } from '@playwright/test';
import { RegisterPage } from '../../pages/RegisterPage';
import { OpenAccountPage } from '../../pages/OpenAccountPage';
import { generateUsername } from '../../utils/testDataGenerator';
import users from '../../test-data/users.json';

test.describe('Open Account Tests', () => {

  test('TC-UI-ACC-01 - open savings account ', async ({ page }) => {
    const username = generateUsername();
    console.log('TC-UI-ACC-01 - opening savings account');
    const register_page = new RegisterPage(page);
    await register_page.goto();
    await register_page.register(users, username);

    const open_account_page = new OpenAccountPage(page);
    await open_account_page.goto();
    await open_account_page.openAccount('1');
    await open_account_page.SuccessMessage.waitFor({ state: 'visible' });
    const message = await open_account_page.getSuccessMessage();
    console.log(`message: ${message}`);
    expect(message).toContain('Congratulations, your account is now open.');
  });

  test('TC-UI-ACC-02 - open checking account ', async ({ page }) => {
    const username = generateUsername();
    console.log('TC-UI-ACC-02 - opening checking account');
    const register_page = new RegisterPage(page);
    await register_page.goto();
    await register_page.register(users, username);

    const open_account_page = new OpenAccountPage(page);
    await open_account_page.goto();
    await open_account_page.openAccount('0');
    await open_account_page.SuccessMessage.waitFor({ state: 'visible' });
    const message = await open_account_page.getSuccessMessage();
    console.log(`message: ${message}`);
    expect(message).toContain('Congratulations, your account is now open.');
  });

  test('TC-UI-ACC-03 - account overview updated after opening ', async ({ page }) => {
    const username = generateUsername();
    console.log('TC-UI-ACC-03 - checking account overview');
    const register_page = new RegisterPage(page);
    await register_page.goto();
    await register_page.register(users, username);

    const open_account_page = new OpenAccountPage(page);
    await open_account_page.goto();
    await open_account_page.openAccount('1');
    await open_account_page.SuccessMessage.waitFor({ state: 'visible' });
    await page.getByRole('link', { name: 'Accounts Overview' }).click();
    await page.waitForLoadState('networkidle');
    const accounts = page.locator('#accountTable tbody tr');
    console.log('checking account count');
    await expect(accounts).toHaveCount(3);
  });

  test('TC-UI-MSG-01 - success message shows new account ID ', async ({ page }) => {
    const username = generateUsername();
    console.log('TC-UI-MSG-01 - checking success message');
    const register_page = new RegisterPage(page);
    await register_page.goto();
    await register_page.register(users, username);

    const open_account_page = new OpenAccountPage(page);
    await open_account_page.goto();
    await open_account_page.openAccount('1');
    await open_account_page.SuccessMessage.waitFor({ state: 'visible' });
    const message = await open_account_page.getSuccessMessage();
    const new_account_id = await open_account_page.getNewAccountId();
    console.log(`message: ${message}, account id: ${new_account_id}`);
    expect(message).toContain('Congratulations, your account is now open.');
    expect(new_account_id).toBeTruthy();
  });

})