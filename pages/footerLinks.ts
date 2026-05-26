import { Page,Locator } from '@playwright/test';

export class FooterLinks {
     readonly page: Page;
     readonly twitterLink: Locator;
     readonly facebookLink: Locator;
     readonly linkedInLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.twitterLink = page.locator('[data-test="social-twitter"]');
        this.facebookLink = page.locator('[data-test="social-facebook"]');
        this.linkedInLink = page.locator('[data-test="social-linkedin"]');
    }

    async clickTwitterLink() {
        await this.twitterLink.click();
    }

    async clickFacebookLink() {
        await this.facebookLink.click();
    }

    async clickLinkedInLink() {
        await this.linkedInLink.click();
    }
}