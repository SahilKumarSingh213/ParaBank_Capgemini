
import { test, expect } from '@playwright/test';
import { RegisterPage } from '../../pages/RegisterPage';
import { generateUsername } from '../../utils/testDataGenerator';
import users from '../../test-data/users.json';

test.describe('Registration Tests', () => {

  test('TC-UI-REG-01 - register with valid credentials ', async ({ page }) => {
    const username = generateUsername();
    console.log('TC-UI-REG-01 - valid registration');
    const register_page = new RegisterPage(page);
    await register_page.goto();
    await register_page.register(users, username);
    await register_page.SuccessMessage.waitFor({ state: 'visible' });
    const message = await register_page.getSuccessMessage();
    console.log(`message: ${message}`);
    expect(message).toContain('Your account was created successfully. You are now logged in.');
  });

  test('TC-UI-REG-02 - register with empty credentials ', async ({ page }) => {
    console.log('TC-UI-REG-02 - empty fields');
    const register_page = new RegisterPage(page);
    await register_page.goto();
    await register_page.RegisterButton.click();
    await register_page.ErrorMessage.first().waitFor({ state: 'visible' });
    const errors = await register_page.getErrorMessage();
    console.log(`errors: ${errors}`);
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

  test('TC-UI-REG-03 - register with partial fields ', async ({ page }) => {
    console.log('TC-UI-REG-03 - partial fields');
    const register_page = new RegisterPage(page);
    await register_page.goto();
    await register_page.FirstName.fill(users.firstName);
    await register_page.LastName.fill(users.lastName);
    await register_page.RegisterButton.click();
    await register_page.ErrorMessage.first().waitFor({ state: 'visible' });
    const errors = await register_page.getErrorMessage();
    console.log(`errors: ${errors}`);
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

  test('TC-UI-REG-04 - register with duplicate username ', async ({ page }) => {
    const username = generateUsername();
    console.log('TC-UI-REG-04 - duplicate username');
    const register_page = new RegisterPage(page);
    await register_page.goto();
    await register_page.register(users, username);
    await page.getByRole('link', { name: 'Log Out' }).click();
    await register_page.goto();
    await register_page.register(users, username);
    await register_page.ErrorMessage.first().waitFor({ state: 'visible' });
    const errors = await register_page.getErrorMessage();
    console.log(`errors: ${errors}`);
    expect(errors).toContain('This username already exists.');
  });

  test('TC-UI-REG-05 - register with wrong data types ', async ({ page }) => {
    console.log('TC-UI-REG-05 - wrong data types');
    const register_page = new RegisterPage(page);
    await register_page.goto();
    await register_page.register({
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
    await register_page.SuccessMessage.waitFor({ state: 'visible' });
    const message = await register_page.getSuccessMessage();
    console.log(`message: ${message}`);
    expect(message).toContain('Your account was created successfully. You are now logged in.');
  });

});