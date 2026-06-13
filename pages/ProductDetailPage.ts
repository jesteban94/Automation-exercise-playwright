import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductDetailPage extends BasePage {
    readonly productName: Locator;
    readonly category: Locator;
    readonly price: Locator;
    readonly availability: Locator;
    readonly condition: Locator;
    readonly brand: Locator;

    constructor(page: Page) {
        super(page);
        this.productName = page.locator('.product-information h2');
        this.category = page.locator('.product-information p:has-text("Category:")');
        // The price is typically inside a nested span inside .product-information span
        this.price = page.locator('.product-information span > span');
        this.availability = page.locator('.product-information p:has-text("Availability:")');
        this.condition = page.locator('.product-information p:has-text("Condition:")');
        this.brand = page.locator('.product-information p:has-text("Brand:")');
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
}
