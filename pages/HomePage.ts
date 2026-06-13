import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
    readonly signupLoginLink: Locator;
    readonly productsLink: Locator;
    readonly cartLink: Locator;
    readonly contactUsLink: Locator;
    readonly loggedInAsUserText: Locator;
    readonly logoutLink: Locator;
    readonly deleteAccountLink: Locator;

    constructor(page: Page) {
        super(page);
        this.signupLoginLink = page.locator('a[href="/login"]');
        this.productsLink = page.locator('a[href="/products"]');
        this.cartLink = page.locator('a[href="/view_cart"]');
        this.contactUsLink = page.locator('a[href="/contact_us"]');
        this.loggedInAsUserText = page.locator('li:has(i.fa-user)');
        this.logoutLink = page.locator('a[href="/logout"]');
        this.deleteAccountLink = page.locator('a[href="/delete_account"]');
    }

    async navigateToHome(): Promise<void> {
        await this.navigateTo('https://automationexercise.com/');
    }

    async clickSignupLogin(): Promise<void> {
        await this.signupLoginLink.click();
    }

    async clickProducts(): Promise<void> {
        await this.productsLink.click();
    }

    async clickCart(): Promise<void> {
        await this.cartLink.click();
    }

    async clickLogout(): Promise<void> {
        await this.logoutLink.click();
    }

    async clickDeleteAccount(): Promise<void> {
        await this.deleteAccountLink.click();
    }

    async isLoggedInAs(username: string): Promise<boolean> {
        await this.loggedInAsUserText.waitFor({ state: 'visible' });
        const text = await this.loggedInAsUserText.textContent();
        return text ? text.includes(username) : false;
    }
}
