import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductsPage } from '../pages/ProductsPage';
import { ProductDetailPage } from '../pages/ProductDetailPage';
import { CustomWorld } from '../support/hooks';

let homePage: HomePage;
let productsPage: ProductsPage;
let productDetailPage: ProductDetailPage;

Given('el usuario verifica que la página de inicio se cargó correctamente', async function (this: CustomWorld) {
    homePage = new HomePage(this.page);
    const title = await homePage.getTitle();
    expect(title).toContain('Automation Exercise');
    // Ensure the home page navigation link is visible
    expect(await homePage.signupLoginLink.isVisible()).toBe(true);
});

When('hace clic en el botón "Products" en la barra de navegación', async function () {
    await homePage.clickProducts();
    productsPage = new ProductsPage(homePage['page']);
});

Then('el usuario debería ser redirigido a la página de ALL PRODUCTS', async function () {
    const isTitleVisible = await productsPage.isAllProductsTitleVisible();
    expect(isTitleVisible).toBe(true);
});

Then('el listado de productos debe ser visible', async function () {
    const isListVisible = await productsPage.isProductsListVisible();
    expect(isListVisible).toBe(true);
});

When('hace clic en "View Product" del primer producto', async function () {
    await productsPage.clickViewProductOfFirstProduct();
    productDetailPage = new ProductDetailPage(productsPage['page']);
});

Then('el usuario es redirigido a la página de detalle del producto', async function () {
    const url = await productDetailPage.getUrl();
    expect(url).toContain('/product_details/');
});

Then('el usuario verifica que los detalles sean visibles: nombre del producto, categoría, precio, disponibilidad, condición y marca', async function () {
    const details = await productDetailPage.getProductDetails();
    
    // Asserts
    expect(details.name).not.toBeNull();
    expect(details.name?.trim().length).toBeGreaterThan(0);
    
    expect(details.category).not.toBeNull();
    expect(details.category).toContain('Category:');
    
    expect(details.price).not.toBeNull();
    expect(details.price).toContain('Rs.');
    
    expect(details.availability).not.toBeNull();
    expect(details.availability).toContain('Availability:');
    
    expect(details.condition).not.toBeNull();
    expect(details.condition).toContain('Condition:');
    
    expect(details.brand).not.toBeNull();
    expect(details.brand).toContain('Brand:');

    // Log the parsed product details to see them in test execution logs
    console.log('[Product Details Verified]:', JSON.stringify(details, null, 2));
});
