# 📝 Práctica 8: Actividad de Laboratorio: "Construyendo el Pipeline de CI para Playwright"

En este laboratorio, aprovecharemos el repositorio centralizado de colaboración creado en la Sesión 7. El equipo trabajará junto para automatizar la ejecución de las pruebas y gestionar los reportes.

(Aclaración: Los comandos y la configuración de GitHub Actions / Playwright descritos a continuación son aspectos técnicos externos a la teoría formal del ISTQB).

## Paso 1: Transparencia en Trello

En el tablero de Trello, mueva la tarjeta de la historia técnica "Implementar Pipeline de Integración Continua" a la columna "En curso".

## Paso 2: Creación del Archivo de Workflow (El Scrum Master o un miembro del equipo)

En la terminal, un miembro del equipo crea una rama nueva: git checkout -b configuracion-ci.

Cree el directorio requerido por GitHub: mkdir -p .github/workflows.

Cree un archivo llamado playwright.yml dentro de esa carpeta y añada la configuración base proporcionada por Playwright para CI. El instructor puede facilitar el archivo YAML que típicamente incluye:

on: push a la rama main y en pull_requests.

jobs: Una tarea que instale Node.js, ejecute npm ci, instale los navegadores de Playwright (npx playwright install --with-deps) y luego ejecute npx playwright test.

artifacts: Configuración para subir la carpeta playwright-report/ a GitHub si las pruebas fallan o pasan.

## Paso 3: Integración del Pipeline (Pull Request)

El miembro del equipo guarda el archivo y sube la rama: git add .github/workflows/playwright.yml git commit -m "Agrega pipeline de GitHub Actions para Playwright" git push origin configuracion-ci

En GitHub, cree el Pull Request. Notarán que, instantáneamente, GitHub Actions detectará el archivo .yml y comenzará a ejecutar las pruebas en un servidor en la nube de forma automática antes de permitir la integración.

## Paso 4: Práctica de "Fallo y Corrección" (Todo el Equipo)

Para demostrar la retroalimentación temprana, pida a otro miembro del equipo que introduzca intencionalmente un error en su script de Playwright en su propia rama (por ejemplo, cambiando un selector válido por uno incorrecto) y haga un Push.

El equipo debe ir a la pestaña Actions en GitHub y observar cómo la construcción falla (Red build). El pipeline actúa como la Prueba de Verificación de la Construcción (BVT), advirtiendo al equipo que el código no es estable.

Descarguen el reporte HTML adjunto en el log del pipeline fallido para revisar el Trace Viewer de Playwright, identificando el problema.

El estudiante corrige el código, hace un nuevo push, y el equipo verifica cómo el pipeline ahora pasa exitosamente (Green build).

## Paso 5: Completar el Ciclo

Una vez validado que el pipeline funciona y protege la rama main, realicen el "Merge" de todos los Pull Requests pendientes.

Actualicen la tarjeta en el tablero de Trello a "Hecho".
