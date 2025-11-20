import { Elysia, t } from "elysia";
import { plugins } from "../../plugins";
import { REPOMascota } from "../../repository";
import { DTO } from "../../DTO";

export const mascotaPUT = new Elysia()
	.use(plugins)
	.put("/mascotas/:id", async ({ body, params, status, cookie: { auth }, jwt }) =>
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

		const result = await REPOMascota.actualizarMascota(body, mascotaId, profile.id as number);

		return status(result.statusCode as 200 | 400 | 404 | 500, {
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
					description: "ID de la mascota a actualizar",
				}),
			}),
			body: DTO.DTOactualizarMascota,
			detail: {
				security: [{ cookieAuth: [] }],
				summary: "Actualizar mascota",
				description: "Actualiza uno o varios campos de una mascota existente.",
			},
		}
	);
