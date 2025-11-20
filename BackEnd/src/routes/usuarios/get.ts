import { Elysia, t } from "elysia";
import { plugins } from "../../plugins";
import { REPOusuario } from "../../repository";

export const usuarioGETusername = new Elysia()
	.use(plugins)
	.get(
		"/username",
		async ({ status, cookie: { auth }, jwt }) =>
		{
			const profile = await jwt.verify(auth.value as string);

			if (!profile)
			{
				return status(403, {
					success: false,
					message: "Forbidden",
				});
			}

			const result = await REPOusuario.obtenerUsername(profile.id as number);

			return status(result.statusCode as 200 | 404 | 500, {
				success: result.success,
				message: result.message,
				payload: result.payload
			});
		},
		{
			cookie: t.Cookie({
				auth: t.String({
					description: "JWT token para autenticación",
				}),
			}),
			detail: {
				security: [{ cookieAuth: [] }],
				summary: "Obtener username del usuario autenticado",
				description: "Devuelve el nombre de usuario basado en el ID dentro del JWT.",
			},
			response: {
				403: t.Object({
					success: t.Boolean(),
					message: t.String()
				}),
				404: t.Object({
					success: t.Boolean(),
					message: t.String()
				}),
				500: t.Object({
					success: t.Boolean(),
					message: t.String()
				}),
				200: t.Object({
					success: t.Boolean(),
					message: t.String(),
					payload: t.String()
				})
			}
		}
	);
