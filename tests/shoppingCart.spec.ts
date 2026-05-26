import {test, expect} from '../Utils/Fixtures.ts';

test.describe('Shopping Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('Add one items to cart and verify cart count',{ tag: ['@P0'] }, async ({ page, login, inventory, userData }) => {
        page.on('dialog', async dialog => { dialog.accept() });
        await login.login(userData.validUser.username, userData.validUser.password);
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');  
        inventory.clickAddToCart('Sauce Labs Backpack');
        await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
    })  

   test('Add all items to cart and verify cart count',{ tag: ['@P0'] }, async ({ page, login, inventory, userData }) => {
        page.on('dialog', async dialog => { dialog.accept() });
        await login.login(userData.validUser.username, userData.validUser.password);
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');  
        let cartItems:string [] =['Sauce Labs Backpack','Sauce Labs Bike Light','Sauce Labs Bolt T-Shirt','Sauce Labs Fleece Jacket','Sauce Labs Onesie','Test.allTheThings() T-Shirt (Red)']
        for (const item of cartItems) {
            await inventory.clickAddToCart(item);
        }   
        const totalItemsInCart = cartItems.length
        await expect(page.locator('.shopping_cart_badge')).toHaveText(totalItemsInCart.toString());
    })

        test('Add and remove from cart and verify cart count', { tag: ['@P1'] }, async ({ page, login, inventory, userData }) => {
        page.on('dialog', async dialog => { dialog.accept() });
        await login.login(userData.validUser.username, userData.validUser.password);
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');  
        inventory.clickAddToCart('Sauce Labs Backpack');
        await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
        await inventory.removeFromCart('Sauce Labs Backpack');
        await expect(page.locator('.shopping_cart_badge')).not.toBeVisible();
    }) 

        test('Add one items to cart and remove from cart page', { tag: ['@P1'] }, async ({ page, login, inventory, userData }) => {
        page.on('dialog', async dialog => { dialog.accept() });
        await login.login(userData.validUser.username, userData.validUser.password);
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');  
        inventory.clickAddToCart('Sauce Labs Backpack');
        await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
        (await inventory.sauceLabsBackpackOption()).click();
        await page.getByRole('button', { name: 'Remove' }).click();
        await expect(page.locator('.shopping_cart_badge')).not.toBeVisible();
 })  

     test('Continue Shopping Flow', { tag: ['@P2'] }, async ({ page, login, inventory, userData,cart }) => {
        page.on('dialog', async dialog => { dialog.accept() });
        await login.login(userData.validUser.username, userData.validUser.password);
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');  
        inventory.clickAddToCart('Sauce Labs Backpack');
        await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
        await page.locator('.shopping_cart_badge').click();
        await cart.clickContinueShopping();
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');  

        })  
  })