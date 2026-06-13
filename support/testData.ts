export const testData = {
    validUser: {
        name: "SDET Test",
        email: "sdet_test_playwright_cucumber@example.com",
        password: "Password123!"
    },
    invalidUser: {
        email: "usuario_invalido_cucumber@example.com",
        password: "claveincorrecta",
        expectedError: "Your email or password is incorrect!"
    },
    registration: {
        // Shared expected banners or messages
        accountCreatedBanner: "ACCOUNT CREATED!"
    }
};
