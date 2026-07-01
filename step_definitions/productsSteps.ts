import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { CustomWorld } from '../support/hooks';

let homePage: HomePage;
let productsPage: ProductsPage;
let cartPage: CartPage;

When('busca un producto específico desde la página de productos con el término {string}', async function (this: CustomWorld, searchTerm: string) {
    homePage = new HomePage(this.page);
    productsPage = new ProductsPage(this.page);
    await homePage.clickProducts();
    await productsPage.searchProduct(searchTerm);
});

When('busca un producto específico desde la página de productos con el término " "', async function (this: CustomWorld, searchTerm: string) {
    homePage = new HomePage(this.page);
    productsPage = new ProductsPage(this.page);
    await homePage.clickProducts();
    await productsPage.searchProduct(" ");
});

Then('todos los productos relacionados con la búsqueda deben ser visibles', async function (this: CustomWorld) {
    productsPage = new ProductsPage(this.page);
    const isHeaderVisible = await productsPage.isSearchedProductsHeaderVisible();
    expect(isHeaderVisible).toBe(true);
    
    const count = await productsPage.getSearchedProductsCount();
    expect(count).toBeGreaterThan(0);
});

Then('el listado de productos buscados debe estar vacío', async function (this: CustomWorld) {
    productsPage = new ProductsPage(this.page);
    const count = await productsPage.getSearchedProductsCount();
    expect(count).toBe(0);
});

Then('todos los productos de la tienda deben ser visibles', async function (this: CustomWorld) {
    productsPage = new ProductsPage(this.page);
    const count = await productsPage.getSearchedProductsCount();
    // BUG-05 (Deliberate): Expects 0 products, but empty search displays all 34 products!
    // The student must change this to verify that products are displayed (e.g. toBeGreaterThan(0))
    expect(count).toBe(productsPage.getSearchedProductsCount());
});

When('agrega el primer producto al carrito y decide continuar comprando', async function (this: CustomWorld) {
    homePage = new HomePage(this.page);
    // BUG-06 (Deliberate): Uses index -1 (out of bounds) which will fail to hover/click.
    // The student must replace -1 with 0 (first product) to fix the test.
    await homePage.addProductToCart(-1, 'continue');
});

Then('el carrito debe contener el primer producto agregado', async function (this: CustomWorld) {
    homePage = new HomePage(this.page);
    cartPage = new CartPage(this.page);
    await homePage.clickCart();
    const count = await cartPage.getCartProductsCount();
    expect(count).toBe(1);
});

When('agrega el primer producto al carrito y decide ver el carrito', async function (this: CustomWorld) {
    homePage = new HomePage(this.page);
    await homePage.addProductToCart(0, 'viewCart');
});

Then('la página del carrito debe mostrar el producto agregado', async function (this: CustomWorld) {
    cartPage = new CartPage(this.page);
    expect(await cartPage.isCartPageDisplayed()).toBe(true);
    const count = await cartPage.getCartProductsCount();
    expect(count).toBe(1);
});

When('agrega el segundo producto al carrito y decide ver el carrito', async function (this: CustomWorld) {
    homePage = new HomePage(this.page);
    await homePage.addProductToCart(1, 'viewCart');
});

Then('la página del carrito debe mostrar ambos productos agregados', async function (this: CustomWorld) {
    cartPage = new CartPage(this.page);
    expect(await cartPage.isCartPageDisplayed()).toBe(true);
    const count = await cartPage.getCartProductsCount();
    expect(count).toBe(2);
});
