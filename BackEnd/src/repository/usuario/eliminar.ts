import { db, schema } from "../../services";
import { type eliminarUsuarioType, type res } from "../../DTO";
import { eq } from 'drizzle-orm';

export const eliminarUsuario = async (usuario: eliminarUsuarioType): Promise<res<boolean>> =>
{
	try
	{
		// Verificar que el usuario existe
		const existingUser = await db
			.select()
			.from(schema.usuario)
			.where(eq(schema.usuario.id, usuario.id))
			.limit(1);

		if (existingUser.length === 0)
		{
			return {
				success: false,
				message: "Usuario no encontrado",
				statusCode: 404
			};
		}

		// Eliminar el usuario
		await db
			.delete(schema.usuario)
			.where(eq(schema.usuario.id, usuario.id));

		return {
			success: true,
			message: "Usuario eliminado correctamente",
			statusCode: 200
		};

	} catch (error)
	{
		console.error("Error en eliminarUsuario:", error);

		// Manejar errores específicos de la base de datos
		if (error instanceof Error)
		{
			if (error.message.includes("foreign key constraint") || error.message.includes("referential integrity"))
			{
				return {
					success: false,
					message: "No se puede eliminar el usuario porque tiene registros relacionados",
					statusCode: 409
				};
			}
		}

		return {
			success: false,
			message: "Error interno del servidor al eliminar el usuario",
			statusCode: 500
		};
	}
};