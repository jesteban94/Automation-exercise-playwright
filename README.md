# Automation Exercise - Playwright Cucumber POM (TypeScript)

Este proyecto es un framework de automatización robusto diseñado para realizar pruebas de interfaz de usuario (UI) y de API en el sitio web [Automation Exercise](https://automationexercise.com/). Está construido bajo los más altos estándares de calidad de ingeniería de pruebas (SDET) utilizando **Playwright**, **Cucumber (Gherkin)** y **TypeScript**.

## 🚀 Características y Buenas Prácticas

- **Patrón de Diseño Page Object Model (POM)**: Organización limpia de los selectores y lógica de interacción con páginas de manera desacoplada.
- **Uso Estricto de `Locator` de Playwright**: Evita selectores estáticos en cadena y aprovecha la evaluación perezosa y el auto-espera inteligente de Playwright, erradicando fallos por inestabilidad (*flakiness*).
- **Ciclo de Vida Limpio (Aislamiento)**: Hooks `Before` y `After` que levantan y destruyen contextos independientes de navegador (`BrowserContext`) y clientes API (`APIRequestContext`) por cada escenario.
- **Captura automática de evidencia en Fallos**: Si un escenario falla, se toma automáticamente un screenshot en formato PNG y se adjunta directo al reporte de Cucumber.
- **Integración Híbrida UI/API**: Uso de peticiones API a través del cliente `UserApiClient` para preparar/limpiar precondiciones del estado de los usuarios antes de ejecutar las pruebas visuales en la interfaz.
- **Pipeline CI/CD en Azure DevOps**: Archivo de integración continua [azure-pipelines.yml](azure-pipelines.yml) configurado para caché inteligente de dependencias npm y binarios de Playwright.

---

## 📁 Estructura del Proyecto

```text
Automation-exercise/
│
├── api/                   # Clientes de API para preparar datos e interactuar con servicios REST
│   ├── ProductClient.ts
│   └── UserApiClient.ts
│
├── features/              # Escenarios de prueba escritos en formato Gherkin (BDD)
│   ├── login.feature
│   ├── register.feature
│   └── products_api.feature
│
├── pages/                 # Clases POM (Page Object Model) usando Locators
│   ├── BasePage.ts
│   ├── HomePage.ts
│   ├── LoginPage.ts
│   └── SignupPage.ts
│
├── step_definitions/      # Implementación en TypeScript de los pasos Gherkin
│   ├── loginSteps.ts
│   ├── registerSteps.ts
│   └── productsApiSteps.ts
│
├── support/               # Ciclos de vida, Hooks y configuraciones compartidas
│   └── hooks.ts
│
├── azure-pipelines.yml    # Pipeline de CI/CD para Azure DevOps
├── cucumber.json          # Configuración del ejecutor de Cucumber
├── tsconfig.json          # Configuración de TypeScript
└── package.json           # Dependencias y scripts npm
```

---

## 🛠️ Requisitos Previos

Asegúrate de tener instalado:
- [Node.js](https://nodejs.org/) (Versión recomendada: v20 o superior)
- [Git](https://git-scm.com/)

---

## ⚙️ Configuración del Proyecto

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Instalar navegadores de Playwright:**
   ```bash
   npx playwright install chromium
   ```

---

## 🏃 Ejecución de Pruebas

Para ejecutar toda la suite de pruebas localmente y generar el reporte HTML:

```bash
npm test
```

### Reporte de Pruebas

Una vez finalizada la ejecución, se generará un reporte HTML en la raíz del proyecto llamado `cucumber-report.html`. Puedes abrirlo con cualquier navegador web para ver el estado detallado de cada paso y las capturas de pantalla de los fallos, si los hubiere.

---

## ⚙️ Integración Continua (CI/CD) - Azure DevOps

El proyecto incluye un pipeline listo para producción en `azure-pipelines.yml`. Para configurarlo en tu organización de Azure DevOps:

1. Ve a tu proyecto de Azure DevOps y navega a **Pipelines** -> **New pipeline**.
2. Selecciona **GitHub** y autoriza el acceso a tu repositorio `jesteban94/Automation-exercise-playwright`.
3. Selecciona **Existing Azure Pipelines YAML file** y elige `/azure-pipelines.yml` de la rama `main`.
4. El pipeline implementa almacenamiento en caché para `node_modules` y la carpeta cache de navegadores de Playwright (`~/.cache/ms-playwright`), acelerando de forma drástica cada ejecución.
