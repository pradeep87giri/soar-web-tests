// import { test, expect } from "@playwright/test";
import test, { expect } from "../fixtures/baseFixture"
import { newUserData, userAddressDetails, userCardDetails } from "../testData/data"


test.describe.serial('Product App page verification', async () => {
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


    test('Verify New User Registration and Login', async ({ page, loginPage, productPage }) => {
        await page.goto('/#/register')
        await loginPage.validateLoginErrorMsgs()
        await loginPage.newUserRegistration(newUserData)
        await loginPage.verifyUserRegistration()
        await loginPage.userLogin(newUserData.email, newUserData.password)
    })


    test('Verify Purchase Order', async ({ page, loginPage, productPage }) => {
        await test.step('Add Items to Basket', async () => {
            await page.goto('/#/login')
            await loginPage.userLogin(newUserData.email, newUserData.password)
            await productPage.addItemsToBasket(5)
            await productPage.verifyBasketItems()
        })

        await test.step('Complete Purchase Order And Verify', async () => {
            await productPage.addNewAddress(userAddressDetails)
            await productPage.chooseDeliveryOption()
            await productPage.addNewCard(userCardDetails)
            await productPage.choosePaymentOption()
            await productPage.completePurchase()
        })
    })
})