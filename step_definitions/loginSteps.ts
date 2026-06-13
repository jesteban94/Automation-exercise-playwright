import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { UserApiClient } from '../api/UserApiClient';
import { CustomWorld } from '../support/hooks';
import { testData } from '../support/testData';

let homePage: HomePage;
let loginPage: LoginPage;

Given('que el usuario navega a la página de inicio', async function (this: CustomWorld) {
    homePage = new HomePage(this.page);
    await homePage.navigateToHome();
});

Given('hace clic en la opción de iniciar sesión o registrarse', async function () {
    await homePage.clickSignupLogin();
    loginPage = new LoginPage(homePage['page']);
});

Given('que existe el usuario de prueba registrado', async function (this: CustomWorld) {
    const userApiClient = new UserApiClient(this.apiContext);
    const user = testData.validUser;
    // Delete account first to make sure we start fresh
    await userApiClient.deleteAccount(user.email, user.password);
    // Create account
    const response = await userApiClient.createAccount(user.email, user.password, user.name);
    expect(response.status()).toBe(200);
});

When('ingresa las credenciales del usuario de prueba', async function () {
    const user = testData.validUser;
    await loginPage.login(user.email, user.password);
});

Then('el usuario debería iniciar sesión correctamente y ver su nombre en la barra de navegación', async function () {
    const user = testData.validUser;
    const isLoggedIn = await homePage.isLoggedInAs(user.name);
    expect(isLoggedIn).toBe(true);
});

When('ingresa las credenciales de un usuario inválido', async function () {
    const user = testData.invalidUser;
    await loginPage.login(user.email, user.password);
});

Then('el usuario debería ver el mensaje de error de credenciales incorrectas', async function () {
    const user = testData.invalidUser;
    const errorText = await loginPage.getLoginErrorMessage();
    expect(errorText).toContain(user.expectedError);
});
