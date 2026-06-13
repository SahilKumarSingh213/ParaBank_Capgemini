# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui\registration.spec.ts >> Registration Tests >> register with duplicate username
- Location: tests\ui\registration.spec.ts:59:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.waitFor: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('.error').first() to be visible

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
      - generic [ref=e48]:
        - heading "Welcome sahil_1781337432164" [level=1] [ref=e49]
        - paragraph [ref=e50]: Your account was created successfully. You are now logged in.
  - generic [ref=e52]:
    - list [ref=e53]:
      - listitem [ref=e54]:
        - link "Home" [ref=e55] [cursor=pointer]:
          - /url: index.htm
        - text: "|"
      - listitem [ref=e56]:
        - link "About Us" [ref=e57] [cursor=pointer]:
          - /url: about.htm
        - text: "|"
      - listitem [ref=e58]:
        - link "Services" [ref=e59] [cursor=pointer]:
          - /url: services.htm
        - text: "|"
      - listitem [ref=e60]:
        - link "Products" [ref=e61] [cursor=pointer]:
          - /url: http://www.parasoft.com/jsp/products.jsp
        - text: "|"
      - listitem [ref=e62]:
        - link "Locations" [ref=e63] [cursor=pointer]:
          - /url: http://www.parasoft.com/jsp/pr/contacts.jsp
        - text: "|"
      - listitem [ref=e64]:
        - link "Forum" [ref=e65] [cursor=pointer]:
          - /url: http://forums.parasoft.com/
        - text: "|"
      - listitem [ref=e66]:
        - link "Site Map" [ref=e67] [cursor=pointer]:
          - /url: sitemap.htm
        - text: "|"
      - listitem [ref=e68]:
        - link "Contact Us" [ref=e69] [cursor=pointer]:
          - /url: contact.htm
    - paragraph [ref=e70]: © Parasoft. All rights reserved.
    - list [ref=e71]:
      - listitem [ref=e72]: "Visit us at:"
      - listitem [ref=e73]:
        - link "www.parasoft.com" [ref=e74] [cursor=pointer]:
          - /url: http://www.parasoft.com/
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import { RegisterPage } from '../../pages/RegisterPage';
  3  | import { generateUsername } from '../../utils/testDataGenerator';
  4  | import users from '../../test-data/users.json';
  5  | 
  6  | test.describe('Registration Tests', () => {
  7  |   // TC-UI-REG-01 - register with valid credentials
  8  |   test('register with valid credentials', async ({ page }) => {
  9  |   const username = generateUsername();
  10 |   const registerPage = new RegisterPage(page);
  11 |   await registerPage.goto();
  12 |   await registerPage.register(users, username);
  13 |   await registerPage.SuccessMessage.waitFor({ state: 'visible' });
  14 |   const message = await registerPage.getSuccessMessage();
  15 |     expect(message).toContain('Your account was created successfully. You are now logged in.');
  16 |   });
  17 | 
  18 |   // TC-UI-REG-02 - register with empty fields
  19 |   test('register with empty credentials', async ({ page }) => {
  20 |   const registerPage = new RegisterPage(page);
  21 |   await registerPage.goto();
  22 |   await registerPage.RegisterButton.click();
  23 |   await registerPage.ErrorMessage.first().waitFor({ state: 'visible' });
  24 |   const errors = await registerPage.getErrorMessage();
  25 |   expect(errors).toContain('First name is required.');
  26 |   expect(errors).toContain('Last name is required.');
  27 |   expect(errors).toContain('Address is required.');
  28 |   expect(errors).toContain('City is required.');
  29 |   expect(errors).toContain('State is required.');
  30 |   expect(errors).toContain('Zip Code is required.');
  31 |   expect(errors).toContain('Social Security Number is required.');
  32 |   expect(errors).toContain('Username is required.');
  33 |   expect(errors).toContain('Password is required.');
  34 |   expect(errors).toContain('Password confirmation is required.');
  35 |   });
  36 | 
  37 |   // TC-UI-REG-03 - register with partial fields
  38 |   test('register with partial fields', async ({ page }) => {
  39 |     const registerPage = new RegisterPage(page);
  40 |     await registerPage.goto();
  41 |     await registerPage.FirstName.fill(users.firstName);
  42 |     await registerPage.LastName.fill(users.lastName);
  43 |     await registerPage.RegisterButton.click();
  44 |     await registerPage.ErrorMessage.first().waitFor({ state: 'visible' });
  45 |     const errors = await registerPage.getErrorMessage();
  46 |     expect(errors).not.toContain('First name is required.');
  47 |     expect(errors).not.toContain('Last name is required.');
  48 |     expect(errors).toContain('Address is required.');
  49 |     expect(errors).toContain('City is required.');
  50 |     expect(errors).toContain('State is required.');
  51 |     expect(errors).toContain('Zip Code is required.');
  52 |     expect(errors).toContain('Social Security Number is required.');
  53 |     expect(errors).toContain('Username is required.');
  54 |     expect(errors).toContain('Password is required.');
  55 |     expect(errors).toContain('Password confirmation is required.');
  56 |   });
  57 | 
  58 |   // TC-UI-REG-04 - register with duplicate username
  59 |   test('register with duplicate username', async ({ page }) => {
  60 |     const username = generateUsername();
  61 |     const registerPage = new RegisterPage(page);
  62 |     await registerPage.goto();
  63 |     await registerPage.register(users, username);
  64 |     await page.getByRole('link', { name: 'Log Out' }).click();
  65 |     await registerPage.goto();
  66 |     await registerPage.register(users, username);
> 67 |     await registerPage.ErrorMessage.first().waitFor({ state: 'visible' });
     |                                             ^ Error: locator.waitFor: Test timeout of 30000ms exceeded.
  68 |     const errors = await registerPage.getErrorMessage();
  69 |     expect(errors).toContain('This username already exists.');
  70 |   });
  71 | 
  72 |   // TC-UI-REG-05 - register with wrong data types
  73 |   test('register with wrong data types', async ({ page }) => {
  74 |     const registerPage = new RegisterPage(page);
  75 |     await registerPage.goto();
  76 |     await registerPage.register({
  77 |       firstName: '123456',
  78 |       lastName: '12344567',
  79 |       address: '1234566',
  80 |       city: '133455656',
  81 |       state: '23234545',
  82 |       zipCode: 'adafdfd',
  83 |       phone: 'afdfddfdf',
  84 |       ssn: 'afsfdfaaf',
  85 |       password: 'Test@1234',
  86 |       confirmPassword: 'Test@1234'
  87 |     }, generateUsername());
  88 |     await registerPage.SuccessMessage.waitFor({ state: 'visible' });
  89 |     const message = await registerPage.getSuccessMessage();
  90 |     expect(message).toContain('Your account was created successfully. You are now logged in.');
  91 |   });
  92 | 
  93 | });
```