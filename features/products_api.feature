Feature: Pruebas de API de Productos

  @smoke @api
  Scenario: Obtener la lista de todos los productos a través de la API
    Given que el servicio de productos está disponible
    When envío una solicitud GET para obtener todos los productos
    Then la respuesta de la API de productos debe tener un código de estado 200
    And la respuesta debe contener un listado de productos con ID y nombre
