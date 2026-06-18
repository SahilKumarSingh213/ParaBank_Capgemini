import { Locator, Page } from '@playwright/test';

export class TransferFundsPage{

  // decalaration of variables for page and locators
  readonly page: Page;
  readonly Ammount: Locator;
  readonly AccountFrom: Locator;
  readonly AccountTo: Locator;
  readonly TransferButton: Locator;
  readonly SuccessMessage: Locator;
  readonly ErrorMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    // assigning locators
    this.Ammount = page.locator('#amount');
    this.AccountFrom = page.locator('#fromAccountId');
    this.AccountTo = page.locator('#toAccountId');
    this.TransferButton = page.getByRole('button', { name: 'Transfer' });
    this.SuccessMessage = page.locator('.title').nth(1);
    this.ErrorMessage = page.locator('.error').nth(2);

  }

  // navigate to transfer funds page
  async goto() {
    await this.page.goto('/parabank/transfer.htm');
}

// method to transfer funds

async transferFunds(amount: string, toAccountId: string) {
  await this.Ammount.fill(amount);
  await this.AccountFrom.locator('option').first().waitFor({ state: 'attached' });
  await this.AccountTo.locator('option').first().waitFor({ state: 'attached' });
  await this.AccountTo.selectOption(toAccountId);
  await this.TransferButton.click();
}
 // get success message text
async getSuccessMessage() {
    return await this.SuccessMessage.textContent();
  }
}