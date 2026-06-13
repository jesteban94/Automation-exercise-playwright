import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ContactUsPage extends BasePage {
    readonly getInTouchHeader: Locator;
    readonly nameInput: Locator;
    readonly emailInput: Locator;
    readonly subjectInput: Locator;
    readonly messageTextArea: Locator;
    readonly uploadFileInput: Locator;
    readonly submitBtn: Locator;
    readonly successBanner: Locator;
    readonly homeLink: Locator;

    constructor(page: Page) {
        super(page);
        this.getInTouchHeader = page.locator('h2.title:has-text("Get In Touch")');
        this.nameInput = page.locator('input[data-qa="name"]');
        this.emailInput = page.locator('input[data-qa="email"]');
        this.subjectInput = page.locator('input[data-qa="subject"]');
        this.messageTextArea = page.locator('textarea[data-qa="message"]');
        this.uploadFileInput = page.locator('input[name="upload_file"]');
        this.submitBtn = page.locator('input[data-qa="submit-button"]');
        this.successBanner = page.locator('.status.alert.alert-success');
        this.homeLink = page.locator('a.btn.btn-success:has-text("Home")');
    }

    async isGetInTouchVisible(): Promise<boolean> {
        try {
            await this.getInTouchHeader.waitFor({ state: 'visible', timeout: 5000 });
            return await this.getInTouchHeader.isVisible();
        } catch {
            return false;
        }
    }

    async fillContactForm(name: string, email: string, subject: string, message: string): Promise<void> {
        await this.nameInput.fill(name);
        await this.emailInput.fill(email);
        await this.subjectInput.fill(subject);
        await this.messageTextArea.fill(message);
    }

    async uploadFile(filePath: string): Promise<void> {
        await this.uploadFileInput.setInputFiles(filePath);
    }

    async submitForm(): Promise<void> {
        await this.submitBtn.scrollIntoViewIfNeeded();
        await this.submitBtn.click({ force: true });
    }

    async getSuccessMessage(): Promise<string | null> {
        await this.successBanner.waitFor({ state: 'visible', timeout: 5000 });
        return await this.successBanner.textContent();
    }

    async clickHome(): Promise<void> {
        await this.homeLink.click();
    }
}
