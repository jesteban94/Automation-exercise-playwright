# language: es
Característica: Pruebas de API de Productos

  Escenario: Obtener la lista de todos los productos a través de la API
    Dado que el servicio de productos está disponible
    Cuando envío una solicitud GET para obtener todos los productos
    Entonces la respuesta de la API de productos debe tener un código de estado 200
    Y la respuesta debe contener un listado de productos con ID y nombre
