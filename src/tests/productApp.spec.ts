// import { test, expect } from "@playwright/test";
import test, { expect } from "../fixtures/baseFixture"


test.describe('Product App page verification', async () => {
    test.beforeEach('Navigate to the page', async ({ page, productPage }) => {
        await page.goto('/#/')
        await productPage.handlePopUpAndCookies()
    })

    test('Verify items on pagination', async ({ productPage }) => {
        const maxNumOfItems = await productPage.changePaginationToMax()
        const actualItems = await productPage.getNumberofItemsOnPage()
        expect(actualItems).toBeLessThanOrEqual(parseInt(maxNumOfItems ?? '0'))
    })
})