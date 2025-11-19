import { usuario } from "./usuario"; // Tabla usuario ya existente
import { mascota } from "./mascota"; // Nueva tabla mascota

export const schema = {
  usuario,                          // Mantiene la tabla de usuario
  mascota,                          // Agrega la tabla de mascota al schema global
};
