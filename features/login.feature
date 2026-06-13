Feature: Inicio de Sesión de Usuario

  Background:
    Given que el usuario navega a la página de inicio
    And hace clic en la opción de iniciar sesión o registrarse

  Scenario: Inicio de sesión fallido con credenciales inválidas
    When ingresa el correo "usuario_invalido_cucumber@example.com" y la contraseña "claveincorrecta"
    Then el usuario debería ver un mensaje de error que contiene "Your email or password is incorrect!"

  Scenario: Inicio de sesión exitoso con credenciales válidas
    Given que existe un usuario registrado con el correo "sdet_test_playwright_cucumber@example.com" y la contraseña "Password123!"
    When ingresa el correo "sdet_test_playwright_cucumber@example.com" y la contraseña "Password123!"
    Then el usuario debería iniciar sesión correctamente y ver su nombre de usuario "SDET Test"
