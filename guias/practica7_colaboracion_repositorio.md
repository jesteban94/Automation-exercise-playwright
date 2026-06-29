# 📝 Guía de Laboratorio: Colaboración de Pruebas en un Repositorio Único
## Módulo: Control de Versiones (Git) y Trabajo en Equipo (Whole-Team Approach)

Esta actividad práctica simula un entorno real de desarrollo ágil donde todos los miembros de un equipo comparten un mismo repositorio para codificar pruebas automatizadas en paralelo sin pisar el código de los otros.

---

## 🎯 Objetivos de Aprendizaje
*   **Repositorio Único (Single Source of Truth):** Entender las ventajas de almacenar pruebas y código de desarrollo en la misma estructura.
*   **Flujo de Ramas (Git Branching):** Crear, aislar y publicar ramas de características (`feature branches`).
*   **Revisión por Pares (Code Review):** Utilizar Pull Requests para auditar la calidad del código del equipo.

⏱️ **Duración Estimada:** 2 Horas

---

## 🔧 Paso 1: Configuración del Repositorio Central (Lead QA / Scrum Master)
*Esta tarea la realiza un único miembro asignado en el equipo:*
1.  En GitHub, cree un repositorio llamado `proyecto-agile-playwright`.
2.  Vaya a la pestaña **Settings > Collaborators** y envíe invitaciones a todos sus compañeros de equipo.
3.  Localmente, inicialice el proyecto base de Playwright, configure el archivo `.gitignore` (para excluir carpetas de dependencias y reportes como `node_modules/` y `playwright-report/`) y realice el primer push a la rama `main`.

## 🔗 Paso 2: Clonación y Sincronización Inicial (Equipo completo)
*A partir de aquí, trabajan todos los miembros del equipo:*
1.  Acepten la invitación de colaboración enviada a sus correos o perfiles de GitHub.
2.  Abran su terminal en una carpeta local y clonen el repositorio compartido:
    ```bash
    git clone <URL_DEL_REPO_COMPARTIDO>
    ```
3.  Entren a la carpeta generada e instalen las dependencias del proyecto:
    ```bash
    cd proyecto-agile-playwright
    npm install
    ```

## 🌿 Paso 3: Asignación en Trello y Creación de Ramas de Trabajo
1.  **Transparencia:** En el tablero Trello, cada miembro toma una tarjeta de prueba diferente y la mueve a "En curso".
2.  **Ramificación:** En la terminal local, cada miembro crea una rama aislada con el nombre de su funcionalidad asignada:
    ```bash
    git checkout -b prueba-login-miembroA
    ```
    *Esto garantiza que todos trabajen en paralelo de manera aislada.*

## ✍️ Paso 4: Desarrollo de Pruebas y Commits Locales
1.  Creen o modifiquen su archivo de prueba de Playwright (ej: `tests/login.spec.ts`) para implementar los escenarios correspondientes.
2.  Ejecuten localmente y comprueben que la prueba funciona de forma exitosa.
3.  Confirmar y guardar los cambios realizados en el historial local de su rama de trabajo:
    ```bash
    git add .
    git commit -m "Automatiza el camino positivo de la historia de Login"
    ```

## 🔄 Paso 5: Sincronización y Pull Request (Revisión por Pares - Code Review)
1.  Descarguen los últimos cambios integrados por sus compañeros en el repositorio remoto:
    ```bash
    git pull origin main
    ```
2.  Suban su rama aislada al repositorio remoto compartido en GitHub:
    ```bash
    git push origin prueba-login-miembroA
    ```
3.  Vayan a GitHub y hagan clic en **"Compare & pull request"**.
4.  **Revisión por Pares (Code Review):** Asignen a otro compañero del equipo como revisor. Este compañero revisará que los selectores sean robustos, las aserciones adecuadas y el código limpio. Una vez conforme, aprobará e integrará (`Merge`) los cambios a la rama `main`.

## 🏁 Paso 6: Actualización del Estado de Hecho (DoD)
1.  Una vez integrado el código en `main`, muevan la tarjeta en Trello a la columna **"Hecho"**.
2.  Los demás miembros ejecutan `git checkout main` y luego `git pull origin main` en sus terminales locales para descargar las últimas pruebas integradas del equipo.

> [!IMPORTANT]
> El uso de ramas de trabajo y revisiones de código ayuda a que el equipo completo sea responsable de la calidad de los scripts de automatización, reduciendo fallos y mantenimiento.

---

## 📝 Preguntas de Reflexión y Análisis Crítico (Para los Estudiantes)
1.  ¿Por qué es una mala práctica subir cambios directamente a la rama `main` en proyectos ágiles con múltiples colaboradores?
2.  ¿Cómo ayuda el proceso de revisión de código (Pull Request / Code Review) a mantener estándares de calidad y la homogeneidad en los scripts de Playwright?
