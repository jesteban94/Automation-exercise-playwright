Feature: HU02 - Inicio de Sesión de Usuario (Team C)

  Background:
    Given que el usuario navega a la página de inicio
    And hace clic en la opción de iniciar sesión o registrarse

  @smoke @login @teamC
  Scenario: Inicio de sesión exitoso con credenciales válidas
    Given que existe el usuario de prueba registrado
    When ingresa las credenciales del usuario de prueba
    Then el usuario debería iniciar sesión correctamente y ver su nombre en la barra de navegación

  @login @negative @teamC
  Scenario: Inicio de sesión fallido con credenciales incorrectas
    When ingresa las credenciales de un usuario inválido
    Then el usuario debería ver el mensaje de error de credenciales incorrectas

  @regression @login @teamC
  Scenario: Cerrar sesión activa de usuario
    Given que existe el usuario de prueba registrado
    And ingresa las credenciales del usuario de prueba
    Then el usuario debería iniciar sesión correctamente y ver su nombre en la barra de navegación
    When hace clic en el botón "Logout"
    Then el usuario debería ser redirigido a la página de login
