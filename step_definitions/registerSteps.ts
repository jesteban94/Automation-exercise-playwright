import { When, Then } from '@cucumber/cucumber';
import { expect, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { SignupPage, UserDetails } from '../pages/SignupPage';
import { HomePage } from '../pages/HomePage';
import { CustomWorld } from '../support/hooks';
import { testData } from '../support/testData';

let loginPage: LoginPage;
let signupPage: SignupPage;
let homePage: HomePage;
let randomEmail: string;

When('inicia el registro con el nombre del usuario de prueba y un correo aleatorio', async function (this: CustomWorld) {
    loginPage = new LoginPage(this.page);
    randomEmail = `sdet_test_${Date.now()}@example.com`;
    const name = testData.validUser.name;
    console.log(`[Registration] Registering user "${name}" with email "${randomEmail}"`);
    await loginPage.signupInit(name, randomEmail);
    signupPage = new SignupPage(this.page);
});

When('completa el formulario de registro con los datos de dirección y la contraseña del usuario de prueba', async function () {
    const user = testData.validUser;

    const userDetails: UserDetails = { 
        ...testData.defaultRegistrationDetails, 
        gender: testData.defaultRegistrationDetails.gender as 'Mr' | 'Mrs',
        password: user.password 
    };

    await signupPage.fillAccountDetails(userDetails);
});

When('hace clic en el botón de crear cuenta', async function () {
    await signupPage.clickCreateAccount();
});

Then('el usuario debería ver la confirmación de cuenta creada exitosamente', async function () {
    const isCreated = await signupPage.isAccountCreatedVisible();
    expect(isCreated).toBe(true);
    const text = await signupPage.accountCreatedHeader.textContent();
    const expectedMessage = testData.registration.accountCreatedBanner;
    expect(text?.trim().toUpperCase()).toBe(expectedMessage.toUpperCase());
});

Then('hace clic en continuar y debería ver su nombre en la barra de navegación', async function (this: CustomWorld) {
    await signupPage.clickContinue();
    homePage = new HomePage(this.page);
    const expectedUsername = testData.validUser.name;
    const isLoggedIn = await homePage.isLoggedInAs(expectedUsername);
    expect(isLoggedIn).toBe(true);
});

export async function performUserRegistration(page: Page, user: typeof testData.validUser) {
    const localLoginPage = new LoginPage(page);
    const localSignupPage = new SignupPage(page);
    
    const localRandomEmail = `sdet_test_${Date.now()}@example.com`;
    console.log(`[Registration Helper] Registering user "${user.name}" with email "${localRandomEmail}"`);
    await localLoginPage.signupInit(user.name, localRandomEmail);

    const userDetails: UserDetails = { 
        ...testData.defaultRegistrationDetails, 
        gender: testData.defaultRegistrationDetails.gender as 'Mr' | 'Mrs',
        password: user.password 
    };
    await localSignupPage.fillAccountDetails(userDetails);
    await localSignupPage.clickCreateAccount();
}

export async function verifyUserIsLoggedIn(page: Page, expectedUsername: string) {
    const localSignupPage = new SignupPage(page);
    const localHomePage = new HomePage(page);

    const isCreated = await localSignupPage.isAccountCreatedVisible();
    expect(isCreated).toBe(true);
    const text = await localSignupPage.accountCreatedHeader.textContent();
    expect(text?.trim().toUpperCase()).toBe(testData.registration.accountCreatedBanner.toUpperCase());

    await localSignupPage.clickContinue();
    const isLoggedIn = await localHomePage.isLoggedInAs(expectedUsername);
    expect(isLoggedIn).toBe(true);
}
