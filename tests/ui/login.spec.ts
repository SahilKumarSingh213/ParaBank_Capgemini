import { test, expect } from '@playwright/test';
import { RegisterPage } from '../../pages/RegisterPage';
import { LoginPage } from '../../pages/LoginPage';
import { generateUsername } from '../../utils/testDataGenerator';
import users from '../../test-data/users.json';

test.describe('Login Tests', () => {

let username: string; 

  test.beforeEach(async ({ page }) => {
    const registerPage = new RegisterPage(page);
    username = generateUsername();
    await registerPage.goto();
    await registerPage.register(users, username);
    await page.getByRole('link', { name: 'Log Out' }).click(); 
  });

  test('login with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(username, users.password);
    await expect(page).toHaveURL(/overview/);
  });

  test('login with empty credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login("","");
    const error = await loginPage.getErrorMessage();
    expect(error).toContain('Please enter a username and password.');
  });

  // error here
  test('login with invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login("invalidUser","invalidPass");
    const error = await loginPage.getErrorMessage();
    expect(error).toContain('The username and password could not be verified.');

});
});  




