// import { test, expect } from '@playwright/test';
// import { RegisterPage } from '../../pages/RegisterPage';
// import { LoginPage } from '../../pages/LoginPage';
// import { generateUsername } from '../../utils/testDataGenerator';
// import users from '../../test-data/users.json';

// test.describe('Login Tests', () => {

// let username: string; 

//   test.beforeEach(async ({ page }) => {
//     const registerPage = new RegisterPage(page);
//     username = generateUsername();
//     await registerPage.goto();
//     await registerPage.register(users, username);
//     await page.getByRole('link', { name: 'Log Out' }).click(); 
//   });

//   test('login with valid credentials @smoke @regression', async ({ page }) => {
//     const loginPage = new LoginPage(page);
//     await loginPage.goto();
//     await loginPage.login(username, users.password);
//     await expect(page).toHaveURL(/overview/);
//   });

//   test('login with empty credentials @regression', async ({ page }) => {
//     const loginPage = new LoginPage(page);
//     await loginPage.goto();
//     await loginPage.login("","");
//     const error = await loginPage.getErrorMessage();
//     expect(error).toContain('Please enter a username and password.');
//   });

//   // error here
//   test('login with invalid credentials @regression', async ({ page }) => {
//     const loginPage = new LoginPage(page);
//     await loginPage.goto();
//     await loginPage.login("invalidUser","invalidPass");
//     const error = await loginPage.getErrorMessage();
//     expect(error).toContain('The username and password could not be verified.');

// });
// });  


import { test, expect } from '@playwright/test';
import { RegisterPage } from '../../pages/RegisterPage';
import { LoginPage } from '../../pages/LoginPage';
import { generateUsername } from '../../utils/testDataGenerator';
import users from '../../test-data/users.json';

test.describe('Login Tests', () => {

let username: string;

  // beforeEach registers a fresh user and logs out before each test
  // ensures each login test starts from a clean logged-out state
  test.beforeEach(async ({ page }) => {
    console.log(`[LOGIN-SETUP] Registering new user for login tests`);
    const registerPage = new RegisterPage(page);
    username = generateUsername();
    await registerPage.goto();
    await registerPage.register(users, username);
    await page.getByRole('link', { name: 'Log Out' }).click();
    console.log(`[LOGIN-SETUP] User registered and logged out: ${username}`);
  });

  // TC-UI-LGN-01 - login with valid credentials
  // verifies successful login redirects to account overview page
  test('login with valid credentials @smoke @regression', async ({ page }) => {
    console.log(`[LGN-01] Logging in with username: ${username}`);
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(username, users.password);
    console.log(`[LGN-01] Login successful - URL: ${page.url()}`);
    await expect(page).toHaveURL(/overview/);
  });

  // TC-UI-LGN-02 - login with empty credentials
  // verifies empty fields show correct validation error message
  test('login with empty credentials @regression', async ({ page }) => {
    console.log(`[LGN-02] Testing empty credentials`);
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login("","");
    const error = await loginPage.getErrorMessage();
    console.log(`[LGN-02] Error message: ${error}`);
    expect(error).toContain('Please enter a username and password.');
  });

  // TC-UI-LGN-03 - login with invalid credentials
  // verifies wrong username/password shows correct error message
  test('login with invalid credentials @regression', async ({ page }) => {
    console.log(`[LGN-03] Testing invalid credentials`);
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login("invalidUser","invalidPass");
    const error = await loginPage.getErrorMessage();
    console.log(`[LGN-03] Error message: ${error}`);
    expect(error).toContain('The username and password could not be verified.');
  });

});



