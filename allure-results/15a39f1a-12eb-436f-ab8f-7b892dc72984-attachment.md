# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui\openAccount.spec.ts >> Open Account Tests >> account overview balance updated after opening
- Location: tests\ui\openAccount.spec.ts:98:7

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
            - row "17118 $415.50 $415.50" [ref=e59]:
              - cell "17118" [ref=e60]:
                - link "17118" [ref=e61] [cursor=pointer]:
                  - /url: activity.htm?id=17118
              - cell "$415.50" [ref=e62]
              - cell "$415.50" [ref=e63]
            - row "17229 $100.00 $100.00" [ref=e64]:
              - cell "17229" [ref=e65]:
                - link "17229" [ref=e66] [cursor=pointer]:
                  - /url: activity.htm?id=17229
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
  10  | //   test('open savings account', async ({ page }) => {
  11  | //     const username = generateUsername();
  12  | //     const registerPage = new RegisterPage(page);
  13  | //     await registerPage.goto();
  14  | //     await registerPage.register(users, username);
  15  | //     const openAccountPage = new OpenAccountPage(page);
  16  | //     await openAccountPage.goto();
  17  | //     await openAccountPage.AccountID.locator('option').first().waitFor({ state: 'attached' });
  18  | //     const fromAccountId = await openAccountPage.AccountID.inputValue();
  19  | //     await openAccountPage.openAccount('1', fromAccountId);
  20  | //     await openAccountPage.SuccessMessage.waitFor({ state: 'visible' });
  21  | //     const message = await openAccountPage.getSuccessMessage();
  22  | //     expect(message).toContain('Congratulations, your account is now open.');
  23  | //   });
  24  | 
  25  | //   // TC-UI-ACC-02 - open new checking account
  26  | //   test('open new checking account', async ({ page }) => {
  27  | //     const username = generateUsername();
  28  | //     const registerPage = new RegisterPage(page);
  29  | //     await registerPage.goto();
  30  | //     await registerPage.register(users, username);
  31  | //     const openAccountPage = new OpenAccountPage(page);
  32  | //     await openAccountPage.goto();
  33  | //     await openAccountPage.AccountID.locator('option').first().waitFor({ state: 'attached' });
  34  | //     const fromAccountId = await openAccountPage.AccountID.inputValue();
  35  | //     await openAccountPage.openAccount('0', fromAccountId);
  36  | //     await openAccountPage.SuccessMessage.waitFor({ state: 'visible' });
  37  | //     const message = await openAccountPage.getSuccessMessage();
  38  | //     expect(message).toContain('Congratulations, your account is now open.');
  39  | //   });
  40  | 
  41  | //   // TC-UI-ACC-03 - account overview balance updated after opening
  42  | //   test('account overview balance updated after opening', async ({ page }) => {
  43  | //     const username = generateUsername();
  44  | //     const registerPage = new RegisterPage(page);
  45  | //     await registerPage.goto();
  46  | //     await registerPage.register(users, username);
  47  | //     const openAccountPage = new OpenAccountPage(page);
  48  | //     await openAccountPage.goto();
  49  | //     await openAccountPage.AccountID.locator('option').first().waitFor({ state: 'attached' });
  50  | //     const fromAccountId = await openAccountPage.AccountID.inputValue();
  51  | //     await openAccountPage.openAccount('1', fromAccountId);
  52  | //     await openAccountPage.SuccessMessage.waitFor({ state: 'visible' });
  53  | //     await page.getByRole('link', { name: 'Accounts Overview' }).click();
  54  | //     await page.waitForLoadState('networkidle');
  55  | //     const accounts = page.locator('#accountTable tbody tr');
  56  | //     await expect(accounts).toHaveCount(3);
  57  | //   });
  58  | 
  59  | // })
  60  | 
  61  | import { test, expect } from '@playwright/test';
  62  | import { RegisterPage } from '../../pages/RegisterPage';
  63  | import { OpenAccountPage } from '../../pages/OpenAccountPage';
  64  | import { generateUsername } from '../../utils/testDataGenerator';
  65  | import users from '../../test-data/users.json';
  66  | 
  67  | test.describe('Open Account Tests', () => {
  68  | 
  69  |   // TC-UI-ACC-01 - open new savings account
  70  |   test('open savings account', async ({ page }) => {
  71  |     const username = generateUsername();
  72  |     const registerPage = new RegisterPage(page);
  73  |     await registerPage.goto();
  74  |     await registerPage.register(users, username);
  75  |     const openAccountPage = new OpenAccountPage(page);
  76  |     await openAccountPage.goto();
  77  |     await openAccountPage.openAccount('1');
  78  |     await openAccountPage.SuccessMessage.waitFor({ state: 'visible' });
  79  |     const message = await openAccountPage.getSuccessMessage();
  80  |     expect(message).toContain('Congratulations, your account is now open.');
  81  |   });
  82  | 
  83  |   // TC-UI-ACC-02 - open new checking account
  84  |   test('open new checking account', async ({ page }) => {
  85  |     const username = generateUsername();
  86  |     const registerPage = new RegisterPage(page);
  87  |     await registerPage.goto();
  88  |     await registerPage.register(users, username);
  89  |     const openAccountPage = new OpenAccountPage(page);
  90  |     await openAccountPage.goto();
  91  |     await openAccountPage.openAccount('0');
  92  |     await openAccountPage.SuccessMessage.waitFor({ state: 'visible' });
  93  |     const message = await openAccountPage.getSuccessMessage();
  94  |     expect(message).toContain('Congratulations, your account is now open.');
  95  |   });
  96  | 
  97  |   // TC-UI-ACC-03 - account overview balance updated after opening
  98  |   test('account overview balance updated after opening', async ({ page }) => {
  99  |     const username = generateUsername();
  100 |     const registerPage = new RegisterPage(page);
  101 |     await registerPage.goto();
  102 |     await registerPage.register(users, username);
  103 |     const openAccountPage = new OpenAccountPage(page);
  104 |     await openAccountPage.goto();
  105 |     await openAccountPage.openAccount('1');
  106 |     await openAccountPage.SuccessMessage.waitFor({ state: 'visible' });
  107 |     await page.getByRole('link', { name: 'Accounts Overview' }).click();
  108 |     await page.waitForLoadState('networkidle');
  109 |     const accounts = page.locator('#accountTable tbody tr');
> 110 |     await expect(accounts).toHaveCount(2);
      |                            ^ Error: expect(locator).toHaveCount(expected) failed
  111 |   });
  112 | 
  113 | })
```