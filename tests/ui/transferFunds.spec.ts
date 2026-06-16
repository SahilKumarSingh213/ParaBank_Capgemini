





import { test, expect } from '@playwright/test';
import { RegisterPage } from '../../pages/RegisterPage';
import { OpenAccountPage } from '../../pages/OpenAccountPage';
import { TransferFundsPage } from '../../pages/TransferFundsPage';
import { generateUsername } from '../../utils/testDataGenerator';
import users from '../../test-data/users.json';

test.describe('Transfer Funds Tests', () => {

  test('TC-UI-TRF-01 - transfer funds between accounts ', async ({ page }) => {
    const username = generateUsername();
    console.log('TC-UI-TRF-01 - valid transfer');
    const register_page = new RegisterPage(page);
    await register_page.goto();
    await register_page.register(users, username);

    const open_account_page = new OpenAccountPage(page);
    await open_account_page.goto();
    await open_account_page.openAccount('1');
    await open_account_page.SuccessMessage.waitFor({ state: 'visible' });
    const to_account_id = await open_account_page.getNewAccountId();
    console.log(`to account: ${to_account_id}`);

    const transfer_page = new TransferFundsPage(page);
    await transfer_page.goto();
    await transfer_page.transferFunds('100', to_account_id!);
    await transfer_page.SuccessMessage.waitFor({ state: 'visible' });
    const message = await transfer_page.getSuccessMessage();
    console.log(`message: ${message}`);
    expect(message).toContain('Transfer Complete!');
  });

  test('TC-UI-TRF-03 - transfer empty amount shows error ', async ({ page }) => {
    const username = generateUsername();
    console.log('TC-UI-TRF-03 - empty amount');
    const register_page = new RegisterPage(page);
    await register_page.goto();
    await register_page.register(users, username);

    const open_account_page = new OpenAccountPage(page);
    await open_account_page.goto();
    await open_account_page.openAccount('1');
    await open_account_page.SuccessMessage.waitFor({ state: 'visible' });
    const to_account_id = await open_account_page.getNewAccountId();

    const transfer_page = new TransferFundsPage(page);
    await transfer_page.goto();
    await transfer_page.transferFunds('', to_account_id!);
    const error = await transfer_page.ErrorMessage.textContent();
    console.log(`error: ${error}`);
    expect(error).toContain('An internal error has occurred and has been logged.');
  });

  test('TC-UI-TRF-04 - transfer zero amount is accepted ', async ({ page }) => {
    const username = generateUsername();
    console.log('TC-UI-TRF-04 - zero amount');
    const register_page = new RegisterPage(page);
    await register_page.goto();
    await register_page.register(users, username);

    const open_account_page = new OpenAccountPage(page);
    await open_account_page.goto();
    await open_account_page.openAccount('1');
    await open_account_page.SuccessMessage.waitFor({ state: 'visible' });
    const to_account_id = await open_account_page.getNewAccountId();

    const transfer_page = new TransferFundsPage(page);
    await transfer_page.goto();
    await transfer_page.transferFunds('0', to_account_id!);
    await transfer_page.SuccessMessage.waitFor({ state: 'visible' });
    const message = await transfer_page.getSuccessMessage();
    console.log(`message: ${message}`);
    expect(message).toContain('Transfer Complete!');
  });

  test('TC-UI-TRF-05 - transfer negative amount is accepted ', async ({ page }) => {
    const username = generateUsername();
    console.log('TC-UI-TRF-05 - negative amount');
    const register_page = new RegisterPage(page);
    await register_page.goto();
    await register_page.register(users, username);

    const open_account_page = new OpenAccountPage(page);
    await open_account_page.goto();
    await open_account_page.openAccount('1');
    await open_account_page.SuccessMessage.waitFor({ state: 'visible' });
    const to_account_id = await open_account_page.getNewAccountId();

    const transfer_page = new TransferFundsPage(page);
    await transfer_page.goto();
    await transfer_page.transferFunds('-100', to_account_id!);
    await transfer_page.SuccessMessage.waitFor({ state: 'visible' });
    const message = await transfer_page.getSuccessMessage();
    console.log(`message: ${message}`);
    expect(message).toContain('Transfer Complete!');
  });

});