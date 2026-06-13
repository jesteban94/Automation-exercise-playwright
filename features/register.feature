# language: es
Característica: Registro de Nuevo Usuario

  Escenario: Registro exitoso de un nuevo usuario en la plataforma
    Dado que el usuario navega a la página de inicio
    Y hace clic en la opción de iniciar sesión o registrarse
    Cuando inicia el registro con el nombre "SDET Test" y un correo aleatorio
    Y completa el formulario de registro con datos de dirección y contraseña "Password123!"
    Y hace clic en el botón de crear cuenta
    Entonces el usuario debería ver la confirmación de cuenta creada "ACCOUNT CREATED!"
    Y hace clic en continuar y debería ver su nombre de usuario "SDET Test" en la barra de navegación
