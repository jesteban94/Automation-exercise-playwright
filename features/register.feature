Feature: Registro de Nuevo Usuario

  @smoke
  Scenario: Registro exitoso de un nuevo usuario en la plataforma
    Given que el usuario navega a la página de inicio
    And hace clic en la opción de iniciar sesión o registrarse
    When registra una nueva cuenta de usuario con datos válidos
    Then el usuario debería estar registrado y ver su nombre en la barra de navegación
