import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
    readonly deliveryAddressSection: Locator;
    readonly billingAddressSection: Locator;
    readonly commentTextArea: Locator;
    readonly placeOrderBtn: Locator;

    constructor(page: Page) {
        super(page);
        this.deliveryAddressSection = page.locator('#address_delivery');
        this.billingAddressSection = page.locator('#address_invoice');
        this.commentTextArea = page.locator('textarea[name="message"]');
        this.placeOrderBtn = page.locator('a[href="/payment"]');
    }

    async getDeliveryAddressLines(): Promise<string[]> {
        await this.deliveryAddressSection.waitFor({ state: 'visible', timeout: 10000 });
        const listItems = this.deliveryAddressSection.locator('li');
        const count = await listItems.count();
        const lines: string[] = [];
        for (let i = 0; i < count; i++) {
            const text = await listItems.nth(i).textContent();
            if (text) lines.push(text.trim());
        }
        return lines;
    }

    async getBillingAddressLines(): Promise<string[]> {
        await this.billingAddressSection.waitFor({ state: 'visible', timeout: 5000 });
        const listItems = this.billingAddressSection.locator('li');
        const count = await listItems.count();
        const lines: string[] = [];
        for (let i = 0; i < count; i++) {
            const text = await listItems.nth(i).textContent();
            if (text) lines.push(text.trim());
        }
        return lines;
    }

    async enterComment(comment: string): Promise<void> {
        await this.commentTextArea.fill(comment);
    }

    async clickPlaceOrder(): Promise<void> {
        await this.placeOrderBtn.scrollIntoViewIfNeeded();
        await this.placeOrderBtn.click({ force: true });
    }
}
