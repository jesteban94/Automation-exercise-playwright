import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
    readonly cartTable: Locator;
    readonly cartRows: Locator;
    readonly proceedToCheckoutBtn: Locator;
    readonly registerLoginModalLink: Locator;
    readonly emptyCartMessage: Locator;
    
    // Subscription locators
    readonly subscriptionEmailInput: Locator;
    readonly subscribeBtn: Locator;
    readonly subscriptionSuccessMsg: Locator;

    constructor(page: Page) {
        super(page);
        this.cartTable = page.locator('#cart_info_table');
        this.cartRows = page.locator('#cart_info_table tbody tr');
        this.proceedToCheckoutBtn = page.locator('a.check_out');
        this.registerLoginModalLink = page.locator('#checkoutModal a[href="/login"]');
        this.emptyCartMessage = page.locator('#empty_cart');
        
        this.subscriptionEmailInput = page.locator('#susbscribe_email');
        this.subscribeBtn = page.locator('#subscribe');
        this.subscriptionSuccessMsg = page.locator('#success-subscribe .alert-success');
    }

    async isCartPageDisplayed(): Promise<boolean> {
        try {
            await this.cartTable.waitFor({ state: 'visible', timeout: 5000 });
            return await this.cartTable.isVisible();
        } catch {
            return false;
        }
    }

    async clickProceedToCheckout(): Promise<void> {
        await this.proceedToCheckoutBtn.scrollIntoViewIfNeeded();
        await this.proceedToCheckoutBtn.click({ force: true });
    }

    async clickRegisterLoginOnModal(): Promise<void> {
        await this.registerLoginModalLink.waitFor({ state: 'visible', timeout: 5000 });
        await this.registerLoginModalLink.click();
    }

    async getCartProductsCount(): Promise<number> {
        try {
            await this.cartTable.waitFor({ state: 'visible', timeout: 2000 });
            return await this.cartRows.count();
        } catch {
            return 0;
        }
    }

    async getProductDetails(index: number) {
        const row = this.cartRows.nth(index);
        const name = await row.locator('.cart_description h4 a').textContent();
        const price = await row.locator('.cart_price p').textContent();
        const quantity = await row.locator('.cart_quantity button').textContent();
        const total = await row.locator('.cart_total p').textContent();
        return {
            name: name?.trim() || '',
            price: price?.trim() || '',
            quantity: quantity?.trim() || '',
            total: total?.trim() || ''
        };
    }

    async removeProduct(index: number): Promise<void> {
        const row = this.cartRows.nth(index);
        const deleteBtn = row.locator('.cart_quantity_delete');
        await deleteBtn.click();
    }

    async subscribe(email: string): Promise<void> {
        await this.subscriptionEmailInput.scrollIntoViewIfNeeded();
        await this.subscriptionEmailInput.fill(email);
        await this.subscribeBtn.click();
    }

    async getSubscriptionSuccessMessage(): Promise<string | null> {
        await this.subscriptionSuccessMsg.waitFor({ state: 'visible', timeout: 5000 });
        return await this.subscriptionSuccessMsg.textContent();
    }
}
