import { db, schema } from "../../services";              // Importa conexión a BD y tablas (usuario, mascota, etc.)
import type { crearMascotaType, res } from "../../DTO";   // Importa el tipo del DTO de creación y el tipo genérico de respuesta

// Función para crear una nueva mascota asociada a un usuario
export const crearMascota = async (
  mascota: crearMascotaType,                              // Datos de la mascota provenientes del DTO
  usuarioId: number                                       // ID del usuario dueño de la mascota
): Promise<res<boolean>> =>                               // Devuelve un res<boolean> indicando éxito o fracaso
{
  try {
    await db.insert(schema.mascota).values({              // Inserta en la tabla "mascota"
      nombre: mascota.nombre,                             // Mapea nombre
      especie: mascota.especie,                           // Mapea especie
      raza: mascota.raza ?? null,                         // Si raza no viene, se guarda null
      edad: mascota.edad,                                 // Mapea edad
      peso: mascota.peso,                                 // Mapea peso
      foto: mascota.foto ?? null,                         // Si foto no viene, se guarda null
      usuarioId,                                          // Asocia la mascota al usuario
    });

    return {
      success: true,                                      // Indica que la operación fue exitosa
      message: "Mascota creada correctamente",            // Mensaje descriptivo
      statusCode: 201,                                    // Código HTTP sugerido
    };
  } catch (error) {
    console.error("Error al crear mascota:", error);      // Loguea el error en consola

    return {
      success: false,                                     // Indica fallo
      message: "Error interno al crear mascota",          // Mensaje de error genérico
      statusCode: 500,                                    // Código HTTP 500
    };
  }
};
