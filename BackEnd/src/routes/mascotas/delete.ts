import { Elysia, t } from "elysia";                     // Elysia y builder
import { plugins } from "../../plugins";                // Middlewares
import { REPOMascota } from "../../repository";         // Repositorio

// Ruta DELETE para eliminar una mascota
export const mascotaDELETE = new Elysia()
  .use(plugins)                                         // Aplica plugins
  .delete(
    "/mascotas/:id",                                    // Endpoint: DELETE /mascotas/:id
    async ({ params, status, cookie: { auth }, jwt }) =>
    {
      const profile = await jwt.verify(auth.value as string); // Verifica JWT

      if (!profile) {                                   // Si el usuario no está autenticado
        return status(403, {
          success: false,
          message: "Forbidden",
        });
      }

      const mascotaId = Number(params.id);              // Convierte el parámetro id a número

      const result = await REPOMascota.eliminarMascota(
        mascotaId                                       // ID de la mascota a eliminar
      );

      return status(result.statusCode as 200 | 500, {   // Devuelve respuesta
        success: result.success,
        message: result.message,
      });
    },
    {
      cookie: t.Cookie({                                // Cookie requerida
        auth: t.String({
          description: "JWT token para autenticación",
        }),
      }),
      params: t.Object({                                // Esquema de parámetros de ruta
        id: t.String({
          description: "ID de la mascota a eliminar",
        }),
      }),
      detail: {
        security: [[ "cookieAuth" ]],
        summary: "Eliminar mascota",
        description: "Elimina una mascota existente por su ID.",
      },
    }
  );
