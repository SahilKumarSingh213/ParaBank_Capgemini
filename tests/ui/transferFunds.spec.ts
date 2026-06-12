import { test, expect } from '@playwright/test';
import { RegisterPage } from '../../pages/RegisterPage';
import { OpenAccountPage } from '../../pages/OpenAccountPage';
import { TransferFundsPage } from '../../pages/TransferFundsPage';
import { generateUsername } from '../../utils/testDataGenerator';
import users from '../../test-data/users.json';

test.describe('Transfer Funds Tests', () => {

    test('transfer funds between accounts', async ({ page }) => {
    const username = generateUsername();
    const registerPage = new RegisterPage(page);
    await registerPage.goto();
    await registerPage.register(users, username);
    const openAccountPage = new OpenAccountPage(page);
    await openAccountPage.goto();
    await openAccountPage.AccountID.locator('option').first().waitFor({ state: 'attached' });
    const fromAccountId = await openAccountPage.AccountID.inputValue();
    await openAccountPage.openAccount('1', fromAccountId);
    await openAccountPage.SuccessMessage.waitFor({ state: 'visible' });
    const toAccountId = await openAccountPage.getNewAccountId();
    const transferPage = new TransferFundsPage(page);
    await transferPage.goto();
    await transferPage.AccountFrom.locator('option').first().waitFor({ state: 'attached' });
    const transferFromId = await transferPage.AccountFrom.inputValue();
    await transferPage.transferFunds('100', transferFromId, toAccountId!);
    await transferPage.SuccessMessage.waitFor({ state: 'visible' });
    const message = await transferPage.getSuccessMessage();
      expect(message).toContain('Transfer Complete!');
  });

    test('transfer empty amount shows error', async ({ page }) => {
    const username = generateUsername();
    const registerPage = new RegisterPage(page);
    await registerPage.goto();
    await registerPage.register(users, username);
    const openAccountPage = new OpenAccountPage(page);
    await openAccountPage.goto();
    await openAccountPage.AccountID.locator('option').first().waitFor({ state: 'attached' });
    const fromAccountId = await openAccountPage.AccountID.inputValue();
    await openAccountPage.openAccount('1', fromAccountId);
    await openAccountPage.SuccessMessage.waitFor({ state: 'visible' });
    const toAccountId = await openAccountPage.getNewAccountId();
    const transferPage = new TransferFundsPage(page);
    await transferPage.goto();
    await transferPage.AccountFrom.locator('option').first().waitFor({ state: 'attached' });
    await transferPage.transferFunds('', fromAccountId, toAccountId!);
    const error = await transferPage.ErrorMessage.textContent();
      expect(error).toContain('An internal error has occurred and has been logged.');
  });

      // TC-UI-TRF-04 - transfer $0 (known bug DEF-03)
    test('transfer zero amount is accepted', async ({ page }) => {
    const username = generateUsername();
    const registerPage = new RegisterPage(page);
    await registerPage.goto();
    await registerPage.register(users, username);
    const openAccountPage = new OpenAccountPage(page);
    await openAccountPage.goto();
    await openAccountPage.AccountID.locator('option').first().waitFor({ state: 'attached' });
    const fromAccountId = await openAccountPage.AccountID.inputValue();
    await openAccountPage.openAccount('1', fromAccountId);
    await openAccountPage.SuccessMessage.waitFor({ state: 'visible' });
    const toAccountId = await openAccountPage.getNewAccountId();
    const transferPage = new TransferFundsPage(page);
    await transferPage.goto();
    await transferPage.AccountFrom.locator('option').first().waitFor({ state: 'attached' });
    await transferPage.transferFunds('0', fromAccountId, toAccountId!);
    await transferPage.SuccessMessage.waitFor({ state: 'visible' });
    const message = await transferPage.getSuccessMessage();
      expect(message).toContain('Transfer Complete!');
  });

    test('transfer negative amount is accepted', async ({ page }) => {
    const username = generateUsername();
    const registerPage = new RegisterPage(page);
    await registerPage.goto();
    await registerPage.register(users, username);
    const openAccountPage = new OpenAccountPage(page);
    await openAccountPage.goto();
    await openAccountPage.AccountID.locator('option').first().waitFor({ state: 'attached' });
    const fromAccountId = await openAccountPage.AccountID.inputValue();
    await openAccountPage.openAccount('1', fromAccountId);
    await openAccountPage.SuccessMessage.waitFor({ state: 'visible' });
    const toAccountId = await openAccountPage.getNewAccountId();
    const transferPage = new TransferFundsPage(page);
    await transferPage.goto();
    await transferPage.AccountFrom.locator('option').first().waitFor({ state: 'attached' });
    await transferPage.transferFunds('-100', fromAccountId, toAccountId!);
    await transferPage.SuccessMessage.waitFor({ state: 'visible' });
    const message = await transferPage.getSuccessMessage();
      expect(message).toContain('Transfer Complete!');
  });
});








