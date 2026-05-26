import { test, expect } from '../Utils/Fixtures';

test.describe('Checkout Page Tests', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('should allow user to enter checkout information and continue',{ tag: ['@P0'] }, async ({ page, login, inventory, cart, checkout, userData }) => {        
        page.on('dialog', async dialog => { dialog.accept() });
        await login.login(userData.validUser.username, userData.validUser.password);
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');  
        inventory.clickAddToCart('Sauce Labs Backpack');
        await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
        await page.locator('.shopping_cart_badge').click();
        await cart.clickCheckout();
        await checkout.enterFirstName('John');
        await checkout.enterLastName('Doe');
        await checkout.enterPostalCode('12345');
        await checkout.clickContinue();
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');  
        await checkout.clickFinish();
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-complete.html');  
    });

    test('Cancel checkout at Step 1',{ tag: ['@P2'] }, async ({ page, login, inventory, cart, checkout, userData }) => {        
        page.on('dialog', async dialog => { dialog.accept() });
        await login.login(userData.validUser.username, userData.validUser.password);
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');  
        inventory.clickAddToCart('Sauce Labs Backpack');
        await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
        await page.locator('.shopping_cart_badge').click();
        await cart.clickCheckout();
        await checkout.clickCancel();
        await expect(page).toHaveURL('https://www.saucedemo.com/cart.html'); 
    });

    test('Should display error message when First Name is not entered',{ tag: ['@P1'] }, async ({ page, login, inventory, cart, checkout, userData }) => {        
        page.on('dialog', async dialog => { dialog.accept() });
        await login.login(userData.validUser.username, userData.validUser.password);
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');  
        inventory.clickAddToCart('Sauce Labs Backpack');
        await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
        await page.locator('.shopping_cart_badge').click();
        await cart.clickCheckout();
        await checkout.clickContinue();
        expect((await checkout.getFirstNameErrorMessage()).toString()).toBe('Error: First Name is required');
 
    });

    test('Should display error message when Last Name is not entered',{ tag: ['@P1'] }, async ({ page, login, inventory, cart, checkout, userData }) => {        
        page.on('dialog', async dialog => { dialog.accept() });
        await login.login(userData.validUser.username, userData.validUser.password);
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');  
        inventory.clickAddToCart('Sauce Labs Backpack');
        await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
        await page.locator('.shopping_cart_badge').click();
        await cart.clickCheckout();
        await checkout.enterFirstName('John');
        await checkout.clickContinue();
        expect((await checkout.getLastNameErrorMessage()).toString()).toBe('Error: Last Name is required');
 
    });

        test('Should display error message when Postal Code is not entered',{ tag: ['@P1'] }, async ({ page, login, inventory, cart, checkout, userData }) => {        
        page.on('dialog', async dialog => { dialog.accept() });
        await login.login(userData.validUser.username, userData.validUser.password);
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');  
        inventory.clickAddToCart('Sauce Labs Backpack');
        await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
        await page.locator('.shopping_cart_badge').click();
        await cart.clickCheckout();
        await checkout.enterFirstName('John');
        await checkout.enterLastName('Doe');
        await checkout.clickContinue();
        expect((await checkout.getPostalCodeErrorMessage()).toString()).toBe('Error: Postal Code is required');
 
    });

        test('Verify Overview total', { tag: ['@P0'] }, async ({ page, login, inventory, cart, checkout, userData }) => {        
        page.on('dialog', async dialog => { dialog.accept() });
        await login.login(userData.validUser.username, userData.validUser.password);
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');  
        inventory.clickAddToCart('Sauce Labs Backpack');
        await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
        await page.locator('.shopping_cart_badge').click();
        await cart.clickCheckout();
        await checkout.enterFirstName('John');
        await checkout.enterLastName('Doe');
        await checkout.enterPostalCode('12345');
        await checkout.clickContinue();

       const itemTotal = await checkout.getItemTotal();
       const tax = await checkout.getTax();
       const total = await checkout.getTotal();

// Defensive check: If they are null (not found even after waiting), fail clearly.
if (!itemTotal || !tax || !total) {
  throw new Error('Checkout values are missing from the page.');
}

// No [0] needed anymore, just standard string manipulation
const calculatedTotal = parseFloat(itemTotal.replace('Item total: $', '')) + 
                        parseFloat(tax.replace('Tax: $', ''));

expect(parseFloat(total.replace('Total: $', ''))).toBeCloseTo(calculatedTotal, 2);

        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');  
        await checkout.clickFinish();
await expect(page).toHaveURL('https://www.saucedemo.com/checkout-complete.html');  
    });

        test('Finish page return to inventory', { tag: ['@P1'] }, async ({ page, login, inventory, cart, checkout, userData,checkoutComplete }) => {        
        page.on('dialog', async dialog => { dialog.accept() });
        await login.login(userData.validUser.username, userData.validUser.password);
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');  
        inventory.clickAddToCart('Sauce Labs Backpack');
        await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
        await page.locator('.shopping_cart_badge').click();
        await cart.clickCheckout();
        await checkout.enterFirstName('John');
        await checkout.enterLastName('Doe');
        await checkout.enterPostalCode('12345');
        await checkout.clickContinue();
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');  
        await checkout.clickFinish();
        await expect(await checkoutComplete.getCheckoutCompleteHeader()).toBe('Thank you for your order!');
        await checkoutComplete.clickGoHome();
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');  
    });
});