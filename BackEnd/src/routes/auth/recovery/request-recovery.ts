import { Elysia, t } from "elysia";
import { REPOauth } from "../../../repository";
import { DTO } from "../../../DTO";

export const requestRecoveryRoutes = new Elysia()
	.post("/solicitar-recuperacion", async ({ body, status }) =>
	{
		const result = await REPOauth.recuperacionRepository.solicitarRecuperacion(body);
		return status(result.statusCode as 200 | 500, {
			success: result.success,
			message: result.message,
		});
	}, {
		body: DTO.DTOSolicitarRecuperacion,
		detail: {
			summary: "Solicitar recuperación de contraseña",
			description: "Envía un email con un enlace para recuperar la contraseña"
		},
		response: {
			200: t.Object({
				success: t.Boolean({ default: true }),
				message: t.String()
			}, {
				description: "OK - Email enviado (si el usuario existe)",
				examples: [{
					success: true,
					message: "Si el email existe, se enviarán instrucciones de recuperación"
				}]
			}),
			500: t.Object({
				success: t.Boolean({ default: false }),
				message: t.String()
			}, {
				description: "Internal Server Error",
				examples: [{
					success: false,
					message: "Error al procesar la solicitud"
				}]
			})
		}
	});
