import { Elysia, t } from "elysia";
import { plugins } from '../../plugins';

import { REPOusuario } from "../../repository";


export const usuarioDELETE = new Elysia()
	.use(plugins)
	.delete("/delete", async ({ status, cookie: { auth }, jwt }) =>
	{
		const profile = await jwt.verify(auth.value as string);
		if (!profile)
		{
			return status(403, {
				success: false,
				message: "Forbidden",
			});
		}
		const data = { id: profile.id as number };

		try
		{
			const result = await REPOusuario.eliminarUsuario(data);

			return status(result.statusCode as 200 | 404 | 409 | 500, {
				success: result.success,
				message: result.message,
			});

		} catch (error)
		{
			console.error("Error en ruta /delete:", error);

			return status(500, {
				success: false,
				message: "Error interno del servidor",
			});
		}
	},
		{
			cookie: t.Cookie({
				auth: t.String({
					description: "JWT token para autenticación",
				}),
			}),
			detail: {
				security: [{ cookieAuth: [] }],
				summary: "Eliminar usuario",
				description: "Elimina un usuario del sistema por su ID"
			},
			response: {
				403: t.Object({
					success: t.Boolean({ default: false }),
					message: t.String()
				}, {
					description: "Forbidden - Usuario no autorizado",
					examples: [{
						success: false,
						message: "Forbidden"
					}]
				}),
				404: t.Object({
					success: t.Boolean({ default: false }),
					message: t.String()
				}, {
					description: "Not Found - Usuario no encontrado",
					examples: [{
						success: false,
						message: "Usuario no encontrado"
					}]
				}),
				409: t.Object({
					success: t.Boolean({ default: false }),
					message: t.String()
				}, {
					description: "Conflict - No se puede eliminar por dependencias",
					examples: [{
						success: false,
						message: "No se puede eliminar el usuario porque tiene registros relacionados"
					}]
				}),
				500: t.Object({
					success: t.Boolean({ default: false }),
					message: t.String()
				}, {
					description: "Internal Server Error",
					examples: [{
						success: false,
						message: "Error interno del servidor"
					}]
				}),
				200: t.Object({
					success: t.Boolean({ default: true }),
					message: t.String()
				}, {
					description: "OK - Usuario eliminado",
					examples: [{
						success: true,
						message: "Usuario eliminado correctamente"
					}]
				})
			}
		});