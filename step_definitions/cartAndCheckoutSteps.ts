import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { CartPage } from '../pages/CartPage';
import { LoginPage } from '../pages/LoginPage';
import { CustomWorld } from '../support/hooks';
import { testData } from '../support/testData';
import { performUserRegistration } from './registerSteps';

let homePage: HomePage;
let cartPage: CartPage;
let loginPage: LoginPage;

When('agrega el primer y segundo producto al carrito', async function (this: CustomWorld) {
    homePage = new HomePage(this.page);
    await homePage.clickProducts();
    await homePage.addProductToCart(0, 'continue');
    await homePage.addProductToCart(1, 'viewCart');
});

Then('la página del carrito debe mostrar los detalles correctos de los artículos', async function (this: CustomWorld) {
    cartPage = new CartPage(this.page);
    expect(await cartPage.isCartPageDisplayed()).toBe(true);

    const count = await cartPage.getCartProductsCount();
    expect(count).toBe(2);

    const prod1 = await cartPage.getProductDetails(0);
    const prod2 = await cartPage.getProductDetails(1);

    expect(prod1.name.length).toBeGreaterThan(0);
    expect(prod1.price).toContain('Rs.');
    expect(prod1.quantity).toBe('1');

    expect(prod2.name.length).toBeGreaterThan(0);
    expect(prod2.price).toContain('Rs.');
    expect(prod2.quantity).toBe('1');
});

When('elimina el producto desde la página del carrito', async function (this: CustomWorld) {
    cartPage = new CartPage(this.page);
    await cartPage.removeProduct(0);
});

Then('el carrito de compras debe quedar vacío', async function (this: CustomWorld) {
    cartPage = new CartPage(this.page);
    // BUG-07 (Deliberate): immediate check without waiting for the AJAX request to complete or row fadeout.
    // The student should wait for the empty cart message to be visible:
    await cartPage.emptyCartMessage.waitFor({ state: 'visible', timeout: 5000 });
    const count = await cartPage.getCartProductsCount();
    expect(count).toBe(0);
});

When('hace clic en Proceed to Checkout sin iniciar sesión', async function (this: CustomWorld) {
    cartPage = new CartPage(this.page);
    // Trigger proceed to checkout
    await cartPage.clickProceedToCheckout();
});

Then('se debe mostrar el modal indicando que requiere autenticación', async function (this: CustomWorld) {
    const modal = this.page.locator('#checkoutModal');
    await this.page.waitForTimeout(500); // Allow modal to start rendering
    // BUG-08 (Deliberate): Asserts that the modal should not be visible.
    // The student must change this to toBe(true) to reflect correct behavior.
    const isVisible = await modal.isVisible();
    expect(isVisible).toBe(true); 
});

When('hace clic en Register Login en el modal', async function (this: CustomWorld) {
    cartPage = new CartPage(this.page);
    await cartPage.clickRegisterLoginOnModal();
});

Then('el usuario debe ser redirigido a la página de inicio de sesión', async function (this: CustomWorld) {
    loginPage = new LoginPage(this.page);
    const url = await loginPage.getUrl();
    expect(url).toContain('/login');
});

When('hace clic en Proceed to Checkout con sesión activa', async function (this: CustomWorld) {
    cartPage = new CartPage(this.page);
    await cartPage.clickProceedToCheckout();
});

Then('el usuario es redirigido a la página de checkout', async function (this: CustomWorld) {
    await this.page.waitForURL('**/checkout', { timeout: 10000 });
    expect(this.page.url()).toContain('/checkout');
});
