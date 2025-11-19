import { t, type Static } from "elysia"; // Importa helpers de Elysia

// DTO para eliminar una mascota por id (si quisieras usar body en lugar de params)
export const DTOeliminarMascota = t.Object({
  id: t.Number({
    description: "ID de la mascota a eliminar",
  }),
});

// Tipo TypeScript del DTO de eliminar
export type eliminarMascotaType = Static<typeof DTOeliminarMascota>;
