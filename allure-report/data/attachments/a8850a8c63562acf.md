# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui\openAccount.spec.ts >> Open Account Tests >> TC-UI-ACC-03 - account overview updated after opening @regression
- Location: tests\ui\openAccount.spec.ts:43:7

# Error details

```
Error: expect(locator).toHaveCount(expected) failed

Locator:  locator('#accountTable tbody tr')
Expected: 2
Received: 3
Timeout:  5000ms

Call log:
  - Expect "toHaveCount" with timeout 5000ms
  - waiting for locator('#accountTable tbody tr')
    14 × locator resolved to 3 elements
       - unexpected value "3"

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
        - heading "Accounts Overview" [level=1] [ref=e51]
        - table [ref=e52]:
          - rowgroup [ref=e53]:
            - row "Account Balance* Available Amount" [ref=e54]:
              - columnheader "Account" [ref=e55]
              - columnheader "Balance*" [ref=e56]
              - columnheader "Available Amount" [ref=e57]
          - rowgroup [ref=e58]:
            - row "42537 $415.50 $415.50" [ref=e59]:
              - cell "42537" [ref=e60]:
                - link "42537" [ref=e61] [cursor=pointer]:
                  - /url: activity.htm?id=42537
              - cell "$415.50" [ref=e62]
              - cell "$415.50" [ref=e63]
            - row "42648 $100.00 $100.00" [ref=e64]:
              - cell "42648" [ref=e65]:
                - link "42648" [ref=e66] [cursor=pointer]:
                  - /url: activity.htm?id=42648
              - cell "$100.00" [ref=e67]
              - cell "$100.00" [ref=e68]
            - row "Total $515.50" [ref=e69]:
              - cell "Total" [ref=e70]
              - cell "$515.50" [ref=e71]
              - cell [ref=e72]
          - rowgroup [ref=e73]:
            - row "*Balance includes deposits that may be subject to holds" [ref=e74]:
              - cell "*Balance includes deposits that may be subject to holds" [ref=e75]
  - generic [ref=e77]:
    - list [ref=e78]:
      - listitem [ref=e79]:
        - link "Home" [ref=e80] [cursor=pointer]:
          - /url: index.htm
        - text: "|"
      - listitem [ref=e81]:
        - link "About Us" [ref=e82] [cursor=pointer]:
          - /url: about.htm
        - text: "|"
      - listitem [ref=e83]:
        - link "Services" [ref=e84] [cursor=pointer]:
          - /url: services.htm
        - text: "|"
      - listitem [ref=e85]:
        - link "Products" [ref=e86] [cursor=pointer]:
          - /url: http://www.parasoft.com/jsp/products.jsp
        - text: "|"
      - listitem [ref=e87]:
        - link "Locations" [ref=e88] [cursor=pointer]:
          - /url: http://www.parasoft.com/jsp/pr/contacts.jsp
        - text: "|"
      - listitem [ref=e89]:
        - link "Forum" [ref=e90] [cursor=pointer]:
          - /url: http://forums.parasoft.com/
        - text: "|"
      - listitem [ref=e91]:
        - link "Site Map" [ref=e92] [cursor=pointer]:
          - /url: sitemap.htm
        - text: "|"
      - listitem [ref=e93]:
        - link "Contact Us" [ref=e94] [cursor=pointer]:
          - /url: contact.htm
    - paragraph [ref=e95]: © Parasoft. All rights reserved.
    - list [ref=e96]:
      - listitem [ref=e97]: "Visit us at:"
      - listitem [ref=e98]:
        - link "www.parasoft.com" [ref=e99] [cursor=pointer]:
          - /url: http://www.parasoft.com/
```

# Test source

```ts
  1  | 
  2  | 
  3  | import { test, expect } from '@playwright/test';
  4  | import { RegisterPage } from '../../pages/RegisterPage';
  5  | import { OpenAccountPage } from '../../pages/OpenAccountPage';
  6  | import { generateUsername } from '../../utils/testDataGenerator';
  7  | import users from '../../test-data/users.json';
  8  | 
  9  | test.describe('Open Account Tests', () => {
  10 | 
  11 |   test('TC-UI-ACC-01 - open savings account @smoke @regression', async ({ page }) => {
  12 |     const username = generateUsername();
  13 |     console.log('TC-UI-ACC-01 - opening savings account');
  14 |     const register_page = new RegisterPage(page);
  15 |     await register_page.goto();
  16 |     await register_page.register(users, username);
  17 | 
  18 |     const open_account_page = new OpenAccountPage(page);
  19 |     await open_account_page.goto();
  20 |     await open_account_page.openAccount('1');
  21 |     await open_account_page.SuccessMessage.waitFor({ state: 'visible' });
  22 |     const message = await open_account_page.getSuccessMessage();
  23 |     console.log(`message: ${message}`);
  24 |     expect(message).toContain('Congratulations, your account is now open.');
  25 |   });
  26 | 
  27 |   test('TC-UI-ACC-02 - open checking account @regression', async ({ page }) => {
  28 |     const username = generateUsername();
  29 |     console.log('TC-UI-ACC-02 - opening checking account');
  30 |     const register_page = new RegisterPage(page);
  31 |     await register_page.goto();
  32 |     await register_page.register(users, username);
  33 | 
  34 |     const open_account_page = new OpenAccountPage(page);
  35 |     await open_account_page.goto();
  36 |     await open_account_page.openAccount('0');
  37 |     await open_account_page.SuccessMessage.waitFor({ state: 'visible' });
  38 |     const message = await open_account_page.getSuccessMessage();
  39 |     console.log(`message: ${message}`);
  40 |     expect(message).toContain('Congratulations, your account is now open.');
  41 |   });
  42 | 
  43 |   test('TC-UI-ACC-03 - account overview updated after opening @regression', async ({ page }) => {
  44 |     const username = generateUsername();
  45 |     console.log('TC-UI-ACC-03 - checking account overview');
  46 |     const register_page = new RegisterPage(page);
  47 |     await register_page.goto();
  48 |     await register_page.register(users, username);
  49 | 
  50 |     const open_account_page = new OpenAccountPage(page);
  51 |     await open_account_page.goto();
  52 |     await open_account_page.openAccount('1');
  53 |     await open_account_page.SuccessMessage.waitFor({ state: 'visible' });
  54 |     await page.getByRole('link', { name: 'Accounts Overview' }).click();
  55 |     await page.waitForLoadState('networkidle');
  56 |     const accounts = page.locator('#accountTable tbody tr');
  57 |     console.log('checking account count');
> 58 |     await expect(accounts).toHaveCount(2);
     |                            ^ Error: expect(locator).toHaveCount(expected) failed
  59 |   });
  60 | 
  61 |   test('TC-UI-MSG-01 - success message shows new account ID @regression', async ({ page }) => {
  62 |     const username = generateUsername();
  63 |     console.log('TC-UI-MSG-01 - checking success message');
  64 |     const register_page = new RegisterPage(page);
  65 |     await register_page.goto();
  66 |     await register_page.register(users, username);
  67 | 
  68 |     const open_account_page = new OpenAccountPage(page);
  69 |     await open_account_page.goto();
  70 |     await open_account_page.openAccount('1');
  71 |     await open_account_page.SuccessMessage.waitFor({ state: 'visible' });
  72 |     const message = await open_account_page.getSuccessMessage();
  73 |     const new_account_id = await open_account_page.getNewAccountId();
  74 |     console.log(`message: ${message}, account id: ${new_account_id}`);
  75 |     expect(message).toContain('Congratulations, your account is now open.');
  76 |     expect(new_account_id).toBeTruthy();
  77 |   });
  78 | 
  79 | })
```