import { Locator, Page } from "@playwright/test";


export class ProductPage {
    private page: Page

    constructor(page: Page) {
        this.page = page
    }

    // Locators
    // private get btnDismiss() { return this.page.getByText('Dismiss') }
    private get btnDismiss() { return this.page.locator('button:has-text("Dismiss")') }
    private get btnAcceptCookie() { return this.page.locator('a:has-text("Me want it!")') }
    // private get btnAcceptCookie() { return this.page.getByText('Me want it!') }
    // private get btnAcceptCookie() { return this.page.getByText('Me want it!') }
    private get cmbPaginator() { return this.page.locator('.mat-paginator [role="combobox"]') }
    private get lblPaginatorOptionLast() { return this.page.locator('.mat-option .mat-option-text').last() }
    private get items() { return this.page.locator('.mat-grid-tile-content') }


    async waitForPage() {
        await this.page.waitForLoadState('load')
        await this.page.waitForLoadState('networkidle')
    }

    async handlePopUpAndCookies() {
        try {
            await this.btnDismiss.waitFor({ state: "visible", timeout: 3000 })
            await this.btnDismiss.click();
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
} 