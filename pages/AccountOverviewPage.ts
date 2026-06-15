import { Locator, Page } from '@playwright/test';

export class AccountOverviewPage {

  // locators
  readonly page: Page;
  readonly AccountTable: Locator;
  readonly TotalBalance: Locator;

  constructor(page: Page) {
    this.page = page;

    // assigning locators
    this.AccountTable = page.locator('#accountTable');
    this.TotalBalance = page.locator('#accountTable tbody tr:last-child td b');
  }

  // navigate to account overview page
  async goto() {
    await this.page.goto('/parabank/overview.htm');
  }

  // get all account IDs
  async getAccountIds() {
    return await this.page.locator('#accountTable').getByRole('link').allTextContents();
  }

  // get balance for a specific account
  async getAccountBalance(account_id: string) {
    const row = this.page.locator(`a[href*="id=${account_id}"]`).locator('../..');
    return await row.locator('td:nth-child(2)').textContent();
  }

  // get total balance
  async getTotalBalance() {
    return await this.TotalBalance.textContent();
  }

  // click on an account
  async clickAccount(account_id: string) {
    await this.page.getByRole('link', { name: account_id }).click();
  }

}