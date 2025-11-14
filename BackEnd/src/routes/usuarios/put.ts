import { Elysia, t } from "elysia";
import { plugins } from '../../plugins';
import { REPOusuario } from "../../repository";
import { DTO } from "../../DTO";

export const usuarioPUT = new Elysia()
	.use(plugins)
	.put("/update", async ({ body, status, cookie: { auth }, jwt }) =>
	{
		const profile = await jwt.verify(auth.value as string);
		if (!profile)
		{
			return status(403, {
				success: false,
				message: "Forbidden",
			});
		}

		const result = await REPOusuario.actualizarUsuario(body, profile.id as number);
		return status(result.statusCode as 200 | 400 | 404 | 409 | 500, {
			success: result.success,
			message: result.message,
		});
	},
		{
			cookie: t.Cookie({
				auth: t.String({
					description: "JWT token para autenticación",
				}),
			}),
			body: DTO.DTOactualizarUsuario,
			detail: {
				security: [{ cookieAuth: [] }],
				summary: "Actualizar información de usuario",
				description: "Actualiza la información de un usuario existente. Se pueden actualizar uno o todos los campos. Si se envía contraseña, se requiere confirmPassword."
			},
			response: {
				400: t.Object({
					success: t.Boolean({ default: false }),
					message: t.String()
				}, {
					description: "Bad Request - Datos inválidos",
					examples: [
						{
							success: false,
							message: "Las contraseñas no coinciden"
						},
						{
							success: false,
							message: "Se requiere confirmar la contraseña"
						},
						{
							success: false,
							message: "No se proporcionaron datos para actualizar"
						}
					]
				}),
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
					description: "Conflict - El email ya está en uso",
					examples: [{
						success: false,
						message: "El email ya está en uso por otro usuario"
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
					description: "OK - Usuario actualizado",
					examples: [{
						success: true,
						message: "Usuario actualizado correctamente"
					}]
				})
			}
		});