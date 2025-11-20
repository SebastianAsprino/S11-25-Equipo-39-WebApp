import { db, schema } from "../../services";
import type { crearMascotaType, res } from "../../DTO";

export const crearMascota = async (mascota: crearMascotaType, usuarioId: number): Promise<res<boolean>> =>
{
	try
	{
		const bufferFoto =
			mascota.foto ? Buffer.from(mascota.foto, "base64") : null;

		await db.insert(schema.mascota).values({
			nombre: mascota.nombre,
			especie: mascota.especie,
			raza: mascota.raza ?? null,
			edad: mascota.edad,
			peso: mascota.peso,
			foto: bufferFoto,
			usuarioId,
		});

		return {
			success: true,
			message: "Mascota creada correctamente",
			statusCode: 201,
		};
	} catch (error)
	{
		console.error("Error al crear mascota:", error);

		return {
			success: false,
			message: "Error interno al crear mascota",
			statusCode: 500,
		};
	}
};