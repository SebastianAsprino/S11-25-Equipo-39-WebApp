import { db, schema } from "../../services";
import type { res } from "../../DTO";
import { eq } from "drizzle-orm";

export const eliminarMascota = async (id: number): Promise<res<boolean>> =>
{
	try
	{
		await db
			.delete(schema.mascota)
			.where(eq(schema.mascota.id, id));


		return {
			success: true,
			message: "Mascota eliminada correctamente",
			statusCode: 200,
		};
	} catch (error)
	{
		console.error("Error al eliminar mascota:", error);

		return {
			success: false,
			message: "Error interno al eliminar mascota",
			statusCode: 500,
		};
	}
};
