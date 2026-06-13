import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductsPage extends BasePage {
    readonly allProductsTitle: Locator;
    readonly productsList: Locator;
    readonly viewProductOfFirstProductBtn: Locator;
    readonly searchProductInput: Locator;
    readonly submitSearchBtn: Locator;
    readonly searchedProductsHeader: Locator;
    readonly searchedProductsList: Locator;

    constructor(page: Page) {
        super(page);
        this.allProductsTitle = page.locator('h2.title:has-text("ALL PRODUCTS")');
        this.productsList = page.locator('.features_items');
        this.viewProductOfFirstProductBtn = page.locator('a[href^="/product_details"]').first();
        this.searchProductInput = page.locator('input#search_product');
        this.submitSearchBtn = page.locator('button#submit_search');
        this.searchedProductsHeader = page.locator('h2.title:has-text("SEARCHED PRODUCTS")');
        this.searchedProductsList = page.locator('.features_items .product-image-wrapper');
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

    async searchProduct(productName: string): Promise<void> {
        await this.searchProductInput.waitFor({ state: 'visible', timeout: 5000 });
        await this.searchProductInput.fill(productName);
        await this.page.waitForTimeout(500); // Give JS event listener a chance to register
        await this.submitSearchBtn.click();
        
        // Robust fallback: if search results header is not visible within 2s, press Enter
        try {
            await this.searchedProductsHeader.waitFor({ state: 'visible', timeout: 2000 });
        } catch {
            await this.searchProductInput.press('Enter');
            await this.submitSearchBtn.click({ force: true });
        }
    }

    async isSearchedProductsHeaderVisible(): Promise<boolean> {
        try {
            await this.searchedProductsHeader.waitFor({ state: 'visible', timeout: 5000 });
            return await this.searchedProductsHeader.isVisible();
        } catch {
            return false;
        }
    }

    async getSearchedProductsCount(): Promise<number> {
        return await this.searchedProductsList.count();
    }

    async addSearchedProductToCart(index: number): Promise<void> {
        const productCard = this.searchedProductsList.nth(index);
        await productCard.scrollIntoViewIfNeeded();
        // Hover to make overlay visible
        await productCard.hover();
        // Click the overlay add-to-cart button which is now visible
        const overlayBtn = productCard.locator('.overlay-content a.add-to-cart');
        await overlayBtn.waitFor({ state: 'visible', timeout: 5000 });
        await overlayBtn.click();
        await this.page.locator('p.text-center a[href="/view_cart"]').click();
    }
}
