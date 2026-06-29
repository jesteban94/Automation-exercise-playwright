# 📝 Práctica 5: Actividad de Laboratorio: "Mi Primer Script de UI en Playwright"

Este laboratorio integra los conceptos de la Pirámide de Prueba y el Cuadrante Q2, utilizando Playwright para automatizar una historia de usuario real previamente refinada. (Nota: Los comandos técnicos específicos de Playwright detallados a continuación no provienen de los manuales del ISTQB y requieren un entorno con Node.js).

## Paso 1: Selección y Transparencia (En Trello)

En el tablero de tareas ágil, identifique una Historia de Usuario (etiqueta verde) con criterios de aceptación de interfaz definidos (ej. "Login exitoso").

Mueva la tarjeta de prueba asociada (etiqueta naranja) de la columna "Por hacer" a "En curso" para mantener la visibilidad del avance.

## Paso 2: Inicialización del Entorno Playwright

Abra su terminal o línea de comandos en la carpeta del proyecto.

Ejecute el comando de instalación: npm init playwright@latest.

Seleccione TypeScript (o JavaScript) y acepte la configuración por defecto para crear la estructura base de pruebas.

## Paso 3: Grabación del Flujo con Codegen

Utilice el grabador de Playwright ejecutando: npx playwright codegen <URL_DE_TU_APP>.

Interactúe con la aplicación web realizando el "camino feliz" que cubra el criterio de aceptación principal.

Detenga la grabación y copie el código generado automáticamente en un nuevo archivo dentro de la carpeta /tests (ej. login.spec.ts).

## Paso 4: Refinamiento y Afirmaciones (Assertions)

Como probador ágil, aplique el pensamiento crítico sobre el código grabado: asegúrese de que los selectores (Locators) sean estables y no dependan de estructuras frágiles.

Añada sentencias de verificación (aserciones) al final de su script utilizando la función expect de Playwright. (Ejemplo: await expect(page.locator('.bienvenida')).toBeVisible();). Esto garantiza que la prueba realmente valida un resultado y cumple la función de oráculo de prueba.

## Paso 5: Ejecución y Evidencia Continua

Ejecute la prueba recién creada con el comando: npx playwright test --headed (para ver la ejecución visualmente).

Generé el reporte HTML con npx playwright show-report.

Tome una captura del reporte HTML verde (aprobado).

Adjunte la evidencia a la tarjeta de Trello y muévala a la columna "Pruebas / Verificación". Si la prueba falla, documente el hallazgo y el rastro (Trace Viewer) como un defecto.

Con esta sesión ajustada, el equipo comenzará a construir una suite de automatización técnica robusta, preparando el terreno para la integración continua que configuraremos en GitHub Actions en módulos posteriores.
