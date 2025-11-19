import { db, schema } from "../../services";             // Conexión y tablas
import type { actualizarMascotaType, res } from "../../DTO"; // Tipo del DTO y respuesta
import { eq } from "drizzle-orm";                        // Helper para condiciones WHERE

// Actualiza una mascota existente
export const actualizarMascota = async (
  mascota: actualizarMascotaType,                        // Datos a actualizar (todos opcionales)
  id: number,                                            // ID de la mascota a actualizar
  usuarioId: number                                      // ID del usuario (para asegurar que la mascota le pertenece)
): Promise<res<boolean>> =>                              // Devuelve res<boolean>
{
  try {
    // 1. Verificar que la mascota exista y pertenezca al usuario
    const existing = await db
      .select()
      .from(schema.mascota)
      .where(
        eq(schema.mascota.id, id)                        // Coincide ID de mascota
      )
      .limit(1);

    if (existing.length === 0) {                         // Si no existe mascota
      return {
        success: false,
        message: "Mascota no encontrada",
        statusCode: 404,
      };
    }

    // 2. Construir dinámicamente el objeto de actualización
    const dataToUpdate: Partial<typeof schema.mascota.$inferInsert> = {}; // Objeto parcial de columnas

    if (mascota.nombre !== undefined) {                  // Si viene nombre
      dataToUpdate.nombre = mascota.nombre;
    }

    if (mascota.especie !== undefined) {                 // Si viene especie
      dataToUpdate.especie = mascota.especie;
    }

    if (mascota.raza !== undefined) {                    // Si viene raza
      dataToUpdate.raza = mascota.raza ?? null;
    }

    if (mascota.edad !== undefined) {                    // Si viene edad
      dataToUpdate.edad = mascota.edad;
    }

    if (mascota.peso !== undefined) {                    // Si viene peso
      dataToUpdate.peso = mascota.peso;
    }

    if (mascota.foto !== undefined) {                    // Si viene foto
      dataToUpdate.foto = mascota.foto ?? null;
    }

    if (Object.keys(dataToUpdate).length === 0) {        // Si no se envió ningún campo
      return {
        success: false,
        message: "No se proporcionaron campos para actualizar",
        statusCode: 400,
      };
    }

    // 3. Ejecutar la actualización
    await db
      .update(schema.mascota)                            // UPDATE mascota
      .set(dataToUpdate)                                 // SET columnas modificadas
      .where(eq(schema.mascota.id, id));                 // WHERE id = id

    return {
      success: true,                                     // Operación exitosa
      message: "Mascota actualizada correctamente",
      statusCode: 200,
    };
  } catch (error) {
    console.error("Error al actualizar mascota:", error); // Log de error

    return {
      success: false,
      message: "Error interno al actualizar mascota",
      statusCode: 500,
    };
  }
};
