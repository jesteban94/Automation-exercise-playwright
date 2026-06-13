import { Before, After, BeforeAll, AfterAll, setWorldConstructor, World, IWorldOptions, Status } from '@cucumber/cucumber';
import { chromium, Browser, BrowserContext, Page, APIRequestContext, request } from '@playwright/test';

let browser: Browser;

export class CustomWorld extends World {
  public apiContext!: APIRequestContext;
  public context!: BrowserContext;
  public page!: Page;

  constructor(options: IWorldOptions) {
    super(options);
  }
}

setWorldConstructor(CustomWorld);

BeforeAll(async function () {
    // Execute headless in CI or if HEADLESS env is true. Otherwise headed.
    const headless = process.env.CI === 'true' || process.env.HEADLESS === 'true';
    browser = await chromium.launch({
        headless,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
});

Before(async function (this: CustomWorld) {
    // Create new context with specified viewport
    this.context = await browser.newContext({
        viewport: { width: 1280, height: 720 },
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    });
    this.page = await this.context.newPage();
    this.apiContext = await request.newContext();
});

After(async function (this: CustomWorld, scenario) {
    // Capture screenshot if scenario fails
    if (scenario.result?.status === Status.FAILED) {
        try {
            const screenshot = await this.page.screenshot({ 
                type: 'png'
            });
            await this.attach(screenshot, 'image/png');
            console.log(`[Screenshot Attached] Scenario failed: "${scenario.pickle.name}"`);
        } catch (error) {
            console.error('Failed to capture screenshot on failure:', error);
        }
    }

    // Clean up
    if (this.page) {
        await this.page.close();
    }
    if (this.context) {
        await this.context.close();
    }
    if (this.apiContext) {
        await this.apiContext.dispose();
    }
});

AfterAll(async function () {
    if (browser) {
        await browser.close();
    }
});
