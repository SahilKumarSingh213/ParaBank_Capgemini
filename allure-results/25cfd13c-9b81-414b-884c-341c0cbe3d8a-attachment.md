# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui\openAccount.spec.ts >> Open Account Tests >> account overview balance updated after opening
- Location: tests\ui\openAccount.spec.ts:104:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.waitFor: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('#fromAccountId').locator('option').first()

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - banner [ref=e4]:
    - heading "Error 1015" [level=1] [ref=e5]
    - generic [ref=e6]: "Ray ID: a0aee0a50aaf91af •"
    - generic [ref=e7]: 2026-06-13 06:00:53 UTC
    - heading "You are being rate limited" [level=2] [ref=e8]
  - generic [ref=e10]:
    - heading "What happened?" [level=2] [ref=e11]
    - paragraph [ref=e12]: The owner of this website (parabank.parasoft.com) has banned you temporarily from accessing this website.
    - paragraph [ref=e13]:
      - text: Please see
      - link "https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/error-1015/" [ref=e14] [cursor=pointer]:
        - /url: https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/error-1015/
      - text: for more details.
  - generic [ref=e16]:
    - text: Was this page helpful?
    - button "Yes" [ref=e17] [cursor=pointer]
    - button "No" [ref=e18] [cursor=pointer]
  - paragraph [ref=e20]:
    - generic [ref=e21]:
      - text: "Cloudflare Ray ID:"
      - strong [ref=e22]: a0aee0a50aaf91af
    - text: •
    - generic [ref=e23]:
      - text: "Your IP:"
      - button "Click to reveal" [ref=e24] [cursor=pointer]
      - text: •
    - generic [ref=e25]:
      - text: Performance & security by
      - link "Cloudflare" [ref=e26] [cursor=pointer]:
        - /url: https://www.cloudflare.com/5xx-error-landing
```

# Test source

```ts
  11  | //     test('open savings account', async ({ page }) => {
  12  | //     const username = generateUsername();
  13  | //     const registerPage = new RegisterPage(page);
  14  | //     await registerPage.goto();
  15  | //     await registerPage.register(users, username);
  16  | //     const openAccountPage = new OpenAccountPage(page);
  17  | //     await openAccountPage.goto();
  18  | //     await openAccountPage.openAccount('1', await openAccountPage.AccountID.inputValue());
  19  | //     const message = await openAccountPage.getSuccessMessage();
  20  | //       expect(message).toContain('Congratulations, your account is now open.');
  21  | // });
  22  |  
  23  | 
  24  | //  //            check this                 // 
  25  | //     test('open new checking account', async ({ page }) => {
  26  | //     const username = generateUsername();
  27  | //     const registerPage = new RegisterPage(page);
  28  | //     await registerPage.goto();
  29  | //     await registerPage.register(users, username);
  30  | //     const openAccountPage = new OpenAccountPage(page);
  31  | //     await openAccountPage.goto();
  32  | //     const fromAccountId = await openAccountPage.AccountID.inputValue();
  33  | //     await openAccountPage.openAccount('0', fromAccountId); // 0 = CHECKING
  34  | //     const message = await openAccountPage.getSuccessMessage();
  35  | //      expect(message).toContain('Congratulations, your account is now open.');
  36  | // });
  37  | 
  38  | 
  39  | //     test('account overview balance updated after opening', async ({ page }) => {
  40  | //     const username = generateUsername();
  41  | //     const registerPage = new RegisterPage(page);
  42  | //     await registerPage.goto();
  43  | //     await registerPage.register(users, username);
  44  | 
  45  | //     const openAccountPage = new OpenAccountPage(page);
  46  | //     await openAccountPage.goto();
  47  | //     await openAccountPage.AccountID.locator('option').first()
  48  | //     const fromAccountId = await openAccountPage.AccountID.inputValue();
  49  | //     await openAccountPage.openAccount('1', fromAccountId);
  50  | //     await openAccountPage.SuccessMessage.waitFor({ state: 'visible' });
  51  | 
  52  | //   // go to accounts overview
  53  | //     await page.getByRole('link', { name: 'Accounts Overview' }).click();
  54  | //     await page.waitForLoadState('networkidle');
  55  | 
  56  | //   // verify 2 accounts exist
  57  | //     const accounts = page.locator('#accountTable tbody tr');
  58  | //     await expect(accounts).toHaveCount(3);
  59  | // });
  60  |   
  61  | // })
  62  | 
  63  | import { test, expect } from '@playwright/test';
  64  | import { RegisterPage } from '../../pages/RegisterPage';
  65  | import { OpenAccountPage } from '../../pages/OpenAccountPage';
  66  | import { generateUsername } from '../../utils/testDataGenerator';
  67  | import users from '../../test-data/users.json';
  68  | 
  69  | test.describe('Open Account Tests', () => {
  70  | 
  71  |   // TC-UI-ACC-01 - open new savings account
  72  |   test('open savings account', async ({ page }) => {
  73  |     const username = generateUsername();
  74  |     const registerPage = new RegisterPage(page);
  75  |     await registerPage.goto();
  76  |     await registerPage.register(users, username);
  77  |     const openAccountPage = new OpenAccountPage(page);
  78  |     await openAccountPage.goto();
  79  |     await openAccountPage.AccountID.locator('option').first().waitFor({ state: 'attached' });
  80  |     const fromAccountId = await openAccountPage.AccountID.inputValue();
  81  |     await openAccountPage.openAccount('1', fromAccountId);
  82  |     await openAccountPage.SuccessMessage.waitFor({ state: 'visible' });
  83  |     const message = await openAccountPage.getSuccessMessage();
  84  |     expect(message).toContain('Congratulations, your account is now open.');
  85  |   });
  86  | 
  87  |   // TC-UI-ACC-02 - open new checking account
  88  |   test('open new checking account', async ({ page }) => {
  89  |     const username = generateUsername();
  90  |     const registerPage = new RegisterPage(page);
  91  |     await registerPage.goto();
  92  |     await registerPage.register(users, username);
  93  |     const openAccountPage = new OpenAccountPage(page);
  94  |     await openAccountPage.goto();
  95  |     await openAccountPage.AccountID.locator('option').first().waitFor({ state: 'attached' });
  96  |     const fromAccountId = await openAccountPage.AccountID.inputValue();
  97  |     await openAccountPage.openAccount('0', fromAccountId);
  98  |     await openAccountPage.SuccessMessage.waitFor({ state: 'visible' });
  99  |     const message = await openAccountPage.getSuccessMessage();
  100 |     expect(message).toContain('Congratulations, your account is now open.');
  101 |   });
  102 | 
  103 |   // TC-UI-ACC-03 - account overview balance updated after opening
  104 |   test('account overview balance updated after opening', async ({ page }) => {
  105 |     const username = generateUsername();
  106 |     const registerPage = new RegisterPage(page);
  107 |     await registerPage.goto();
  108 |     await registerPage.register(users, username);
  109 |     const openAccountPage = new OpenAccountPage(page);
  110 |     await openAccountPage.goto();
> 111 |     await openAccountPage.AccountID.locator('option').first().waitFor({ state: 'attached' });
      |                                                               ^ Error: locator.waitFor: Test timeout of 30000ms exceeded.
  112 |     const fromAccountId = await openAccountPage.AccountID.inputValue();
  113 |     await openAccountPage.openAccount('1', fromAccountId);
  114 |     await openAccountPage.SuccessMessage.waitFor({ state: 'visible' });
  115 |     await page.getByRole('link', { name: 'Accounts Overview' }).click();
  116 |     await page.waitForLoadState('networkidle');
  117 |     const accounts = page.locator('#accountTable tbody tr');
  118 |     await expect(accounts).toHaveCount(3);
  119 |   });
  120 | 
  121 | })
```