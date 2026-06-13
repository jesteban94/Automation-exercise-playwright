import { Page } from '@playwright/test';

export class BasePage {
    protected readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigateTo(path: string): Promise<void> {
        await this.page.goto(path, { waitUntil: 'domcontentloaded' });
    }

    async getTitle(): Promise<string> {
        return this.page.title();
    }

    async getUrl(): Promise<string> {
        return this.page.url();
    }
}
