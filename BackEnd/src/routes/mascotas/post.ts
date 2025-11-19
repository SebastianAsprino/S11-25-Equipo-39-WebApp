import { Elysia, t } from "elysia";                     // Importa Elysia y el builder de esquemas
import { plugins } from "../../plugins";                // Middlewares (JWT, etc.)
import { REPOMascota } from "../../repository";         // Repositorio de mascotas
import { DTO } from "../../DTO";                        // DTOs (crearMascota, etc.)

// Define el conjunto de rutas POST para mascotas
export const mascotaPOST = new Elysia()
  .use(plugins)                                         // Aplica plugins (ej: JWT, cookies)
  .post(
    "/mascotas",                                        // Endpoint: POST /mascotas
    async ({ body, status, cookie: { auth }, jwt }) =>  // Handler: recibe body, status, cookie y jwt
    {
      const profile = await jwt.verify(auth.value as string); // Verifica el token JWT usando la cookie "auth"

      if (!profile) {                                   // Si no hay perfil válido
        return status(403, {                            // Devuelve 403 Forbidden
          success: false,
          message: "Forbidden",
        });
      }

      // Llama al repositorio para crear la mascota
      const result = await REPOMascota.crearMascota(
        body,                                           // Datos de la mascota desde el body
        profile.id as number                            // ID del usuario autenticado
      );

      // Devuelve la respuesta con el statusCode del repositorio
      return status(result.statusCode as 201 | 400 | 500, {
        success: result.success,
        message: result.message,
      });
    },
    {
      cookie: t.Cookie({                                // Esquema de las cookies que espera la ruta
        auth: t.String({
          description: "JWT token para autenticación",
        }),
      }),
      body: DTO.DTOcrearMascota,                        // Esquema del body: DTO para crear mascota
      detail: {                                         // Información extra para OpenAPI/Swagger
        security: [[ "cookieAuth" ]],
        summary: "Crear mascota",
        description: "Crea una nueva mascota asociada al usuario autenticado.",
      },
    }
  );
