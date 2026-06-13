import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { SignupPage, UserDetails } from '../pages/SignupPage';
import { HomePage } from '../pages/HomePage';
import { CustomWorld } from '../support/hooks';

let loginPage: LoginPage;
let signupPage: SignupPage;
let homePage: HomePage;
let randomEmail: string;

When('inicia el registro con el nombre {string} y un correo aleatorio', async function (this: CustomWorld, name: string) {
    loginPage = new LoginPage(this.page);
    randomEmail = `sdet_test_${Date.now()}@example.com`;
    // We can print it for traceability in CI logs
    console.log(`[Registration] Registering user "${name}" with email "${randomEmail}"`);
    await loginPage.signupInit(name, randomEmail);
    signupPage = new SignupPage(this.page);
});

When('completa el formulario de registro con datos de dirección y contraseña {string}', async function (password: string) {
    const userDetails: UserDetails = {
        gender: 'Mr',
        password: password,
        day: '15',
        month: 'August',
        year: '1990',
        newsletter: true,
        optin: false,
        firstName: 'SDET',
        lastName: 'Test',
        company: 'Automation Org',
        address: '742 Evergreen Terrace',
        address2: 'Apt 4B',
        country: 'United States',
        state: 'Springfield',
        city: 'Springfield',
        zipcode: '97477',
        mobileNumber: '555-0199'
    };
    await signupPage.fillAccountDetails(userDetails);
});

When('hace clic en el botón de crear cuenta', async function () {
    await signupPage.clickCreateAccount();
});

Then('el usuario debería ver la confirmación de cuenta creada {string}', async function (expectedMessage: string) {
    const isCreated = await signupPage.isAccountCreatedVisible();
    expect(isCreated).toBe(true);
    const text = await signupPage.accountCreatedHeader.textContent();
    expect(text?.trim().toUpperCase()).toBe(expectedMessage.toUpperCase());
});

Then('hace clic en continuar y debería ver su nombre de usuario {string} en la barra de navegación', async function (this: CustomWorld, expectedUsername: string) {
    await signupPage.clickContinue();
    homePage = new HomePage(this.page);
    const isLoggedIn = await homePage.isLoggedInAs(expectedUsername);
    expect(isLoggedIn).toBe(true);
});
