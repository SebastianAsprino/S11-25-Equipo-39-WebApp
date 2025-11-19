import { pgTable, serial, text, integer } from "drizzle-orm/pg-core"; // Importa helpers para definir la tabla y tipos de columnas
import { usuario } from "./usuario";                                  // Importa la tabla usuario para crear la relación usuarioId

// Definición de la tabla "mascota" en la base de datos
export const mascota = pgTable("mascota", {
  id: serial("id").primaryKey(),                                      // ID autoincremental y clave primaria
  nombre: text("nombre").notNull(),                                   // Nombre de la mascota (obligatorio)
  especie: text("especie").notNull(),                                 // Especie (perro, gato, etc.) (obligatorio)
  raza: text("raza"),                                                 // Raza (opcional, permite null)
  edad: integer("edad").notNull(),                                    // Edad en años (obligatoria)
  peso: integer("peso").notNull(),                                    // Peso (en la unidad que decidan) (obligatorio)
  foto: text("foto"),                                                 // URL o ruta de la foto (opcional)
  usuarioId: integer("usuario_id")                                    // Columna que relaciona la mascota con el usuario
    .notNull()                                                        // Es obligatoria: toda mascota pertenece a un usuario
    .references(() => usuario.id),                                    // Clave foránea que apunta a usuario.id
});
