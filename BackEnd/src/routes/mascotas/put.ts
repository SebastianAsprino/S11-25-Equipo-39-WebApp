import { Elysia, t } from "elysia";                     // Elysia + builder
import { plugins } from "../../plugins";                // Middlewares
import { REPOMascota } from "../../repository";         // Repositorio
import { DTO } from "../../DTO";                        // DTOs

// Ruta PUT para actualizar mascota
export const mascotaPUT = new Elysia()
  .use(plugins)                                         // Aplica plugins
  .put(
    "/mascotas/:id",                                    // Endpoint: PUT /mascotas/:id
    async ({ body, params, status, cookie: { auth }, jwt }) =>
    {
      const profile = await jwt.verify(auth.value as string); // Verifica JWT

      if (!profile) {                                   // Si el token no es válido
        return status(403, {
          success: false,
          message: "Forbidden",
        });
      }

      const mascotaId = Number(params.id);              // Convierte el id de la ruta a número

      const result = await REPOMascota.actualizarMascota(
        body,                                           // Datos a actualizar
        mascotaId,                                      // ID de la mascota
        profile.id as number                            // ID del usuario autenticado
      );

      return status(result.statusCode as 200 | 400 | 404 | 500, {
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
      params: t.Object({                                // Esquema de los parámetros de ruta
        id: t.String({
          description: "ID de la mascota a actualizar",
        }),
      }),
      body: DTO.DTOactualizarMascota,                   // Esquema del cuerpo de la petición
      detail: {
        security: [[ "cookieAuth" ]],
        summary: "Actualizar mascota",
        description: "Actualiza uno o varios campos de una mascota existente.",
      },
    }
  );
