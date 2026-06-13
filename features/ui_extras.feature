Feature: Funcionalidades Adicionales de Interfaz de Usuario y Utilidades

  Scenario: Completar formulario de contacto exitosamente (Test Case 6)
    Given que el usuario navega a la página de inicio
    When hace clic en el botón "Contact Us" en la barra de navegación
    Then el usuario debería ver la sección "GET IN TOUCH"
    When ingresa los datos de contacto en el formulario
    And sube un archivo adjunto
    And hace clic en enviar formulario
    Then el formulario se envía y se visualiza el mensaje de éxito del contacto
    When hace clic en el botón de regresar a inicio
    Then el usuario verifica que la página de inicio se cargó correctamente

  Scenario: Verificar la página de casos de prueba (Test Case 7)
    Given que el usuario navega a la página de inicio
    When hace clic en el botón "Test Cases" en la barra de navegación
    Then el usuario debería ser redirigido a la página de test cases

  Scenario: Verificar suscripción en la página de inicio (Test Case 10)
    Given que el usuario navega a la página de inicio
    When se desliza hasta el footer
    Then la sección "SUBSCRIPTION" debe estar visible
    When ingresa un correo de suscripción y hace clic en el botón de flecha
    Then se debería mostrar el mensaje de éxito de suscripción

  Scenario: Verificar suscripción en la página del carrito (Test Case 11)
    Given que el usuario navega a la página de inicio
    When hace clic en el botón "Cart" en la barra de navegación
    And se desliza hasta el footer
    Then la sección "SUBSCRIPTION" debe estar visible
    When ingresa un correo de suscripción y hace clic en el botón de flecha
    Then se debería mostrar el mensaje de éxito de suscripción

  Scenario: Verificar scroll hacia arriba con el botón de flecha (Test Case 25)
    Given que el usuario navega a la página de inicio
    And el usuario verifica que la página de inicio se cargó correctamente
    When se desliza hasta el final de la página
    Then la sección "SUBSCRIPTION" debe estar visible
    When hace clic en la flecha de scroll de la esquina inferior derecha
    Then la página se desplaza hacia arriba y el texto del carrusel superior debe ser visible

  Scenario: Verificar scroll hacia arriba sin el botón de flecha (Test Case 26)
    Given que el usuario navega a la página de inicio
    And el usuario verifica que la página de inicio se cargó correctamente
    When se desliza hasta el final de la página
    Then la sección "SUBSCRIPTION" debe estar visible
    When se desliza manualmente hacia arriba de la página
    Then la página se desplaza hacia arriba y el texto del carrusel superior debe ser visible
