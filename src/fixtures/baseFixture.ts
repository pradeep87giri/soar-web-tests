
import { test as baseTest } from '@playwright/test';
import { ProductPage } from "../pages/productPage";

const test = baseTest.extend<{
    productPage: ProductPage
}>({
    productPage: async ({ page }, use) => {
        await use(new ProductPage(page))
    }
})

export default test;
export const expect = test.expect;