import { Locator, Page } from "@playwright/test";

export class Login
{
    readonly page:Page
    readonly username:Locator
    readonly password:Locator
    readonly loginn:Locator

    constructor(page:Page)
    {
        this.page=page;
        this.username=page.getByPlaceholder('Username')
        this.password=page.getByPlaceholder('Password')
        this.loginn=page.getByRole('button',{name:'Login'})
       
    }

    async login(user: string, pass: string) {
    await this.username.fill(user);
    await this.password.fill(pass);
    await this.loginn.click();
  }
}