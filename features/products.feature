Feature: HU03 y HU05 - Gestión de Búsqueda y Adición de Productos (Team A)

  Background:
    Given que el usuario navega a la página de inicio

  # HU03 - Productos - Buscar productos
  @regression @products @search @teamA
  Scenario: Buscar un producto específico de forma exitosa
    When busca un producto específico desde la página de productos con el término "Blue Top"
    Then todos los productos relacionados con la búsqueda deben ser visibles

  @regression @products @search @teamA
  Scenario: Buscar productos con un término sin coincidencias
    When busca un producto específico desde la página de productos con el término "computadora"
    Then el listado de productos buscados debe estar vacío

  @regression @products @search @teamA
  Scenario: Buscar productos con entrada de texto vacía
    When busca un producto específico desde la página de productos con el término ""
    Then todos los productos de la tienda deben ser visibles

  # HU05 - Productos - Agregar producto al carrito
  @smoke @products @cart @teamA
  Scenario: Agregar producto al carrito desde la lista general
    When agrega el primer producto al carrito y decide continuar comprando
    Then el carrito debe contener el primer producto agregado

  @smoke @products @cart @teamA
  Scenario: Confirmar producto agregado y redirigir al carrito
    When agrega el primer producto al carrito y decide ver el carrito
    Then la página del carrito debe mostrar el producto agregado

  @regression @products @cart @teamA
  Scenario: Agregar múltiples productos y verificar acumulación en el carrito
    When agrega el primer producto al carrito y decide continuar comprando
    And agrega el segundo producto al carrito y decide ver el carrito
    Then la página del carrito debe mostrar ambos productos agregados
