import { APIRequestContext, APIResponse } from '@playwright/test';

export class UserApiClient {
    private request: APIRequestContext;
    private baseUrl: string;

    constructor(request: APIRequestContext) {
        this.request = request;
        this.baseUrl = 'https://automationexercise.com/api';
    }

    async deleteAccount(email: string, password: string): Promise<APIResponse> {
        return await this.request.post(`${this.baseUrl}/deleteAccount`, {
            form: {
                email,
                password
            },
            headers: {
                'Accept': 'application/json',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) PlaywrightTest'
            }
        });
    }

    async createAccount(email: string, password: string, name: string): Promise<APIResponse> {
        return await this.request.post(`${this.baseUrl}/createAccount`, {
            form: {
                name,
                email,
                password,
                title: 'Mr',
                birth_date: '15',
                birth_month: 'August',
                birth_year: '1990',
                firstname: 'SDET',
                lastname: 'Test',
                company: 'Automation Org',
                address1: '742 Evergreen Terrace',
                address2: 'Apt 4B',
                country: 'United States',
                zipcode: '97477',
                state: 'Springfield',
                city: 'Springfield',
                mobile_number: '555-0199'
            },
            headers: {
                'Accept': 'application/json',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) PlaywrightTest'
            }
        });
    }
}
