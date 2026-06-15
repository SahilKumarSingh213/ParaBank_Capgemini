import { Locator, Page } from '@playwright/test';

export class LoginPage {

  // locators
  readonly page: Page;
  readonly Username: Locator;
  readonly Password: Locator;
  readonly LoginButton: Locator;
  readonly ErrorMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    // assigning locators
    this.Username = page.locator('input[name="username"]');
    this.Password = page.locator('input[name="password"]');
    this.LoginButton = page.locator('input[value="Log In"]');
    this.ErrorMessage = page.locator('.error');
  }

  // navigate to login page
  async goto() {
    await this.page.goto('/parabank/index.htm');
  }

  // login with username and password
  async login(username: string, password: string) {
    await this.Username.fill(username);
    await this.Password.fill(password);
    await this.LoginButton.click();
  }

  // get error message
  async getErrorMessage() {
    return await this.ErrorMessage.textContent();
  }

}