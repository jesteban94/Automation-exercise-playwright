Feature: Registro de Nuevo Usuario

  Scenario: Registro exitoso de un nuevo usuario en la plataforma
    Given que el usuario navega a la página de inicio
    And hace clic en la opción de iniciar sesión o registrarse
    When inicia el registro con el nombre "SDET Test" y un correo aleatorio
    And completa el formulario de registro con datos de dirección y contraseña "Password123!"
    And hace clic en el botón de crear cuenta
    Then el usuario debería ver la confirmación de cuenta creada "ACCOUNT CREATED!"
    And hace clic en continuar y debería ver su nombre de usuario "SDET Test" en la barra de navegación
