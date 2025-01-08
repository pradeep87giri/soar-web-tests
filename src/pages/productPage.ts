import { expect, Locator, Page } from "@playwright/test";


export class ProductPage {
    private page: Page

    constructor(page: Page) {
        this.page = page
    }

    // Locators
    private get btnDismiss() { return this.page.locator('button:has-text("Dismiss")') }
    private get btnAcceptCookie() { return this.page.locator('a:has-text("Me want it!")') }
    private get cmbPaginator() { return this.page.locator('.mat-paginator [role="combobox"]') }
    private get lblPaginatorOptionLast() { return this.page.locator('.mat-option .mat-option-text').last() }
    private get items() { return this.page.locator('.mat-grid-tile-content') }
    private get txtFirstItemName() { return this.page.locator('.item-name').first() }
    private get eleItemDialog() { return this.page.locator('.cdk-overlay-pane [role="dialog"]') }
    private get imgProductImage() { return this.page.locator('.cdk-overlay-pane .img-thumbnail') }
    private get lblNumOfReviews() { return this.page.locator('//*[text()="Reviews"]//following-sibling::span') }
    private get btnExpandReviews() { return this.page.locator('.cdk-overlay-pane .mat-expansion-indicator') }
    private get btnCloseDialog() { return this.page.locator('[aria-label = "Close Dialog"]') }


    async waitForPage() {
        await this.page.waitForLoadState('load')
        await this.page.waitForLoadState('networkidle')
    }


    async handlePopUpAndCookies() {
        try {
            await this.btnDismiss.waitFor({ state: "visible", timeout: 3000 })
            await this.btnDismiss.click()
            await this.btnAcceptCookie.waitFor({ state: "visible", timeout: 3000 })
            await this.btnAcceptCookie.click()
            console.log('Popup button clicked and Cookies Accepted')
        } catch (error) {
            // do nothing
        }
    }


    async changePaginationToMax() {
        await this.cmbPaginator.click()
        await this.lblPaginatorOptionLast.click()
        const paginationMaxItems = await this.lblPaginatorOptionLast.textContent()
        console.log('Maximum number of items in pagination are ', paginationMaxItems?.trim())
        return paginationMaxItems?.trim()
    }


    async getNumberofItemsOnPage() {
        const numOfItems = await this.items.count()
        console.log('Actual number of items on page are ', numOfItems)
        return numOfItems
    }


    async clickAndVerifyItem(imgAlt?, imgSrc?) {
        await this.txtFirstItemName.click()
        console.log('Clicked on first Item')

        // Verify dialog exists
        await expect(this.eleItemDialog).toBeVisible()

        //Verify Image
        await expect(this.imgProductImage).toBeVisible()
        if (imgAlt) {
            const altImg = await this.imgProductImage.getAttribute('alt')
            expect(altImg, 'Verification of alt of Image').toContain(imgAlt)
        }
        if (imgSrc) {
            const srcImg = await this.imgProductImage.getAttribute('src')
            expect(srcImg, 'Verification of src of Image').toContain(imgSrc)
        }
        console.log('Dialog is verified successfully')
    }


    async expandReview() {
        await this.page.waitForTimeout(500)
        const numOfReviews = await this.lblNumOfReviews.textContent()
        console.log('Number of reviews for the items is: ', numOfReviews)

        // Verify if Reviews exist
        if (numOfReviews && !numOfReviews.includes('0') && !numOfReviews.includes('()')) {
            await this.btnExpandReviews.click();
            console.log('Review is expanded successfully')
        }

        // Wait for 2 seconds
        await this.page.waitForTimeout(2000)

        // Close dialog
        await this.btnCloseDialog.click()
        console.log('Form is closed successfully')
    }
} 