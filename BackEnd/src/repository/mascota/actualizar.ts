import { db, schema } from "../../services";
import type { actualizarMascotaType, res } from "../../DTO";
import { eq } from "drizzle-orm";

export const actualizarMascota = async (mascota: actualizarMascotaType, id: number, usuarioId: number): Promise<res<boolean>> =>
{
	try
	{
		const existing = await db
			.select()
			.from(schema.mascota)
			.where(eq(schema.mascota.id, id))
			.limit(1);

		if (existing.length === 0)
		{
			return {
				success: false,
				message: "Mascota no encontrada",
				statusCode: 404,
			};
		}

		const dataToUpdate: Partial<typeof schema.mascota.$inferInsert> = {};

		if (mascota.nombre !== undefined)
			dataToUpdate.nombre = mascota.nombre;

		if (mascota.especie !== undefined)
			dataToUpdate.especie = mascota.especie;

		if (mascota.raza !== undefined)
			dataToUpdate.raza = mascota.raza ?? null;

		if (mascota.edad !== undefined)
			dataToUpdate.edad = mascota.edad;

		if (mascota.peso !== undefined)
			dataToUpdate.peso = mascota.peso;

		if (mascota.foto !== undefined)
		{
			dataToUpdate.foto =
				mascota.foto ? Buffer.from(mascota.foto, "base64") : null;
		}

		if (Object.keys(dataToUpdate).length === 0)
		{
			return {
				success: false,
				message: "No se proporcionaron campos para actualizar",
				statusCode: 400,
			};
		}

		await db
			.update(schema.mascota)
			.set(dataToUpdate)
			.where(eq(schema.mascota.id, id));

		return {
			success: true,
			message: "Mascota actualizada correctamente",
			statusCode: 200,
		};
	} catch (error)
	{
		console.error("Error al actualizar mascota:", error);

		return {
			success: false,
			message: "Error interno al actualizar mascota",
			statusCode: 500,
		};
	}
};