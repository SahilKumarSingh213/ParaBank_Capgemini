import { Locator, Page, expect } from '@playwright/test';

export class OpenAccountPage{

  // decalaration of variables for page and locators
  readonly page: Page;
  readonly AccountType: Locator;
  readonly AccountID: Locator;
  readonly OpenAccountButton: Locator;
  readonly SuccessMessage: Locator;
  readonly NewAccountId: Locator;
  readonly ErrorMessage: Locator;

  constructor(page: Page) {
    // assigning locators
    this.page = page;
    this.AccountType = page.locator('#type');
    this.AccountID = page.locator('#fromAccountId');
    this.OpenAccountButton = page.getByRole('button', { name: 'Open New Account' });
    this.SuccessMessage = page.locator('#openAccountResult p').first();
    this.NewAccountId = page.locator('#newAccountId');
    this.ErrorMessage = page.locator('#openAccountError');
  }

  // navigate to open new account page
  async goto() {
    await this.page.goto('/parabank/openaccount.htm');
  }

 // select account type and from account then click open
async openAccount(accountType: string) {
  await this.AccountType.selectOption(accountType);
  await expect(this.AccountID).not.toBeEmpty();
  await this.OpenAccountButton.click();
}

// get new account ID after account is opened
async getNewAccountId() {
    return await this.NewAccountId.textContent();
  }

  // get success message text
async getSuccessMessage() {
    return await this.SuccessMessage.textContent();
  }

}