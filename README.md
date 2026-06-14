# 🚀 Automation Exercise - Playwright Cucumber POM (TypeScript)

Este repositorio contiene un framework de automatización de pruebas de extremo a extremo (E2E) e híbrido (UI + API) diseñado para el sitio web [Automation Exercise](https://automationexercise.com/). Está construido bajo estándares de arquitectura y desarrollo de nivel **SDET Senior**, utilizando **Playwright**, **Cucumber (Gherkin BDD)** y **TypeScript**.

La suite cubre los **26 casos de prueba completos** (registro, checkout, pagos, descargas de facturas, búsqueda, filtros, reseñas, suscripción y contacto).

---

## 🌟 Características Clave y Patrones de Diseño

- **Page Object Model (POM) Tipado**: Encapsulación completa de la lógica de interfaz con propiedades `readonly Locator` de Playwright, aprovechando las auto-esperas inteligentes y mitigando inestabilidades (*flakiness*).
- **Control de Inestabilidad por Anuncios (Ads & Hover Overlays)**:
  - Bloqueo preventivo de red para dominios publicitarios de Google en [hooks.ts](support/hooks.ts).
  - Simulación de estados `:hover` explícitos para interactuar correctamente con elementos superpuestos de tipo overlay (`.overlay-content a.add-to-cart`).
  - Clicks forzados (`{ force: true }`) y auto-desplazamientos en botones que puedan ser interceptados por elementos flotantes.
- **Desacoplamiento de Datos de Prueba (Test Data)**: Todos los valores de prueba (usuarios, credenciales, tarjetas ficticias, datos de contacto) están centralizados en [testData.ts](support/testData.ts), haciendo que los escenarios `.feature` sean puramente declarativos de negocio.
- **Ciclo de Vida Independiente (Aislamiento de Estado)**: Inicialización y destrucción de contextos de navegación (`BrowserContext`) y API (`APIRequestContext`) únicos por cada escenario, evitando fugas de memoria o contaminación de datos entre ejecuciones.
- **Manejo Centralizado de Diálogos**: Captura automática de popups y alertas del navegador (`dialog.accept()`) configurada en el hook global `Before`.
- **Estrategia Híbrida (UI + API)**: Limpieza e inicialización rápida del estado del usuario mediante llamadas directas a la API del sitio a través de [UserApiClient.ts](api/UserApiClient.ts), acelerando las pruebas y garantizando precondiciones repetibles.
- **Reportes Visuales Autogenerados**: Captura automática de pantalla (screenshot en PNG) integrada dentro del reporte HTML de Cucumber en caso de fallas en algún paso.

---

## 📁 Estructura del Proyecto

```text
Automation-exercise/
│
├── api/                     # Clientes de API para inicialización y limpieza rápida de datos
│   ├── ProductClient.ts
│   └── UserApiClient.ts
│
├── features/                # Escenarios BDD en Gherkin estructurados en inglés
│   ├── login.feature        # Casos de Login, Logout y Errores (TCs 2, 3, 4, 5)
│   ├── register.feature     # Registro detallado de cuentas de usuario (TCs 1, 5)
│   ├── products.feature     # Catálogo, Detalle de Producto, Categorías, Marcas y Reseñas (TCs 8, 9, 18, 19, 21)
│   ├── products_api.feature # Pruebas funcionales de APIs (TCs 27+)
│   ├── cart_and_checkout.feature # Gestión de carrito, checkout, pagos y descargas (TCs 12, 13, 14, 15, 16, 17, 20, 22, 23, 24)
│   └── ui_extras.feature    # Suscripciones, Contacto con adjuntos y Scroll de página (TCs 6, 7, 10, 11, 25, 26)
│
├── pages/                   # Clases Page Object Model (POM)
│   ├── BasePage.ts          # Navegaciones y acciones base compartidas
│   ├── HomePage.ts          # Menús, scroll, recomendados y suscripción de inicio
│   ├── LoginPage.ts         # Formularios de acceso y pre-registro
│   ├── SignupPage.ts        # Formulario detallado de registro de dirección/cuenta
│   ├── ProductsPage.ts      # Filtros, catálogo, búsqueda con fallbacks y adición al carrito
│   ├── ProductDetailPage.ts # Detalle técnico de producto y caja de reviews
│   ├── CartPage.ts          # Tabla de productos del carrito con control de vaciado
│   ├── CheckoutPage.ts      # Dirección de entrega/facturación y comentarios
│   ├── PaymentPage.ts       # Pasarela de pagos simulada y descargas de facturas
│   └── ContactUsPage.ts     # Formulario de soporte GET IN TOUCH y carga de adjuntos
│
├── step_definitions/        # Implementación en TypeScript de los pasos de Gherkin
│   ├── loginSteps.ts
│   ├── registerSteps.ts
│   ├── productsSteps.ts
│   ├── productsApiSteps.ts
│   ├── cartAndCheckoutSteps.ts
│   └── uiExtrasSteps.ts
│
├── support/                 # Configuración de Hooks, Mundo y Data
│   ├── hooks.ts             # Setup de Playwright, bloqueo de anuncios y dialogos
│   ├── testData.ts          # Centralización de credenciales y datos de entrada
│   └── upload_sample.txt    # Archivo muestra utilizado para pruebas de carga
│
├── azure-pipelines.yml      # Pipeline CI/CD optimizado para Azure DevOps (Caché NPM + Playwright)
├── cucumber.json            # Configuración del ejecutor de Cucumber
├── tsconfig.json            # Configuración del compilador TypeScript
└── package.json             # Scripts de ejecución y dependencias del proyecto
```

---

## 🛠️ Requisitos Previos

Asegúrate de contar con lo siguiente en tu entorno local:
- [Node.js](https://nodejs.org/) (Versión recomendada: v20 o superior)
- [Git](https://git-scm.com/)

---

## ⚙️ Configuración Inicial

1. **Clonar el repositorio:**
   ```bash
   git clone git@github.com:jesteban94/Automation-exercise-playwright.git
   cd Automation-exercise
   ```

2. **Instalar dependencias de desarrollo:**
   ```bash
   npm install
   ```

3. **Instalar los binarios de navegadores de Playwright:**
   ```bash
   npx.cmd playwright install chromium
   ```

---

## 🏃 Ejecución de Pruebas

El framework soporta ejecuciones con visualización de navegador (headed), sin interfaz (headless), filtrado por etiquetas (tags) y procesamiento paralelo.

### 1. Ejecutar Suite Completa (Modo No Visual - Headless)
```powershell
$env:HEADLESS="true"; npx.cmd cucumber-js
```

### 2. Ejecutar de Forma Visible (Modo Visual - Headed)
```powershell
$env:HEADLESS="false"; npx.cmd cucumber-js
```

### 3. Ejecución Paralela (Sin interfaz)
Para optimizar los tiempos de ejecución distribuyendo las características entre múltiples hilos de procesamiento (ej. 3 trabajadores paralelos):
```powershell
$env:HEADLESS="true"; npx.cmd cucumber-js --parallel 3
```

### 4. Pruebas Críticas (Smoke Testing)
Los escenarios críticos y flujos primarios (login, registro exitoso, carrito inicial) están categorizados con la etiqueta `@smoke`. Para correr únicamente esta suite corta:
```powershell
$env:HEADLESS="true"; npx.cmd cucumber-js --tags "@smoke"
```

> [!TIP]
> Si estás utilizando **CMD** (Símbolo del sistema de Windows) en lugar de PowerShell, reemplaza el comando de definición de variables por: `set HEADLESS=true&& npx cucumber-js --parallel 3`

---

## 📊 Reportes de Pruebas

Al finalizar cualquier ejecución, se genera un reporte interactivo en formato HTML:
* **Ruta del reporte**: `cucumber-report.html` en la raíz del proyecto.
* **Características**:
  - Estado detallado de cada step de Cucumber.
  - Tiempos de ejecución por escenario.
  - Capturas de pantalla (screenshots) integradas en caso de fallo para facilitar la depuración inmediata.

---

## ⚙️ Integración Continua (CI/CD) - Azure DevOps

El archivo [azure-pipelines.yml](azure-pipelines.yml) proporciona una configuración optimizada para la capa gratuita de Azure DevOps:
- Configura Node.js v20.
- Restaura y guarda en caché las dependencias `node_modules` de npm.
- Restaura y guarda en caché los binarios de Playwright (`%USERPROFILE%\AppData\Local\ms-playwright` en Windows o `~/.cache/ms-playwright` en Linux).
- Ejecuta las pruebas en modo headless.
- Publica el archivo de reporte `cucumber-report.html` como un artefacto descargable de la ejecución del pipeline.


# Suite completa (27 escenarios, ~4 min)
npx cucumber-js

# Solo smoke (7 escenarios, ~1 min)
npx cucumber-js --tags '@smoke'

# Solo regression
npx cucumber-js --tags '@regression'

# Solo tests negativos
npx cucumber-js --tags '@negative'

# Por área funcional
npx cucumber-js --tags '@cart or @checkout'
npx cucumber-js --tags '@products'
npx cucumber-js --tags '@ui'
npx cucumber-js --tags '@api'

# End-to-end solamente
npx cucumber-js --tags '@e2e'

# Headless (CI/CD)
HEADLESS=true npx cucumber-js

# Headed (visual)
HEADLESS=false npx cucumber-js
