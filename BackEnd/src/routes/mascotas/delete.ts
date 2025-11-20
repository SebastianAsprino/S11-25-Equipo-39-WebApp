import { Elysia, t } from "elysia";
import { plugins } from "../../plugins";
import { REPOMascota } from "../../repository";

// Ruta DELETE para eliminar una mascota
export const mascotaDELETE = new Elysia()
	.use(plugins)
	.delete("/mascotas/:id", async ({ params, status, cookie: { auth }, jwt }) =>
	{
		const profile = await jwt.verify(auth.value as string);

		if (!profile)
		{
			return status(403, {
				success: false,
				message: "Forbidden",
			});
		}

		const mascotaId = Number(params.id);

		const result = await REPOMascota.eliminarMascota(mascotaId);

		return status(result.statusCode as 200 | 500, {
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
			params: t.Object({
				id: t.String({
					description: "ID de la mascota a eliminar",
				}),
			}),
			detail: {
				security: [{ cookieAuth: [] }],
				summary: "Eliminar mascota",
				description: "Elimina una mascota existente por su ID.",
			},
		}
	);
