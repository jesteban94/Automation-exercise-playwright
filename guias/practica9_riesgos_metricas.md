# 📝 Práctica 9: Actividad de Laboratorio: "Evaluación de Riesgos y Métricas en el Tablero Ágil"
## Módulo: Agile Testing, Gestión de Riesgos y Métricas de Iteración

Esta actividad conecta la planificación teórica y el análisis de riesgos con el trabajo técnico del equipo, demostrando cómo la valoración de riesgos dicta la profundidad y el esfuerzo que dedicaremos a automatizar pruebas en Playwright.

---

## 🎯 Objetivos de Aprendizaje
*   **Gestión de Riesgos:** Identificar y evaluar riesgos funcionales y no funcionales en las HUs del Sprint.
*   **Priorización del Esfuerzo:** Alinear la profundidad de las pruebas automatizadas (Playwright) según la criticidad del riesgo.
*   **Rastreo de Métricas de Calidad:** Usar GitHub Actions y Trello para monitorear la tasa de paso y la densidad de defectos.

⏱️ **Duración Estimada:** 2 Horas

---

## 📋 Paso 1: Selección de Historias en Trello
1.  El equipo (simulando una reunión de planificación de iteración o Sprint Planning) se reúne frente al tablero de Trello.
2.  Revisen la columna **"Backlog del Producto"** para seleccionar las historias de usuario prioritarias.
3.  Muevan de 2 a 3 historias de usuario seleccionadas a la columna **"Por hacer"** para comprometerlas en la iteración.

## 🔍 Paso 2: Identificación y Evaluación de Riesgos (El Taller)
1.  Para cada historia en "Por hacer", realicen una lluvia de ideas colaborativa para identificar riesgos potenciales:
    *   **Al menos un Riesgo Funcional:** (Ej: fallo en el cálculo de totales en el carrito, o que el buscador no devuelva datos coincidentes).
    *   **Al menos un Riesgo No Funcional:** (Ej: lentitud en la carga de la interfaz, fugas de rendimiento en APIs, o vulnerabilidades de sesión).
2.  Asignen una valoración individual a cada riesgo:
    *   **Impacto:** Alto / Medio / Bajo
    *   **Probabilidad:** Alta / Media / Baja
3.  Documenten estos riesgos detalladamente en la descripción de la tarjeta de Trello (o como un comentario destacado).
4.  Etiqueten el nivel de **Riesgo Global Resultante** (ej: 🏷️ *Riesgo Crítico* o 🏷️ *Riesgo Menor*).

## ⚙️ Paso 3: Priorización del Esfuerzo de Automatización (Playwright)
1.  Basados en el principio de que las tareas de mayor riesgo deben probarse primero y con más profundidad, decidan el alcance de la automatización:
    *   **Riesgo Global Crítico (Rojo):** El equipo debe crear **Pruebas Híbridas** en Playwright (Validaciones de UI combinadas con llamadas directas y aserciones a la API) para asegurar una cobertura profunda.
    *   **Riesgo Global Menor (Verde):** Se acuerda automatizar únicamente una **prueba rápida de API** o un smoke test simplificado de UI para optimizar recursos.
2.  Creen las subtareas técnicas correspondientes dentro de la tarjeta de Trello (utilicen la **etiqueta naranja** para identificarlas).

> [!IMPORTANT]
> **Regla de Oro en Agile Testing:**
> No todo debe automatizarse al mismo nivel. El análisis de riesgos actúa como el filtro racional que optimiza el tiempo y el presupuesto de pruebas del equipo ágil.

## 📊 Paso 4: Definición y Registro de Métricas
1.  Definan las métricas cuantitativas que extraerán del pipeline de CI/CD (Sesión 8) y de la gestión del tablero para evaluar la mitigación de los riesgos:
    *   **Tasa de Paso/Fallo (Pass/Fail Rate):** Revisada diariamente en la pestaña *Actions* de GitHub.
    *   **Densidad de Defectos:** Contando el total de tarjetas rojas (Bugs) respecto a las verdes (HUs) en el tablero de Trello al cierre de la iteración.
2.  Simulen la creación de un pequeño panel o documento de registro en el repositorio llamado [metricas.md](file:///c:/Users/Esteban/Documents/Automation-exercise/metricas.md) (ubicado en la raíz).
3.  Anoten en este archivo los fallos y bugs reales o simulados que Playwright detecte durante la ejecución en su iteración para visibilizar el estado de calidad.

---

## 📝 Preguntas de Reflexión y Análisis Crítico (Para los Estudiantes)
1.  ¿Cómo ayuda el análisis de riesgos a evitar la automatización innecesaria o excesiva en historias de usuario de bajo impacto?
2.  Si un equipo reporta una alta Tasa de Paso en el pipeline pero la Densidad de Defectos en producción sigue aumentando, ¿qué aspecto del proceso de pruebas debería revisarse?
