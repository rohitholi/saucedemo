import {test,expect} from '../Utils/Fixtures.ts';

test.describe('Inventory Tests', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    }); 

    test('All 6 products are displayed', async ({ page, login, inventory, userData }) =>
         {
    page.on('dialog', async dialog => { dialog.accept() });
    await login.login(userData.validUser.username, userData.validUser.password);
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');  
    await expect(inventory.inventoryOptions).toHaveCount(6);
    })

    test('Sort products by Name (A to Z)', async ({ page, login, inventory, userData }) =>
    {
    page.on('dialog', async dialog => { dialog.accept() });
    await login.login(userData.validUser.username, userData.validUser.password);
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');  
    await expect((await inventory.inventoryOptions.locator('.inventory_item_name').allInnerTexts()).sort()).toEqual([ 'Sauce Labs Backpack', 'Sauce Labs Bike Light', 'Sauce Labs Bolt T-Shirt','Sauce Labs Fleece Jacket','Sauce Labs Onesie','Test.allTheThings() T-Shirt (Red)']); })


    test('Sort products by Price (Low to High)', async ({ page, login, inventory, userData }) =>
    {
    page.on('dialog', async dialog => { dialog.accept() });
    await login.login(userData.validUser.username, userData.validUser.password);
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');  
    await page.locator(".product_sort_container").selectOption('Price (low to high)');
    await expect((await inventory.inventoryOptions.locator('.inventory_item_price').allTextContents())).toEqual(['$7.99', '$9.99', '$15.99', '$15.99', '$29.99', '$49.99']); })

 
     test('Product detail page validation', async ({ page, login, inventory, userData }) =>
    {
    page.on('dialog', async dialog => { dialog.accept() });
    await login.login(userData.validUser.username, userData.validUser.password);
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');  
    await inventory.inventoryOptions.locator('.inventory_item_name').filter({ hasText: 'Sauce Labs Backpack' }).first().click()
    await expect(page.locator('.inventory_details_name.large_size')).toHaveText('Sauce Labs Backpack');
    await expect(page.locator('.inventory_details_desc')).toHaveText('carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.');
    await expect(page.locator('.inventory_details_price')).toHaveText('$29.99');
    })


   test('Add item to cart', async ({ page, login, inventory, userData }) => {
    page.on('dialog', async dialog => { dialog.accept() });
    await login.login(userData.validUser.username, userData.validUser.password);
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');  
    inventory.clickAddToCart('Sauce Labs Backpack');
    await expect(page.getByRole('button', { name: 'Remove' })).toBeVisible();
})

})