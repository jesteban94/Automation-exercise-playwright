import { Before, After, BeforeAll, AfterAll, setWorldConstructor, World, IWorldOptions, Status, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, Browser, BrowserContext, Page, APIRequestContext, request } from '@playwright/test';

// Set global timeout for Cucumber steps to 40 seconds
setDefaultTimeout(40000);

let browser: Browser;

export class CustomWorld extends World {
  public apiContext!: APIRequestContext;
  public context!: BrowserContext;
  public page!: Page;
  public downloadedInvoicePath?: string;

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
        args: ['--start-maximized', '--no-sandbox', '--disable-setuid-sandbox']
    });
});

Before(async function (this: CustomWorld) {
    // Create new context with viewport: null for full screen / maximized browser
    this.context = await browser.newContext({
        viewport: null,
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    });
    this.page = await this.context.newPage();
    
    // Block Google Ads and analytics to prevent click interceptions and speed up page load
    await this.page.route('**/*googlesyndication*', route => route.abort());
    await this.page.route('**/*googleadservices*', route => route.abort());
    await this.page.route('**/*google-analytics*', route => route.abort());
    await this.page.route('**/*doubleclick*', route => route.abort());
    await this.page.route('**/*adsbygoogle*', route => route.abort());

    this.apiContext = await request.newContext();
    
    // Register global dialog listener to auto-accept all dialogs (alerts, confirms)
    this.page.on('dialog', async dialog => {
        console.log(`[Dialog Hooked]: type=${dialog.type()}, message="${dialog.message()}"`);
        await dialog.accept();
        console.log('[Dialog Accepted]');
    });
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
