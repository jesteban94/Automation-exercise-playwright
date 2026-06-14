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

When('va a la sección de productos y selecciona el primer producto', async function (this: CustomWorld) {
    const homePage = new HomePage(this.page);
    const productsPage = new ProductsPage(this.page);
    await homePage.clickProducts();
    await productsPage.clickViewProductOfFirstProduct();
});

Then('el detalle del producto debe mostrar toda su información correcta', async function (this: CustomWorld) {
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

When('busca un producto específico desde la página de productos', async function (this: CustomWorld) {
    const homePage = new HomePage(this.page);
    const productsPage = new ProductsPage(this.page);
    await homePage.clickProducts();
    await productsPage.searchProduct(testData.search.productName);
});

Then('todos los productos relacionados con la búsqueda deben ser visibles', async function (this: CustomWorld) {
    const productsPage = new ProductsPage(this.page);
    const isHeaderVisible = await productsPage.isSearchedProductsHeaderVisible();
    expect(isHeaderVisible).toBe(true);
    
    const count = await productsPage.getSearchedProductsCount();
    expect(count).toBeGreaterThan(0);
});

When('filtra los productos por la categoría Women Tops y luego por Men Tshirts', async function (this: CustomWorld) {
    const homePage = new HomePage(this.page);
    
    // Check categories visible
    expect(await homePage.categoryTitle.isVisible()).toBe(true);
    
    // Filter by Women - Tops
    await homePage.clickCategoryWomen();
    await homePage.clickSubcategoryWomenTops();
    
    // Verify Women Tops title
    const header = this.page.locator('h2.title.text-center');
    await header.waitFor({ state: 'visible', timeout: 5000 });
    let text = await header.textContent();
    expect(text?.trim().toUpperCase()).toContain(testData.categories.womenTopsHeader.toUpperCase());
    
    // Filter by Men - Tshirts
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
    const homePage = new HomePage(this.page);
    const productsPage = new ProductsPage(this.page);
    
    // Go to products page first to see brands
    await homePage.clickProducts();
    expect(await homePage.brandsHeader.isVisible()).toBe(true);
    
    // Filter by Polo
    await homePage.clickBrandPolo();
    const header = this.page.locator('h2.title.text-center');
    await header.waitFor({ state: 'visible', timeout: 5000 });
    let text = await header.textContent();
    expect(text?.trim().toUpperCase()).toContain(testData.brands.poloHeader.toUpperCase());
    
    // Filter by Madame
    await homePage.clickBrandMadame();
});

Then('la página debe mostrar los productos filtrados de cada marca', async function (this: CustomWorld) {
    const header = this.page.locator('h2.title.text-center');
    await header.waitFor({ state: 'visible', timeout: 5000 });
    const text = await header.textContent();
    expect(text?.trim().toUpperCase()).toContain(testData.brands.madameHeader.toUpperCase());
});

When('abre el detalle del primer producto y envía una reseña', async function (this: CustomWorld) {
    const homePage = new HomePage(this.page);
    const productsPage = new ProductsPage(this.page);
    const productDetailPage = new ProductDetailPage(this.page);
    const user = testData.validUser;
    
    await homePage.clickProducts();
    await productsPage.clickViewProductOfFirstProduct();
    
    expect(await productDetailPage.isReviewHeaderVisible()).toBe(true);
    await productDetailPage.fillReview(user.name, user.email, testData.review.comment);
    await productDetailPage.submitReview();
});

Then('el mensaje de éxito de la reseña debe ser visible', async function (this: CustomWorld) {
    const productDetailPage = new ProductDetailPage(this.page);
    const successMsg = await productDetailPage.getReviewSuccessMessage();
    expect(successMsg).toContain(testData.review.successMessage);
});
