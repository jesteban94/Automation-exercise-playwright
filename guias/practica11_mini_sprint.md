# 📝 Práctica 11: Actividad de Laboratorio: "Mini-Sprint Completo: El Reto Final"
## Módulo: Agile Testing, Simulación de Scrum y Reto Final de Automatización

Esta actividad final desafía al equipo a experimentar un ciclo ágil completo de **2 horas** utilizando bloques de tiempo estrictos (timeboxing), simulando las dinámicas, ceremonias y presiones de un sprint de desarrollo y pruebas en un entorno real con **3 equipos de trabajo independientes colaborando en paralelo**.

---

## 🎯 Objetivos de Aprendizaje
*   **Simulación Ágil Completa:** Experimentar todas las fases de un sprint (Planning, Daily, Execution, Demo y Retrospective) bajo presión controlada de tiempo.
*   **Trabajo en Equipo Completo (Whole-Team Approach):** Dividir el trabajo en sub-células de automatización y exploración manual para maximizar la cobertura.
*   **Colaboración Multi-equipo (Scaling Agile):** Coordinar la integración de código de 3 equipos (A, B y C) en un solo repositorio remoto y mantener el pipeline de CI/CD estable.

⏱️ **Duración Estimada:** 2 Horas (Timeboxing Estricto)

---

## 👥 Organización de los Equipos de Trabajo (3 Células en Paralelo)
El reto final se ejecuta distribuyendo el alcance en tres equipos ágiles con focos específicos:
*   **Equipo A (Productos):** Foco en automatización y exploración de la búsqueda de catálogo e inventario.
*   **Equipo B (Carrito):** Foco en el flujo del carrito de compras y control de Proceed to Checkout.
*   **Equipo C (Autenticación / Login):** Foco en el registro de cuentas y flujos de login y logout.

---

## ⏱️ Estructura del Taller (Timeboxing de 2 Horas / 120 Minutos)

La sesión se divide rígidamente en tres bloques de tiempo estructurados:

```
┌─────────────────────────────────┐     ┌─────────────────────────────────┐
│   Bloque 1: Planificación       │     │   Bloque 2: Ejecución Paralela  │
│ Minutos: 0 - 30 (30 min)        │ ──> │ Minutos: 30 - 80 (50 min)       │
│ Estimación y Ramas por Equipo.  │     │ Playwright + Exploración Manual.│
└─────────────────────────────────┘     └─────────────────────────────────┘
                                                         │
                                                         ▼
                                        ┌─────────────────────────────────┐
                                        │   Bloque 3: Cierre y Retro      │
                                        │ Minutos: 80 - 120 (40 min)      │
                                        │ PRs, DoD, Sprint Demo y Cierre. │
                                        └─────────────────────────────────┘
```

---

## 📅 Bloque 1: Planificación y Diseño (30 Minutos)

Durante el primer bloque, los 3 equipos coordinan la entrada del sprint:

1.  **Póquer de Planificación (Poker Planning) [15 min]:**
    *   El instructor (Propietario de Producto) presenta **2 historias de usuario nuevas por equipo** en el backlog de Trello (un total de 6 HUs en el tablero).
    *   Cada equipo (A, B y C) se reúne por separado para estimar el esfuerzo y complejidad de las pruebas de su alcance usando cartas de Poker Planning, debatiendo discrepancias de forma rápida.
2.  **Análisis de Riesgos [10 min]:**
    *   Cada equipo define rápidamente un riesgo funcional y uno no funcional para sus historias.
    *   Determinan las técnicas de prueba (híbridas de Playwright, exploración o API) para mitigarlos.
3.  **Reparto de Tareas e Inicialización de Código [5 min]:**
    *   Los miembros se asignan las tareas técnicas de Playwright (etiquetas naranjas) y exploratorias en Trello.
    *   Cada miembro crea su rama aislada en Git referenciando a su equipo y funcionalidad:
        ```bash
        git checkout -b sprint-final-equipoA-login
        ```

---

## 🚀 Bloque 2: Ejecución Paralela (50 Minutos)

Los 3 equipos trabajan de forma simultánea. En cada equipo, los miembros se dividen en dos sub-células:

1.  **Sub-célula de Automatización (Playwright):**
    *   Escriben los scripts híbridos (UI + API) en Playwright para cubrir los criterios de aceptación de sus HUs asignadas.
    *   Realizan commits constantes y hacen `push` para disparar el pipeline de CI/CD en GitHub Actions.
2.  **Sub-célula Exploratoria (Trello + Manual):**
    *   Redactan el contrato (Test Charter) en Trello y ejecutan una sesión exploratoria ininterrumpida de 30 minutos sobre el flujo del componente correspondiente.
    *   Reportan bugs en tiempo real creando tarjetas rojas en la columna "Por hacer" de Trello.
3.  **Reunión de Pie (Daily Stand-up Sincronizada) [3 min]:**
    *   En el minuto 25 de este bloque (mitad de la ejecución), cada uno de los 3 equipos realiza su Daily de 3 minutos: *¿Qué completé?*, *¿Qué haré hoy?* y *¿Qué bloqueos tengo?*.

---

## 🏁 Bloque 3: Consolidación, Demostración y Retrospectiva (40 Minutos)

Es el bloque de integración más crítico, donde los 3 equipos deben unir esfuerzos para estabilizar el producto:

1.  **Integración y Validación Multi-equipo [15 min]:**
    *   Los equipos inician la revisión de código cruzada (Code Review) y aprueban los Pull Requests en GitHub.
    *   > [!WARNING]
        > **Coordinación de Git:** Al ser 3 equipos subiendo código al mismo repositorio, deben coordinarse para resolver cualquier conflicto de integración (`merge conflicts`) y asegurar que el pipeline de GitHub Actions quede al 100% en verde.
2.  **Verificación del Definition of Done (DoD) y Dashboard [10 min]:**
    *   Cada equipo verifica si sus HUs cumplen con el DoD y las mueven a "Hecho" en Trello.
    *   Actualizan el [dashboard_calidad.md](file:///c:/Users/Esteban/Documents/Automation-exercise/dashboard_calidad.md) y [metricas.md](file:///c:/Users/Esteban/Documents/Automation-exercise/metricas.md) consolidando la tasa de paso global de los tres equipos.
3.  **Sprint Demo [10 min]:**
    *   Los 3 equipos presentan el software funcionando de forma integrada y el pipeline en verde al instructor (PO).
4.  **Retrospectiva Final (El Cierre - 15 Minutos):**
    *   El equipo completo se reúne. Cada alumno propone una mejora sobre la automatización, la comunicación en Trello o la coordinación técnica entre equipos.

---

## 📝 Preguntas de Reflexión y Análisis Crítico (Para los Estudiantes)
1.  ¿Cómo influyó la limitación estricta de tiempo (Timeboxing) en la toma de decisiones sobre el alcance de las pruebas automatizadas y exploratorias?
2.  ¿Cuáles fueron los principales retos al integrar en paralelo el código de 3 equipos diferentes al mismo repositorio remoto y cómo los superaron?
3.  Durante la retrospectiva final, ¿cuál fue el principal cuello de botella identificado en la integración continua (CI) y cómo propone el equipo resolverlo en futuras iteraciones?
