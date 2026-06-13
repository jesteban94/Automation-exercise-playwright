import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { UserApiClient } from '../api/UserApiClient';
import { CustomWorld } from '../support/hooks';

let homePage: HomePage;
let loginPage: LoginPage;

Given('que el usuario navega a la página de inicio', async function (this: CustomWorld) {
    homePage = new HomePage(this.page);
    await homePage.navigateToHome();
});

Given('hace clic en la opción de iniciar sesión o registrarse', async function () {
    await homePage.clickSignupLogin();
    loginPage = new LoginPage(this.page);
});

When('ingresa el correo {string} y la contraseña {string}', async function (email: string, password: string) {
    await loginPage.login(email, password);
});

Then('el usuario debería iniciar sesión correctamente y ver su nombre de usuario {string}', async function (username: string) {
    const isLoggedIn = await homePage.isLoggedInAs(username);
    expect(isLoggedIn).toBe(true);
});

Then('el usuario debería ver un mensaje de error que contiene {string}', async function (expectedError: string) {
    const errorText = await loginPage.getLoginErrorMessage();
    expect(errorText).toContain(expectedError);
});

Given('que existe un usuario registrado con el correo {string} y la contraseña {string}', async function (this: CustomWorld, email: string, password: string) {
    const userApiClient = new UserApiClient(this.apiContext);
    // Delete account first to make sure we start fresh
    await userApiClient.deleteAccount(email, password);
    // Create account
    const response = await userApiClient.createAccount(email, password, "SDET Test");
    expect(response.status()).toBe(200);
});
