
import { test as baseTest } from '@playwright/test';
import { ProductPage } from "../pages/productPage";
import { LoginPage } from '../pages/loginPage';

const test = baseTest.extend<{
    productPage: ProductPage
    loginPage: LoginPage
}>({
    productPage: async ({ page }, use) => {
        await use(new ProductPage(page))
    },
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page))
    }
})

export default test;
export const expect = test.expect;