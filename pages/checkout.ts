import { Locator, Page } from "@playwright/test";

export class CheckoutPage
{
    readonly page:Page  
    readonly firstName:Locator
    readonly lastName:Locator
    readonly postalCode:Locator
    readonly continueButton:Locator
    readonly cancelButton:Locator
    readonly finishButton:Locator
    readonly firstNameerrorMessage:Locator
    readonly lastNameErrorMessage:Locator
    readonly postalCodeErrorMessage:Locator
    readonly itemTotal:Locator
    readonly tax:Locator
    readonly total:Locator

    constructor(page:Page)
    {
        this.page=page;
        this.firstName = page.getByPlaceholder('First Name')
        this.lastName = page.getByPlaceholder('Last Name')
        this.postalCode = page.getByPlaceholder('Zip/Postal Code')
        this.continueButton = page.getByRole('button', { name: 'Continue' })
        this.cancelButton = page.getByRole('button', { name: 'Cancel' })
        this.finishButton = page.getByRole('button', { name: 'Finish' })
        this.firstNameerrorMessage = page.locator('.error-message-container')
        this.lastNameErrorMessage = page.locator('.error-message-container')
        this.postalCodeErrorMessage = page.locator('.error-message-container')
        this.itemTotal = page.locator('.summary_subtotal_label')
        this.tax = page.locator('.summary_tax_label')
        this.total = page.locator('.summary_total_label')
    }   

    async enterFirstName(firstName:string)
    {
        return await this.firstName.fill(firstName);
    }   

    async enterLastName(lastName:string)
    {
        return await this.lastName.fill(lastName);
    }

    async enterPostalCode(postalCode:string)
    {
        return await this.postalCode.fill(postalCode);
    }

    async clickContinue()
    {
        return await this.continueButton.click();
    }   

    async clickCancel()
    {
        return await this.cancelButton.click();
    }

    async clickFinish()
    {
        return await this.finishButton.click();
    }

    async getFirstNameErrorMessage()
    {
        return await this.firstNameerrorMessage.allTextContents();
    }

    async getLastNameErrorMessage()
    {
        return await this.lastNameErrorMessage.allTextContents();
    }

    async getPostalCodeErrorMessage()
    {
        return await this.postalCodeErrorMessage.allTextContents();
    }

    async getItemTotal()
    {
        return await this.itemTotal.innerText();
    }   

    async getTax()
    {
        return await this.tax.innerText();
    }

    async getTotal()
    {
        return await this.total.innerText();
    }

}