# 📝 Práctica 11: Actividad de Laboratorio: "Mini-Sprint Completo: El Reto Final"
## Módulo: Agile Testing, Simulación de Scrum y Reto Final de Automatización

Esta actividad final desafía al equipo a experimentar un ciclo ágil completo de 3 horas utilizando bloques de tiempo estrictos (timeboxing), simulando las dinámicas, ceremonias y presiones de un sprint de desarrollo y pruebas en un entorno real.

---

## 🎯 Objetivos de Aprendizaje
*   **Simulación Ágil Completa:** Experimentar todas las fases de un sprint (Planning, Daily, Execution, Demo y Retrospective) bajo presión controlada de tiempo.
*   **Trabajo en Equipo Completo (Whole-Team):** Dividir al equipo en sub-células de automatización y exploración manual para maximizar la cobertura paralela.
*   **Entrega de Valor con Calidad:** Validar el cumplimiento estricto del Definition of Done (DoD) y presentar software funcionando e integrado en CI/CD.

⏱️ **Duración Estimada:** 3 Horas (Timeboxing Estricto)

---

## ⏱️ Estructura del Taller (Timeboxing de 3 Horas)

La sesión se divide rígidamente en tres bloques de tiempo estructurados:

```
┌─────────────────────────────────┐     ┌─────────────────────────────────┐
│   Hora 1: Planificación y Diseño │     │   Hora 2: Ejecución Paralela    │
│ Minutos: 0 - 45                 │ ──> │ Minutos: 45 - 105               │
│ Poker Planning y Ramificación.  │     │ Playwright + Exploración Manual.│
└─────────────────────────────────┘     └─────────────────────────────────┘
                                                         │
                                                         ▼
                                        ┌─────────────────────────────────┐
                                        │   Hora 3: Cierre y Retro        │
                                        │ Minutos: 105 - 180              │
                                        │ DoD, Sprint Demo e Ideas.       │
                                        └─────────────────────────────────┘
```

---

## 📅 Hora 1: Planificación y Diseño (45 Minutos)

Durante el primer bloque, el equipo sienta las bases del miniesprint colaborando con el negocio:

1.  **Póquer de Planificación (Poker Planning):**
    *   El instructor o tutor asume el rol de Propietario de Producto (PO) y presenta 2 historias de usuario nuevas en el backlog de Trello.
    *   El equipo estima el esfuerzo y complejidad de las pruebas utilizando cartas de Poker Planning o aplicaciones virtuales, debatiendo discrepancias.
2.  **Análisis de Riesgos:**
    *   Definan rápidamente al menos un riesgo funcional y uno no funcional para cada HU seleccionada.
    *   Decidan las técnicas de prueba (caja negra, pruebas de API o exploración estructurada) que utilizarán para mitigar dichos riesgos.
3.  **Reparto de Tareas e Inicialización de Código:**
    *   Asignen las tarjetas de prueba en Trello a los miembros del equipo.
    *   Creen ramas aisladas en sus entornos locales para trabajar en paralelo:
        ```bash
        git checkout -b sprint-final-historia1
        ```

---

## 🚀 Hora 2: Ejecución Paralela (60 Minutos)

El equipo se divide en dos sub-células de trabajo en paralelo para optimizar la cobertura y el tiempo disponible:

1.  **Célula de Automatización (Playwright):**
    *   La mitad del equipo escribe scripts híbridos (UI + API) en Playwright para cubrir los Criterios de Aceptación de las historias seleccionadas.
    *   Realicen commits constantes y hagan `push` a sus ramas para disparar el flujo de Integración Continua (BVT) en GitHub Actions.
2.  **Célula Exploratoria (Trello + Manual):**
    *   La otra mitad del equipo redacta un Contrato de Prueba (Charter) en Trello.
    *   Realicen una sesión ininterrumpida de 30 minutos sobre una funcionalidad relacionada, registrando hallazgos de red/DOM y documentando defectos mediante tarjetas rojas (Bugs).
3.  **Reunión de Pie (Stand-up a mitad del bloque):**
    *   En el minuto 30 del bloque de ejecución, el equipo hace una pausa obligatoria de 5 minutos.
    *   Frente al tablero, responden rápidamente: *¿Qué completé?*, *¿Qué haré hoy?* y *¿Qué bloqueos tengo?*.

---

## 🏁 Hora 3: Consolidación, Demostración y Retrospectiva (75 Minutos)

El bloque final de la iteración valida y presenta el incremento de producto estable y libre de deudas técnicas:

1.  **Integración y Validación de la Construcción:**
    *   Los miembros aprueban los Pull Requests tras hacer la revisión por pares (Code Review).
    *   Verifiquen en la pestaña *Actions* de GitHub que todas las pruebas pasen exitosamente (Build en verde).
2.  **Verificación del Definition of Done (DoD):**
    *   El equipo audita el cumplimiento de las condiciones de entrega antes de mover formalmente las tarjetas a la columna **"Hecho" (Done)** en Trello.
3.  **Sprint Demo:**
    *   El equipo presenta el software funcionando y el pipeline de CI/CD ejecutando las pruebas en la nube al instructor (quien actúa como PO/Cliente).
4.  **Retrospectiva Final (El Cierre - 20 Minutos):**
    *   El equipo reflexiona sobre la iteración. Cada alumno debe proponer en el archivo de reflexiones:
        *   Una mejora sobre la automatización, la comunicación o las estimaciones.
        *   Qué buenas prácticas del Sprint deben mantenerse en la organización.

---

## 📝 Preguntas de Reflexión y Análisis Crítico (Para los Estudiantes)
1.  ¿Cómo influyó la limitación estricta de tiempo (Timeboxing) en la toma de decisiones sobre el alcance de las pruebas automatizadas y exploratorias?
2.  Durante la retrospectiva final, ¿cuál fue el principal cuello de botella identificado en la integración continua (CI) y cómo propone el equipo resolverlo en futuras iteraciones?
