import { db, schema } from "../../services";
import { type res } from "../../DTO";
import { eq } from "drizzle-orm";
import sharp from "sharp";

export const obtenerFotoMascota = async (id: number, size?: number): Promise<res<Buffer>> =>
{
	try
	{
		const result = await db
			.select({
				foto: schema.mascota.foto,
			})
			.from(schema.mascota)
			.where(eq(schema.mascota.id, id))
			.limit(1);

		if (result.length === 0 || !result[0].foto)
			return {
				success: false,
				message: '',
				statusCode: 404
			};

		let buffer = result[0].foto as Buffer;

		const sharpInstance = sharp(buffer);

		if (size && size > 0)
		{
			sharpInstance.resize(size, size);
		}

		const webp = await sharpInstance.webp().toBuffer();

		return {
			success: true,
			message: '',
			payload: webp,
			statusCode: 200
		};
	}
	catch (error)
	{
		console.error("Error al obtener foto:", error);
		return {
			success: false,
			message: '',
			statusCode: 500
		};
	}
};

