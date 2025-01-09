import { expect, Locator, Page } from "@playwright/test";


export class LoginPage {
    private page: Page

    constructor(page: Page) {
        this.page = page
    }

    // Locators
    private get txtEmail() { return this.page.locator('#emailControl') }
    private get txtPwd() { return this.page.locator('#passwordControl') }
    private get txtRepeatPwd() { return this.page.locator('#repeatPasswordControl') }
    private get cmbSecurityQstn() { return this.page.locator('[name="securityQuestion"]') }
    private get txtSecurityAnswer() { return this.page.locator('#securityAnswerControl') }
    private get lblErrEmail() { return this.page.locator('//*[@id="emailControl"]/ancestor::div[contains(@class, "mat-form-field-flex")]/following-sibling::div//mat-error') }
    private get lblErrPwd() { return this.page.locator('//*[@id="passwordControl"]/ancestor::div[contains(@class, "mat-form-field-flex")]/following-sibling::div//mat-error') }
    private get lblErrRepeatPwd() { return this.page.locator('//*[@id="repeatPasswordControl"]/ancestor::div[contains(@class, "mat-form-field-flex")]/following-sibling::div//mat-error') }
    private get lblErrSecurityQstn() { return this.page.locator('//*[@name="securityQuestion"]/ancestor::div[contains(@class, "mat-form-field-flex")]/following-sibling::div//mat-error') }
    private get lblErrSecurityAnswer() { return this.page.locator('//*[@id="securityAnswerControl"]/ancestor::div[contains(@class, "mat-form-field-flex")]/following-sibling::div//mat-error') }
    private get lblUserRegistration() { return this.page.getByText('User Registration') }
    private get btnShowPwdAdvice() { return this.page.locator('.mat-slide-toggle-bar') }
    private get lblSuccessIcons() { return this.page.locator('.mat-card mat-icon') }
    private get btnRegister() { return this.page.locator('#registerButton') }
    private get lblSuccessMsg() { return this.page.locator('.mat-simple-snack-bar-content') }
    private get txtEmailLogin() { return this.page.locator('#email') }
    private get txtPwdLogin() { return this.page.locator('#password') }
    private get btnLogin() { return this.page.locator('#loginButton') }


    async validateLoginErrorMsgs() {
        await this.txtEmail.click()
        await this.lblUserRegistration.click()
        expect(await this.lblErrEmail.textContent(), 'Verification of Email Field blank error').toContain('Please provide an email address.')
        await this.txtPwd.click()
        await this.lblUserRegistration.click()
        expect(await this.lblErrPwd.textContent(), 'Verification of Password Field blank error').toContain('Please provide a password.')
        await this.txtRepeatPwd.click()
        await this.lblUserRegistration.click()
        expect(await this.lblErrRepeatPwd.textContent(), 'Verification of Repeat Password Field blank error').toContain('Please repeat your password.')
        await this.cmbSecurityQstn.click()
        await this.txtSecurityAnswer.press('Escape')
        await this.lblUserRegistration.click()
        await this.txtSecurityAnswer.press('Escape')
        expect(await this.lblErrSecurityQstn.textContent(), 'Verification of Security Question Field blank error').toContain('Please select a security question.')
        await this.txtSecurityAnswer.click()
        await this.lblUserRegistration.click()
        expect(await this.lblErrSecurityAnswer.textContent(), 'Verification of Security Answer Field blank error').toContain('Please provide an answer to your security question.')
        console.log('Validation of Registration Error Messages Completed')
    }


    async newUserRegistration(userData) {
        await this.txtEmail.fill(userData.email)
        await this.txtPwd.fill(userData.password)
        await this.txtRepeatPwd.fill(userData.password)
        await this.cmbSecurityQstn.click()
        await this.page.getByText(userData.securityQuestion).click()
        await this.txtSecurityAnswer.fill(userData.securityAnswer)
        await this.btnShowPwdAdvice.click()
        // Wait for the password advices to be displayed
        while (await this.lblSuccessIcons.count() !== 5) {
            await this.page.waitForTimeout(500)
        }
        await this.btnRegister.click()
    }


    async verifyUserRegistration() {
        expect(await this.lblSuccessMsg.textContent(), 'Verification of Registration Success Message').toContain('Registration completed successfully. You can now log in.')
        console.log('New User Registered Successfully')
    }


    async userLogin(email, password) {
        await this.txtEmailLogin.fill(email)
        await this.txtPwdLogin.fill(password)
        await this.btnLogin.click()
        expect(await this.page.title(), 'Verification of User Login').toContain('OWASP Juice Shop')
        console.log(`User ${email} Logged in Successfully`)
    }
} 