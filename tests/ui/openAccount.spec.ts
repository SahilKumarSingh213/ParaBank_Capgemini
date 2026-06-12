// import { test, expect } from '@playwright/test';
// import { RegisterPage } from '../../pages/RegisterPage';
// import { OpenAccountPage } from '../../pages/OpenAccountPage';
// import { generateUsername } from '../../utils/testDataGenerator';
// import users from '../../test-data/users.json';

// test.describe('Open Account Tests', () => {


//    // Test case to open a new savings account and verify success message
//     test('open savings account', async ({ page }) => {
//     const username = generateUsername();
//     const registerPage = new RegisterPage(page);
//     await registerPage.goto();
//     await registerPage.register(users, username);
//     const openAccountPage = new OpenAccountPage(page);
//     await openAccountPage.goto();
//     await openAccountPage.openAccount('1', await openAccountPage.AccountID.inputValue());
//     const message = await openAccountPage.getSuccessMessage();
//       expect(message).toContain('Congratulations, your account is now open.');
// });
 

//  //            check this                 // 
//     test('open new checking account', async ({ page }) => {
//     const username = generateUsername();
//     const registerPage = new RegisterPage(page);
//     await registerPage.goto();
//     await registerPage.register(users, username);
//     const openAccountPage = new OpenAccountPage(page);
//     await openAccountPage.goto();
//     const fromAccountId = await openAccountPage.AccountID.inputValue();
//     await openAccountPage.openAccount('0', fromAccountId); // 0 = CHECKING
//     const message = await openAccountPage.getSuccessMessage();
//      expect(message).toContain('Congratulations, your account is now open.');
// });


//     test('account overview balance updated after opening', async ({ page }) => {
//     const username = generateUsername();
//     const registerPage = new RegisterPage(page);
//     await registerPage.goto();
//     await registerPage.register(users, username);

//     const openAccountPage = new OpenAccountPage(page);
//     await openAccountPage.goto();
//     await openAccountPage.AccountID.locator('option').first()
//     const fromAccountId = await openAccountPage.AccountID.inputValue();
//     await openAccountPage.openAccount('1', fromAccountId);
//     await openAccountPage.SuccessMessage.waitFor({ state: 'visible' });

//   // go to accounts overview
//     await page.getByRole('link', { name: 'Accounts Overview' }).click();
//     await page.waitForLoadState('networkidle');

//   // verify 2 accounts exist
//     const accounts = page.locator('#accountTable tbody tr');
//     await expect(accounts).toHaveCount(3);
// });
  
// })

import { test, expect } from '@playwright/test';
import { RegisterPage } from '../../pages/RegisterPage';
import { OpenAccountPage } from '../../pages/OpenAccountPage';
import { generateUsername } from '../../utils/testDataGenerator';
import users from '../../test-data/users.json';

test.describe('Open Account Tests', () => {

  // TC-UI-ACC-01 - open new savings account
  test('open savings account', async ({ page }) => {
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
    const message = await openAccountPage.getSuccessMessage();
    expect(message).toContain('Congratulations, your account is now open.');
  });

  // TC-UI-ACC-02 - open new checking account
  test('open new checking account', async ({ page }) => {
    const username = generateUsername();
    const registerPage = new RegisterPage(page);
    await registerPage.goto();
    await registerPage.register(users, username);
    const openAccountPage = new OpenAccountPage(page);
    await openAccountPage.goto();
    await openAccountPage.AccountID.locator('option').first().waitFor({ state: 'attached' });
    const fromAccountId = await openAccountPage.AccountID.inputValue();
    await openAccountPage.openAccount('0', fromAccountId);
    await openAccountPage.SuccessMessage.waitFor({ state: 'visible' });
    const message = await openAccountPage.getSuccessMessage();
    expect(message).toContain('Congratulations, your account is now open.');
  });

  // TC-UI-ACC-03 - account overview balance updated after opening
  test('account overview balance updated after opening', async ({ page }) => {
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
    await page.getByRole('link', { name: 'Accounts Overview' }).click();
    await page.waitForLoadState('networkidle');
    const accounts = page.locator('#accountTable tbody tr');
    await expect(accounts).toHaveCount(3);
  });

})