import { Locator, Page } from "@playwright/test";

export class Inventory 
{
    readonly page:Page
    readonly inventoryOptions:Locator
    readonly addToCart:Locator



    constructor(page:Page) 
    {
        this.page=page;
        this.inventoryOptions = page.locator(".inventory_item")
        this.addToCart = page.getByRole('button', { name: 'Add to cart' })
    }

    async clickAddToCart(inventoryOption:string) 
    {
       await this.inventoryOptions.filter({ hasText: inventoryOption }).first().getByRole('button', { name: 'Add to cart' }).click()
    }
}