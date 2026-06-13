import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductsPage } from '../pages/ProductsPage';
import { ProductDetailPage } from '../pages/ProductDetailPage';
import { CustomWorld } from '../support/hooks';
import { testData } from '../support/testData';

Given('el usuario verifica que la página de inicio se cargó correctamente', async function (this: CustomWorld) {
    const homePage = new HomePage(this.page);
    const title = await homePage.getTitle();
    expect(title).toContain('Automation Exercise');
    expect(await homePage.signupLoginLink.isVisible()).toBe(true);
});

When('hace clic en el botón "Products" en la barra de navegación', async function (this: CustomWorld) {
    const homePage = new HomePage(this.page);
    await homePage.clickProducts();
});

Then('el usuario debería ser redirigido a la página de ALL PRODUCTS', async function (this: CustomWorld) {
    const productsPage = new ProductsPage(this.page);
    const isTitleVisible = await productsPage.isAllProductsTitleVisible();
    expect(isTitleVisible).toBe(true);
});

Then('el listado de productos debe ser visible', async function (this: CustomWorld) {
    const productsPage = new ProductsPage(this.page);
    const isListVisible = await productsPage.isProductsListVisible();
    expect(isListVisible).toBe(true);
});

When('hace clic en "View Product" del primer producto', async function (this: CustomWorld) {
    const productsPage = new ProductsPage(this.page);
    await productsPage.clickViewProductOfFirstProduct();
});

Then('el usuario es redirigido a la página de detalle del producto', async function (this: CustomWorld) {
    const productDetailPage = new ProductDetailPage(this.page);
    const url = await productDetailPage.getUrl();
    expect(url).toContain('/product_details/');
});

Then('el usuario verifica que los detalles sean visibles: nombre del producto, categoría, precio, disponibilidad, condición y marca', async function (this: CustomWorld) {
    const productDetailPage = new ProductDetailPage(this.page);
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

    console.log('[Product Details Verified]:', JSON.stringify(details, null, 2));
});

When('ingresa el nombre de un producto en el buscador y hace clic en buscar', async function (this: CustomWorld) {
    const productsPage = new ProductsPage(this.page);
    await productsPage.searchProduct("Blue Top");
});

Then('el usuario debería ver la sección "SEARCHED PRODUCTS"', async function (this: CustomWorld) {
    const productsPage = new ProductsPage(this.page);
    const isHeaderVisible = await productsPage.isSearchedProductsHeaderVisible();
    expect(isHeaderVisible).toBe(true);
});

Then('todos los productos relacionados con la búsqueda deben ser visibles', async function (this: CustomWorld) {
    const productsPage = new ProductsPage(this.page);
    const count = await productsPage.getSearchedProductsCount();
    expect(count).toBeGreaterThan(0);
});

Then('las categorías deben ser visibles en la barra lateral izquierda', async function (this: CustomWorld) {
    const homePage = new HomePage(this.page);
    expect(await homePage.categoryTitle.isVisible()).toBe(true);
});

When('hace clic en la categoría "Women"', async function (this: CustomWorld) {
    const homePage = new HomePage(this.page);
    await homePage.clickCategoryWomen();
});

When('hace clic en la subcategoría "Tops" de Women', async function (this: CustomWorld) {
    const homePage = new HomePage(this.page);
    await homePage.clickSubcategoryWomenTops();
});

Then('el usuario debería ver la página de la categoría y confirmar el texto "WOMEN - TOPS PRODUCTS"', async function (this: CustomWorld) {
    const header = this.page.locator('h2.title.text-center');
    await header.waitFor({ state: 'visible', timeout: 5000 });
    const text = await header.textContent();
    expect(text?.trim().toUpperCase()).toContain(testData.categories.womenTopsHeader.toUpperCase());
});

When('hace clic en la categoría "Men" en la barra lateral', async function (this: CustomWorld) {
    const homePage = new HomePage(this.page);
    await homePage.clickCategoryMen();
});

When('hace clic en la subcategoría "Tshirts" de Men', async function (this: CustomWorld) {
    const homePage = new HomePage(this.page);
    await homePage.clickSubcategoryMenTshirts();
});

Then('el usuario es redirigido a esa página de categoría de Men', async function (this: CustomWorld) {
    const header = this.page.locator('h2.title.text-center');
    await header.waitFor({ state: 'visible', timeout: 5000 });
    const text = await header.textContent();
    expect(text?.trim().toUpperCase()).toContain(testData.categories.menTshirtsHeader.toUpperCase());
});

Then('las marcas deben ser visibles en la barra lateral izquierda', async function (this: CustomWorld) {
    const homePage = new HomePage(this.page);
    expect(await homePage.brandsHeader.isVisible()).toBe(true);
});

When('hace clic en la marca "Polo"', async function (this: CustomWorld) {
    const homePage = new HomePage(this.page);
    await homePage.clickBrandPolo();
});

Then('el usuario es redirigido a la página de la marca y visualiza los productos de "Polo"', async function (this: CustomWorld) {
    const header = this.page.locator('h2.title.text-center');
    await header.waitFor({ state: 'visible', timeout: 5000 });
    const text = await header.textContent();
    expect(text?.trim().toUpperCase()).toContain(testData.brands.poloHeader.toUpperCase());
});

When('hace clic en otra marca "Madame" en la barra lateral', async function (this: CustomWorld) {
    const homePage = new HomePage(this.page);
    await homePage.clickBrandMadame();
});

Then('el usuario es redirigido a la página de la marca y visualiza los productos de "Madame"', async function (this: CustomWorld) {
    const header = this.page.locator('h2.title.text-center');
    await header.waitFor({ state: 'visible', timeout: 5000 });
    const text = await header.textContent();
    expect(text?.trim().toUpperCase()).toContain(testData.brands.madameHeader.toUpperCase());
});

Then('el usuario debería ver la sección "Write Your Review"', async function (this: CustomWorld) {
    const productDetailPage = new ProductDetailPage(this.page);
    expect(await productDetailPage.isReviewHeaderVisible()).toBe(true);
});

When('completa el formulario de reseña y hace clic en enviar', async function (this: CustomWorld) {
    const productDetailPage = new ProductDetailPage(this.page);
    const user = testData.validUser;
    await productDetailPage.fillReview(user.name, user.email, "Excelente producto, muy recomendado por su calidad y precio.");
    await productDetailPage.submitReview();
});

Then('el usuario debería ver el mensaje de éxito "Thank you for your review."', async function (this: CustomWorld) {
    const productDetailPage = new ProductDetailPage(this.page);
    const successMsg = await productDetailPage.getReviewSuccessMessage();
    expect(successMsg).toContain("Thank you for your review.");
});
