# language: es
Característica: Inicio de Sesión de Usuario

  Antecedentes:
    Dado que el usuario navega a la página de inicio
    Y hace clic en la opción de iniciar sesión o registrarse

  Escenario: Inicio de sesión fallido con credenciales inválidas
    Cuando ingresa el correo "usuario_invalido_cucumber@example.com" y la contraseña "claveincorrecta"
    Entonces el usuario debería ver un mensaje de error que contiene "Your email or password is incorrect!"

  Escenario: Inicio de sesión exitoso con credenciales válidas
    Dado que existe un usuario registrado con el correo "sdet_test_playwright_cucumber@example.com" y la contraseña "Password123!"
    Cuando ingresa el correo "sdet_test_playwright_cucumber@example.com" y la contraseña "Password123!"
    Entonces el usuario debería iniciar sesión correctamente y ver su nombre de usuario "SDET Test"
