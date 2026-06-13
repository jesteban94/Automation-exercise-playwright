import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import * as path from 'path';
import { HomePage } from '../pages/HomePage';
import { ContactUsPage } from '../pages/ContactUsPage';
import { CustomWorld } from '../support/hooks';
import { testData } from '../support/testData';

When('hace clic en el botón "Contact Us" en la barra de navegación', async function (this: CustomWorld) {
    const homePage = new HomePage(this.page);
    await homePage.clickContactUs();
});

Then('el usuario debería ver la sección "GET IN TOUCH"', async function (this: CustomWorld) {
    const contactUsPage = new ContactUsPage(this.page);
    expect(await contactUsPage.isGetInTouchVisible()).toBe(true);
});

When('ingresa los datos de contacto en el formulario', async function (this: CustomWorld) {
    const contactUsPage = new ContactUsPage(this.page);
    const contact = testData.contactUs;
    await contactUsPage.fillContactForm(contact.name, contact.email, contact.subject, contact.message);
});

When('sube un archivo adjunto', async function (this: CustomWorld) {
    const contactUsPage = new ContactUsPage(this.page);
    const filePath = path.resolve(__dirname, '../support/upload_sample.txt');
    await contactUsPage.uploadFile(filePath);
});

When('hace clic en enviar formulario', async function (this: CustomWorld) {
    const contactUsPage = new ContactUsPage(this.page);
    await this.page.waitForTimeout(500); // Give JS event listener a chance to register
    await contactUsPage.submitForm();
});

Then('el formulario se envía y se visualiza el mensaje de éxito del contacto', async function (this: CustomWorld) {
    const contactUsPage = new ContactUsPage(this.page);
    const text = await contactUsPage.getSuccessMessage();
    expect(text?.trim()).toContain(testData.contactUs.successMessage);
});

When('hace clic en el botón de regresar a inicio', async function (this: CustomWorld) {
    const contactUsPage = new ContactUsPage(this.page);
    await contactUsPage.clickHome();
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

When('se desliza hasta el footer', async function (this: CustomWorld) {
    const homePage = new HomePage(this.page);
    await homePage.scrollDownToFooter();
});

Then('la sección "SUBSCRIPTION" debe estar visible', async function (this: CustomWorld) {
    const homePage = new HomePage(this.page);
    expect(await homePage.isSubscriptionTitleVisible()).toBe(true);
});

When('ingresa un correo de suscripción y hace clic en el botón de flecha', async function (this: CustomWorld) {
    const homePage = new HomePage(this.page);
    await homePage.subscribe(testData.validUser.email);
});

Then('se debería mostrar el mensaje de éxito de suscripción', async function (this: CustomWorld) {
    const homePage = new HomePage(this.page);
    const successMsg = await homePage.getSubscriptionSuccessMessage();
    expect(successMsg?.trim()).toContain(testData.subscription.successMessage);
});

When('hace clic en la flecha de scroll de la esquina inferior derecha', async function (this: CustomWorld) {
    const homePage = new HomePage(this.page);
    await homePage.clickScrollUpArrow();
});

Then('la página se desplaza hacia arriba y el texto del carrusel superior debe ser visible', async function (this: CustomWorld) {
    const homePage = new HomePage(this.page);
    expect(await homePage.isCarouselTextVisible()).toBe(true);
});

When('se desliza manualmente hacia arriba de la página', async function (this: CustomWorld) {
    const homePage = new HomePage(this.page);
    await homePage.scrollPageToTop();
});
