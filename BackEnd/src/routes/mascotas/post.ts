import { Elysia, t } from "elysia";
import { plugins } from "../../plugins";
import { REPOMascota } from "../../repository";
import { DTO } from "../../DTO";

export const mascotaPOST = new Elysia()
	.use(plugins)
	.post("/mascotas", async ({ body, status, cookie: { auth }, jwt }) =>
	{
		const profile = await jwt.verify(auth.value as string);

		if (!profile)
		{
			return status(403, {
				success: false,
				message: "Forbidden",
			});
		}

		const result = await REPOMascota.crearMascota(body, profile.id as number);

		return status(result.statusCode as 201 | 400 | 500, {
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
			body: DTO.DTOcrearMascota,
			detail: {
				security: [{ cookieAuth: [] }],
				summary: "Crear mascota",
				description: "Crea una nueva mascota asociada al usuario autenticado.",
			},
		}
	);
