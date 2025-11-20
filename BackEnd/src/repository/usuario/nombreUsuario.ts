import { db, schema } from "../../services";
import { type res } from "../../DTO";
import { eq } from "drizzle-orm";

export const obtenerUsername = async (id: number): Promise<res<string>> =>
{
	try
	{
		const result = await db
			.select({
				username: schema.usuario.username
			})
			.from(schema.usuario)
			.where(eq(schema.usuario.id, id))
			.limit(1);

		if (result.length === 0)
		{
			return {
				success: false,
				message: "Usuario no encontrado",
				statusCode: 404
			};
		}

		return {
			success: true,
			message: "Username obtenido correctamente",
			statusCode: 200,
			payload: result[0].username
		};

	} catch (error)
	{
		console.error("Error al obtener username:", error);

		return {
			success: false,
			message: "Error interno del servidor",
			statusCode: 500
		};
	}
};
