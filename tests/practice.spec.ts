import{test,expect} from "@playwright/test"
import {BASE_URL,HEADERS,CUSTOMER_ID} from "../config/env"

test("get account return 200",async({request})=>{
    const response = await request.get(`${BASE_URL}/customers/${CUSTOMER_ID}/accounts`,{
        headers:HEADERS})
    expect(response.status()).toBe(200)

    const body = await response.json()
    expect(body.length).toBeGreaterThan(0)

})
