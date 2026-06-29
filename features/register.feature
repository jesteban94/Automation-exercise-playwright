Feature: HU01 - Registro de Nuevo Usuario (Team C)

  Background:
    Given que el usuario navega a la página de inicio
    And hace clic en la opción de iniciar sesión o registrarse

  @smoke @register @teamC
  Scenario: Registro exitoso de un nuevo usuario en la plataforma
    When inicia el registro con el nombre del usuario de prueba y un correo aleatorio
    And completa el formulario de registro con los datos de dirección y la contraseña del usuario de prueba
    And hace clic en el botón de crear cuenta
    Then el usuario debería ver la confirmación de cuenta creada exitosamente
    And hace clic en continuar y debería ver su nombre en la barra de navegación

  @regression @register @negative @teamC
  Scenario: Intento de registro con un correo electrónico existente
    Given que existe el usuario de prueba registrado
    When inicia el registro con el nombre del usuario de prueba y el correo existente
    Then el usuario debería ver el mensaje de error de correo ya registrado
