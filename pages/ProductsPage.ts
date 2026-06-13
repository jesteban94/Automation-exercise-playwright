import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductsPage extends BasePage {
    readonly allProductsTitle: Locator;
    readonly productsList: Locator;
    readonly viewProductOfFirstProductBtn: Locator;

    constructor(page: Page) {
        super(page);
        this.allProductsTitle = page.locator('h2.title:has-text("ALL PRODUCTS")');
        this.productsList = page.locator('.features_items');
        this.viewProductOfFirstProductBtn = page.locator('a[href^="/product_details"]').first();
    }

    async isAllProductsTitleVisible(): Promise<boolean> {
        try {
            await this.allProductsTitle.waitFor({ state: 'visible', timeout: 5000 });
            return await this.allProductsTitle.isVisible();
        } catch {
            return false;
        }
    }

    async isProductsListVisible(): Promise<boolean> {
        try {
            await this.productsList.waitFor({ state: 'visible', timeout: 5000 });
            return await this.productsList.isVisible();
        } catch {
            return false;
        }
    }

    async clickViewProductOfFirstProduct(): Promise<void> {
        await this.viewProductOfFirstProductBtn.click();
    }
}
