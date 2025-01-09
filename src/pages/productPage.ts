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
    private get eleItemDialog() { return this.page.locator('.cdk-overlay-pane [role="dialog"]').first() }
    private get imgProductImage() { return this.page.locator('.cdk-overlay-pane .img-thumbnail') }
    private get lblNumOfReviews() { return this.page.locator('//*[text()="Reviews"]//following-sibling::span') }
    private get btnExpandReviews() { return this.page.locator('.cdk-overlay-pane .mat-expansion-indicator') }
    private get btnCloseDialog() { return this.page.locator('[aria-label = "Close Dialog"]') }
    private get btnAddToBasket() { return this.page.locator('button:has-text("Add to basket")') }
    private get lblAddBasketMsg() { return this.page.locator('.mat-simple-snack-bar-content') }
    private get closeMsg() { return this.page.locator('.mat-snack-bar-container .mat-button') }
    private get btnBasketIcon() { return this.page.locator('[routerlink="/basket"]') }
    private get lblBasketIconItems() { return this.page.locator('[routerlink="/basket"] .fa-layers-counter') }
    private get btnPlusItemsInBasket() { return this.page.locator('[data-icon="plus-square"]') }
    private get btnDeleteItem() { return this.page.locator('[data-icon="trash-alt"]') }
    private get lblTotalPrice() { return this.page.locator('#price') }
    private get btnCheckout() { return this.page.locator('#checkoutButton') }
    private get btnAddNewAddress() { return this.page.locator('.btn-new-address') }
    private get txtCountry() { return this.page.getByPlaceholder('Please provide a country.') }
    private get txtName() { return this.page.getByPlaceholder('Please provide a name.') }
    private get txtMobileNo() { return this.page.getByPlaceholder('Please provide a mobile number.') }
    private get txtZipCode() { return this.page.getByPlaceholder('Please provide a ZIP code.') }
    private get txtAddress() { return this.page.getByPlaceholder('Please provide an address.') }
    private get txtCity() { return this.page.getByPlaceholder('Please provide a city.') }
    private get txtState() { return this.page.getByPlaceholder('Please provide a state.') }
    private get btnSubmitAddress() { return this.page.locator('#submitButton') }
    private get radioSelect() { return this.page.locator('.mat-radio-button').first() }
    private get btnContinueAddress() { return this.page.locator('.btn-next') }
    private get btnContinueDelivery() { return this.page.locator('.nextButton') }
    private get btnAddNewCard() { return this.page.getByText('Add new card') }
    private get txtCardName() { return this.page.locator('//*[text()="Name"]//ancestor::div[contains(@class,"mat-form-field-infix")]//input') }
    private get txtCardNumber() { return this.page.locator('//*[text()="Card Number"]//ancestor::div[contains(@class,"mat-form-field-infix")]//input') }
    private get cmbCardExpiryMonth() { return this.page.locator('//*[text()="Expiry Month"]//ancestor::div[contains(@class,"mat-form-field-infix")]//select') }
    private get cmbCardExpiryYear() { return this.page.locator('//*[text()="Expiry Year"]//ancestor::div[contains(@class,"mat-form-field-infix")]//select') }
    private get lblConfirmationMsg() { return this.page.locator('.confirmation').first() }

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


    async addItemsToBasket(numOfItems) {
        await this.cmbPaginator.waitFor({ state: 'visible' })
        await this.page.waitForTimeout(2000)

        let validItemNum = 1
        let counter = numOfItems

        while (counter > 0) {
            await this.btnAddToBasket.nth(validItemNum - 1).click()
            await this.lblAddBasketMsg.waitFor({ state: 'visible'})
            await this.page.waitForTimeout(1000)
            const msg = await this.lblAddBasketMsg.textContent()
            if (msg?.includes('Placed')) {
                console.log(`Item ${numOfItems - counter + 1} added to basket successfully`)
                counter--
                validItemNum++
            } else if (msg?.includes('We are out of stock!')) {
                console.log('Item is out of stock')
                validItemNum++
            } else {
                
            }
            // wait until msg is closed
            await this.closeMsg.click()
            await this.lblAddBasketMsg.waitFor({ state: 'hidden', timeout: 8000 })
        }
        await expect(this.lblBasketIconItems).toHaveText(numOfItems.toString())
    }


    async verifyBasketItems() {
        // Verify total price after increasing item
        await this.btnBasketIcon.click()
        let initialPrice = await this.getTotalPriceInBasket()
        await this.btnPlusItemsInBasket.first().click()
        let updatedPrice = await this.getTotalPriceInBasket()
        expect(updatedPrice, 'Verification of Total Price after increasing item').not.toEqual(initialPrice)

        // Verify total price after deleting item
        await this.btnDeleteItem.first().click()
        let updatedPrice2 = await this.getTotalPriceInBasket()
        expect(updatedPrice2, 'Verification of Total Price after deleting item').not.toEqual(updatedPrice)
        console.log('Basket items Prices verified successfully')
    }


    async getTotalPriceInBasket() {
        await this.page.waitForTimeout(1000)
        let totalPrice: any = await this.lblTotalPrice.textContent()
        totalPrice = parseFloat(totalPrice.match(/[\d.]+/)[0])
        return totalPrice
    }


    async addNewAddress(userAddressDetails) {
        await this.btnCheckout.click()
        await this.btnAddNewAddress.click()
        await this.txtCountry.fill(userAddressDetails.country)
        await this.txtName.fill(userAddressDetails.name)
        await this.txtMobileNo.fill(userAddressDetails.mobileNo)
        await this.txtZipCode.fill(userAddressDetails.zipCode)
        await this.txtAddress.fill(userAddressDetails.address)
        await this.txtCity.fill(userAddressDetails.city)
        await this.txtState.fill(userAddressDetails.state)
        await this.btnSubmitAddress.click()
        console.log('Address details filled successfully')
    }


    async chooseDeliveryOption() {
        await this.radioSelect.click()
        await this.btnContinueAddress.click()
        await this.radioSelect.click()
        await this.btnContinueDelivery.click()
        console.log('Delivery option selected successfully')
    }


    async addNewCard(userCardDetails) {
        await this.btnAddNewCard.click()
        await this.txtCardName.fill(userCardDetails.name)
        await this.txtCardNumber.fill(userCardDetails.cardNumber)
        await this.cmbCardExpiryMonth.selectOption({ label: userCardDetails.expiryMonth })
        await this.cmbCardExpiryYear.selectOption({ label: userCardDetails.expiryYear })
        await this.btnSubmitAddress.click()
        console.log('Card details filled successfully')
    }


    async choosePaymentOption() {
        await this.radioSelect.click()
        await this.btnContinueDelivery.click()
        console.log('Payment option selected successfully')
    }


    async completePurchase() {
        await this.btnCheckout.click()
        await expect(this.lblConfirmationMsg).toContainText('Thank you for your purchase!')
        console.log('Purchase completed successfully')
    }
} 