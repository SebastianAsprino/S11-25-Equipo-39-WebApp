import { t, type Static } from "elysia"; // Builder de esquemas y helper Static

// DTO para actualizar una mascota
// Todos los campos son opcionales porque se puede actualizar solo uno o varios
export const DTOactualizarMascota = t.Object({
  nombre: t.Optional(
    t.String({
      description: "Nuevo nombre de la mascota",
    })
  ),
  especie: t.Optional(
    t.String({
      description: "Nueva especie de la mascota",
    })
  ),
  raza: t.Optional(
    t.String({
      description: "Nueva raza de la mascota",
    })
  ),
  edad: t.Optional(
    t.Number({
      description: "Nueva edad de la mascota",
    })
  ),
  peso: t.Optional(
    t.Number({
      description: "Nuevo peso de la mascota",
    })
  ),
  foto: t.Optional(
    t.String({
      description: "Nueva URL o ruta de la foto de la mascota",
    })
  ),
});

// Tipo TypeScript para actualizar
export type actualizarMascotaType = Static<typeof DTOactualizarMascota>;
