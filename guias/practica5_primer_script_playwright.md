# 📝 Guía de Laboratorio: Mi Primer Script de UI en Playwright
## Módulo: Automatización de Pruebas de Interfaz de Usuario (UI)

Este laboratorio integra la Pirámide de Prueba y el Cuadrante Q2, guiando en la configuración e inicialización del framework moderno Playwright para escribir el primer script de automatización del flujo de interfaz.

---

## 🎯 Objetivos de Aprendizaje
*   **Inicialización del Framework:** Aprender a configurar un proyecto base de Playwright con TypeScript.
*   **Playwright Codegen:** Utilizar el generador de código automático para mapear los primeros pasos interactivos en el navegador.
*   **Aserciones Estables:** Implementar oráculos de prueba estables mediante aserciones (`expect`) y análisis crítico de localizadores (Locators).

⏱️ **Duración Estimada:** 1.5 Horas

---

## 🎯 Paso 1: Selección y Transparencia en Trello
1.  En su tablero ágil de Trello, identifiquen una Historia de Usuario (etiqueta **verde**) con criterios de aceptación de UI definidos.
2.  Muevan la tarjeta de prueba asociada (etiqueta **naranja**) de la columna **"Por hacer"** a **"En curso"** para que todo el equipo conozca que se ha iniciado la automatización.

## ⚙️ Paso 2: Inicialización del Entorno Playwright
1.  Abran su terminal de comandos en la carpeta raíz de su proyecto.
2.  Ejecuten el comando de instalación del framework:
    ```bash
    npm init playwright@latest
    ```
3.  Seleccionen **TypeScript**, acepten el nombre por defecto para la carpeta de pruebas y acepten descargar los navegadores y el workflow de GitHub Actions por defecto.

## 🔴 Paso 3: Grabación del Flujo con Playwright Codegen
1.  Abran el generador de código automático de Playwright ejecutando:
    ```bash
    npx playwright codegen https://automationexercise.com/
    ```
2.  En la ventana del navegador que se abre, realicen las interacciones necesarias para completar el "camino feliz" de su funcionalidad (ej: navegar a login, ingresar datos y confirmar).
3.  Detengan la grabación, copien el código generado en la ventana del inspector y péguenlo en un nuevo archivo de pruebas dentro de la carpeta `/tests` (ej. `tests/login.spec.ts`).

## 🔧 Paso 4: Refinamiento de Selectores y Afirmaciones (Assertions)
1.  Analicen el código grabado de forma crítica. Los selectores generados automáticamente a veces pueden ser frágiles. Cámbienlos por localizadores estables (ej: usando roles como `page.getByRole('button', { name: 'Signup / Login' })`).
2.  Añadan sentencias de verificación (**Aserciones**) al final de su script utilizando la función `expect` de Playwright para validar que la prueba realmente comprueba un resultado oráculo.
    *   *Ejemplo:* `await expect(page.locator('li:has(i.fa-user)')).toBeVisible();`

## 🚀 Paso 5: Ejecución y Evidencia Continua
1.  Corran la prueba en modo visible para verificar que los pasos son consistentes:
    ```bash
    npx playwright test --headed
    ```
2.  Generen y abran el reporte local para comprobar los resultados:
    ```bash
    npx playwright show-report
    ```
3.  Tomen una captura de pantalla del reporte exitoso (en verde), adjúntenla como evidencia a su tarjeta de Trello y muevan la tarjeta a la columna **"Pruebas / Verificación"**.

> [!TIP]
> Si la prueba falla en alguno de los pasos, utilicen el visualizador de trazas (`Trace Viewer`) de Playwright para analizar los elementos del DOM y capturar la causa raíz exacta de la falla.

---

## 📝 Preguntas de Reflexión y Análisis Crítico (Para los Estudiantes)
1.  ¿Por qué el código generado por herramientas de grabación (`codegen`) requiere refinamiento crítico de localizadores antes de integrarse a la suite definitiva?
2.  ¿De qué manera la adición de aserciones (`expect`) cumple el concepto de "oráculo de prueba" en un script automatizado?
