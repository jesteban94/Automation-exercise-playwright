Feature: Verificación de Productos y Detalle de Productos

  @smoke
  Scenario: Verificar todos los productos y la página de detalle del producto (Test Case 8)
    Given que el usuario navega a la página de inicio
    And el usuario verifica que la página de inicio se cargó correctamente
    When hace clic en el botón "Products" en la barra de navegación
    Then el usuario debería ser redirigido a la página de ALL PRODUCTS
    And el listado de productos debe ser visible
    When hace clic en "View Product" del primer producto
    Then el usuario es redirigido a la página de detalle del producto
    And el usuario verifica que los detalles sean visibles: nombre del producto, categoría, precio, disponibilidad, condición y marca

  Scenario: Buscar un producto específico (Test Case 9)
    Given que el usuario navega a la página de inicio
    When hace clic en el botón "Products" en la barra de navegación
    Then el usuario debería ser redirigido a la página de ALL PRODUCTS
    When ingresa el nombre de un producto en el buscador y hace clic en buscar
    Then el usuario debería ver la sección "SEARCHED PRODUCTS"
    And todos los productos relacionados con la búsqueda deben ser visibles

  Scenario: Visualizar productos por categoría (Test Case 18)
    Given que el usuario navega a la página de inicio
    Then las categorías deben ser visibles en la barra lateral izquierda
    When hace clic en la categoría "Women"
    And hace clic en la subcategoría "Tops" de Women
    Then el usuario debería ver la página de la categoría y confirmar el texto "WOMEN - TOPS PRODUCTS"
    When hace clic en la categoría "Men" en la barra lateral
    And hace clic en la subcategoría "Tshirts" de Men
    Then el usuario es redirigido a esa página de categoría de Men

  Scenario: Visualizar y agregar al carrito productos por marca (Test Case 19)
    Given que el usuario navega a la página de inicio
    When hace clic en el botón "Products" en la barra de navegación
    Then las marcas deben ser visibles en la barra lateral izquierda
    When hace clic en la marca "Polo"
    Then el usuario es redirigido a la página de la marca y visualiza los productos de "Polo"
    When hace clic en otra marca "Madame" en la barra lateral
    Then el usuario es redirigido a la página de la marca y visualiza los productos de "Madame"

  Scenario: Agregar una reseña a un producto (Test Case 21)
    Given que el usuario navega a la página de inicio
    When hace clic en el botón "Products" en la barra de navegación
    Then el usuario debería ser redirigido a la página de ALL PRODUCTS
    When hace clic en "View Product" del primer producto
    Then el usuario es redirigido a la página de detalle del producto
    And el usuario debería ver la sección "Write Your Review"
    When completa el formulario de reseña y hace clic en enviar
    Then el usuario debería ver el mensaje de éxito "Thank you for your review."
