import { APIRequestContext, APIResponse } from '@playwright/test';

export class ProductClient {
    private request: APIRequestContext;
    private baseUrl: string;

    constructor(request: APIRequestContext) {
        this.request = request;
        this.baseUrl = 'https://automationexercise.com/api';
    }

    async getProductsList(): Promise<APIResponse> {
        const response = await this.request.get(`${this.baseUrl}/productsList`, {
            headers: {
                'Accept': 'application/json',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) PlaywrightTest'
            }
        });
        return response;
    }
}
