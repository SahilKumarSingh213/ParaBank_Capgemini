// import { test, expect } from '@playwright/test';
// import { RegisterPage } from '../../pages/RegisterPage';
// import { generateUsername } from '../../utils/testDataGenerator';
// import users from '../../test-data/users.json';

// test.describe('Registration Tests', () => {
//   // TC-UI-REG-01 - register with valid credentials
//   test('register with valid credentials @smoke @regression', async ({ page }) => {
//   const username = generateUsername();
//   console.log(`[REG-01] Registering user: ${username}`)
//   const registerPage = new RegisterPage(page);
//   await registerPage.goto();
//   await registerPage.register(users, username);
//   await registerPage.SuccessMessage.waitFor({ state: 'visible' });
//   const message = await registerPage.getSuccessMessage();
//     expect(message).toContain('Your account was created successfully. You are now logged in.');
//   console.log(`[REG-01] Success message: ${message}`);
//   });

//   // TC-UI-REG-02 - register with empty fields
//   test('register with empty credentials @regression', async ({ page }) => {
//   console.log(`[REG-02] Testing empty field validations`);
//   const registerPage = new RegisterPage(page);
//   await registerPage.goto();
//   await registerPage.RegisterButton.click();
//   await registerPage.ErrorMessage.first().waitFor({ state: 'visible' });
//   const errors = await registerPage.getErrorMessage();
//   expect(errors).toContain('First name is required.');
//   expect(errors).toContain('Last name is required.');
//   expect(errors).toContain('Address is required.');
//   expect(errors).toContain('City is required.');
//   expect(errors).toContain('State is required.');
//   expect(errors).toContain('Zip Code is required.');
//   expect(errors).toContain('Social Security Number is required.');
//   expect(errors).toContain('Username is required.');
//   expect(errors).toContain('Password is required.');
//   expect(errors).toContain('Password confirmation is required.');
//   console.log(`[REG-02] Error messages received: ${errors}`);
//   });

//   // TC-UI-REG-03 - register with partial fields
//   test('register with partial fields @regression', async ({ page }) => {
//     console.log(`[REG-03] Testing partial field validations`);
//     const registerPage = new RegisterPage(page);
//     await registerPage.goto();
//     await registerPage.FirstName.fill(users.firstName);
//     await registerPage.LastName.fill(users.lastName);
//     await registerPage.RegisterButton.click();
//     await registerPage.ErrorMessage.first().waitFor({ state: 'visible' });
//     const errors = await registerPage.getErrorMessage();
//     expect(errors).not.toContain('First name is required.');
//     expect(errors).not.toContain('Last name is required.');
//     expect(errors).toContain('Address is required.');
//     expect(errors).toContain('City is required.');
//     expect(errors).toContain('State is required.');
//     expect(errors).toContain('Zip Code is required.');
//     expect(errors).toContain('Social Security Number is required.');
//     expect(errors).toContain('Username is required.');
//     expect(errors).toContain('Password is required.');
//     expect(errors).toContain('Password confirmation is required.');
//     console.log(`[REG-03] Error messages received: ${errors}`);
//   });

//   // TC-UI-REG-04 - register with duplicate username
//   test('register with duplicate username @regression', async ({ page }) => {
//     const username = generateUsername();
//     console.log(`[REG-04] Registering duplicate username: ${username}`);
//     const registerPage = new RegisterPage(page);
//     await registerPage.goto();
//     await registerPage.register(users, username);
//     await page.getByRole('link', { name: 'Log Out' }).click();
//     await registerPage.goto();
//     await registerPage.register(users, username);
//     await registerPage.ErrorMessage.first().waitFor({ state: 'visible' });
//     const errors = await registerPage.getErrorMessage();
//     expect(errors).toContain('This username already exists.');
//     console.log(`[REG-04] Error messages received: ${errors}`);
//   });

//   // TC-UI-REG-05 - register with wrong data types
//   test('register with wrong data types @regression', async ({ page }) => {
//     console.log(`[REG-05] Testing wrong data types`);
//     const registerPage = new RegisterPage(page);
//     await registerPage.goto();
//     await registerPage.register({
//       firstName: '123456',
//       lastName: '12344567',
//       address: '1234566',
//       city: '133455656',
//       state: '23234545',
//       zipCode: 'adafdfd',
//       phone: 'afdfddfdf',
//       ssn: 'afsfdfaaf',
//       password: 'Test@1234',
//       confirmPassword: 'Test@1234'
//     }, generateUsername());
//     await registerPage.SuccessMessage.waitFor({ state: 'visible' });
//     const message = await registerPage.getSuccessMessage();
//     expect(message).toContain('Your account was created successfully. You are now logged in.');
//     console.log(`[REG-05] Success message: ${message}`);
//   });

// });

import { test, expect } from '@playwright/test';
import { RegisterPage } from '../../pages/RegisterPage';
import { generateUsername } from '../../utils/testDataGenerator';
import users from '../../test-data/users.json';

test.describe('Registration Tests', () => {

  // TC-UI-REG-01 - register with valid credentials
  // checks the happy path — all valid data should result in successful registration
  // SuccessMessage uses #rightPanel p locator — success paragraph in ParaBank
  // waitFor added because success message appears only after page redirect completes
  test('register with valid credentials @smoke @regression', async ({ page }) => {
    const username = generateUsername();
    console.log(`[REG-01] Registering user: ${username}`);
    const registerPage = new RegisterPage(page);
    await registerPage.goto();
    await registerPage.register(users, username);
    await registerPage.SuccessMessage.waitFor({ state: 'visible' });
    const message = await registerPage.getSuccessMessage();
    expect(message).toContain('Your account was created successfully. You are now logged in.');
    console.log(`[REG-01] Success message: ${message}`);
  });

  // TC-UI-REG-02 - register with empty fields
  // verifies all required field error messages appear when form submitted empty
  // ErrorMessage uses .error class — matches all error spans on the page
  // allTextContents() returns array — toContain checks if string exists in array
  // waitFor added because errors appear after button click with a slight delay
  test('register with empty credentials @regression', async ({ page }) => {
    console.log(`[REG-02] Testing empty field validations`);
    const registerPage = new RegisterPage(page);
    await registerPage.goto();
    await registerPage.RegisterButton.click();
    await registerPage.ErrorMessage.first().waitFor({ state: 'visible' });
    const errors = await registerPage.getErrorMessage();
    expect(errors).toContain('First name is required.');
    expect(errors).toContain('Last name is required.');
    expect(errors).toContain('Address is required.');
    expect(errors).toContain('City is required.');
    expect(errors).toContain('State is required.');
    expect(errors).toContain('Zip Code is required.');
    expect(errors).toContain('Social Security Number is required.');
    expect(errors).toContain('Username is required.');
    expect(errors).toContain('Password is required.');
    expect(errors).toContain('Password confirmation is required.');
    console.log(`[REG-02] Error messages received: ${errors}`);
  });

  // TC-UI-REG-03 - register with partial fields
  // fills only firstName and lastName — verifies only remaining fields show errors
  // not.toContain used to verify firstName and lastName errors do NOT appear
  test('register with partial fields @regression', async ({ page }) => {
    console.log(`[REG-03] Testing partial field validations`);
    const registerPage = new RegisterPage(page);
    await registerPage.goto();
    await registerPage.FirstName.fill(users.firstName);
    await registerPage.LastName.fill(users.lastName);
    await registerPage.RegisterButton.click();
    await registerPage.ErrorMessage.first().waitFor({ state: 'visible' });
    const errors = await registerPage.getErrorMessage();
    expect(errors).not.toContain('First name is required.');
    expect(errors).not.toContain('Last name is required.');
    expect(errors).toContain('Address is required.');
    expect(errors).toContain('City is required.');
    expect(errors).toContain('State is required.');
    expect(errors).toContain('Zip Code is required.');
    expect(errors).toContain('Social Security Number is required.');
    expect(errors).toContain('Username is required.');
    expect(errors).toContain('Password is required.');
    expect(errors).toContain('Password confirmation is required.');
    console.log(`[REG-03] Error messages received: ${errors}`);
  });

  // TC-UI-REG-04 - register with duplicate username
  // registers a user, logs out, then tries to register again with same username
  // getByRole used for Log Out link — more stable than CSS selector
  test('register with duplicate username @regression', async ({ page }) => {
    const username = generateUsername();
    console.log(`[REG-04] Registering duplicate username: ${username}`);
    const registerPage = new RegisterPage(page);
    await registerPage.goto();
    await registerPage.register(users, username);
    await page.getByRole('link', { name: 'Log Out' }).click();
    await registerPage.goto();
    await registerPage.register(users, username);
    await registerPage.ErrorMessage.first().waitFor({ state: 'visible' });
    const errors = await registerPage.getErrorMessage();
    expect(errors).toContain('This username already exists.');
    console.log(`[REG-04] Error messages received: ${errors}`);
  });

  // TC-UI-REG-05 - register with wrong data types (known bug DEF-01)
  // ParaBank accepts numbers in name fields and letters in zip/ssn fields — no type validation
  // test expects success — this confirms the bug is still present in the application
  test('register with wrong data types @regression', async ({ page }) => {
    console.log(`[REG-05] Testing wrong data types — confirming DEF-01 bug`);
    const registerPage = new RegisterPage(page);
    await registerPage.goto();
    await registerPage.register({
      firstName: '123456',
      lastName: '12344567',
      address: '1234566',
      city: '133455656',
      state: '23234545',
      zipCode: 'adafdfd',
      phone: 'afdfddfdf',
      ssn: 'afsfdfaaf',
      password: 'Test@1234',
      confirmPassword: 'Test@1234'
    }, generateUsername());
    await registerPage.SuccessMessage.waitFor({ state: 'visible' });
    const message = await registerPage.getSuccessMessage();
    expect(message).toContain('Your account was created successfully. You are now logged in.');
    console.log(`[REG-05] Success message: ${message}`);
  });

});