import { db, schema } from "../../services";            // Conexión y tablas
import type { res } from "../../DTO";                   // Tipo genérico de respuesta
import { eq } from "drizzle-orm";                       // Helper para crear condiciones WHERE

// Lista todas las mascotas de un usuario
export const listarMascotasPorUsuario = async (
  usuarioId: number                                     // ID del usuario dueño de las mascotas
): Promise<res<unknown>> =>                             // Devuelve res con data genérica (puedes refinar el tipo más tarde)
{
  try {
    const mascotas = await db                           // Ejecuta una consulta SELECT
      .select()                                         // Selecciona todas las columnas
      .from(schema.mascota)                             // Desde la tabla mascota
      .where(eq(schema.mascota.usuarioId, usuarioId));  // Filtra por usuarioId

    return {
      success: true,                                    // Operación exitosa
      message: "Listado de mascotas obtenido correctamente",
      statusCode: 200,                                  // Código 200 OK
      data: mascotas,                                   // Arreglo de mascotas
    };
  } catch (error) {
    console.error("Error al listar mascotas:", error);  // Loguea el error

    return {
      success: false,                                   // Indica fallo
      message: "Error interno al listar mascotas",      // Mensaje de error
      statusCode: 500,                                  // Código 500
    };
  }
};
