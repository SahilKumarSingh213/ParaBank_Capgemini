# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui\registration.spec.ts >> Registration Tests >> TC-UI-REG-04 - register with duplicate username @regression
- Location: tests\ui\registration.spec.ts:63:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.waitFor: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('#customer.firstName') to be visible

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - generic [ref=e2]:
    - generic [ref=e3]:
      - link:
        - /url: admin.htm;jsessionid=E417629F805D5B60071BFB6D3739F5EA
        - img [ref=e4] [cursor=pointer]
      - link "ParaBank":
        - /url: index.htm;jsessionid=E417629F805D5B60071BFB6D3739F5EA
        - img "ParaBank" [ref=e5] [cursor=pointer]
      - paragraph [ref=e6]: Experience the difference
    - generic [ref=e7]:
      - list [ref=e8]:
        - listitem [ref=e9]: Solutions
        - listitem [ref=e10]:
          - link "About Us" [ref=e11] [cursor=pointer]:
            - /url: about.htm;jsessionid=E417629F805D5B60071BFB6D3739F5EA
        - listitem [ref=e12]:
          - link "Services" [ref=e13] [cursor=pointer]:
            - /url: services.htm;jsessionid=E417629F805D5B60071BFB6D3739F5EA
        - listitem [ref=e14]:
          - link "Products" [ref=e15] [cursor=pointer]:
            - /url: http://www.parasoft.com/jsp/products.jsp
        - listitem [ref=e16]:
          - link "Locations" [ref=e17] [cursor=pointer]:
            - /url: http://www.parasoft.com/jsp/pr/contacts.jsp
        - listitem [ref=e18]:
          - link "Admin Page" [ref=e19] [cursor=pointer]:
            - /url: admin.htm;jsessionid=E417629F805D5B60071BFB6D3739F5EA
      - list [ref=e20]:
        - listitem [ref=e21]:
          - link "home" [ref=e22] [cursor=pointer]:
            - /url: index.htm;jsessionid=E417629F805D5B60071BFB6D3739F5EA
        - listitem [ref=e23]:
          - link "about" [ref=e24] [cursor=pointer]:
            - /url: about.htm;jsessionid=E417629F805D5B60071BFB6D3739F5EA
        - listitem [ref=e25]:
          - link "contact" [ref=e26] [cursor=pointer]:
            - /url: contact.htm;jsessionid=E417629F805D5B60071BFB6D3739F5EA
    - generic [ref=e27]:
      - generic [ref=e28]:
        - heading "Customer Login" [level=2] [ref=e29]
        - generic [ref=e30]:
          - generic [ref=e31]:
            - paragraph [ref=e32]: Username
            - textbox [active] [ref=e34]
            - paragraph [ref=e35]: Password
            - textbox [ref=e37]
            - button "Log In" [ref=e39] [cursor=pointer]
          - paragraph [ref=e40]:
            - link "Forgot login info?" [ref=e41] [cursor=pointer]:
              - /url: lookup.htm;jsessionid=E417629F805D5B60071BFB6D3739F5EA
          - paragraph [ref=e42]:
            - link "Register" [ref=e43] [cursor=pointer]:
              - /url: register.htm;jsessionid=E417629F805D5B60071BFB6D3739F5EA
      - generic [ref=e44]:
        - heading "Signing up is easy!" [level=1] [ref=e45]
        - paragraph [ref=e46]: If you have an account with us you can sign-up for free instant online access. You will have to provide some personal information.
        - table [ref=e48]:
          - rowgroup [ref=e49]:
            - row "First Name:" [ref=e50]:
              - cell "First Name:" [ref=e51]
              - cell [ref=e52]:
                - textbox [ref=e53]
              - cell [ref=e54]
            - row "Last Name:" [ref=e55]:
              - cell "Last Name:" [ref=e56]
              - cell [ref=e57]:
                - textbox [ref=e58]
              - cell [ref=e59]
            - row "Address:" [ref=e60]:
              - cell "Address:" [ref=e61]
              - cell [ref=e62]:
                - textbox [ref=e63]
              - cell [ref=e64]
            - row "City:" [ref=e65]:
              - cell "City:" [ref=e66]
              - cell [ref=e67]:
                - textbox [ref=e68]
              - cell [ref=e69]
            - row "State:" [ref=e70]:
              - cell "State:" [ref=e71]
              - cell [ref=e72]:
                - textbox [ref=e73]
              - cell [ref=e74]
            - row "Zip Code:" [ref=e75]:
              - cell "Zip Code:" [ref=e76]
              - cell [ref=e77]:
                - textbox [ref=e78]
              - cell [ref=e79]
            - 'row "Phone #:" [ref=e80]':
              - 'cell "Phone #:" [ref=e81]'
              - cell [ref=e82]:
                - textbox [ref=e83]
              - cell [ref=e84]
            - row "SSN:" [ref=e85]:
              - cell "SSN:" [ref=e86]
              - cell [ref=e87]:
                - textbox [ref=e88]
              - cell [ref=e89]
            - row [ref=e90]:
              - cell [ref=e91]
            - row "Username:" [ref=e92]:
              - cell "Username:" [ref=e93]
              - cell [ref=e94]:
                - textbox [ref=e95]
              - cell [ref=e96]
            - row "Password:" [ref=e97]:
              - cell "Password:" [ref=e98]
              - cell [ref=e99]:
                - textbox [ref=e100]
              - cell [ref=e101]
            - row "Confirm:" [ref=e102]:
              - cell "Confirm:" [ref=e103]
              - cell [ref=e104]:
                - textbox [ref=e105]
              - cell [ref=e106]
            - row "Register" [ref=e107]:
              - cell [ref=e108]
              - cell "Register" [ref=e109]:
                - button "Register" [ref=e110] [cursor=pointer]
  - generic [ref=e112]:
    - list [ref=e113]:
      - listitem [ref=e114]:
        - link "Home" [ref=e115] [cursor=pointer]:
          - /url: index.htm;jsessionid=E417629F805D5B60071BFB6D3739F5EA
        - text: "|"
      - listitem [ref=e116]:
        - link "About Us" [ref=e117] [cursor=pointer]:
          - /url: about.htm;jsessionid=E417629F805D5B60071BFB6D3739F5EA
        - text: "|"
      - listitem [ref=e118]:
        - link "Services" [ref=e119] [cursor=pointer]:
          - /url: services.htm;jsessionid=E417629F805D5B60071BFB6D3739F5EA
        - text: "|"
      - listitem [ref=e120]:
        - link "Products" [ref=e121] [cursor=pointer]:
          - /url: http://www.parasoft.com/jsp/products.jsp
        - text: "|"
      - listitem [ref=e122]:
        - link "Locations" [ref=e123] [cursor=pointer]:
          - /url: http://www.parasoft.com/jsp/pr/contacts.jsp
        - text: "|"
      - listitem [ref=e124]:
        - link "Forum" [ref=e125] [cursor=pointer]:
          - /url: http://forums.parasoft.com/
        - text: "|"
      - listitem [ref=e126]:
        - link "Site Map" [ref=e127] [cursor=pointer]:
          - /url: sitemap.htm;jsessionid=E417629F805D5B60071BFB6D3739F5EA
        - text: "|"
      - listitem [ref=e128]:
        - link "Contact Us" [ref=e129] [cursor=pointer]:
          - /url: contact.htm;jsessionid=E417629F805D5B60071BFB6D3739F5EA
    - paragraph [ref=e130]: © Parasoft. All rights reserved.
    - list [ref=e131]:
      - listitem [ref=e132]: "Visit us at:"
      - listitem [ref=e133]:
        - link "www.parasoft.com" [ref=e134] [cursor=pointer]:
          - /url: http://www.parasoft.com/
```

# Test source

```ts
  1  | import { Locator, Page } from '@playwright/test';
  2  | 
  3  | export class RegisterPage {
  4  | 
  5  |   // declaration of variables for page and locators
  6  |   readonly page: Page;
  7  |   readonly FirstName: Locator;
  8  |   readonly LastName: Locator;
  9  |   readonly Address: Locator;
  10 |   readonly City: Locator;
  11 |   readonly State: Locator;
  12 |   readonly Zip: Locator;
  13 |   readonly Phone: Locator;
  14 |   readonly SSN: Locator;
  15 |   readonly Username: Locator;
  16 |   readonly Password: Locator;
  17 |   readonly ConfirmPassword: Locator;
  18 |   readonly RegisterButton: Locator;
  19 |   readonly ErrorMessage: Locator;
  20 |   readonly SuccessMessage: Locator;
  21 | 
  22 |   constructor(page: Page) {
  23 |     this.page = page;
  24 | 
  25 |     // assigning locators to the variables
  26 |     this.FirstName = page.locator('#customer.firstName');
  27 |     this.LastName = page.locator('#customer.lastName');
  28 |     this.Address = page.locator('#customer.address.street');
  29 |     this.City = page.locator('#customer.address.city');
  30 |     this.State = page.locator('#customer.address.state');
  31 |     this.Zip = page.locator('#customer.address.zipCode');
  32 |     this.Phone = page.locator('#customer.phoneNumber');
  33 |     this.SSN = page.locator('#customer.ssn');
  34 |     this.Username = page.locator('#customer.username');
  35 |     this.Password = page.locator('#customer.password');
  36 |     this.ConfirmPassword = page.locator('#repeatedPassword');
  37 |     this.RegisterButton = page.getByRole('button', { name: 'Register' });
  38 |     this.ErrorMessage= page.locator('.error');
  39 |     this.SuccessMessage = page.getByText('Your account was created successfully. You are now logged in.');
  40 | 
  41 | 
  42 |   }
  43 | 
  44 |   // method to navigate to the home page
  45 |   async goto() {
  46 |     await this.page.goto('/parabank/register.htm');
  47 |   }
  48 | 
  49 |   // method to perform registration action with given user details and username
  50 |   async register(user: any, username: string) {
> 51 |   await this.FirstName.waitFor({ state: 'visible' });
     |                        ^ Error: locator.waitFor: Test timeout of 30000ms exceeded.
  52 |   await this.FirstName.fill(user.firstName);
  53 |   await this.LastName.fill(user.lastName);
  54 |   await this.Address.fill(user.address);
  55 |   await this.City.fill(user.city);
  56 |   await this.State.fill(user.state);
  57 |   await this.Zip.fill(user.zipCode);
  58 |   await this.Phone.fill(user.phone);
  59 |   await this.SSN.fill(user.ssn);
  60 |   await this.Username.fill(username);
  61 |   await this.Password.fill(user.password);
  62 |   await this.ConfirmPassword.fill(user.confirmPassword);
  63 |   await this.RegisterButton.click();
  64 | }
  65 | 
  66 |   // method to get the error message text
  67 |   async getErrorMessage() {
  68 |     return await this.ErrorMessage.allTextContents();
  69 |   }
  70 | 
  71 |   // method to get the success message text
  72 | async getSuccessMessage() {
  73 |   return await this.SuccessMessage.textContent();
  74 | }
  75 | }
  76 | 
```