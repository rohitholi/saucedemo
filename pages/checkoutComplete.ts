import { Locator, Page } from "@playwright/test";

export class CheckoutCompletePage
{
    readonly page:Page
    readonly goHomeButton:Locator
    readonly checkoutCompleteHeader:Locator

    constructor(page:Page)
    {
        this.page=page;
        this.goHomeButton = page.getByRole('button', { name: 'Back Home' })
        this.checkoutCompleteHeader = page.locator('.complete-header')
    }   

    async clickGoHome()
    {
        return await this.goHomeButton.click();
    }

    async getCheckoutCompleteHeader()
    {
        return await this.checkoutCompleteHeader.textContent();
    }   
}