# 📝 Práctica 4: Actividad de Laboratorio: "Especificación por Ejemplo y Validación de API"

Esta actividad utiliza las historias de usuario refinadas en la Sesión 2 para crear escenarios detallados y realizar pruebas iniciales.

## Paso 1: Taller de Especificación (Power of Three)

Reúna al equipo (simulando los roles de QA, Dev y PO).

Tome una historia de la columna "Por hacer" en Trello.

Discutan ejemplos concretos de cómo un usuario interactuaría con esa función.

## Paso 2: Redacción en Gherkin

Dentro de la tarjeta de prueba asociada en Trello (etiqueta naranja), añada una sección o documento adjunto con al menos 2 escenarios en formato Gherkin.

### Ejemplo:

*   *Escenario: Inicio de sesión exitoso.*

```gherkin
*   *Dado que el usuario está en la página de login.*
*   *Cuando ingresa credenciales válidas.*
*   *Entonces es redirigido al dashboard.*
```

## Paso 3: Validación Manual con Postman

(Nota: El uso de Postman es una instrucción técnica externa al manual ISTQB).

Identifique una regla de negocio que pueda validarse vía API (ej. el login devuelve un token).

Configure una petición en Postman que represente uno de los escenarios Gherkin redactados.

Ejecute la petición y verifique que el resultado (JSON/Código de estado) coincide con el "Entonces" definido.

## Paso 4: Registro de Resultados y Trazabilidad

Adjunte una captura de pantalla de la ejecución exitosa en Postman a la tarjeta de Trello.

Si el comportamiento real de la API no coincide con el esperado, registre un Defecto (etiqueta roja) detallando la discrepancia.
