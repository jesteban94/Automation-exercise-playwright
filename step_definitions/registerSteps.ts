import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { SignupPage, UserDetails } from '../pages/SignupPage';
import { HomePage } from '../pages/HomePage';
import { CustomWorld } from '../support/hooks';
import { testData } from '../support/testData';

export async function performUserRegistration(page: any, user: typeof testData.validUser) {
    const loginPage = new LoginPage(page);
    const signupPage = new SignupPage(page);
    
    const randomEmail = `sdet_test_${Date.now()}@example.com`;
    console.log(`[Registration] Registering user "${user.name}" with email "${randomEmail}"`);
    await loginPage.signupInit(user.name, randomEmail);

    const userDetails: UserDetails = {
        gender: 'Mr',
        password: user.password,
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
    await signupPage.clickCreateAccount();
}

export async function verifyUserIsLoggedIn(page: any, expectedUsername: string) {
    const signupPage = new SignupPage(page);
    const homePage = new HomePage(page);

    const isCreated = await signupPage.isAccountCreatedVisible();
    expect(isCreated).toBe(true);
    const text = await signupPage.accountCreatedHeader.textContent();
    expect(text?.trim().toUpperCase()).toBe(testData.registration.accountCreatedBanner.toUpperCase());

    await signupPage.clickContinue();
    const isLoggedIn = await homePage.isLoggedInAs(expectedUsername);
    expect(isLoggedIn).toBe(true);
}

When('registra una nueva cuenta de usuario con datos válidos', async function (this: CustomWorld) {
    await performUserRegistration(this.page, testData.validUser);
});

Then('el usuario debería estar registrado y ver su nombre en la barra de navegación', async function (this: CustomWorld) {
    await verifyUserIsLoggedIn(this.page, testData.validUser.name);
});
