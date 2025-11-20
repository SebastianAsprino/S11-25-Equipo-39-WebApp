import { db, schema } from "../../services";
import type { res } from "../../DTO";
import { eq } from "drizzle-orm";

export const listarMascotasPorUsuario = async (
	usuarioId: number
): Promise<res<unknown>> =>
{
	try
	{
		const mascotas = await db
			.select({
				id: schema.mascota.id,
				nombre: schema.mascota.nombre,
				especie: schema.mascota.especie,
				raza: schema.mascota.raza,
				edad: schema.mascota.edad,
				peso: schema.mascota.peso,
			})
			.from(schema.mascota)
			.where(eq(schema.mascota.usuarioId, usuarioId));

		return {
			success: true,
			message: "Listado de mascotas obtenido correctamente",
			statusCode: 200,
			payload: mascotas,
		};
	} catch (error)
	{
		console.error("Error al listar mascotas:", error);

		return {
			success: false,
			message: "Error interno al listar mascotas",
			statusCode: 500,
		};
	}
};
