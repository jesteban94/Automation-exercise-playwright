# 📝 Guía de Laboratorio: Sesión Exploratoria Basada en Charters
## Módulo: Agile Testing y Pruebas Basadas en la Experiencia

Esta actividad práctica utiliza el tablero de Trello configurado para gestionar y documentar una sesión de prueba exploratoria estructurada (SBTM) utilizando contratos de prueba (Charters) sobre una funcionalidad real de la aplicación.

---

## 🎯 Objetivos de Aprendizaje
*   **Prueba Basada en Sesiones (SBTM):** Aprender a acotar el esfuerzo de exploración mediante timeboxing.
*   **Redacción de Test Charters:** Definir claramente el qué, el para qué y el cómo de la sesión de prueba exploratoria.
*   **Heurísticas de Prueba:** Aplicar el pensamiento crítico e interactivo para descubrir anomalías no documentadas.

⏱️ **Duración Estimada:** 1.5 Horas

---

## 📜 Paso 1: Creación del Contrato de Prueba (Test Charter)
1.  En la columna **"Pruebas / Verificación"**, creen una tarjeta con la etiqueta **naranja** titulada: `"Charter: Exploración de [Nombre de la Historia]"`.
2.  En la descripción de la tarjeta, definan el alcance formal utilizando la siguiente estructura:
    *   **Propósito:** (Ej. *"Evaluar la robustez del flujo de login ante entradas de datos inválidas y caracteres especiales"*).
    *   **Área de Foco:** (Ej. *"Formulario de inicio de sesión y validación de campos"*).
    *   **Actor/Rol:** (Ej. *"Usuario final en navegadores móviles/escritorio"*).

## ⏱️ Paso 2: Preparación y Acotamiento (Timeboxing)
1.  Asignen a un miembro del equipo como el probador principal encargado del charter.
2.  Establezcan un tiempo límite estricto (**Timebox**) de 60 minutos para la exploración activa e ininterrumpida.
3.  Registren un comentario en la tarjeta: `"Sesión iniciada a las [Hora_Inicio]"`.

## 🚀 Paso 3: Ejecución, Registro y Heurísticas
1.  Realicen la prueba de forma interactiva aplicando heurísticas reconocidas (ej: operaciones CRUD o valores frontera) sobre la interfaz.
2.  Documenten en tiempo real los hallazgos en la sección de **"Comentarios"** de la tarjeta del Charter en Trello:
    *   *Flujos o caminos de datos probados.*
    *   *Anomalías y comportamientos inesperados de la interfaz.*
    *   *Notas sobre rendimiento, estabilidad o diseño visual.*

## 🐛 Paso 4: Registro de Defectos (Bugs)
1.  Si descubren un defecto, creen una nueva tarjeta con la etiqueta **roja** (Defecto/Bug) en la columna **"Por hacer"**.
2.  Asegúrense de documentar el ID del bug, los pasos detallados para reproducirlo y adjuntar capturas de pantalla o grabaciones para facilitar el trabajo del desarrollador.

## 🏁 Paso 5: Cierre de Sesión y Transparencia
1.  Al finalizar el timebox, agreguen un comentario de cierre: `"Sesión finalizada a las [Hora_Fin]"`.
2.  Resuman brevemente en la tarjeta qué riesgos se cubrieron y qué zonas requieren más pruebas en el futuro.
3.  Muevan la tarjeta del Charter a la columna **"Hecho"** solo si se cumplió el tiempo y el objetivo pactado.
4.  Informen de manera resumida los hallazgos al resto del equipo en su reunión diaria para mantener la transparencia.

> [!NOTE]
> La prueba exploratoria no significa probar sin rumbo; es un enfoque estructurado que aporta valor inmediato al detectar problemas difíciles de modelar en el diseño formal.

---

## 📝 Preguntas de Reflexión y Análisis Crítico (Para los Estudiantes)
1.  ¿Cuál es la diferencia entre la prueba exploratoria libre y la prueba exploratoria basada en sesiones (SBTM) utilizando charters?
2.  ¿Qué ventajas aporta registrar en tiempo real el log de pruebas (heurísticas, observaciones y bloqueos) directamente en la tarjeta de Trello?
