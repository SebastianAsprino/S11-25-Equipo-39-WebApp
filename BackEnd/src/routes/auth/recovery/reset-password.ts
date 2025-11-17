import { Elysia, t } from "elysia";
import { REPOauth } from "../../../repository";
import { DTO } from "../../../DTO";

export const resetPasswordRoutes = new Elysia()
	.post("/resetear-password/:token", async ({ params, body, status }) =>
	{
		const result = await REPOauth.recuperacionRepository.resetearPassword(params.token, body);
		return status(result.statusCode as 200 | 400 | 500, {
			success: result.success,
			message: result.message,
		});
	}, {
		params: DTO.DTOVerificarToken,
		body: DTO.DTOResetearPassword,
		detail: {
			summary: "Resetear contraseña con token",
			description: "Restablece la contraseña usando un token válido de recuperación"
		},
		response: {
			200: t.Object({
				success: t.Boolean({ default: true }),
				message: t.String()
			}, {
				description: "OK - Contraseña actualizada",
				examples: [{
					success: true,
					message: "Contraseña actualizada correctamente"
				}]
			}),
			400: t.Object({
				success: t.Boolean({ default: false }),
				message: t.String()
			}, {
				description: "Bad Request",
				examples: [
					{
						success: false,
						message: "Las contraseñas no coinciden"
					},
					{
						success: false,
						message: "Token inválido o expirado"
					}
				]
			}),
			500: t.Object({
				success: t.Boolean({ default: false }),
				message: t.String()
			}, {
				description: "Internal Server Error",
				examples: [{
					success: false,
					message: "Error al actualizar la contraseña"
				}]
			})
		}
	});