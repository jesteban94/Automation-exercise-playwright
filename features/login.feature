Feature: Inicio de Sesión de Usuario

  Background:
    Given que el usuario navega a la página de inicio
    And hace clic en la opción de iniciar sesión o registrarse

  @login @negative
  Scenario: Inicio de sesión fallido con credenciales inválidas (Test Case 3)
    When ingresa las credenciales de un usuario inválido
    Then el usuario debería ver el mensaje de error de credenciales incorrectas

  @smoke @login
  Scenario: Inicio de sesión exitoso con credenciales válidas (Test Case 2)
    Given que existe el usuario de prueba registrado
    When ingresa las credenciales del usuario de prueba
    Then el usuario debería iniciar sesión correctamente y ver su nombre en la barra de navegación
    And elimina la cuenta del usuario de prueba

  @regression @login
  Scenario: Cerrar sesión de usuario exitosamente (Test Case 4)
    Given que existe el usuario de prueba registrado
    And ingresa las credenciales del usuario de prueba
    Then el usuario debería iniciar sesión correctamente y ver su nombre en la barra de navegación
    When hace clic en el botón "Logout"
    Then el usuario debería ser redirigido a la página de login

  @regression @register @negative
  Scenario: Registro fallido con un correo electrónico existente (Test Case 5)
    Given que existe el usuario de prueba registrado
    When inicia el registro con el nombre del usuario de prueba y el correo existente
    Then el usuario debería ver el mensaje de error de correo ya registrado
