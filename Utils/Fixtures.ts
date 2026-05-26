import { test as base, expect } from '@playwright/test';
import { DataProvider } from './TestDataReader';
import { Login } from '../pages/login';
import { Inventory } from '../pages/inventory';
import { CartPage } from '../pages/shopping';
import { CheckoutPage } from '../pages/checkout';
import { CheckoutCompletePage } from '../pages/checkoutComplete';
import { FooterLinks } from '../pages/footerLinks';

type MyFixtures = {
    login: Login;
    inventory: Inventory;
    cart: CartPage;
    checkout: CheckoutPage;
    checkoutComplete: CheckoutCompletePage;
    userData: any;
    footerLinks: FooterLinks;
};

export const test = base.extend<MyFixtures>({
    login: async ({ page },use) => {
        const loginPage = new Login(page);
        await use(loginPage);
    },
    inventory: async ({ page }, use) => {
        const inventoryPage = new Inventory(page);
        await use(inventoryPage);
    },
    userData: async ({ }, use: (value: any) => Promise<void>) => {
        const data = DataProvider.getTestDataFromJson('user.json');
        await use(data);
    },

    cart: async ({ page }, use) => {
        const cartPage = new CartPage(page);
        await use(cartPage);
    },
    checkout: async ({ page }, use) => {
        const checkoutPage = new CheckoutPage(page);
        await use(checkoutPage);
    },
    checkoutComplete: async ({ page }, use) => {
        const checkoutCompletePage = new CheckoutCompletePage(page);
        await use(checkoutCompletePage);
    },
    footerLinks: async ({ page }, use) => {
        const footerLinks = new FooterLinks(page);
        await use(footerLinks);
    }
});

export { expect }; 