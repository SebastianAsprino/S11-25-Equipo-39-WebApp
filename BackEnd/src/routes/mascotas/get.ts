import { Elysia, t } from "elysia";                     // Elysia y builder de esquemas
import { plugins } from "../../plugins";                // Middlewares
import { REPOMascota } from "../../repository";         // Repositorio de mascotas

// Rutas GET de mascotas
export const mascotaGET = new Elysia()
  .use(plugins)                                         // Aplica plugins
  .get(
    "/mascotas",                                        // Endpoint: GET /mascotas
    async ({ status, cookie: { auth }, jwt }) =>        // Handler: solo necesita cookies, jwt y status
    {
      const profile = await jwt.verify(auth.value as string); // Verifica token

      if (!profile) {                                   // Si no hay usuario autenticado
        return status(403, {
          success: false,
          message: "Forbidden",
        });
      }

      const result = await REPOMascota.listarMascotasPorUsuario(
        profile.id as number                            // Usa el ID del usuario autenticado
      );

      return status(result.statusCode as 200 | 500, {   // Devuelve código del repositorio
        success: result.success,
        message: result.message,
        data: result.data,                              // Incluye el arreglo de mascotas
      });
    },
    {
      cookie: t.Cookie({                                // Especifica que requiere cookie auth
        auth: t.String({
          description: "JWT token para autenticación",
        }),
      }),
      detail: {
        security: [[ "cookieAuth" ]],
        summary: "Listar mascotas del usuario",
        description: "Obtiene todas las mascotas asociadas al usuario autenticado.",
      },
    }
  );
