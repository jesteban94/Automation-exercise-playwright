import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import * as path from 'path';
import { HomePage } from '../pages/HomePage';
import { ContactUsPage } from '../pages/ContactUsPage';
import { CustomWorld } from '../support/hooks';
import { testData } from '../support/testData';

When('envía el formulario de contacto con un archivo adjunto', async function (this: CustomWorld) {
    const homePage = new HomePage(this.page);
    const contactUsPage = new ContactUsPage(this.page);
    const contact = testData.contactUs;
    
    // Go to contact page
    await homePage.clickContactUs();
    expect(await contactUsPage.isGetInTouchVisible()).toBe(true);
    
    // Fill details
    await contactUsPage.fillContactForm(contact.name, contact.email, contact.subject, contact.message);
    
    // Upload file
    const filePath = path.resolve(__dirname, '../support/upload_sample.txt');
    await contactUsPage.uploadFile(filePath);
    
    // Submit
    await this.page.waitForTimeout(500); // Wait for JS binding
    await contactUsPage.submitForm();
});

Then('el mensaje de éxito del contacto debe ser visible', async function (this: CustomWorld) {
    const contactUsPage = new ContactUsPage(this.page);
    const text = await contactUsPage.getSuccessMessage();
    expect(text?.trim()).toContain(testData.contactUs.successMessage);
});

Then('regresa a la página de inicio y valida su carga', async function (this: CustomWorld) {
    const contactUsPage = new ContactUsPage(this.page);
    const homePage = new HomePage(this.page);
    await contactUsPage.clickHome();
    
    const title = await homePage.getTitle();
    expect(title).toContain('Automation Exercise');
});

When('hace clic en el botón "Test Cases" en la barra de navegación', async function (this: CustomWorld) {
    const homePage = new HomePage(this.page);
    await homePage.clickTestCases();
});

Then('el usuario debería ser redirigido a la página de test cases', async function (this: CustomWorld) {
    const homePage = new HomePage(this.page);
    const url = await homePage.getUrl();
    expect(url).toContain('/test_cases');
});

When('se suscribe desde el footer de la página', async function (this: CustomWorld) {
    const homePage = new HomePage(this.page);
    await homePage.scrollDownToFooter();
    expect(await homePage.isSubscriptionTitleVisible()).toBe(true);
    await homePage.subscribe(testData.validUser.email);
});

Then('se debería mostrar el mensaje de éxito de suscripción', async function (this: CustomWorld) {
    const homePage = new HomePage(this.page);
    const successMsg = await homePage.getSubscriptionSuccessMessage();
    expect(successMsg?.trim()).toContain(testData.subscription.successMessage);
});

When('va al carrito y se suscribe desde el footer', async function (this: CustomWorld) {
    const homePage = new HomePage(this.page);
    await homePage.clickCart();
    await homePage.scrollDownToFooter();
    expect(await homePage.isSubscriptionTitleVisible()).toBe(true);
    await homePage.subscribe(testData.validUser.email);
});

When('se desplaza al final de la página y usa el botón de scroll hacia arriba', async function (this: CustomWorld) {
    const homePage = new HomePage(this.page);
    await homePage.scrollPageToBottom();
    expect(await homePage.isSubscriptionTitleVisible()).toBe(true);
    await homePage.clickScrollUpArrow();
});

Then('la página debe subir y mostrar el carrusel superior', async function (this: CustomWorld) {
    const homePage = new HomePage(this.page);
    expect(await homePage.isCarouselTextVisible()).toBe(true);
});

When('se desplaza al final de la página y sube manualmente', async function (this: CustomWorld) {
    const homePage = new HomePage(this.page);
    await homePage.scrollPageToBottom();
    expect(await homePage.isSubscriptionTitleVisible()).toBe(true);
    await homePage.scrollPageToTop();
});
