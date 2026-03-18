# EMBR — Calculadora de Calorías Quemadas

Aplicación web para calcular las calorías quemadas durante actividades físicas como caminar o correr, basándose en la distancia recorrida, el tiempo empleado y el peso corporal.

## Cómo funciona

1. Introduce tu **peso** (se guarda automáticamente para futuras visitas).
2. Introduce la **distancia** en kilómetros y el **tiempo** en minutos o formato HH:MM.
3. Pulsa **Calcular calorías**.

La app calcula la velocidad media, estima el MET (Equivalente Metabólico) por interpolación y aplica la fórmula estándar:

```
Calorías = Tiempo (min) × (MET × 3.5 × Peso (kg)) / 200
```

### Tabla de referencia MET

| Velocidad | Actividad | MET |
|-----------|-----------|-----|
| 3.0 km/h | Paseo lento | 2.5 |
| 5.0 km/h | Caminar ligero | 3.5 |
| 6.5 km/h | Caminar rápido | 5.0 |
| 10.0 km/h | Correr | 10.0 |
| 14.0 km/h | Sprint moderado | 15.0 |

Para velocidades intermedias, el MET se interpola linealmente entre los puntos de referencia.

## Uso

Abre `index.html` en cualquier navegador. No requiere servidor, dependencias ni compilación.

## Tecnologías

- HTML5, CSS3, JavaScript vanilla
- localStorage para persistencia del peso
- Diseño responsive y dark mode

## Licencia

[MIT](LICENSE)
