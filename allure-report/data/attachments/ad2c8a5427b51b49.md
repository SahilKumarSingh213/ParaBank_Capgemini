# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui\openAccount.spec.ts >> Open Account Tests >> TC-UI-ACC-01 - open savings account @smoke @regression
- Location: tests\ui\openAccount.spec.ts:11:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.selectOption: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('#type')
    - locator resolved to <select id="type" class="input">…</select>
  - attempting select option action
    2 × waiting for element to be visible and enabled
      - element is not visible
    - retrying select option action
    - waiting 20ms
    2 × waiting for element to be visible and enabled
      - element is not visible
    - retrying select option action
      - waiting 100ms
    53 × waiting for element to be visible and enabled
       - element is not visible
     - retrying select option action
       - waiting 500ms

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e2]:
    - generic [ref=e3]:
      - link:
        - /url: admin.htm
        - img [ref=e4] [cursor=pointer]
      - link "ParaBank":
        - /url: index.htm
        - img "ParaBank" [ref=e5] [cursor=pointer]
      - paragraph [ref=e6]: Experience the difference
    - generic [ref=e7]:
      - list [ref=e8]:
        - listitem [ref=e9]: Solutions
        - listitem [ref=e10]:
          - link "About Us" [ref=e11] [cursor=pointer]:
            - /url: about.htm
        - listitem [ref=e12]:
          - link "Services" [ref=e13] [cursor=pointer]:
            - /url: services.htm
        - listitem [ref=e14]:
          - link "Products" [ref=e15] [cursor=pointer]:
            - /url: http://www.parasoft.com/jsp/products.jsp
        - listitem [ref=e16]:
          - link "Locations" [ref=e17] [cursor=pointer]:
            - /url: http://www.parasoft.com/jsp/pr/contacts.jsp
        - listitem [ref=e18]:
          - link "Admin Page" [ref=e19] [cursor=pointer]:
            - /url: admin.htm
      - list [ref=e20]:
        - listitem [ref=e21]:
          - link "home" [ref=e22] [cursor=pointer]:
            - /url: index.htm
        - listitem [ref=e23]:
          - link "about" [ref=e24] [cursor=pointer]:
            - /url: about.htm
        - listitem [ref=e25]:
          - link "contact" [ref=e26] [cursor=pointer]:
            - /url: contact.htm
    - generic [ref=e27]:
      - generic [ref=e28]:
        - paragraph [ref=e29]: Welcome Sahil Singh
        - heading "Account Services" [level=2] [ref=e30]
        - list [ref=e31]:
          - listitem [ref=e32]:
            - link "Open New Account" [ref=e33] [cursor=pointer]:
              - /url: openaccount.htm
          - listitem [ref=e34]:
            - link "Accounts Overview" [ref=e35] [cursor=pointer]:
              - /url: overview.htm
          - listitem [ref=e36]:
            - link "Transfer Funds" [ref=e37] [cursor=pointer]:
              - /url: transfer.htm
          - listitem [ref=e38]:
            - link "Bill Pay" [ref=e39] [cursor=pointer]:
              - /url: billpay.htm
          - listitem [ref=e40]:
            - link "Find Transactions" [ref=e41] [cursor=pointer]:
              - /url: findtrans.htm
          - listitem [ref=e42]:
            - link "Update Contact Info" [ref=e43] [cursor=pointer]:
              - /url: updateprofile.htm
          - listitem [ref=e44]:
            - link "Request Loan" [ref=e45] [cursor=pointer]:
              - /url: requestloan.htm
          - listitem [ref=e46]:
            - link "Log Out" [ref=e47] [cursor=pointer]:
              - /url: logout.htm
      - generic [ref=e50]:
        - heading "Error!" [level=1] [ref=e51]
        - paragraph [ref=e52]: An internal error has occurred and has been logged.
  - generic [ref=e54]:
    - list [ref=e55]:
      - listitem [ref=e56]:
        - link "Home" [ref=e57] [cursor=pointer]:
          - /url: index.htm
        - text: "|"
      - listitem [ref=e58]:
        - link "About Us" [ref=e59] [cursor=pointer]:
          - /url: about.htm
        - text: "|"
      - listitem [ref=e60]:
        - link "Services" [ref=e61] [cursor=pointer]:
          - /url: services.htm
        - text: "|"
      - listitem [ref=e62]:
        - link "Products" [ref=e63] [cursor=pointer]:
          - /url: http://www.parasoft.com/jsp/products.jsp
        - text: "|"
      - listitem [ref=e64]:
        - link "Locations" [ref=e65] [cursor=pointer]:
          - /url: http://www.parasoft.com/jsp/pr/contacts.jsp
        - text: "|"
      - listitem [ref=e66]:
        - link "Forum" [ref=e67] [cursor=pointer]:
          - /url: http://forums.parasoft.com/
        - text: "|"
      - listitem [ref=e68]:
        - link "Site Map" [ref=e69] [cursor=pointer]:
          - /url: sitemap.htm
        - text: "|"
      - listitem [ref=e70]:
        - link "Contact Us" [ref=e71] [cursor=pointer]:
          - /url: contact.htm
    - paragraph [ref=e72]: © Parasoft. All rights reserved.
    - list [ref=e73]:
      - listitem [ref=e74]: "Visit us at:"
      - listitem [ref=e75]:
        - link "www.parasoft.com" [ref=e76] [cursor=pointer]:
          - /url: http://www.parasoft.com/
```

# Test source

```ts
  1  | import { Locator, Page, expect } from '@playwright/test';
  2  | 
  3  | export class OpenAccountPage{
  4  | 
  5  |   // decalaration of variables for page and locators
  6  |   readonly page: Page;
  7  |   readonly AccountType: Locator;
  8  |   readonly AccountID: Locator;
  9  |   readonly OpenAccountButton: Locator;
  10 |   readonly SuccessMessage: Locator;
  11 |   readonly NewAccountId: Locator;
  12 |   readonly ErrorMessage: Locator;
  13 | 
  14 |   constructor(page: Page) {
  15 |         // assigning locators
  16 |     this.page = page;
  17 |     this.AccountType = page.locator('#type');
  18 |     this.AccountID = page.locator('#fromAccountId');
  19 |     this.OpenAccountButton = page.getByRole('button', { name: 'Open New Account' });
  20 |     this.SuccessMessage = page.locator('#openAccountResult p').first();
  21 |     this.NewAccountId = page.locator('#newAccountId');
  22 |     this.ErrorMessage = page.locator('#openAccountError');
  23 |   }
  24 | 
  25 |   // navigate to open new account page
  26 |   async goto() {
  27 |     await this.page.goto('/parabank/openaccount.htm');
  28 |   }
  29 | 
  30 |  // select account type and from account then click open
  31 | async openAccount(accountType: string) {
> 32 |   await this.AccountType.selectOption(accountType);
     |                          ^ Error: locator.selectOption: Test timeout of 30000ms exceeded.
  33 |   await expect(this.AccountID).not.toBeEmpty();
  34 |   await this.OpenAccountButton.click();
  35 | }
  36 | 
  37 | // get new account ID after account is opened
  38 | async getNewAccountId() {
  39 |     return await this.NewAccountId.textContent();
  40 |   }
  41 | 
  42 |   // get success message text
  43 | async getSuccessMessage() {
  44 |     return await this.SuccessMessage.textContent();
  45 |   }
  46 | 
  47 |   // get error message text
  48 | async getErrorMessage() {
  49 |     return await this.ErrorMessage.textContent();
  50 |   }
  51 | }
```