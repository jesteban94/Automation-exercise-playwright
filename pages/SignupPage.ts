import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export interface UserDetails {
    gender: 'Mr' | 'Mrs';
    password: string;
    day: string;
    month: string;
    year: string;
    newsletter: boolean;
    optin: boolean;
    firstName: string;
    lastName: string;
    company: string;
    address: string;
    address2?: string;
    country: string;
    state: string;
    city: string;
    zipcode: string;
    mobileNumber: string;
}

export class SignupPage extends BasePage {
    readonly genderMrRadio: Locator;
    readonly genderMrsRadio: Locator;
    readonly passwordInput: Locator;
    readonly daysSelect: Locator;
    readonly monthsSelect: Locator;
    readonly yearsSelect: Locator;
    readonly newsletterCheckbox: Locator;
    readonly optinCheckbox: Locator;

    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly companyInput: Locator;
    readonly addressInput: Locator;
    readonly address2Input: Locator;
    readonly countrySelect: Locator;
    readonly stateInput: Locator;
    readonly cityInput: Locator;
    readonly zipcodeInput: Locator;
    readonly mobileNumberInput: Locator;
    readonly createAccountButton: Locator;

    readonly accountCreatedHeader: Locator;
    readonly continueButton: Locator;

    constructor(page: Page) {
        super(page);
        this.genderMrRadio = page.locator('input#id_gender1');
        this.genderMrsRadio = page.locator('input#id_gender2');
        this.passwordInput = page.locator('input[data-qa="password"]');
        this.daysSelect = page.locator('select#days');
        this.monthsSelect = page.locator('select#months');
        this.yearsSelect = page.locator('select#years');
        this.newsletterCheckbox = page.locator('input#newsletter');
        this.optinCheckbox = page.locator('input#optin');

        this.firstNameInput = page.locator('input[data-qa="first_name"]');
        this.lastNameInput = page.locator('input[data-qa="last_name"]');
        this.companyInput = page.locator('input[data-qa="company"]');
        this.addressInput = page.locator('input[data-qa="address"]');
        this.address2Input = page.locator('input[data-qa="address2"]');
        this.countrySelect = page.locator('select#country');
        this.stateInput = page.locator('input[data-qa="state"]');
        this.cityInput = page.locator('input[data-qa="city"]');
        this.zipcodeInput = page.locator('input[data-qa="zipcode"]');
        this.mobileNumberInput = page.locator('input[data-qa="mobile_number"]');
        this.createAccountButton = page.locator('button[data-qa="create-account"]');

        this.accountCreatedHeader = page.locator('h2[data-qa="account-created"]');
        this.continueButton = page.locator('a[data-qa="continue-button"]');
    }

    async fillAccountDetails(details: UserDetails): Promise<void> {
        // Select gender
        if (details.gender === 'Mr') {
            await this.genderMrRadio.check();
        } else {
            await this.genderMrsRadio.check();
        }

        // Fill Password
        await this.passwordInput.fill(details.password);

        // Select Date of Birth
        await this.daysSelect.selectOption(details.day);
        await this.monthsSelect.selectOption(details.month);
        await this.yearsSelect.selectOption(details.year);

        // Check checkboxes if required
        if (details.newsletter) {
            await this.newsletterCheckbox.check();
        }
        if (details.optin) {
            await this.optinCheckbox.check();
        }

        // Address Information
        await this.firstNameInput.fill(details.firstName);
        await this.lastNameInput.fill(details.lastName);
        await this.companyInput.fill(details.company);
        await this.addressInput.fill(details.address);
        if (details.address2) {
            await this.address2Input.fill(details.address2);
        }
        await this.countrySelect.selectOption(details.country);
        await this.stateInput.fill(details.state);
        await this.cityInput.fill(details.city);
        await this.zipcodeInput.fill(details.zipcode);
        await this.mobileNumberInput.fill(details.mobileNumber);
    }

    async clickCreateAccount(): Promise<void> {
        await this.createAccountButton.click();
    }

    async isAccountCreatedVisible(): Promise<boolean> {
        try {
            await this.accountCreatedHeader.waitFor({ state: 'visible', timeout: 5000 });
            return await this.accountCreatedHeader.isVisible();
        } catch {
            return false;
        }
    }

    async clickContinue(): Promise<void> {
        await this.continueButton.click();
    }
}
