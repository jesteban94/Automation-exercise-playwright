# 📝 Guía de Laboratorio: Del Backlog a la Confirmación
## Módulo: Agile Testing y Refinamiento de Requisitos en Trello

Esta actividad práctica enseña a aplicar el concepto de las **3C** y la técnica **INVEST** para transformar ideas de negocio generales en historias de usuario testeables con criterios de aceptación claros y detallados.

---

## 🎯 Objetivos de Aprendizaje
*   **Técnica de las 3C:** Comprender las etapas de Tarjeta (Card), Conversación (Conversation) y Confirmación (Confirmation).
*   **Criterios INVEST:** Asegurar que los requisitos cumplan con las características de Independientes, Negociables, Valiosos, Estimables, Pequeños y Testeables.
*   **Validación de DoR:** Evaluar si una historia de usuario está "lista" para ingresar al flujo de desarrollo.

⏱️ **Duración Estimada:** 1 Hora

---

## 🔍 Paso 1: Identificación y Creación de la Historia (Tarjeta)
1.  En la columna **"Backlog del Producto"**, el equipo (actuando en colaboración con el PO) debe crear una nueva tarjeta con una historia de usuario real para el proyecto.
2.  Utilicen la estructura formal estándar:
    ```gherkin
    Como [Rol de Usuario],
    Quiero [Acción / Funcionalidad],
    Para [Valor de Negocio / Beneficio].
    ```
3.  Asegúrense de que la historia sea lo suficientemente pequeña (**S** de INVEST) para ser completada en una única iteración.

## 👥 Paso 2: Refinamiento Colaborativo (La Conversación)
1.  Simulen una breve reunión de refinamiento técnico. El rol del Probador es clave aquí: debe realizar preguntas abiertas y críticas para identificar escenarios alternativos, de error o no funcionales (ej. rendimiento, velocidad o seguridad).
2.  Documenten todas las aclaraciones y respuestas de la conversación en los **"Comentarios"** de la tarjeta en Trello para mantener la trazabilidad.

## 🧪 Paso 3: Definición de Criterios (La Confirmación)
1.  Dentro de la tarjeta de Trello, añadan un Checklist titulado `"Criterios de Aceptación"`.
2.  Deben detallar escenarios específicos que validen las reglas de negocio. Asegúrense de incluir al menos:
    *   Un camino positivo (comportamiento esperado estándar).
    *   Un camino negativo (manejo de excepciones y errores).
    *   Una restricción técnica o regla de negocio restrictiva (ej. formato de contraseña, campos obligatorios).

## 🎯 Paso 4: Validación de DoR (Definition of Ready)
1.  Antes de mover la tarjeta de la columna "Backlog" a la columna "Por hacer", auditen la historia contra la Definition of Ready (DoR):
    *   *¿La historia es entendida por todo el equipo de desarrollo y pruebas?*
    *   *¿Cuenta con criterios de aceptación claros y completamente testeables?*
    *   *¿Están identificadas las dependencias con otros componentes?*

## ✍️ Paso 5: Diseño de Pruebas Iniciales (Caja Negra)
1.  Creen una tarjeta vinculada con la etiqueta **naranja** en la columna **"Por hacer"** titulada: `"Pruebas: [Nombre de la Historia]"`.
2.  En la descripción, esbocen de forma preliminar los pasos o técnicas de diseño de caja negra (ej. particiones de equivalencia o valores frontera) que planean aplicar para asegurar la cobertura de los criterios de aceptación.

> [!IMPORTANT]
> Al finalizar, el tablero de Trello debería mostrar una trazabilidad nítida entre el requisito de negocio (tarjeta verde) y las tareas de preparación de la prueba (tarjeta naranja), listas para ser ejecutadas.

---

## 📝 Preguntas de Reflexión y Análisis Crítico (Para los Estudiantes)
1.  ¿Cómo ayuda el enfoque de las "3C" (Card, Conversation, Confirmation) a evitar malentendidos sobre los requisitos de software antes del inicio del desarrollo?
2.  Explique cómo el principio INVEST (específicamente la T de Testable) impacta en el diseño de pruebas iniciales.
