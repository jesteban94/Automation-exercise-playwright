import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductsPage } from '../pages/ProductsPage';
import { ProductDetailPage } from '../pages/ProductDetailPage';
import { CustomWorld } from '../support/hooks';
import { testData } from '../support/testData';

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

When('hace clic en el botón "Products" en la barra de navegación', async function (this: CustomWorld) {
    await homePage.clickProducts();
    productsPage = new ProductsPage(this.page);
});

Then('el usuario debería ser redirigido a la página de ALL PRODUCTS', async function () {
    const isTitleVisible = await productsPage.isAllProductsTitleVisible();
    expect(isTitleVisible).toBe(true);
});

Then('el listado de productos debe ser visible', async function () {
    const isListVisible = await productsPage.isProductsListVisible();
    expect(isListVisible).toBe(true);
});

When('hace clic en "View Product" del primer producto', async function (this: CustomWorld) {
    await productsPage.clickViewProductOfFirstProduct();
    productDetailPage = new ProductDetailPage(this.page);
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

When('va a la sección de productos y selecciona el primer producto', async function (this: CustomWorld) {
    homePage = new HomePage(this.page);
    productsPage = new ProductsPage(this.page);
    await homePage.clickProducts();
    await productsPage.clickViewProductOfFirstProduct();
});

Then('el detalle del producto debe mostrar toda su información correcta', async function (this: CustomWorld) {
    productDetailPage = new ProductDetailPage(this.page);
    const details = await productDetailPage.getProductDetails();
    
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
});

When('busca un producto específico desde la página de productos', async function (this: CustomWorld) {
    homePage = new HomePage(this.page);
    productsPage = new ProductsPage(this.page);
    await homePage.clickProducts();
    await productsPage.searchProduct(testData.search.productName);
});

Then('todos los productos relacionados con la búsqueda deben ser visibles', async function (this: CustomWorld) {
    productsPage = new ProductsPage(this.page);
    const isHeaderVisible = await productsPage.isSearchedProductsHeaderVisible();
    expect(isHeaderVisible).toBe(true);
    
    const count = await productsPage.getSearchedProductsCount();
    expect(count).toBeGreaterThan(0);
});

When('filtra los productos por la categoría Women Tops y luego por Men Tshirts', async function (this: CustomWorld) {
    homePage = new HomePage(this.page);
    expect(await homePage.categoryTitle.isVisible()).toBe(true);
    await homePage.clickCategoryWomen();
    await homePage.clickSubcategoryWomenTops();
    
    const header = this.page.locator('h2.title.text-center');
    await header.waitFor({ state: 'visible', timeout: 5000 });
    let text = await header.textContent();
    expect(text?.trim().toUpperCase()).toContain(testData.categories.womenTopsHeader.toUpperCase());
    
    await homePage.clickCategoryMen();
    await homePage.clickSubcategoryMenTshirts();
});

Then('la página debe mostrar los títulos de las categorías correspondientes', async function (this: CustomWorld) {
    const header = this.page.locator('h2.title.text-center');
    await header.waitFor({ state: 'visible', timeout: 5000 });
    const text = await header.textContent();
    expect(text?.trim().toUpperCase()).toContain(testData.categories.menTshirtsHeader.toUpperCase());
});

When('filtra los productos por la marca Polo y luego por Madame', async function (this: CustomWorld) {
    homePage = new HomePage(this.page);
    productsPage = new ProductsPage(this.page);
    await homePage.clickProducts();
    expect(await homePage.brandsHeader.isVisible()).toBe(true);
    
    await homePage.clickBrandPolo();
    const header = this.page.locator('h2.title.text-center');
    await header.waitFor({ state: 'visible', timeout: 5000 });
    let text = await header.textContent();
    expect(text?.trim().toUpperCase()).toContain(testData.brands.poloHeader.toUpperCase());
    
    await homePage.clickBrandMadame();
});

Then('la página debe mostrar los productos filtrados de cada marca', async function (this: CustomWorld) {
    const header = this.page.locator('h2.title.text-center');
    await header.waitFor({ state: 'visible', timeout: 5000 });
    const text = await header.textContent();
    expect(text?.trim().toUpperCase()).toContain(testData.brands.madameHeader.toUpperCase());
});

When('abre el detalle del primer producto y envía una reseña', async function (this: CustomWorld) {
    homePage = new HomePage(this.page);
    productsPage = new ProductsPage(this.page);
    productDetailPage = new ProductDetailPage(this.page);
    
    await homePage.clickProducts();
    await productsPage.clickViewProductOfFirstProduct();
    
    expect(await productDetailPage.isReviewHeaderVisible()).toBe(true);
    await productDetailPage.fillReview(testData.validUser.name, testData.validUser.email, testData.review.comment);
    await productDetailPage.submitReview();
});

Then('el mensaje de éxito de la reseña debe ser visible', async function (this: CustomWorld) {
    productDetailPage = new ProductDetailPage(this.page);
    const successMsg = await productDetailPage.getReviewSuccessMessage();
    expect(successMsg).toContain(testData.review.successMessage);
});
