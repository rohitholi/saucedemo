import { Locator, Page } from "@playwright/test";
import { TIMEOUT } from "node:dns";

export class Inventory 
{
    readonly page:Page
    readonly inventoryOptions:Locator
    readonly addToCart:Locator
    readonly sauceLabsBackpack:Locator


    constructor(page:Page) 
    {
        this.page=page;
        this.inventoryOptions = page.locator(".inventory_item")
        this.addToCart = page.getByRole('button', { name: 'Add to cart' })
        this.sauceLabsBackpack = page.getByText('Sauce Labs Backpack')
    }

    async clickAddToCart(inventoryOption:string) 
    {
       await this.inventoryOptions.filter({ hasText: inventoryOption }).first().getByRole('button', { name: 'Add to cart' }).click()
    }

        async removeFromCart(inventoryOption:string) 
    {
       await this.inventoryOptions.filter({ hasText: inventoryOption }).first().getByRole('button', { name: 'Remove' }).click()
    }

    async sauceLabsBackpackOption()
    {
        return await this.sauceLabsBackpack;
    }
}