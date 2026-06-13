// central config file — all shared constants defined here
// avoids repeating BASE_URL and HEADERS in every test file
// any URL or ID change only needs to be made in one place

export const BASE_URL = 'https://parabank.parasoft.com/parabank/services/bank';
export const BASE_UI_URL = 'https://parabank.parasoft.com';
export const HEADERS = { 'Accept': 'application/json' };

// ParaBank demo site always has customer 12212 and account 13344 as seed data
// hardcoded because demo site resets periodically and these always exist
export const CUSTOMER_ID = 12212;
export const FROM_ACCOUNT_ID = 13344;