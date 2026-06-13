Feature: Verificación de Productos y Detalle de Productos

  Scenario: Verificar todos los productos y la página de detalle del producto
    Given que el usuario navega a la página de inicio
    And el usuario verifica que la página de inicio se cargó correctamente
    When hace clic en el botón "Products" en la barra de navegación
    Then el usuario debería ser redirigido a la página de ALL PRODUCTS
    And el listado de productos debe ser visible
    When hace clic en "View Product" del primer producto
    Then el usuario es redirigido a la página de detalle del producto
    And el usuario verifica que los detalles sean visibles: nombre del producto, categoría, precio, disponibilidad, condición y marca
