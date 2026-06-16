import { Locator, Page } from '@playwright/test';

export class RegisterPage {

  // declaration of variables for page and locators
  readonly page: Page;
  readonly FirstName: Locator;
  readonly LastName: Locator;
  readonly Address: Locator;
  readonly City: Locator;
  readonly State: Locator;
  readonly Zip: Locator;
  readonly Phone: Locator;
  readonly SSN: Locator;
  readonly Username: Locator;
  readonly Password: Locator;
  readonly ConfirmPassword: Locator;
  readonly RegisterButton: Locator;
  readonly ErrorMessage: Locator;
  readonly SuccessMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    // assigning locators to the variables
    this.FirstName = page.locator('input[id="customer.firstName"]');
    this.LastName = page.locator('input[id="customer.lastName"]');
    this.Address = page.locator('input[id="customer.address.street"]');
    this.City = page.locator('input[id="customer.address.city"]');
    this.State = page.locator('input[id="customer.address.state"]');
    this.Zip = page.locator('input[id="customer.address.zipCode"]');
    this.Phone = page.locator('input[id="customer.phoneNumber"]');
    this.SSN = page.locator('input[id="customer.ssn"]');
    this.Username = page.locator('input[id="customer.username"]');
    this.Password = page.locator('input[id="customer.password"]');
    this.ConfirmPassword = page.locator('input[id="repeatedPassword"]');
    this.RegisterButton = page.locator('input[value="Register"]');
    this.ErrorMessage= page.locator('.error');
    this.SuccessMessage = page.locator('#rightPanel p');

  }

  // method to navigate to the home page
  async goto() {
    await this.page.goto('/parabank/register.htm');
  }

  // method to perform registration action with given user details and username
  async register(user: any, username: string) {
  await this.FirstName.waitFor({ state: 'visible' });
  await this.FirstName.fill(user.firstName);
  await this.LastName.fill(user.lastName);
  await this.Address.fill(user.address);
  await this.City.fill(user.city);
  await this.State.fill(user.state);
  await this.Zip.fill(user.zipCode);
  await this.Phone.fill(user.phone);
  await this.SSN.fill(user.ssn);
  await this.Username.fill(username);
  await this.Password.fill(user.password);
  await this.ConfirmPassword.fill(user.confirmPassword);
  await this.RegisterButton.click();
}

  // method to get the error message text
  async getErrorMessage() {
    return await this.ErrorMessage.allTextContents();
  }

  // method to get the success message text
async getSuccessMessage() {
  return await this.SuccessMessage.textContent();
}
}
