import {test, expect} from '../Utils/Fixtures';

test.describe('Footer Tests', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });     

    test('Verify footer content on inventory page',{ tag: ['@P2'] }, async ({ page, login, userData }) => {
        page.on('dialog', async dialog => { dialog.accept() });
        await login.login(userData.validUser.username, userData.validUser.password);
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');  
        const footer = page.locator('.footer'); 
        await expect(footer).toBeVisible();
        await expect(footer.locator('.social_twitter')).toBeVisible();
        await expect(footer.locator('.social_facebook')).toBeVisible();
        await expect(footer.locator('.social_linkedin')).toBeVisible();
        await expect(footer.locator('.footer_copy')).toHaveText('© 2026 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy');
    });

    test('Verify footer links open correct pages',{ tag: ['@P2'] }, async ({ page, login, userData, footerLinks }) => {
        page.on('dialog', async dialog => { dialog.accept() });
        await login.login(userData.validUser.username, userData.validUser.password);
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');  
        const [twitterPage] = await Promise.all([
            page.waitForEvent('popup'),
            footerLinks.clickTwitterLink()
        ]);
        await expect(twitterPage).toHaveURL('https://x.com/saucelabs');
        await twitterPage.close();  
        const [facebookPage] = await Promise.all([
            page.waitForEvent('popup'),
            footerLinks.clickFacebookLink()
        ]);
        await expect(facebookPage).toHaveURL('https://www.facebook.com/saucelabs');
        await facebookPage.close();  
        const [linkedInPage] = await Promise.all([
            page.waitForEvent('popup'),
            footerLinks.clickLinkedInLink()
        ]);
        await expect(linkedInPage).toHaveURL('https://www.linkedin.com/company/sauce-labs/');
        await linkedInPage.close();  
    });
})