# 📝 Práctica 6: Actividad de Laboratorio: "Automatización Híbrida UI + API con Playwright"

Este laboratorio integra la validación de interfaces de usuario y servicios web, demostrando cómo una herramienta moderna basada en código permite abarcar múltiples cuadrantes de la prueba. (Nota: Los comandos de Playwright mencionados son adaptaciones técnicas y no provienen directamente de los manuales del ISTQB).

## Paso 1: Definición del Escenario BDD (Transparencia en Trello)

Vaya al tablero de tareas ágil, seleccione una historia de usuario de la columna "Por hacer" relacionada con la creación de registros (ej. Crear un nuevo cliente) y muévala a la columna "En curso".

Redacte el escenario en los comentarios de Trello usando el formato BDD:

```gherkin
*   *Dado que el usuario está en el formulario de alta.*
*   *Cuando ingresa datos válidos y envía el formulario a través de la UI.*
*   *Entonces la API del sistema debe devolver el nuevo cliente almacenado correctamente.*
```

## Paso 2: Creación del Script Híbrido

En su entorno de Playwright, cree un nuevo archivo de prueba (ej. registro_hibrido.spec.ts).

Importe tanto el objeto page (para controlar el navegador) como el objeto request (para las peticiones de API) en el bloque de prueba.

Utilice la funcionalidad de bloques descriptivos (test.step) para estructurar el código visualmente de acuerdo a los pasos Dado / Cuando / Entonces definidos anteriormente.

## Paso 3: Interacción con la Interfaz de Usuario (UI)

Automatice los pasos iniciales usando page.goto() y page.fill() para navegar y completar los datos en el formulario web.

Haga clic en el botón de guardar. Esto cubre la parte de prueba funcional a nivel sistema.

## Paso 4: Validación a través de la API (Integración)

En lugar de verificar solo el mensaje de éxito visual, utilice Playwright para realizar una llamada request.get('/api/clientes/nuevo_id').

Valide la respuesta interceptada en formato JSON comprobando que el código de estado es HTTP 200 y que los datos devueltos (ej. responseBody.nombre) coinciden con lo que se introdujo en la UI.

> [!NOTE]
> **¿Por qué hacer esto?**
> Esto garantiza una validación real entre unidades (frontend y backend), alineándose con el objetivo de eliminar defectos integrales de manera temprana.

## Paso 5: Ejecución, Rastreo y DoD

Ejecute la prueba con npx playwright test.

Si la prueba falla, utilice el Trace Viewer de Playwright para analizar la causa raíz (analizando tanto la red como el DOM del navegador).

Si la prueba pasa y cumple todos los criterios definidos, adjunte la evidencia del HTML Report al tablero y mueva la tarea a la columna "Hecho", completando así el flujo de trabajo de la iteración.

Con esta sesión finalizamos el Módulo 3, dotando al equipo con las competencias necesarias para codificar pruebas de aceptación robustas y multifacéticas. El próximo paso (Módulo 4) será integrar estos scripts automatizados dentro de un canal de Integración Continua.
