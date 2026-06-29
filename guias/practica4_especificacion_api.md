# 📝 Guía de Laboratorio: Especificación por Ejemplo y Validación de API
## Módulo: BDD (Gherkin) y Pruebas a Nivel de Servicios (API)

Esta actividad práctica utiliza las historias de usuario refinadas previamente para diseñar escenarios de prueba detallados en Gherkin (BDD) y validar las reglas de negocio asociadas llamando directamente a los endpoints de la API con Postman.

---

## 🎯 Objetivos de Aprendizaje
*   **Especificación por Ejemplo:** Traducir escenarios reales en ejemplos estructurados en Gherkin.
*   **Sintaxis Gherkin (BDD):** Dominar el formato Dado/Cuando/Entonces para describir el comportamiento esperado.
*   **Prueba de API:** Validar que los endpoints del backend respondan correctamente a los flujos descritos en los escenarios.

⏱️ **Duración Estimada:** 1.5 Horas

---

## 👥 Paso 1: Taller de Especificación (Power of Three)
1.  Reúnan al equipo de trabajo (simulando los roles de QA, desarrollador y Product Owner).
2.  Tomen una historia de usuario de la columna **"Por hacer"** en su tablero de Trello.
3.  Discutan ejemplos de uso reales de la funcionalidad, definiendo claramente qué datos se ingresarán y cuál será la salida esperada.

## ✍️ Paso 2: Redacción en Formato Gherkin (BDD)
1.  Dentro de la tarjeta de prueba vinculada en Trello (etiqueta **naranja**), añadan una descripción o documento con al menos 2 escenarios descritos en la sintaxis Gherkin.
2.  Utilicen la estructura formal:
    ```gherkin
    Escenario: [Descripción del flujo]
      Dado que [Contexto inicial o estado del sistema]
      Cuando [El usuario realiza una acción específica]
      Entonces [El sistema debe responder con este resultado esperado]
    ```

## 🧪 Paso 3: Validación Manual de API con Postman
1.  Identifiquen una regla de negocio del escenario Gherkin que pueda ser evaluada a nivel de servicios (ej: el endpoint de login que debe autenticar credenciales y devolver un token).
2.  Abran **Postman** (u otra herramienta de peticiones HTTP).
3.  Configuren la solicitud HTTP (URL, método POST/GET, cabeceras y cuerpo JSON) que simule las acciones descritas en el bloque **"Cuando"** de su escenario.
4.  Ejecuten la petición y verifiquen que la respuesta (JSON, código de estado HTTP 200, 400, etc.) coincida exactamente con el comportamiento esperado del bloque **"Entonces"**.

## 🔗 Paso 4: Registro de Resultados y Trazabilidad
1.  Tomen una captura de pantalla de la petición y respuesta exitosas en Postman.
2.  Adjunten la captura a la tarjeta de pruebas de Trello como evidencia de trazabilidad.
3.  Si la API devuelve un error inesperado, creen una tarjeta de bug (**etiqueta roja**) detallando la discrepancia entre el diseño y la realidad del servicio.

> [!IMPORTANT]
> El uso de herramientas de prueba de servicios como Postman permite verificar las reglas lógicas de la aplicación antes de que la interfaz de usuario esté desarrollada o automatizada, ahorrando tiempo de ciclo.

---

## 📝 Preguntas de Reflexión y Análisis Crítico (Para los Estudiantes)
1.  ¿Cómo beneficia al equipo de desarrollo (Dev y QA) escribir escenarios en Gherkin antes de codificar la interfaz o la API?
2.  En la pirámide de automatización, ¿por qué es crítico validar las reglas de negocio a nivel de API antes de automatizar flujos de UI completos?
