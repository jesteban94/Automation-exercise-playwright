# 📝 Práctica 7: Explicación para el Equipo: ¿Por qué un solo repositorio y cómo colaboramos?

Antes de ir a la práctica, es fundamental explicar a los estudiantes los beneficios de esta configuración:

Única fuente de la verdad: En los equipos ágiles, las pruebas automatizadas (scripts de Playwright), las pruebas manuales y el código fuente del producto suelen almacenarse en el mismo repositorio.

Facilidad de acceso y control histórico: Mantener todos los activos en una sola herramienta de gestión de configuración permite el control de versiones, garantiza que todos los miembros del equipo tengan acceso a la última versión y conserva el historial completo de cambios.

Evitar conflictos mediante Ramas (Branches): Como varias personas codificarán pruebas al mismo tiempo, nadie debe trabajar directamente sobre la rama principal (main). Cada probador o desarrollador creará una "rama" aislada para su historia de usuario, desarrollará su prueba en Playwright y luego solicitará integrarla.

Actividad de Laboratorio Ajustada: "Colaboración de Pruebas en un Repositorio Único"

En lugar de que cada estudiante cree su propio repositorio, en esta práctica simularemos un entorno de trabajo real donde un líder configura el espacio y el resto del equipo se integra para colaborar.

## Paso 1: Configuración del Repositorio Central (Líder del Equipo / Instructor)

Esta tarea la realiza solo un miembro del equipo (simulando al Scrum Master o Lead QA).

En GitHub, crea un nuevo repositorio llamado proyecto-agile-playwright.

Ve a la pestaña Settings > Collaborators en GitHub y añade a los demás miembros del equipo enviándoles una invitación.

Localmente, inicializa el proyecto base de Playwright (npm init playwright@latest), crea el archivo .gitignore (asegurando que se ignoren carpetas pesadas como node_modules/ y playwright-report/) y haz el primer push a la rama main.

## Paso 2: Clonación y Sincronización Inicial (Todo el Equipo)

A partir de aquí, trabajan todos los miembros del equipo.

Acepten la invitación de colaboración en GitHub.

Abran su terminal y clonen el repositorio central en sus computadoras locales ejecutando: git clone <URL_DEL_REPO_COMPARTIDO>

Entren a la carpeta del proyecto (cd proyecto-agile-playwright) e instalen las dependencias con npm install.

## Paso 3: Asignación en Trello y Creación de Ramas (Aislamiento)

Transparencia: Vayan al tablero de Trello. Cada miembro del equipo debe tomar una tarjeta de prueba diferente (ej. Miembro A toma "Prueba Login", Miembro B toma "Prueba Registro") y moverla a la columna "En curso".

Ramificación: En la terminal, cada miembro debe crear y moverse a una rama nueva y aislada con el nombre de su tarea: git checkout -b prueba-login-miembroA (Esto asegura que el Miembro A y el Miembro B programen en paralelo sin pisar el código del otro).

## Paso 4: Desarrollo de Pruebas y Commits Locales

Cada estudiante crea o modifica su propio archivo .spec.ts en la carpeta de pruebas de Playwright (ej. login.spec.ts).

Ejecutan la prueba localmente (npx playwright test) para asegurarse de que funciona.

Guardan y confirman los cambios en su rama local:

```bash
git add .
git commit -m "Automatiza el camino positivo de la historia de Login"
```

## Paso 5: Sincronización y Pull Request (Revisión por Pares)

Antes de subir el código, es una buena práctica traer los últimos cambios del equipo para evitar conflictos: git pull origin main.

Suban su rama al repositorio remoto compartido: git push origin prueba-login-miembroA

Vayan a GitHub y hagan clic en "Compare & pull request".

Colaboración Activa: En lugar de aceptar sus propios cambios, el Miembro A debe pedirle al Miembro B que revise su código (Code Review). El Miembro B revisará que los selectores de Playwright sean robustos y que se cumplan los criterios de aceptación.

Una vez aprobado, se hace clic en "Merge pull request" para integrar la prueba a la rama main.

## Paso 6: Actualización del Estado de Hecho (DoD)

Una vez que el código está en la rama principal y las pruebas pasan en el repositorio remoto, el miembro del equipo mueve su tarjeta en Trello a la columna "Hecho".

Todos los demás miembros ejecutan git checkout main y luego git pull origin main en sus terminales para descargar las pruebas que sus compañeros acaban de integrar.

Con este ajuste, los equipos de trabajo experimentarán de primera mano los retos y soluciones de la colaboración en equipo (whole-team approach), aprendiendo a gestionar la configuración de manera que soporte la Integración Continua (CI) que implementarán en la siguiente sesión.
