import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import * as fs from 'fs';
import { HomePage } from '../pages/HomePage';
import { CartPage } from '../pages/CartPage';
import { ProductsPage } from '../pages/ProductsPage';
import { ProductDetailPage } from '../pages/ProductDetailPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { PaymentPage } from '../pages/PaymentPage';
import { LoginPage } from '../pages/LoginPage';
import { CustomWorld } from '../support/hooks';
import { testData } from '../support/testData';
import { performUserRegistration, verifyUserIsLoggedIn } from './registerSteps';

When('agrega el primer y segundo producto al carrito', async function (this: CustomWorld) {
    const homePage = new HomePage(this.page);
    await homePage.clickProducts();
    await homePage.addProductToCart(0, 'continue');
    await homePage.addProductToCart(1, 'viewCart');
});

Then('la página del carrito debe mostrar los productos con sus detalles correctos', async function (this: CustomWorld) {
    const cartPage = new CartPage(this.page);
    expect(await cartPage.isCartPageDisplayed()).toBe(true);

    const count = await cartPage.getCartProductsCount();
    expect(count).toBeGreaterThanOrEqual(2);

    const prod1 = await cartPage.getProductDetails(0);
    const prod2 = await cartPage.getProductDetails(1);

    expect(prod1.name.length).toBeGreaterThan(0);
    expect(prod1.price).toContain('Rs.');
    expect(prod1.quantity).toBe('1');
    expect(prod1.total).toContain('Rs.');

    expect(prod2.name.length).toBeGreaterThan(0);
    expect(prod2.price).toContain('Rs.');
    expect(prod2.quantity).toBe('1');
    expect(prod2.total).toContain('Rs.');
});

When('aumenta la cantidad del primer producto y lo agrega al carrito', async function (this: CustomWorld) {
    const homePage = new HomePage(this.page);
    const productsPage = new ProductsPage(this.page);
    const productDetailPage = new ProductDetailPage(this.page);
    
    // Navigate to products and view detail of first product
    await homePage.clickProducts();
    await productsPage.clickViewProductOfFirstProduct();
    await productDetailPage.setQuantity(testData.checkout.quantity);
    await productDetailPage.clickAddToCart();
    
    // Wait for the modal to appear and click View Cart
    const modal = this.page.locator('#cartModal');
    await modal.waitFor({ state: 'visible', timeout: 10000 });
    const viewCartLink = modal.locator('a[href="/view_cart"]');
    await viewCartLink.waitFor({ state: 'visible', timeout: 5000 });
    await viewCartLink.click();
});

Then('el producto debe tener la cantidad exacta en el carrito', async function (this: CustomWorld) {
    const cartPage = new CartPage(this.page);
    const details = await cartPage.getProductDetails(0);
    expect(details.quantity).toBe(testData.checkout.quantity);
});

Then('la página del carrito debe mostrar la cantidad exacta para el producto', async function (this: CustomWorld) {
    const cartPage = new CartPage(this.page);
    const details = await cartPage.getProductDetails(0);
    expect(details.quantity).toBe(testData.checkout.quantity);
});

When('agrega el primer producto al carrito', async function (this: CustomWorld) {
    const homePage = new HomePage(this.page);
    await homePage.addProductToCart(0, 'viewCart');
});

When('elimina el producto desde la página del carrito', async function (this: CustomWorld) {
    const cartPage = new CartPage(this.page);
    await cartPage.removeProduct(0);
});

Then('el carrito de compras debe quedar vacío', async function (this: CustomWorld) {
    const cartPage = new CartPage(this.page);
    await this.page.waitForTimeout(1000); // Wait for fadeout
    const count = await cartPage.getCartProductsCount();
    expect(count).toBe(0);
});

When('agrega el primer producto recomendado al carrito', async function (this: CustomWorld) {
    const homePage = new HomePage(this.page);
    await homePage.scrollPageToBottom();
    expect(await homePage.isRecommendedItemsVisible()).toBe(true);
    await homePage.addRecommendedProductToCart();
    await homePage.clickViewCartOnRecommendedModal();
});

Then('el producto recomendado debe estar visible en el carrito', async function (this: CustomWorld) {
    const cartPage = new CartPage(this.page);
    const count = await cartPage.getCartProductsCount();
    expect(count).toBeGreaterThan(0);
});

When('busca un producto específico y lo agrega al carrito', async function (this: CustomWorld) {
    const homePage = new HomePage(this.page);
    const productsPage = new ProductsPage(this.page);
    
    await homePage.clickProducts();
    await productsPage.searchProduct(testData.search.productName);
    expect(await productsPage.isSearchedProductsHeaderVisible()).toBe(true);
    await productsPage.addSearchedProductToCart(0);
});

Then('el producto buscado debe seguir visible en el carrito después del login', async function (this: CustomWorld) {
    const homePage = new HomePage(this.page);
    const cartPage = new CartPage(this.page);
    
    await homePage.clickCart();
    const count = await cartPage.getCartProductsCount();
    expect(count).toBeGreaterThan(0);
    
    const details = await cartPage.getProductDetails(0);
    expect(details.name.toLowerCase()).toContain(testData.search.productName.toLowerCase());
});

When('inicia sesión con el usuario de prueba', async function (this: CustomWorld) {
    const homePage = new HomePage(this.page);
    const loginPage = new LoginPage(this.page);
    const user = testData.validUser;
    
    await homePage.clickSignupLogin();
    await loginPage.login(user.email, user.password);
    
    const isLoggedIn = await homePage.isLoggedInAs(user.name);
    expect(isLoggedIn).toBe(true);
});

When('procede al checkout desde el carrito', async function (this: CustomWorld) {
    const cartPage = new CartPage(this.page);
    await cartPage.clickProceedToCheckout();
    await this.page.waitForURL('**/checkout', { timeout: 10000 });
});

Then('la dirección de envío y facturación deben coincidir con la dirección registrada', async function (this: CustomWorld) {
    const checkoutPage = new CheckoutPage(this.page);
    const delivery = await checkoutPage.getDeliveryAddressLines();
    const billing = await checkoutPage.getBillingAddressLines();
    const user = testData.validUser;
    
    expect(delivery.some(line => line.includes(user.name))).toBe(true);
    expect(delivery.some(line => line.includes(testData.address.street))).toBe(true);
    expect(delivery.some(line => line.includes(testData.address.city))).toBe(true);
    
    expect(billing.some(line => line.includes(user.name))).toBe(true);
    expect(billing.some(line => line.includes(testData.address.street))).toBe(true);
    expect(billing.some(line => line.includes(testData.address.city))).toBe(true);
});

When('inicia el proceso de checkout y se registra como nuevo usuario', async function (this: CustomWorld) {
    const cartPage = new CartPage(this.page);
    const homePage = new HomePage(this.page);
    
    // Ensure page is fully loaded (Bootstrap JS must be ready for modal)
    await this.page.waitForLoadState('networkidle');
    
    // Click proceed to checkout - must NOT use force to allow Bootstrap modal trigger
    const checkoutBtn = this.page.locator('a.check_out');
    await checkoutBtn.scrollIntoViewIfNeeded();
    await checkoutBtn.click();
    
    // Wait for the modal to fully animate in
    const modalLink = this.page.locator('#checkoutModal a[href="/login"]');
    try {
        await modalLink.waitFor({ state: 'visible', timeout: 10000 });
        await modalLink.click();
    } catch {
        // Fallback: trigger modal via JS if Bootstrap didn't fire
        await this.page.evaluate(() => {
            const modal = document.querySelector('#checkoutModal') as HTMLElement;
            if (modal) {
                modal.classList.add('in');
                modal.style.display = 'block';
            }
        });
        await modalLink.waitFor({ state: 'visible', timeout: 5000 });
        await modalLink.click();
    }
    
    await performUserRegistration(this.page, testData.validUser);
    await verifyUserIsLoggedIn(this.page, testData.validUser.name);
    
    // After registration, navigate back to cart and proceed to checkout
    await homePage.clickCart();
    await cartPage.clickProceedToCheckout();
});

When('completa el checkout procesando el pago con un comentario', async function (this: CustomWorld) {
    const checkoutPage = new CheckoutPage(this.page);
    const paymentPage = new PaymentPage(this.page);
    const pay = testData.payment;
    
    await checkoutPage.enterComment(testData.checkout.comment);
    await checkoutPage.clickPlaceOrder();
    
    await paymentPage.fillPaymentDetails(pay.nameOnCard, pay.cardNumber, pay.cvc, pay.expiryMonth, pay.expiryYear);
    await paymentPage.clickPayAndConfirm();
});

Then('el pedido debería ser procesado exitosamente', async function (this: CustomWorld) {
    const paymentPage = new PaymentPage(this.page);
    expect(await paymentPage.isOrderPlacedVisible()).toBe(true);
});

When('se registra como nuevo usuario antes del checkout', async function (this: CustomWorld) {
    const homePage = new HomePage(this.page);
    await homePage.clickSignupLogin();
    await performUserRegistration(this.page, testData.validUser);
    await verifyUserIsLoggedIn(this.page, testData.validUser.name);
});

When('agrega el primer producto al carrito y completa el checkout', async function (this: CustomWorld) {
    const homePage = new HomePage(this.page);
    const cartPage = new CartPage(this.page);
    const checkoutPage = new CheckoutPage(this.page);
    const paymentPage = new PaymentPage(this.page);
    const pay = testData.payment;
    
    await this.page.waitForLoadState('domcontentloaded');
    await homePage.addProductToCart(0, 'viewCart');
    await cartPage.clickProceedToCheckout();
    await this.page.waitForURL('**/checkout', { timeout: 10000 });
    
    await checkoutPage.enterComment(testData.checkout.comment);
    await checkoutPage.clickPlaceOrder();
    
    await paymentPage.fillPaymentDetails(pay.nameOnCard, pay.cardNumber, pay.cvc, pay.expiryMonth, pay.expiryYear);
    await paymentPage.clickPayAndConfirm();
});

When('descarga la factura en formato PDF', async function (this: CustomWorld) {
    const paymentPage = new PaymentPage(this.page);
    this.downloadedInvoicePath = await paymentPage.downloadInvoice();
    
    expect(this.downloadedInvoicePath).not.toBeUndefined();
    const path = this.downloadedInvoicePath!;
    expect(path.length).toBeGreaterThan(0);
    expect(fs.existsSync(path)).toBe(true);
    const stats = fs.statSync(path);
    expect(stats.size).toBeGreaterThan(0);
    console.log(`[Invoice Downloaded]: Path=${path}, Size=${stats.size} bytes`);
    
    await paymentPage.clickContinue();
});
