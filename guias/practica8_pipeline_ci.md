# 📝 Guía de Laboratorio: Construyendo el Pipeline de CI para Playwright
## Módulo: Integración Continua (CI/CD) y Retroalimentación Temprana

Este laboratorio enseña cómo configurar un pipeline automatizado con GitHub Actions utilizando el repositorio colaborativo. Esto permite ejecutar pruebas automatizadas en la nube ante cada cambio de código para asegurar la estabilidad del proyecto.

---

## 🎯 Objetivos de Aprendizaje
*   **Integración Continua (CI):** Automatizar el flujo de ejecución de pruebas ante eventos de cambios en el repositorio.
*   **Workflow de GitHub Actions:** Crear y configurar archivos YAML (`.yml`) para configurar máquinas virtuales, instalar dependencias y ejecutar Playwright.
*   **Retroalimentación Temprana (Early Feedback):** Utilizar la compilación de CI/CD para detectar y corregir problemas de estabilidad de inmediato.

⏱️ **Duración Estimada:** 2 Horas

---

## 🏷️ Paso 1: Transparencia en Trello
1.  En su tablero Trello, localicen la tarjeta de la historia técnica `"Implementar Pipeline de Integración Continua"`.
2.  Muevan la tarjeta a la columna **"En curso"** para transparentar que se está trabajando en la infraestructura del proyecto.

## ⚙️ Paso 2: Creación del Archivo de Workflow (playwright.yml)
1.  En la terminal local, un miembro del equipo crea y cambia a una rama de configuración:
    ```bash
    git checkout -b configuracion-ci
    ```
2.  Creen el directorio requerido por GitHub para los workflows en la raíz del proyecto:
    ```bash
    mkdir -p .github/workflows
    ```
3.  Creen un archivo llamado `playwright.yml` dentro de esa carpeta y añadan la configuración del pipeline:
    ```yaml
    name: Playwright Tests
    on:
      push:
        branches: [ main ]
      pull_request:
        branches: [ main ]
    jobs:
      test:
        timeout-minutes: 60
        runs-on: ubuntu-latest
        steps:
        - uses: actions/checkout@v4
        - uses: actions/setup-node@v4
          with:
            node-version: lts/*
        - name: Install dependencies
          run: npm ci
        - name: Install Playwright Browsers
          run: npx playwright install --with-deps
        - name: Run Playwright tests
          run: npx playwright test
        - uses: actions/upload-artifact@v4
          if: ${{ !cancelled() }}
          with:
            name: playwright-report
            path: playwright-report/
            retention-days: 30
    ```

## 🔄 Paso 3: Integración del Pipeline vía Pull Request
1.  Guarden el archivo, confirmen los cambios locales y suban la rama a GitHub:
    ```bash
    git add .github/workflows/playwright.yml
    git commit -m "Agrega pipeline de GitHub Actions para Playwright"
    git push origin configuracion-ci
    ```
2.  Creen el Pull Request en GitHub. Verán cómo GitHub Actions detecta el archivo e inicia la ejecución de las pruebas automáticamente.

## 🚨 Paso 4: Práctica de "Fallo y Corrección" (Feedback Temprano)
1.  Para demostrar la efectividad del pipeline, un miembro del equipo debe introducir de forma intencional un error en su script de pruebas (ej: un selector con nombre erróneo) en su propia rama y subir los cambios (`push`).
2.  Observen en la pestaña **Actions** de GitHub cómo la compilación cambia a color rojo (falla). El pipeline avanza y actúa como la prueba de verificación de la compilación.
3.  Descarguen el reporte HTML de los logs de la ejecución fallida en GitHub Actions y utilicen el Trace Viewer para localizar el selector causante del fallo.
4.  Corrijan el código en su rama local, realicen un push y verifiquen que el indicador de GitHub Actions cambie a verde (éxito).

## 🏁 Paso 5: Completar el Ciclo y Cierre
1.  Una vez validado que el pipeline de CI protege la rama principal y las pruebas pasan, realicen el `Merge` del Pull Request.
2.  Muevan la tarjeta de la tarea en Trello a la columna **"Hecho"**.

> [!IMPORTANT]
> El pipeline de integración continua es la red de seguridad del equipo ágil. Asegura que ningún cambio introducido en el repositorio rompa la funcionalidad existente.

---

## 📝 Preguntas de Reflexión y Análisis Crítico (Para los Estudiantes)
1.  ¿Cómo se relaciona el principio de "retroalimentación temprana" (early feedback) con la ejecución de pipelines automáticos en cada Push o Pull Request?
2.  ¿Qué valor tienen los artefactos (como el reporte HTML de Playwright) adjuntos al pipeline de CI cuando una compilación falla en la nube?
