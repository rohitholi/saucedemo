import { Locator, Page } from "@playwright/test";

export class CartPage
{
    readonly page:Page
    readonly continueShopping:Locator
    readonly checkout:Locator

    constructor(page:Page)
    {
        this.page=page;
        this.continueShopping = page.getByRole('button', { name: 'Continue Shopping' })
        this.checkout = page.getByRole('button', { name: 'Checkout' })
    }       

    async clickContinueShopping()
    {
         return await this.continueShopping.click();
    }

    async clickCheckout()
    {
        return await this.checkout.click();
    }

}