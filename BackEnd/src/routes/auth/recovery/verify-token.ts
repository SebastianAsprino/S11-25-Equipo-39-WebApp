import { Elysia, t } from "elysia";
import { REPOauth } from "../../../repository";
import { DTO } from "../../../DTO";

export const verifyTokenRoutes = new Elysia()
	.get("/verificar-token/:token", async ({ params, status }) =>
	{
		const result = await REPOauth.recuperacionRepository.verificarToken(params);
		return status(result.statusCode as 200 | 400 | 500, {
			success: result.success,
			message: result.message,
		});
	}, {
		params: DTO.DTOVerificarToken,
		detail: {
			summary: "Verificar token de recuperación",
			description: "Verifica si un token de recuperación es válido"
		},
		response: {
			200: t.Object({
				success: t.Boolean({ default: true }),
				message: t.String()
			}, {
				description: "OK - Token válido",
				examples: [{
					success: true,
					message: "Token válido"
				}]
			}),
			400: t.Object({
				success: t.Boolean({ default: false }),
				message: t.String()
			}, {
				description: "Bad Request - Token inválido",
				examples: [{
					success: false,
					message: "Token inválido o expirado"
				}]
			}),
			500: t.Object({
				success: t.Boolean({ default: false }),
				message: t.String()
			}, {
				description: "Internal Server Error",
				Examples: [{
					success: false,
					message: "Error al verificar el token"
				}]
			})
		}
	});
