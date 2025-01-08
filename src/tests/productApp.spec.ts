// import { test, expect } from "@playwright/test";
import test, { expect } from "../fixtures/baseFixture"
import { userData } from "../testData/data"


test.describe('Product App page verification', async () => {
    test.beforeEach('Navigate to the page', async ({ page, productPage }) => {
        await page.goto('/#/')
        await productPage.handlePopUpAndCookies()
    })

    test('Verify items on pagination', async ({ productPage }) => {
        const maxNumOfItems = await productPage.changePaginationToMax()
        const actualItems = await productPage.getNumberofItemsOnPage()
        expect(actualItems, 'Verification of number of Items').toBeLessThanOrEqual(parseInt(maxNumOfItems ?? '0'))
    })


    test('Open and Verify item dialog', async ({ productPage }) => {
        await productPage.clickAndVerifyItem('Apple Juice', 'apple_juice.jpg')
        await productPage.expandReview()
    })


    test('Verify New User Registration and Login', async ({ page, loginPage }) => {
        await page.goto('/#/register')
        await loginPage.validateLoginErrorMsgs()
        await loginPage.newUserRegistration(userData)
        await loginPage.verifyUserRegistration()
        await loginPage.userLogin(userData.email, userData.password)
    })
})