Feature: HU-CART-01 y HU-CART-02 - Gestión de Carrito y Checkout (Team B)

  Background:
    Given que el usuario navega a la página de inicio

  # HU-CART-01 - Gestión y Visualización de Productos en el Carrito
  @smoke @cart @teamB
  Scenario: Visualizar el detalle correcto de los productos en el carrito
    When agrega el primer y segundo producto al carrito
    Then la página del carrito debe mostrar los detalles correctos de los artículos

  @regression @cart @teamB
  Scenario: Eliminar un producto del carrito y verificar actualización
    When agrega el primer producto al carrito y decide ver el carrito
    And elimina el producto desde la página del carrito
    Then el carrito de compras debe quedar vacío

  # HU-CART-02 - Procesar Compra desde el Carrito (Proceed to Checkout)
  @regression @checkout @teamB
  Scenario: Usuario visitante intenta proceder al checkout y ve modal
    When agrega el primer producto al carrito y decide ver el carrito
    And hace clic en Proceed to Checkout sin iniciar sesión
    Then se debe mostrar el modal indicando que requiere autenticación

  @regression @checkout @teamB
  Scenario: Redirección al login desde el modal de autenticación
    When agrega el primer producto al carrito y decide ver el carrito
    And hace clic en Proceed to Checkout sin iniciar sesión
    And hace clic en Register Login en el modal
    Then el usuario debe ser redirigido a la página de inicio de sesión

  @regression @checkout @teamB
  Scenario: Usuario autenticado procede al checkout directamente
    Given que existe el usuario de prueba registrado
    And inicia sesión con el usuario de prueba
    When agrega el primer producto al carrito y decide ver el carrito
    And hace clic en Proceed to Checkout con sesión activa
    Then el usuario es redirigido a la página de checkout
