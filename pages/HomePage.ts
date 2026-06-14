import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
    readonly signupLoginLink: Locator;
    readonly productsLink: Locator;
    readonly cartLink: Locator;
    readonly contactUsLink: Locator;
    readonly testCasesLink: Locator;
    readonly loggedInAsUserText: Locator;
    readonly logoutLink: Locator;
    readonly deleteAccountLink: Locator;

    // Account deletion success
    readonly accountDeletedHeader: Locator;
    readonly continueBtn: Locator;

    // Sidebar Category elements
    readonly categoryTitle: Locator;
    readonly categoryWomenLink: Locator;
    readonly categoryMenLink: Locator;

    // Brands elements
    readonly brandsHeader: Locator;

    // Subscription elements
    readonly subscriptionTitle: Locator;
    readonly subscriptionEmailInput: Locator;
    readonly subscribeBtn: Locator;
    readonly subscriptionSuccessMsg: Locator;

    // Recommended items
    readonly recommendedItemsTitle: Locator;
    readonly recommendedAddToCartBtn: Locator;
    readonly recommendedViewCartBtn: Locator;

    // Scroll elements
    readonly scrollUpArrow: Locator;
    readonly topCarouselText: Locator;

    constructor(page: Page) {
        super(page);
        this.signupLoginLink = page.locator('.shop-menu a[href="/login"]');
        this.productsLink = page.locator('a[href="/products"]');
        this.cartLink = page.locator('a[href="/view_cart"]').first();
        this.contactUsLink = page.locator('a[href="/contact_us"]');
        this.testCasesLink = page.locator('a[href="/test_cases"]').first();
        this.loggedInAsUserText = page.locator('li:has(i.fa-user)');
        this.logoutLink = page.locator('a[href="/logout"]');
        this.deleteAccountLink = page.locator('a[href="/delete_account"]');

        this.accountDeletedHeader = page.locator('h2[data-qa="account-deleted"]');
        this.continueBtn = page.locator('a[data-qa="continue-button"]');

        this.categoryTitle = page.locator('.left-sidebar h2:has-text("Category")');
        this.categoryWomenLink = page.locator('a[href="#Women"]');
        this.categoryMenLink = page.locator('a[href="#Men"]');

        this.brandsHeader = page.locator('.brands_products h2:has-text("Brands")');

        this.subscriptionTitle = page.locator('.single-widget h2:has-text("Subscription")');
        this.subscriptionEmailInput = page.locator('#susbscribe_email');
        this.subscribeBtn = page.locator('#subscribe');
        this.subscriptionSuccessMsg = page.locator('#success-subscribe .alert-success');

        this.recommendedItemsTitle = page.locator('.recommended_items h2.title:has-text("recommended items")');
        this.recommendedAddToCartBtn = page.locator('.recommended_items .carousel-inner .active a.add-to-cart').first();
        this.recommendedViewCartBtn = page.locator('.recommended_items .carousel-inner .active a:has-text("View Cart")').first();

        this.scrollUpArrow = page.locator('a#scrollUp');
        this.topCarouselText = page.locator('.active h2:has-text("Full-Fledged practice website for Automation Engineers")').first();
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

    async clickContactUs(): Promise<void> {
        await this.contactUsLink.click();
    }

    async clickTestCases(): Promise<void> {
        await this.testCasesLink.click();
    }

    async clickLogout(): Promise<void> {
        await this.logoutLink.click();
    }

    async clickDeleteAccount(): Promise<void> {
        await this.deleteAccountLink.click();
    }

    async isAccountDeletedVisible(): Promise<boolean> {
        try {
            await this.accountDeletedHeader.waitFor({ state: 'visible', timeout: 5000 });
            return await this.accountDeletedHeader.isVisible();
        } catch {
            return false;
        }
    }

    async clickContinueAfterDelete(): Promise<void> {
        await this.continueBtn.click();
    }

    async isLoggedInAs(username: string): Promise<boolean> {
        await this.loggedInAsUserText.waitFor({ state: 'visible', timeout: 10000 });
        const text = await this.loggedInAsUserText.textContent();
        return text ? text.includes(username) : false;
    }

    async addProductToCart(index: number, action: 'continue' | 'viewCart'): Promise<void> {
        const productCard = this.page.locator('.features_items .product-image-wrapper').nth(index);
        await productCard.scrollIntoViewIfNeeded();
        // Hover first to trigger the overlay
        await productCard.hover();
        // Click the overlay add-to-cart button which is now visible
        const overlayBtn = productCard.locator('.overlay-content a.add-to-cart');
        await overlayBtn.waitFor({ state: 'visible', timeout: 10000 });
        await overlayBtn.click();
        
        // Wait for the cart modal to fully appear
        const modal = this.page.locator('#cartModal');
        await modal.waitFor({ state: 'visible', timeout: 10000 });
        
        if (action === 'continue') {
            const continueBtn = modal.locator('button:has-text("Continue Shopping")');
            await continueBtn.waitFor({ state: 'visible', timeout: 5000 });
            await continueBtn.click();
        } else {
            const viewCartLink = modal.locator('a[href="/view_cart"]');
            await viewCartLink.waitFor({ state: 'visible', timeout: 5000 });
            await viewCartLink.click();
        }
    }

    async scrollDownToFooter(): Promise<void> {
        await this.subscriptionTitle.scrollIntoViewIfNeeded();
    }

    async isSubscriptionTitleVisible(): Promise<boolean> {
        try {
            await this.subscriptionTitle.waitFor({ state: 'visible', timeout: 5000 });
            return await this.subscriptionTitle.isVisible();
        } catch {
            return false;
        }
    }

    async subscribe(email: string): Promise<void> {
        await this.subscriptionEmailInput.fill(email);
        await this.subscribeBtn.click();
    }

    async getSubscriptionSuccessMessage(): Promise<string | null> {
        await this.subscriptionSuccessMsg.waitFor({ state: 'visible', timeout: 5000 });
        return await this.subscriptionSuccessMsg.textContent();
    }

    async clickCategoryWomen(): Promise<void> {
        await this.page.waitForLoadState('domcontentloaded');
        await this.categoryWomenLink.scrollIntoViewIfNeeded();
        await this.categoryWomenLink.click();
    }

    async clickSubcategoryWomenTops(): Promise<void> {
        const topsLink = this.page.locator('#Women a:has-text("Tops")');
        await topsLink.click();
    }

    async clickCategoryMen(): Promise<void> {
        await this.page.waitForLoadState('domcontentloaded');
        await this.categoryMenLink.scrollIntoViewIfNeeded();
        await this.categoryMenLink.click();
    }

    async clickSubcategoryMenTshirts(): Promise<void> {
        const tshirtsLink = this.page.locator('#Men a:has-text("Tshirts")');
        await tshirtsLink.click();
    }

    async clickBrandPolo(): Promise<void> {
        const brandPolo = this.page.locator('a[href="/brand_products/Polo"]');
        await brandPolo.scrollIntoViewIfNeeded();
        await brandPolo.click();
    }

    async clickBrandMadame(): Promise<void> {
        const brandMadame = this.page.locator('a[href="/brand_products/Madame"]');
        await brandMadame.scrollIntoViewIfNeeded();
        await brandMadame.click();
    }

    async isRecommendedItemsVisible(): Promise<boolean> {
        try {
            await this.recommendedItemsTitle.scrollIntoViewIfNeeded();
            await this.recommendedItemsTitle.waitFor({ state: 'visible', timeout: 5000 });
            return await this.recommendedItemsTitle.isVisible();
        } catch {
            return false;
        }
    }

    async addRecommendedProductToCart(): Promise<void> {
        await this.recommendedAddToCartBtn.click();
    }

    async clickViewCartOnRecommendedModal(): Promise<void> {
        await this.page.locator('p.text-center a[href="/view_cart"]').click();
    }

    async scrollPageToBottom(): Promise<void> {
        await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        // Give half a second to settle
        await this.page.waitForTimeout(500);
    }

    async scrollPageToTop(): Promise<void> {
        await this.page.evaluate(() => window.scrollTo(0, 0));
        await this.page.waitForTimeout(500);
    }

    async clickScrollUpArrow(): Promise<void> {
        await this.scrollUpArrow.waitFor({ state: 'visible', timeout: 5000 });
        await this.scrollUpArrow.click();
    }

    async isCarouselTextVisible(): Promise<boolean> {
        try {
            await this.topCarouselText.waitFor({ state: 'visible', timeout: 5000 });
            return await this.topCarouselText.isVisible();
        } catch {
            return false;
        }
    }
}
