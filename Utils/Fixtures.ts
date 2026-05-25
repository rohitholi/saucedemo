import { test as base, expect } from '@playwright/test';
import { DataProvider } from './TestDataReader';
import { Login } from '../pages/login';
import { Inventory } from '../pages/inventory';
import { CartPage } from '../pages/shopping';

type MyFixtures = {
    login: Login;
    inventory: Inventory;
    cart: CartPage;
    userData: any;
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
    }
});

export { expect }; 