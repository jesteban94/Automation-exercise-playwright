# 📝 Guía de Laboratorio: Automatización Híbrida UI + API con Playwright
## Módulo: Estrategias de Automatización Avanzada y Pruebas Híbridas

Este laboratorio demuestra cómo herramientas de automatización modernas permiten estructurar escenarios híbridos, combinando la interacción de la interfaz gráfica con llamadas directas de API en un único flujo para maximizar la velocidad y robustez.

---

## 🎯 Objetivos de Aprendizaje
*   **Pruebas Híbridas:** Aprender a combinar validaciones de frontend y backend en una misma sesión de prueba.
*   **Aprovechamiento de API en Playwright:** Utilizar el contexto de peticiones de API (`APIRequestContext`) en conjunto con el contexto de página (`Page`).
*   **Depuración de Red:** Analizar el DOM y las peticiones de red utilizando el Trace Viewer.

⏱️ **Duración Estimada:** 2 Horas

---

## 📝 Paso 1: Definición del Escenario BDD (Trello)
1.  Seleccionen una historia de usuario de creación de registros (ej: buscar productos o agregar ítems) de la columna "Por hacer" en Trello y muévanla a la columna "En curso".
2.  Redacten el escenario híbrido en los comentarios de la tarjeta en Trello:
    ```gherkin
    Dado que el usuario completa una acción en la Interfaz de Usuario (UI)
    Cuando el sistema procesa el flujo en pantalla
    Entonces la API del backend debe reflejar y validar el cambio con los datos correctos
    ```

## ⚙️ Paso 2: Creación del Script de Prueba Híbrido
1.  En su proyecto de Playwright, creen un nuevo archivo de pruebas (ej: `tests/registro_hibrido.spec.ts`).
2.  Importen los objetos `test`, `expect` y las interfaces necesarias. En el bloque de pruebas, hagan uso de los parámetros inyectados de Playwright `page` (para controlar la UI) y `request` (para invocar servicios HTTP):
    ```typescript
    test('Validación híbrida de producto', async ({ page, request }) => {
      // Código de la prueba
    });
    ```
3.  Estructuren el código utilizando bloques descriptivos `test.step` para segmentar visualmente el flujo de los pasos.

## 🖥️ Paso 3: Automatización de la Interfaz de Usuario (UI)
1.  Automaticen la interacción inicial con el formulario o catálogo de productos usando `page.goto()`, `page.fill()` y `page.click()`.
2.  Hagan clic en la acción correspondiente de la interfaz para completar el flujo funcional visual del sistema.

## 🔌 Paso 4: Validación e Integración vía API
1.  En lugar de limitarse a buscar un elemento visual de éxito en la interfaz (que puede ser lento o inestable), utilicen el objeto `request` de Playwright para consultar directamente el endpoint del backend:
    ```typescript
    const apiResponse = await request.get('https://automationexercise.com/api/productsList');
    expect(apiResponse.status()).toBe(200);
    const body = await apiResponse.json();
    ```
2.  Validen que los datos de la respuesta en formato JSON (como el nombre del producto o ID) coincidan exactamente con la entrada que se introdujo previamente en la interfaz de usuario.

## 🏁 Paso 5: Ejecución, Trace Viewer y Definition of Done
1.  Ejecuten la prueba desde su consola:
    ```bash
    npx playwright test
    ```
2.  Si la prueba falla, inicien el visualizador de trazas (`Trace Viewer`) para analizar tanto las capturas visuales de la UI como el historial de llamadas de red (Network Tab) realizadas durante la ejecución en la nube.
3.  Si la prueba pasa, adjunten las evidencias del reporte a la tarjeta de Trello y muévanla a "Hecho" cumpliendo con los estándares de la iteración.

> [!NOTE]
> Las pruebas híbridas reducen la fragilidad de las aserciones visuales en el frontend y nos permiten certificar la integridad de los datos en la base de datos y lógica del backend de forma rápida.

---

## 📝 Preguntas de Reflexión y Análisis Crítico (Para los Estudiantes)
1.  ¿Qué ventajas en estabilidad y velocidad tiene realizar un flujo híbrido (ej: crear datos por API y verificar por UI, o viceversa) frente a un flujo puramente de UI?
2.  ¿Cómo apoya el uso del Trace Viewer de Playwright a la reducción del tiempo medio de resolución de defectos (MTTR)?
