import { Elysia, t } from "elysia";
import { plugins } from "../../plugins";
import { REPOMascota } from "../../repository";

export const mascotaIMG = new Elysia()
	.use(plugins)
	.get("/img/:id", async ({ params, query, status, set, cookie: { auth }, jwt }) =>
	{
		const profile = await jwt.verify(auth.value as string);
		if (!profile)
		{
			return status(403, {
				success: false,
				message: "Forbidden",
			});
		}

		const id = Number(params.id);
		const size = query.size ? Number(query.size) : undefined;

		if (isNaN(id))
			return status(400, "ID inválido");

		const result = await REPOMascota.obtenerFotoMascota(id, size);

		if (!result.success)
			return status(result.statusCode as 404 | 500, "Imagen no encontrada");

		set.headers['Cache-Control'] = 'public, max-age=31536000';
		set.headers['Content-Type'] = 'image/webp';

		return result.payload;

	},
		{
			cookie: t.Cookie({
				auth: t.String({
					description: "JWT token para autenticación",
				}),
			}),
			params: t.Object({
				id: t.Numeric(),
			}),
			query: t.Object({
				size: t.Optional(t.Numeric()),
			}),
			detail: {
				summary: "Obtener imagen de mascota",
				description: "Devuelve la imagen original o redimensionada en formato WebP.",
			},
		}
	);

