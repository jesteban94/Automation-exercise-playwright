import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
    readonly loginEmailInput: Locator;
    readonly loginPasswordInput: Locator;
    readonly loginButton: Locator;
    readonly loginErrorMessage: Locator;

    readonly signupNameInput: Locator;
    readonly signupEmailInput: Locator;
    readonly signupButton: Locator;
    readonly signupErrorMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.loginEmailInput = page.locator('input[data-qa="login-email"]');
        this.loginPasswordInput = page.locator('input[data-qa="login-password"]');
        this.loginButton = page.locator('button[data-qa="login-button"]');
        this.loginErrorMessage = page.locator('form[action="/login"] p');

        this.signupNameInput = page.locator('input[data-qa="signup-name"]');
        this.signupEmailInput = page.locator('input[data-qa="signup-email"]');
        this.signupButton = page.locator('button[data-qa="signup-button"]');
        this.signupErrorMessage = page.locator('form[action="/signup"] p');
    }

    async navigateToLogin(): Promise<void> {
        await this.navigateTo('https://automationexercise.com/login');
    }

    async login(email: string, password: string): Promise<void> {
        await this.loginEmailInput.fill(email);
        await this.loginPasswordInput.fill(password);
        await this.loginButton.click();
    }

    async signupInit(name: string, email: string): Promise<void> {
        await this.signupNameInput.fill(name);
        await this.signupEmailInput.fill(email);
        await this.signupButton.click();
    }

    async getLoginErrorMessage(): Promise<string | null> {
        await this.loginErrorMessage.waitFor({ state: 'visible', timeout: 5000 });
        return this.loginErrorMessage.textContent();
    }

    async getSignupErrorMessage(): Promise<string | null> {
        await this.signupErrorMessage.waitFor({ state: 'visible', timeout: 5000 });
        return this.signupErrorMessage.textContent();
        
    }
}

/* Repositorio ver cambios */
/* Repositorio ver cambios */
/* Repositorio ver cambios */