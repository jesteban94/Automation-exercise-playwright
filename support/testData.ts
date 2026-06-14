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
        accountCreatedBanner: "ACCOUNT CREATED!",
        accountDeletedBanner: "ACCOUNT DELETED!",
        emailExistsError: "Email Address already exist!"
    },
    contactUs: {
        name: "SDET Contact",
        email: "sdet_contact@example.com",
        subject: "Soporte Técnico - Reporte de Error",
        message: "Hola, esto es una prueba automatizada del formulario de Contact Us usando Playwright y Cucumber. Saludos.",
        successMessage: "Success! Your details have been submitted successfully."
    },
    subscription: {
        successMessage: "You have been successfully subscribed!"
    },
    payment: {
        nameOnCard: "SDET Test Card",
        cardNumber: "4111222233334444",
        cvc: "321",
        expiryMonth: "12",
        expiryYear: "2028",
        successMessage: "ORDER PLACED!"
    },
    categories: {
        womenTopsHeader: "WOMEN - TOPS PRODUCTS",
        menTshirtsHeader: "MEN - TSHIRTS PRODUCTS"
    },
    brands: {
        poloHeader: "BRAND - POLO PRODUCTS",
        madameHeader: "BRAND - MADAME PRODUCTS"
    },
    checkout: {
        quantity: "4",
        comment: "Comentario de prueba - pedido automatizado",
        successMessage: "ORDER PLACED!"
    },
    review: {
        comment: "Excelente producto, muy recomendado por su calidad y precio.",
        successMessage: "Thank you for your review."
    },
    address: {
        street: "742 Evergreen Terrace",
        city: "Springfield"
    },
    search: {
        productName: "Blue Top"
    }
};
