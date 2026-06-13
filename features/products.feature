# language: es
Característica: Verificación de Productos y Detalle de Productos

  Escenario: Verificar todos los productos y la página de detalle del producto
    Dado que el usuario navega a la página de inicio
    Y el usuario verifica que la página de inicio se cargó correctamente
    Cuando hace clic en el botón "Products" en la barra de navegación
    Entonces el usuario debería ser redirigido a la página de ALL PRODUCTS
    Y el listado de productos debe ser visible
    Cuando hace clic en "View Product" del primer producto
    Entonces el usuario es redirigido a la página de detalle del producto
    Y el usuario verifica que los detalles sean visibles: nombre del producto, categoría, precio, disponibilidad, condición y marca
