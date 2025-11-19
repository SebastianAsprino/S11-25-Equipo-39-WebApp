import { t, type Static } from "elysia"; // Importa el builder de esquemas (t) y el helper Static para tipos TS

// DTO para crear una mascota
export const DTOcrearMascota = t.Object({
  nombre: t.String({                                    // Campo obligatorio: nombre
    description: "Nombre de la mascota",
  }),
  especie: t.String({                                   // Campo obligatorio: especie
    description: "Especie de la mascota (perro, gato, ave, etc.)",
  }),
  raza: t.Optional(                                     // Campo opcional: raza
    t.String({
      description: "Raza de la mascota (opcional)",
    })
  ),
  edad: t.Number({                                      // Campo obligatorio: edad
    description: "Edad de la mascota en años",
  }),
  peso: t.Number({                                      // Campo obligatorio: peso
    description: "Peso de la mascota (en la unidad definida por el sistema)",
  }),
  foto: t.Optional(                                     // Campo opcional: foto
    t.String({
      description: "URL o ruta de la foto de la mascota",
    })
  ),
});

// Tipo TypeScript derivado del DTO (para usar en repository, etc.)
export type crearMascotaType = Static<typeof DTOcrearMascota>;
