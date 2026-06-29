Feature: Pruebas de API de Productos - Mitigación de Riesgos (Team A/B/C)

  @smoke @api
  Scenario: Obtener la lista de todos los productos a través de la API
    Given que el servicio de productos está disponible
    When envío una solicitud GET para obtener todos los productos
    Then la respuesta de la API de productos debe tener un código de estado 200
    And la respuesta debe contener un listado de productos con ID y nombre

  @regression @api
  Scenario: Buscar un producto por API con un parámetro válido
    Given que el servicio de productos está disponible
    When envío una solicitud POST para buscar el producto "Blue Top"
    Then la respuesta de la API de productos debe tener un código de estado 200
    And la respuesta de la API de búsqueda debe contener productos coincidentes

  @regression @api
  Scenario: Buscar un producto por API con caracteres especiales
    Given que el servicio de productos está disponible
    When envío una solicitud POST para buscar el producto "Blue Top %&?"
    Then la respuesta de la API de productos debe tener un código de estado 200
    And la respuesta de la API de búsqueda debe indicar un error o vacía de forma controlada
