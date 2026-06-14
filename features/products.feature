Feature: Verificación de Productos y Detalle de Productos

  @smoke
  Scenario: Verificar todos los productos y la página de detalle del producto (Test Case 8)
    Given que el usuario navega a la página de inicio
    When va a la sección de productos y selecciona el primer producto
    Then el detalle del producto debe mostrar toda su información correcta

  Scenario: Buscar un producto específico (Test Case 9)
    Given que el usuario navega a la página de inicio
    When busca un producto específico desde la página de productos
    Then todos los productos relacionados con la búsqueda deben ser visibles

  Scenario: Visualizar productos por categoría (Test Case 18)
    Given que el usuario navega a la página de inicio
    When filtra los productos por la categoría Women Tops y luego por Men Tshirts
    Then la página debe mostrar los títulos de las categorías correspondientes

  Scenario: Visualizar y agregar al carrito productos por marca (Test Case 19)
    Given que el usuario navega a la página de inicio
    When filtra los productos por la marca Polo y luego por Madame
    Then la página debe mostrar los productos filtrados de cada marca

  Scenario: Agregar una reseña a un producto (Test Case 21)
    Given que el usuario navega a la página de inicio
    When abre el detalle del primer producto y envía una reseña
    Then el mensaje de éxito de la reseña debe ser visible
