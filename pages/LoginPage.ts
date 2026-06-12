import { Locator, Page } from '@playwright/test';

export class LoginPage {

  // decalaration of variables for page and locators
  readonly page: Page;
  readonly Username: Locator;
  readonly Password: Locator;
  readonly LoginButton: Locator;
  readonly ErrorMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    // assigning locators to the variables
    this.Username = page.locator('input[name="username"]');
    this.Password = page.locator('input[name="password"]');
    this.LoginButton = page.locator('input[value="Log In"]');
    this.ErrorMessage = page.locator('.error');
  }

  // method to navigate to the home page
  async goto() {
    await this.page.goto('/parabank/index.htm');
  }

  // method to perform login action with given username and password
  async login(username: string, password: string) {
    await this.Username.fill(username);
    await this.Password.fill(password);
    await this.LoginButton.click();
  }

  // method to get the error message text
  async getErrorMessage() {
    return await this.ErrorMessage.textContent();
  }

}