import { test, expect } from '@playwright/test';
import { RegisterPage } from '../../pages/RegisterPage';
import { generateUsername } from '../../utils/testDataGenerator';
import users from '../../test-data/users.json';

test.describe('Registration Tests', () => {
  // TC-UI-REG-01 - register with valid credentials
  test('register with valid credentials', async ({ page }) => {
  const username = generateUsername();
  const registerPage = new RegisterPage(page);
  await registerPage.goto();
  await registerPage.register(users, username);
  await registerPage.SuccessMessage.waitFor({ state: 'visible' });
  const message = await registerPage.getSuccessMessage();
    expect(message).toContain('Your account was created successfully. You are now logged in.');
  });

  // TC-UI-REG-02 - register with empty fields
  test('register with empty credentials', async ({ page }) => {
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
  });

  // TC-UI-REG-03 - register with partial fields
  test('register with partial fields', async ({ page }) => {
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
  });

  // TC-UI-REG-04 - register with duplicate username
  test('register with duplicate username', async ({ page }) => {
    const username = generateUsername();
    const registerPage = new RegisterPage(page);
    await registerPage.goto();
    await registerPage.register(users, username);
    await page.getByRole('link', { name: 'Log Out' }).click();
    await registerPage.goto();
    await registerPage.register(users, username);
    await registerPage.ErrorMessage.first().waitFor({ state: 'visible' });
    const errors = await registerPage.getErrorMessage();
    expect(errors).toContain('This username already exists.');
  });

  // TC-UI-REG-05 - register with wrong data types
  test('register with wrong data types', async ({ page }) => {
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
  });

});