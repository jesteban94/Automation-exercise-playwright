import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductDetailPage extends BasePage {
    readonly productName: Locator;
    readonly category: Locator;
    readonly price: Locator;
    readonly availability: Locator;
    readonly condition: Locator;
    readonly brand: Locator;

    // Quantity / Cart
    readonly quantityInput: Locator;
    readonly addToCartBtn: Locator;

    // Review Form
    readonly reviewHeader: Locator;
    readonly reviewNameInput: Locator;
    readonly reviewEmailInput: Locator;
    readonly reviewTextArea: Locator;
    readonly submitReviewBtn: Locator;
    readonly reviewSuccessMsg: Locator;

    constructor(page: Page) {
        super(page);
        this.productName = page.locator('.product-information h2');
        this.category = page.locator('.product-information p:has-text("Category:")');
        this.price = page.locator('.product-information span > span');
        this.availability = page.locator('.product-information p:has-text("Availability:")');
        this.condition = page.locator('.product-information p:has-text("Condition:")');
        this.brand = page.locator('.product-information p:has-text("Brand:")');

        this.quantityInput = page.locator('input#quantity');
        this.addToCartBtn = page.locator('button.cart');

        this.reviewHeader = page.locator('li.active a[href="#reviews"]');
        this.reviewNameInput = page.locator('input#name');
        this.reviewEmailInput = page.locator('input#email');
        this.reviewTextArea = page.locator('textarea#review');
        this.submitReviewBtn = page.locator('button#button-review');
        this.reviewSuccessMsg = page.locator('#review-section .alert-success, span:has-text("Thank you for your review.")');
    }

    async waitProductDetailsLoaded(): Promise<void> {
        await this.productName.waitFor({ state: 'visible', timeout: 5000 });
    }

    async getProductDetails() {
        await this.waitProductDetailsLoaded();
        return {
            name: await this.productName.textContent(),
            category: await this.category.textContent(),
            price: await this.price.textContent(),
            availability: await this.availability.textContent(),
            condition: await this.condition.textContent(),
            brand: await this.brand.textContent()
        };
    }

    async setQuantity(qty: string): Promise<void> {
        await this.quantityInput.fill(qty);
    }

    async clickAddToCart(): Promise<void> {
        await this.addToCartBtn.click();
    }

    async isReviewHeaderVisible(): Promise<boolean> {
        try {
            await this.reviewHeader.waitFor({ state: 'visible', timeout: 5000 });
            return await this.reviewHeader.isVisible();
        } catch {
            return false;
        }
    }

    async fillReview(name: string, email: string, reviewText: string): Promise<void> {
        await this.reviewNameInput.fill(name);
        await this.reviewEmailInput.fill(email);
        await this.reviewTextArea.fill(reviewText);
    }

    async submitReview(): Promise<void> {
        await this.submitReviewBtn.scrollIntoViewIfNeeded();
        await this.submitReviewBtn.click();
    }

    async getReviewSuccessMessage(): Promise<string | null> {
        await this.reviewSuccessMsg.first().waitFor({ state: 'visible', timeout: 5000 });
        return await this.reviewSuccessMsg.first().textContent();
    }
}
