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
    responseBody = await apiResponse.json();
});

Then('la respuesta de la API de productos debe tener un código de estado 200', async function () {
    expect(apiResponse.status()).toBe(200);
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

When('envío una solicitud POST para buscar el producto {string}', async function (searchTerm: string) {
    apiResponse = await productClient.searchProduct(searchTerm);
    responseBody = await apiResponse.json();
});

Then('la respuesta de la API de búsqueda debe contener productos coincidentes', async function () {
    expect(responseBody).toHaveProperty('products');
    expect(Array.isArray(responseBody.products)).toBe(true);
    expect(responseBody.products.length).toBeGreaterThan(0);
});

Then('la respuesta de la API de búsqueda debe indicar un error o vacía de forma controlada', async function () {
    // BUG-11 (Deliberate): Expects 200 responseCode, but the real Automation Exercise API responds with responseCode 400 for invalid/empty/special character parameter.
    // The student must change this to expect(responseBody.responseCode).toBe(400) to fix the test and align it with BUG-02 / EJ-A1.
    expect(responseBody.responseCode).toBe(200); 
});
