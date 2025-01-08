import { expect, Locator, Page } from "@playwright/test";


export class LoginPage {
    private page: Page

    constructor(page: Page) {
        this.page = page
    }

    // Locators
    private get btnAccount() { return this.page.locator('#navbarAccount') }
    private get btnAccountLogin() { return this.page.locator('#navbarLoginButton') }
    private get linkNewCustomer() { return this.page.locator('#newCustomerLink a') }
    private get txtEmail() { return this.page.locator('#emailControl') }
    private get txtPwd() { return this.page.locator('#passwordControl') }
    private get txtRepeatPwd() { return this.page.locator('#repeatPasswordControl') }
    private get cmbSecurityQstn() { return this.page.locator('[name="securityQuestion"]') }
    private get txtSecurityAnswer() { return this.page.locator('#securityAnswerControl') }

    private get lblErrEmail() { return this.page.locator('//*[@id="emailControl"]/ancestor::div[contains(@class, "mat-form-field-flex")]/following-sibling::div//mat-error') }
    private get lblErrPwd() { return this.page.locator('//*[@id="passwordControl"]/ancestor::div[contains(@class, "mat-form-field-flex")]/following-sibling::div//mat-error') }
    private get lblErrRepeatPwd() { return this.page.locator('//*[@id="repeatPasswordControl"]/ancestor::div[contains(@class, "mat-form-field-flex")]/following-sibling::div//mat-error') }
    private get lblErrSecurityQstn() { return this.page.locator('//*[@name="securityQuestion"]/ancestor::div[contains(@class, "mat-form-field-flex")]/following-sibling::div//mat-error') }
    private get lblErrSecurityAnswer() { return this.page.locator('//*[@id="repeatPasswordControl"]/ancestor::div[contains(@class, "mat-form-field-flex")]/following-sibling::div//mat-error') }


} 