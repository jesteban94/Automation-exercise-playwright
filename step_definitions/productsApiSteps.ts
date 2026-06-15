import { Given, When, Then } from '@cucumber/cucumber';
import { expect, APIResponse } from '@playwright/test';
import { ProductClient } from '../api/ProductClient';
import { CustomWorld } from '../support/hooks';

let productClient: ProductClient;
let apiResponse: APIResponse;
let responseBody: any;

Given('que el servicio de productos está disponible', async function (this: CustomWorld) {
    productClient = new ProductClient(this.apiContext);
});

When('envío una solicitud GET para obtener todos los productos', async function () {
    apiResponse = await productClient.getProductsList();
    // Playwright realiza el parseo a JSON de manera segura automáticamente
    responseBody = await apiResponse.json();
});

Then('la respuesta de la API de productos debe tener un código de estado 200', async function () {
    // Verify HTTP status code
    expect(apiResponse.status()).toBe(200);
    // Automation Exercise API returns responseCode inside the JSON payload too
    if (responseBody && typeof responseBody.responseCode !== 'undefined') {
        expect(responseBody.responseCode).toBe(200);
    }
});

Then('la respuesta debe contener un listado de productos con ID y nombre', async function () {
    expect(responseBody).toHaveProperty('products');
    expect(Array.isArray(responseBody.products)).toBe(true);
    if (responseBody.products.length > 0) {
        const product = responseBody.products[0];
        expect(product).toHaveProperty('id');
        expect(product).toHaveProperty('name');
    }
});
