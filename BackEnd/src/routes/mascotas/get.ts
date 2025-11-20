import { Elysia, t } from "elysia";
import { plugins } from "../../plugins";
import { REPOMascota } from "../../repository";

export const mascotaGET = new Elysia()
	.use(plugins)
	.get("/mascotas", async ({ status, cookie: { auth }, jwt }) =>
	{
		const profile = await jwt.verify(auth.value as string);

		if (!profile)
		{
			return status(403, {
				success: false,
				message: "Forbidden",
			});
		}

		const result = await REPOMascota.listarMascotasPorUsuario(profile.id as number);

		return status(result.statusCode as 200 | 500, {
			success: result.success,
			message: result.message,
			payload: result.payload,
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
				summary: "Listar mascotas del usuario",
				description: "Obtiene todas las mascotas asociadas al usuario autenticado.",
			},
		}
	);
