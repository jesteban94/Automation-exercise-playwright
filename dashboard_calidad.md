# 📊 Dashboard de Calidad de Software - Sprint 1 (Base)
## Proyecto: Automation Exercise Playwright + Cucumber

Este es el Dashboard de Calidad centralizado del proyecto. Funciona como un radiador de información para reflejar el estado actual de la iteración.

> [!IMPORTANT]
> **Instrucciones para la Actividad:**
> Cada equipo (**Equipo A, B y C**) debe analizar las métricas de sus respectivos componentes y actualizar las secciones de este archivo con la información real extraída del pipeline de CI/CD (GitHub Actions) y del tablero Trello.

---

## 📅 1. Información General del Sprint
*   **Sprint:** Sprint 1 - Estabilización de Funcionalidades
*   **Fecha de Corte:** [Estudiante: Completar Fecha]
*   **Estado General del Sprint:** 🟡 **[Completar: Saludable / En Riesgo / Crítico]**
*   **Responsable de Actualización:** [Estudiante: Nombres/Equipo]

---

## 📈 2. Cuadro de Mando de Métricas
Actualicen los valores reales obtenidos tras ejecutar los tests y revisar Trello:

| Métrica | Valor Esperado (KPI) | Valor Real Obtenido | Estado (Cumple / No Cumple) |
| :--- | :---: | :---: | :---: |
| **Tasa de Paso (Pass/Fail Rate)** | $\ge 95\%$ | `[   ]%` | [__] |
| **Densidad de Defectos** | $< 0.3$ bugs/HU | `[   ]` | [__] |
| **Cobertura de Riesgos** | $100\%$ Críticos | `[   ]%` | [__] |

---

## 🔍 3. Análisis Técnico de Fallos en Pipeline (GitHub Actions)
Documenten el enlace directo al artefacto del reporte HTML y detallen los errores bloqueantes que causaron fallos en las ejecuciones automáticas:

*   **Enlace al Reporte de Pruebas (HTML Artifact):** [Insertar enlace aquí]
*   **Resumen de Fallos Críticos Encontrados:**
    1.  *Fallo en Componente [Ej: Carrito]:* [Detallar descripción del error, ej: el botón de Checkout no responde]
    2.  *Fallo en Componente [Ej: Autenticación]:* [Detallar descripción del error, ej: error 500 en creación de cuenta]

---

## 📝 4. Registro de Bloqueos en el Daily Stand-up (Juego de Roles)
Registren el bloqueo discutido durante el juego de roles y el plan de acción acordado por el equipo completo para mitigar la deuda técnica:

*   **Bloqueo Identificado (Code Churn):** [Describir la situación simulada de selectores rotos debido al cambio de código de desarrollo]
*   **Plan de Acción Acordado:**
    - [ ] [Acción 1: Detener desarrollo de nuevas HUs]
    - [ ] [Acción 2: Reparación de selectores obsoletos por parte de Dev + QA]
    - [ ] [Acción 3: Re-ejecutar pipeline y verificar el verde]

---

## 🎯 5. Verificación de Definition of Done (DoD)
Marquen los criterios que el equipo ha verificado para las Historias de Usuario completadas:

- [ ] Código fuente revisado por pares (Pull Request aprobado).
- [ ] Pipeline de CI/CD compila correctamente en la rama principal.
- [ ] Pruebas automatizadas Playwright cubren los escenarios de aceptación.
- [ ] Tasa de paso de Playwright cumple con la tolerancia acordada.
- [ ] No existen defectos abiertos de severidad crítica o alta.
- [ ] Métricas de calidad consolidadas y documentadas en este dashboard.
