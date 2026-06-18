
import { test, expect } from '@playwright/test';
import { RegisterPage } from '../../pages/RegisterPage';
import { LoginPage } from '../../pages/LoginPage';
import { generateUsername } from '../../utils/testDataGenerator';
import users from '../../test-data/users.json';

test.describe('Login Tests', () => {

  let username: string;

  test('TC-UI-LGN-01 - login with valid credentials ', async ({ page }) => {
    console.log('TC-UI-LGN-01 - valid login');
    console.log('setting up user for login tests');
    const register_page = new RegisterPage(page);
    username = generateUsername();
    await register_page.goto();
    await register_page.register(users, username);
    await page.getByRole('link', { name: 'Log Out' }).click();
    console.log(`user registered: ${username}`);
    const login_page = new LoginPage(page);
    await login_page.goto();
    await login_page.login(username, users.password);
    console.log(`url: ${page.url()}`);
    await expect(page).toHaveURL(/overview/);
  });

  test('TC-UI-LGN-02 - login with empty credentials ', async ({ page }) => {
    console.log('TC-UI-LGN-02 - empty credentials');
    const login_page = new LoginPage(page);
    await login_page.goto();
    await login_page.login('', '');
    const error = await login_page.getErrorMessage();
    console.log(`error: ${error}`);
    expect(error).toContain('Please enter a username and password.');
  });

  test('TC-UI-LGN-03 - login with invalid credentials ', async ({ page }) => {
    console.log('TC-UI-LGN-03 - invalid credentials');
    const login_page = new LoginPage(page);
    await login_page.goto();
    await login_page.login('invalidUser', 'invalidPass');
    const error = await login_page.getErrorMessage();
    console.log(`error: ${error}`);
    expect(error).toMatch(/The username and password could not be verified\.|An internal error has occurred/);
  });

});


