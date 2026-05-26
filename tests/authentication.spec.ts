import { test, expect } from '../Utils/Fixtures.ts';

test.describe('Authentication Tests', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });
    
    test('Login with valid credentials',{ tag: ['@P0'] }, async ({ page, login, userData }) => {
        
        page.on('dialog', async dialog => { dialog.accept() });
        await login.login(userData.validUser.username, userData.validUser.password);
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');  
    })

    test('Login with locked-out user', { tag: ['@P1'] }, async ({ page, login, userData }) => {
        await login.login(userData.lockedUser.username, userData.lockedUser.password);
        await expect(page.getByRole('heading',{level: 3})).toHaveText('Epic sadface: Sorry, this user has been locked out.');
    })

        test('Login with invalid credentials',{ tag: ['@P1'] } ,async ({ page, login, userData }) => {
        await login.login(userData.errorUser.username, userData.errorUser.password);
        await expect(page.getByRole('heading',{level: 3})).toHaveText("Epic sadface: Username and password do not match any user in this service");
    })

       test('Logout functionality', { tag: ['@P1'] }, async ({ page, login, userData }) => {
        
        page.on('dialog', async dialog => { dialog.accept() });
        await login.login(userData.validUser.username, userData.validUser.password);
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');  
        page.getByRole('button', { name: 'Open Menu' }).click();
        page.getByRole('link', { name: 'Logout' }).click();
        await expect(page).toHaveURL('https://www.saucedemo.com/'); 
    })

    test('Session persistence on refresh', { tag: ['@P2'] }, async ({ page, login, userData }) => {
       await page.reload({timeout: 5000});
        await expect(page).toHaveURL('https://www.saucedemo.com/'); 
    })
});