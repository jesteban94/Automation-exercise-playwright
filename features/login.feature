Feature: Inicio de Sesión de Usuario

  Background:
    Given que el usuario navega a la página de inicio
    And hace clic en la opción de iniciar sesión o registrarse

  Scenario: Inicio de sesión fallido con credenciales inválidas
    When ingresa las credenciales de un usuario inválido
    Then el usuario debería ver el mensaje de error de credenciales incorrectas

  @smoke
  Scenario: Inicio de sesión exitoso con credenciales válidas
    Given que existe el usuario de prueba registrado
    When ingresa las credenciales del usuario de prueba
    Then el usuario debería iniciar sesión correctamente y ver su nombre en la barra de navegación
