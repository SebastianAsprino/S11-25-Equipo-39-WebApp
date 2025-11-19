import { db, schema } from "../../services";          // Conexión y tablas
import type { res } from "../../DTO";                // Tipo de respuesta
import { eq } from "drizzle-orm";                    // Helper para WHERE

// Elimina una mascota por ID
export const eliminarMascota = async (
  id: number                                         // ID de la mascota a borrar
): Promise<res<boolean>> =>                          // Devuelve res<boolean>
{
  try {
    const result = await db
      .delete(schema.mascota)                        // DELETE FROM mascota
      .where(eq(schema.mascota.id, id));             // WHERE id = id

    // result.rowCount puede usarse si lo expone drizzle; si no, asumimos éxito
    return {
      success: true,
      message: "Mascota eliminada correctamente",
      statusCode: 200,
    };
  } catch (error) {
    console.error("Error al eliminar mascota:", error); // Log del error

    return {
      success: false,
      message: "Error interno al eliminar mascota",
      statusCode: 500,
    };
  }
};
