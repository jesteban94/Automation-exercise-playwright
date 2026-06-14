Feature: Funcionalidades Adicionales de Interfaz de Usuario y Utilidades

  Scenario: Completar formulario de contacto exitosamente (Test Case 6)
    Given que el usuario navega a la página de inicio
    When envía el formulario de contacto con un archivo adjunto
    Then el mensaje de éxito del contacto debe ser visible
    And regresa a la página de inicio y valida su carga

  Scenario: Verificar la página de casos de prueba (Test Case 7)
    Given que el usuario navega a la página de inicio
    When hace clic en el botón "Test Cases" en la barra de navegación
    Then el usuario debería ser redirigido a la página de test cases

  Scenario: Verificar suscripción en la página de inicio (Test Case 10)
    Given que el usuario navega a la página de inicio
    When se suscribe desde el footer de la página
    Then se debería mostrar el mensaje de éxito de suscripción

  Scenario: Verificar suscripción en la página del carrito (Test Case 11)
    Given que el usuario navega a la página de inicio
    When va al carrito y se suscribe desde el footer
    Then se debería mostrar el mensaje de éxito de suscripción

  Scenario: Verificar scroll hacia arriba con el botón de flecha (Test Case 25)
    Given que el usuario navega a la página de inicio
    When se desplaza al final de la página y usa el botón de scroll hacia arriba
    Then la página debe subir y mostrar el carrusel superior

  Scenario: Verificar scroll hacia arriba sin el botón de flecha (Test Case 26)
    Given que el usuario navega a la página de inicio
    When se desplaza al final de la página y sube manualmente
    Then la página debe subir y mostrar el carrusel superior
