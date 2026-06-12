// import { Locator, Page } from '@playwright/test';

// export class AccoutOverviewPage {

//   // decalaration of variables for page and locators
//   readonly page: Page;
//   readonly AccountTable: Locator;
//   readonly TotalBalance: Locator;

//   constructor(page: Page) {
//     this.page = page;

//     // assigning locators to the variables
//     this.AccountTable = page.locator('#accountTable');
//     this.TotalBalance = page.locator('#accountTable tbody tr:last-child td b');
//   }

//   // method to navigate to the home page
//   async goto() {
//     await this.page.goto('/parabank/index.htm');
//   }

//   // method to perform login action with given username and password
//   async AllAccounts() {
//    const row = this.page.locator(`#accountTable tr:has(a[href*="id=${accountId}"])`);
//    return await row.locator('td:nth-child(2)').textContent();
//   }

//   // method to get the error message text
//   async getErrorMessage() {
//     return await this.ErrorMessage.textContent();
//   }

// }

import { Locator, Page } from '@playwright/test';

export class AccountOverviewPage {

  // declaration of variables for page and locators
  readonly page: Page;
  readonly accountTable: Locator;
  readonly totalBalance: Locator;

  constructor(page: Page) {
    this.page = page;

    // assigning locators
    this.accountTable = page.locator('#accountTable');
    this.totalBalance = page.locator('#accountTable tbody tr:last-child td b');
  }

  // navigate to account overview page
  async goto() {
    await this.page.goto('/parabank/overview.htm');
  }

  // get all account IDs from the table
  async getAccountIds() {
    return await this.page.locator('#accountTable').getByRole('link').allTextContents();
  }

  // get balance of a specific account
  async getAccountBalance(accountId: string) {
    const row = this.page.locator(`a[href*="id=${accountId}"]`).locator('../..');
    return await row.locator('td:nth-child(2)').textContent();
  }

  // get total balance
  async getTotalBalance() {
    return await this.totalBalance.textContent();
  }

  // click on a specific account
  async clickAccount(accountId: string) {
    await this.page.getByRole('link', { name: accountId }).click();
  }

}