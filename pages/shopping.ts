import { Locator, Page } from "@playwright/test";

export class CartPage
{
    readonly page:Page
    readonly continueShopping:Locator

    constructor(page:Page)
    {
        this.page=page;
        this.continueShopping = page.getByRole('button', { name: 'Continue Shopping' })
    }       

    async clickContinueShopping()
    {
         return await this.continueShopping.click();
    }

}