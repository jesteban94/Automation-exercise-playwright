import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class PaymentPage extends BasePage {
    readonly nameOnCardInput: Locator;
    readonly cardNumberInput: Locator;
    readonly cvcInput: Locator;
    readonly expiryMonthInput: Locator;
    readonly expiryYearInput: Locator;
    readonly payAndConfirmBtn: Locator;

    // Success elements (Payment Done)
    readonly orderPlacedHeader: Locator;
    readonly downloadInvoiceBtn: Locator;
    readonly continueBtn: Locator;

    constructor(page: Page) {
        super(page);
        this.nameOnCardInput = page.locator('input[data-qa="name-on-card"]');
        this.cardNumberInput = page.locator('input[data-qa="card-number"]');
        this.cvcInput = page.locator('input[data-qa="cvc"]');
        this.expiryMonthInput = page.locator('input[data-qa="expiry-month"]');
        this.expiryYearInput = page.locator('input[data-qa="expiry-year"]');
        this.payAndConfirmBtn = page.locator('button[data-qa="pay-button"]');

        this.orderPlacedHeader = page.locator('h2[data-qa="order-placed"]');
        this.downloadInvoiceBtn = page.locator('a:has-text("Download Invoice")');
        this.continueBtn = page.locator('a[data-qa="continue-button"]');
    }

    async fillPaymentDetails(name: string, number: string, cvc: string, month: string, year: string): Promise<void> {
        await this.nameOnCardInput.fill(name);
        await this.cardNumberInput.fill(number);
        await this.cvcInput.fill(cvc);
        await this.expiryMonthInput.fill(month);
        await this.expiryYearInput.fill(year);
    }

    async clickPayAndConfirm(): Promise<void> {
        await this.payAndConfirmBtn.click();
    }

    async isOrderPlacedVisible(): Promise<boolean> {
        try {
            await this.orderPlacedHeader.waitFor({ state: 'visible', timeout: 5000 });
            return await this.orderPlacedHeader.isVisible();
        } catch {
            return false;
        }
    }

    async downloadInvoice(): Promise<string> {
        await this.downloadInvoiceBtn.waitFor({ state: 'visible', timeout: 5000 });
        const downloadPromise = this.page.waitForEvent('download');
        await this.downloadInvoiceBtn.click();
        const download = await downloadPromise;
        // Wait for the download process to complete and return the path
        const path = await download.path();
        return path || '';
    }

    async clickContinue(): Promise<void> {
        await this.continueBtn.click();
    }
}
