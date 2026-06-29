# 📝 Guía de Laboratorio: Construcción de un Dashboard Centralizado de Pruebas
## Módulo de Agile Testing y Métricas de Calidad en CI/CD

Esta actividad práctica conecta la telemetría técnica (Playwright + GitHub Actions) con la gestión ágil (Trello) mediante la construcción de un panel centralizado (Dashboard) de calidad en el repositorio y la simulación de ceremonias Scrum centradas en la mitigación de deuda técnica.

---

## ⏱️ Estructura del Taller (Duración: 2 Horas)

El taller está diseñado para realizarse en equipos de trabajo (Equipos A, B y C) distribuidos en 4 bloques de 30 minutos:

```
┌─────────────────────────────────┐     ┌─────────────────────────────────┐
│   Bloque 1: Extracción Datos     │     │   Bloque 2: Dashboard en Wiki   │
│ Minutos: 0 - 30                 │ ──> │ Minutos: 30 - 60                │
│ Analizar logs CI/CD y Trello.   │     │ Redactar y publicar el estado.  │
└─────────────────────────────────┘     └─────────────────────────────────┘
                                                         │
                                                         ▼
┌─────────────────────────────────┐     ┌─────────────────────────────────┐
│   Bloque 4: DoD y Cierre        │     │   Bloque 3: Daily Stand-up      │
│ Minutos: 90 - 120               │ <── │ Minutos: 60 - 90                │
│ Evaluar criterios de aceptación.│     │ Simular debate de "code churn". │
└─────────────────────────────────┘     └─────────────────────────────────┘
```

---

## 🎯 Objetivos de Aprendizaje
*   **Transparencia (Agile Principle):** Evitar silos de información publicando las métricas de calidad en un radiador de información accesible para todo el equipo.
*   **Enfoque de Equipo Completo (Whole-Team Approach):** Compartir la responsabilidad de la calidad entre desarrolladores y probadores ante incidencias críticas de automatización.
*   **Trazabilidad y Calidad Sostenible:** Validar que los entregables cumplan con la Definición de Hecho (DoD) mediante indicadores cuantitativos.

---

## 📈 Bloque 1: Extracción de Métricas (30 Minutos)

El equipo debe ingresar a sus respectivas herramientas para obtener y calcular los datos crudos del estado de la iteración:

1.  **Métricas de Integración Continua (CI/CD):**
    *   Revisar la pestaña **Actions** en su repositorio de GitHub.
    *   Localizar la última ejecución del pipeline de pruebas automatizadas y calcular la **Tasa de Paso/Fallo** global.
    *   Identificar qué pruebas específicas fallaron y documentar los motivos (ej: selectores rotos, problemas de red, bugs en el software).
2.  **Métricas de Gestión Ágil (Trello):**
    *   Revisar el tablero Kanban de Trello de su equipo.
    *   Contabilizar los siguientes elementos:
        *   **HUs Entregadas:** Tarjetas en la columna *Hecho/Done* (con etiqueta verde).
        *   **Bugs Reportados:** Tarjetas creadas en la columna de bugs (con etiqueta roja).
    *   Calcular la **Densidad de Defectos** (`Bugs / HUs`).

---

## 💻 Bloque 2: Creación de la Wiki / Dashboard en GitHub (30 Minutos)

Los equipos deben consolidar la información en un formato Markdown simple. Crearán una página en la **Wiki** de su repositorio (o en un archivo del repositorio si la Wiki no está habilitada) titulada **"Dashboard de Calidad - Sprint 1"**.

### Plantilla Base del Dashboard (Copiar y Completar)
```markdown
# 📊 Dashboard de Calidad - Sprint 1
*Última actualización: [Fecha y Hora]*

## 1. Resumen Ejecutivo de la Iteración
*   **Estado General del Sprint:** 🔴 En Riesgo / 🟡 Estable con Observaciones / 🟢 Saludable
*   **HUs Planificadas en Iteración:** [Número]
*   **HUs Completadas (DoD Cumplido):** [Número]

## 2. Métricas de Calidad
| Métrica | Valor Obtenido | Meta (KPI) | Estado (Cumple / No Cumple) |
| :--- | :---: | :---: | :---: |
| Tasa de Paso (Pass/Fail Rate) | [__]% | >= 95% | [Estado] |
| Densidad de Defectos | [__] | < 0.3 | [Estado] |
| Cobertura de Riesgos Mitigados | [__]% | 100% de Críticos | [Estado] |

## 3. Logs de Bloqueos y Fallos en Pipeline
*Adjuntar la captura o enlace al reporte generado por GitHub Actions:*
*   **Enlace al Reporte HTML (Artefacto):** [Link al artefacto o build de GitHub Actions]
*   **Fallo Detectado Principal:** [Ej: Flujo de checkout de invitado falló en el selector del modal]
*   **Causa Raíz Identificada:** [Ej: Modificación del diseño HTML de la cabecera en el último commit]

## 4. Plan de Acción de Pruebas
*   **Acción 1:** [Acción correctiva propuesta por el equipo]
*   **Acción 2:** [Plan de mantenimiento de los scripts de prueba]
```

---

## 👥 Bloque 3: Simulación de la Reunión de Pie (Daily Stand-up) (30 Minutos)

Los equipos realizarán un juego de roles (Role-play) simulando un Daily Stand-up de 10-15 minutos frente a su Dashboard o tablero Trello.

### Instrucciones del Role-play:
1.  **Asignación de Roles:**
    *   **Probador / Automation Engineer:** Expone la situación técnica.
    *   **Desarrollador / Dev Engineer:** Responsable del código de la aplicación.
    *   **Scrum Master:** Modera la reunión para asegurar que se centren en los bloqueos.
2.  **Responder las 3 Preguntas Clásicas:**
    *   *¿Qué completé ayer?*
    *   *¿En qué trabajaré hoy?*
    *   *¿Tengo algún bloqueo/impedimento?*
3.  **Introducir la Situación de Conflicto (Simulada):**
    > ⚠️ **Situación Crítica:**
    > El desarrollador subió un cambio masivo de diseño ("Batido de código" / *Code Churn*) para mejorar la estética del menú de navegación. Esto rompió los localizadores (`locators`) de Playwright configurados previamente, provocando que el pipeline de integración continua falle al 100%.
4.  **Debate y Resolución (Whole-Team Approach):**
    *   El equipo debe dialogar sobre cómo solucionar esto de manera ágil.
    *   *Premisa:* No es responsabilidad exclusiva del probador reparar el script si el desarrollador causó el cambio sin previo aviso. Deben acordar parar el desarrollo de nuevas funciones y trabajar juntos para reparar el selector y destrabar el pipeline antes de que finalice el sprint.

---

## 🎯 Bloque 4: Trazabilidad y "Definition of Done" (DoD) (30 Minutos)

El bloque final se centrará en auditar los resultados de la iteración contra los estándares mínimos de calidad definidos por la organización.

### Lista de Chequeo de la Definición de Hecho (DoD)
El equipo revisará si las HUs que están en la columna "Hecho" cumplen realmente con el DoD:
- [ ] ¿El código cuenta con revisión de pares (Code Review)?
- [ ] ¿La rama de código compila sin errores en el pipeline de GitHub Actions?
- [ ] ¿La tasa de paso de las pruebas de Playwright es del 100% (o cumple con la tolerancia permitida)?
- [ ] ¿Todos los defectos críticos reportados durante la iteración han sido resueltos y cerrados?
- [ ] ¿Las métricas y el dashboard de calidad han sido actualizados y comunicados en el repositorio?

---

## 📝 Preguntas de Reflexión y Análisis Crítico (Para los Estudiantes)

Al finalizar la simulación, cada equipo debe responder a estas preguntas en un archivo Markdown en su repositorio (`reflexiones.md`) para consolidar la teoría de Agile Testing:

1.  **Análisis de Impacto de Deuda Técnica:** ¿Qué impacto tiene para el negocio y el equipo que el pipeline de CI/CD permanezca fallando (rojo) por más de 24 horas debido a selectores obsoletos?
2.  **Colaboración Activa:** En un verdadero equipo ágil, si un cambio del desarrollador rompe las pruebas automáticas, ¿cómo se debería gestionar esta comunicación para evitar fricciones y mantener el pipeline en verde?
3.  **Uso de Métricas:** Si la densidad de defectos de una iteración es muy alta (ej: superior a 1.0) pero la tasa de paso del pipeline es del 100%, ¿qué indica esto sobre la cobertura o el diseño de las pruebas automatizadas que se están ejecutando?
