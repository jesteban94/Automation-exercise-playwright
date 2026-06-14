Feature: Gestión de Carrito de Compras y Procesamiento de Órdenes

  @smoke @cart
  Scenario: Agregar productos al carrito (Test Case 12)
    Given que el usuario navega a la página de inicio
    When agrega el primer y segundo producto al carrito
    Then la página del carrito debe mostrar los productos con sus detalles correctos

  @regression @cart
  Scenario: Verificar cantidad del producto en el carrito (Test Case 13)
    Given que el usuario navega a la página de inicio
    When aumenta la cantidad del primer producto y lo agrega al carrito
    Then la página del carrito debe mostrar la cantidad exacta para el producto

  @regression @cart
  Scenario: Remover productos del carrito (Test Case 17)
    Given que el usuario navega a la página de inicio
    When agrega el primer producto al carrito
    And elimina el producto desde la página del carrito
    Then el carrito de compras debe quedar vacío

  @regression @cart
  Scenario: Agregar al carrito desde elementos recomendados (Test Case 22)
    Given que el usuario navega a la página de inicio
    When agrega el primer producto recomendado al carrito
    Then el producto recomendado debe estar visible en el carrito

  @regression @cart @e2e
  Scenario: Buscar productos y verificar carrito después del login (Test Case 20)
    Given que el usuario navega a la página de inicio
    And que existe el usuario de prueba registrado
    When busca un producto específico y lo agrega al carrito
    And inicia sesión con el usuario de prueba
    Then el producto buscado debe seguir visible en el carrito después del login

  @regression @checkout
  Scenario: Verificar detalles de la dirección en la página de checkout (Test Case 23)
    Given que el usuario navega a la página de inicio
    And que existe el usuario de prueba registrado
    And inicia sesión con el usuario de prueba
    When agrega el primer producto al carrito
    And procede al checkout desde el carrito
    Then la dirección de envío y facturación deben coincidir con la dirección registrada

  @smoke @checkout @e2e
  Scenario: Realizar pedido: Registrarse mientras se hace el checkout (Test Case 14)
    Given que el usuario navega a la página de inicio
    When agrega el primer producto al carrito
    And inicia el proceso de checkout y se registra como nuevo usuario
    And completa el checkout procesando el pago con un comentario
    Then el pedido debería ser procesado exitosamente
    And elimina la cuenta del usuario de prueba

  @regression @checkout @e2e
  Scenario: Realizar pedido: Registrarse antes de hacer el checkout (Test Case 15)
    Given que el usuario navega a la página de inicio
    When se registra como nuevo usuario antes del checkout
    And agrega el primer producto al carrito y completa el checkout
    Then el pedido debería ser procesado exitosamente
    And elimina la cuenta del usuario de prueba

  @regression @checkout @e2e
  Scenario: Realizar pedido: Iniciar sesión antes de hacer el checkout (Test Case 16)
    Given que el usuario navega a la página de inicio
    And que existe el usuario de prueba registrado
    When inicia sesión con el usuario de prueba
    And agrega el primer producto al carrito y completa el checkout
    Then el pedido debería ser procesado exitosamente
    And elimina la cuenta del usuario de prueba

  @regression @checkout @e2e
  Scenario: Descargar factura después de comprar (Test Case 24)
    Given que el usuario navega a la página de inicio
    And que existe el usuario de prueba registrado
    When inicia sesión con el usuario de prueba
    And agrega el primer producto al carrito y completa el checkout
    Then el pedido debería ser procesado exitosamente
    And descarga la factura en formato PDF
    And elimina la cuenta del usuario de prueba
