Feature: Gestión de Carrito de Compras y Procesamiento de Órdenes

  Scenario: Agregar productos al carrito (Test Case 12)
    Given que el usuario navega a la página de inicio
    When hace clic en el botón "Products" en la barra de navegación
    And agrega el primer producto al carrito y continúa comprando
    And agrega el segundo producto al carrito y va al carrito
    Then la página del carrito debe mostrarse
    And ambos productos deben estar visibles en el carrito con sus respectivos precios, cantidades y totales

  Scenario: Verificar cantidad del producto en el carrito (Test Case 13)
    Given que el usuario navega a la página de inicio
    When hace clic en "View Product" del primer producto
    Then el usuario es redirigido a la página de detalle del producto
    When aumenta la cantidad del producto a "4" y hace clic en agregar al carrito
    And hace clic en ver carrito
    Then la página del carrito debe mostrarse
    And el producto debe tener la cantidad exacta de "4" en el carrito

  Scenario: Remover productos del carrito (Test Case 17)
    Given que el usuario navega a la página de inicio
    When agrega el primer producto al carrito y va al carrito
    Then la página del carrito debe mostrarse
    When hace clic en el botón de eliminar del primer producto
    Then el producto debe eliminarse del carrito

  Scenario: Agregar al carrito desde elementos recomendados (Test Case 22)
    Given que el usuario navega a la página de inicio
    When se desliza hasta el final de la página
    Then la sección "RECOMMENDED ITEMS" debe ser visible
    When hace clic en agregar al carrito en el primer producto recomendado
    And hace clic en ver carrito en el modal de recomendados
    Then la página del carrito debe mostrarse
    And el producto recomendado debe estar visible en el carrito

  Scenario: Buscar productos y verificar carrito después del login (Test Case 20)
    Given que el usuario navega a la página de inicio
    And que existe el usuario de prueba registrado
    When hace clic en el botón "Products" en la barra de navegación
    And ingresa el nombre de un producto en el buscador y hace clic en buscar
    Then el usuario debería ver la sección "SEARCHED PRODUCTS"
    When agrega el primer producto buscado al carrito y va al carrito
    Then la página del carrito debe mostrarse
    And el producto buscado debe ser visible en el carrito
    When hace clic en la opción de iniciar sesión o registrarse
    And ingresa las credenciales del usuario de prueba
    Then el usuario debería iniciar sesión correctamente y ver su nombre en la barra de navegación
    When hace clic en el botón "Cart" en la barra de navegación
    Then el producto buscado debe seguir visible en el carrito después del login

  Scenario: Verificar detalles de la dirección en la página de checkout (Test Case 23)
    Given que el usuario navega a la página de inicio
    And que existe el usuario de prueba registrado
    And hace clic en la opción de iniciar sesión o registrarse
    And ingresa las credenciales del usuario de prueba
    Then el usuario debería iniciar sesión correctamente y ver su nombre en la barra de navegación
    When agrega el primer producto al carrito y va al carrito
    And hace clic en proceder al checkout
    Then la dirección de envío debe coincidir con la dirección registrada
    And la dirección de facturación debe coincidir con la dirección registrada

  Scenario: Realizar pedido: Registrarse mientras se hace el checkout (Test Case 14)
    Given que el usuario navega a la página de inicio
    When agrega el primer producto al carrito y va al carrito
    And hace clic en proceder al checkout
    And hace clic en registrarse o iniciar sesión en el modal de checkout
    And inicia el registro con el nombre del usuario de prueba y un correo aleatorio
    And completa el formulario de registro con los datos de dirección y la contraseña del usuario de prueba
    And hace clic en el botón de crear cuenta
    Then el usuario debería ver la confirmación de cuenta creada exitosamente
    When hace clic en continuar y debería ver su nombre en la barra de navegación
    And hace clic en el botón "Cart" en la barra de navegación
    And hace clic en proceder al checkout
    Then la dirección de envío debe coincidir con la dirección registrada
    When escribe un comentario "Comentario de prueba pedido 14" y hace clic en realizar pedido
    And ingresa los datos de pago y hace clic en pagar y confirmar
    Then el pedido debería ser procesado y mostrar "ORDER PLACED!"
    When hace clic en "Delete Account"
    Then el usuario debería ver la confirmación de cuenta eliminada exitosamente

  Scenario: Realizar pedido: Registrarse antes de hacer el checkout (Test Case 15)
    Given que el usuario navega a la página de inicio
    And hace clic en la opción de iniciar sesión o registrarse
    And inicia el registro con el nombre del usuario de prueba y un correo aleatorio
    And completa el formulario de registro con los datos de dirección y la contraseña del usuario de prueba
    And hace clic en el botón de crear cuenta
    Then el usuario debería ver la confirmación de cuenta creada exitosamente
    When hace clic en continuar y debería ver su nombre en la barra de navegación
    And agrega el primer producto al carrito y va al carrito
    And hace clic en proceder al checkout
    Then la dirección de envío debe coincidir con la dirección registrada
    When escribe un comentario "Comentario de prueba pedido 15" y hace clic en realizar pedido
    And ingresa los datos de pago y hace clic en pagar y confirmar
    Then el pedido debería ser procesado y mostrar "ORDER PLACED!"
    When hace clic en "Delete Account"
    Then el usuario debería ver la confirmación de cuenta eliminada exitosamente

  Scenario: Realizar pedido: Iniciar sesión antes de hacer el checkout (Test Case 16)
    Given que el usuario navega a la página de inicio
    And que existe el usuario de prueba registrado
    And hace clic en la opción de iniciar sesión o registrarse
    And ingresa las credenciales del usuario de prueba
    Then el usuario debería iniciar sesión correctamente y ver su nombre en la barra de navegación
    When agrega el primer producto al carrito y va al carrito
    And hace clic en proceder al checkout
    Then la dirección de envío debe coincidir con la dirección registrada
    When escribe un comentario "Comentario de prueba pedido 16" y hace clic en realizar pedido
    And ingresa los datos de pago y hace clic en pagar y confirmar
    Then el pedido debería ser procesado y mostrar "ORDER PLACED!"
    When hace clic en "Delete Account"
    Then el usuario debería ver la confirmación de cuenta eliminada exitosamente

  Scenario: Descargar factura después de comprar (Test Case 24)
    Given que el usuario navega a la página de inicio
    And que existe el usuario de prueba registrado
    And hace clic en la opción de iniciar sesión o registrarse
    And ingresa las credenciales del usuario de prueba
    Then el usuario debería iniciar sesión correctamente y ver su nombre en la barra de navegación
    When agrega el primer producto al carrito y va al carrito
    And hace clic en proceder al checkout
    And escribe un comentario "Comentario de prueba factura" y hace clic en realizar pedido
    And ingresa los datos de pago y hace clic en pagar y confirmar
    Then el pedido debería ser procesado y mostrar "ORDER PLACED!"
    When hace clic en descargar factura
    Then la factura debería ser descargada exitosamente en formato PDF
    When hace clic en continuar en la página de éxito
    And hace clic en "Delete Account"
    Then el usuario debería ver la confirmación de cuenta eliminada exitosamente
