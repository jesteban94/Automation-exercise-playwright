import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import * as fs from 'fs';
import { HomePage } from '../pages/HomePage';
import { CartPage } from '../pages/CartPage';
import { ProductsPage } from '../pages/ProductsPage';
import { ProductDetailPage } from '../pages/ProductDetailPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { PaymentPage } from '../pages/PaymentPage';
import { CustomWorld } from '../support/hooks';
import { testData } from '../support/testData';

When('agrega el primer producto al carrito y continúa comprando', async function (this: CustomWorld) {
    const homePage = new HomePage(this.page);
    await homePage.addProductToCart(0, 'continue');
});

When('agrega el segundo producto al carrito y va al carrito', async function (this: CustomWorld) {
    const homePage = new HomePage(this.page);
    await homePage.addProductToCart(1, 'viewCart');
});

Then('la página del carrito debe mostrarse', async function (this: CustomWorld) {
    const cartPage = new CartPage(this.page);
    expect(await cartPage.isCartPageDisplayed()).toBe(true);
});

Then('ambos productos deben estar visibles en el carrito con sus respectivos precios, cantidades y totales', async function (this: CustomWorld) {
    const cartPage = new CartPage(this.page);
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

When('aumenta la cantidad del producto y hace clic en agregar al carrito', async function (this: CustomWorld) {
    const productDetailPage = new ProductDetailPage(this.page);
    await productDetailPage.setQuantity(testData.checkout.quantity);
    await productDetailPage.clickAddToCart();
});

When('hace clic en ver carrito', async function (this: CustomWorld) {
    const modalCartLink = this.page.locator('.modal-content a[href="/view_cart"], p.text-center a[href="/view_cart"]').first();
    try {
        await modalCartLink.waitFor({ state: 'visible', timeout: 3000 });
        await modalCartLink.click({ force: true });
    } catch {
        const homePage = new HomePage(this.page);
        await homePage.clickCart();
    }
});

Then('el producto debe tener la cantidad exacta en el carrito', async function (this: CustomWorld) {
    const cartPage = new CartPage(this.page);
    const details = await cartPage.getProductDetails(0);
    expect(details.quantity).toBe(testData.checkout.quantity);
});

When('agrega el primer producto al carrito y va al carrito', async function (this: CustomWorld) {
    const homePage = new HomePage(this.page);
    await homePage.addProductToCart(0, 'viewCart');
});

When('hace clic en el botón de eliminar del primer producto', async function (this: CustomWorld) {
    const cartPage = new CartPage(this.page);
    await cartPage.removeProduct(0);
});

Then('el producto debe eliminarse del carrito', async function (this: CustomWorld) {
    const cartPage = new CartPage(this.page);
    // Wait for fade out
    await this.page.waitForTimeout(1000);
    const count = await cartPage.getCartProductsCount();
    expect(count).toBe(0);
});

When('se desliza hasta el final de la página', async function (this: CustomWorld) {
    const homePage = new HomePage(this.page);
    await homePage.scrollPageToBottom();
});

Then('la sección "RECOMMENDED ITEMS" debe ser visible', async function (this: CustomWorld) {
    const homePage = new HomePage(this.page);
    expect(await homePage.isRecommendedItemsVisible()).toBe(true);
});

When('hace clic en agregar al carrito en el primer producto recomendado', async function (this: CustomWorld) {
    const homePage = new HomePage(this.page);
    await homePage.addRecommendedProductToCart();
});

When('hace clic en ver carrito en el modal de recomendados', async function (this: CustomWorld) {
    const homePage = new HomePage(this.page);
    await homePage.clickViewCartOnRecommendedModal();
});

Then('el producto recomendado debe estar visible en el carrito', async function (this: CustomWorld) {
    const cartPage = new CartPage(this.page);
    const count = await cartPage.getCartProductsCount();
    expect(count).toBeGreaterThan(0);
});

When('agrega el primer producto buscado al carrito y va al carrito', async function (this: CustomWorld) {
    const productsPage = new ProductsPage(this.page);
    await productsPage.addSearchedProductToCart(0);
});

Then('el producto buscado debe ser visible en el carrito', async function (this: CustomWorld) {
    const cartPage = new CartPage(this.page);
    const count = await cartPage.getCartProductsCount();
    expect(count).toBeGreaterThan(0);
});

When('hace clic en el botón "Cart" en la barra de navegación', async function (this: CustomWorld) {
    const homePage = new HomePage(this.page);
    await homePage.clickCart();
});

Then('el producto buscado debe seguir visible en el carrito después del login', async function (this: CustomWorld) {
    const cartPage = new CartPage(this.page);
    const count = await cartPage.getCartProductsCount();
    expect(count).toBeGreaterThan(0);
});

When('hace clic en proceder al checkout', async function (this: CustomWorld) {
    const cartPage = new CartPage(this.page);
    await cartPage.clickProceedToCheckout();
});

Then('la dirección de envío debe coincidir con la dirección registrada', async function (this: CustomWorld) {
    const checkoutPage = new CheckoutPage(this.page);
    const lines = await checkoutPage.getDeliveryAddressLines();
    const user = testData.validUser;
    
    expect(lines.some(line => line.includes(user.name))).toBe(true);
    expect(lines.some(line => line.includes("742 Evergreen Terrace"))).toBe(true);
    expect(lines.some(line => line.includes("Springfield"))).toBe(true);
    expect(lines.some(line => line.includes("555-0199"))).toBe(true);
});

Then('la dirección de facturación debe coincidir con la dirección registrada', async function (this: CustomWorld) {
    const checkoutPage = new CheckoutPage(this.page);
    const lines = await checkoutPage.getBillingAddressLines();
    const user = testData.validUser;
    
    expect(lines.some(line => line.includes(user.name))).toBe(true);
    expect(lines.some(line => line.includes("742 Evergreen Terrace"))).toBe(true);
    expect(lines.some(line => line.includes("Springfield"))).toBe(true);
    expect(lines.some(line => line.includes("555-0199"))).toBe(true);
});

When('hace clic en registrarse o iniciar sesión en el modal de checkout', async function (this: CustomWorld) {
    const cartPage = new CartPage(this.page);
    await cartPage.clickRegisterLoginOnModal();
});

When('escribe un comentario de prueba y hace clic en realizar pedido', async function (this: CustomWorld) {
    const checkoutPage = new CheckoutPage(this.page);
    await checkoutPage.enterComment(testData.checkout.comment);
    await checkoutPage.clickPlaceOrder();
});

When('ingresa los datos de pago y hace clic en pagar y confirmar', async function (this: CustomWorld) {
    const paymentPage = new PaymentPage(this.page);
    const pay = testData.payment;
    await paymentPage.fillPaymentDetails(pay.nameOnCard, pay.cardNumber, pay.cvc, pay.expiryMonth, pay.expiryYear);
    await paymentPage.clickPayAndConfirm();
});

Then('el pedido debería ser procesado y mostrar la confirmación de pedido', async function (this: CustomWorld) {
    const paymentPage = new PaymentPage(this.page);
    expect(await paymentPage.isOrderPlacedVisible()).toBe(true);
});

When('hace clic en descargar factura', async function (this: CustomWorld) {
    const paymentPage = new PaymentPage(this.page);
    this.downloadedInvoicePath = await paymentPage.downloadInvoice();
});

Then('la factura debería ser descargada exitosamente en formato PDF', async function (this: CustomWorld) {
    expect(this.downloadedInvoicePath).not.toBeUndefined();
    const path = this.downloadedInvoicePath!;
    expect(path.length).toBeGreaterThan(0);
    expect(fs.existsSync(path)).toBe(true);
    const stats = fs.statSync(path);
    expect(stats.size).toBeGreaterThan(0);
    console.log(`[Invoice Downloaded]: Path=${path}, Size=${stats.size} bytes`);
});

When('hace clic en continuar en la página de éxito', async function (this: CustomWorld) {
    const paymentPage = new PaymentPage(this.page);
    await paymentPage.clickContinue();
});
