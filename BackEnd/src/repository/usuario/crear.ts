import { db, schema } from "../../services";
import { type crearUsuarioType, type res } from "../../DTO";
import { eq } from 'drizzle-orm';

export const crearUsuario = async (usuario: crearUsuarioType): Promise<res<boolean>> =>
{
	try
	{
		// Validar que las contraseñas coincidan
		if (usuario.confirmPassword !== usuario.password)
		{
			return {
				success: false,
				message: "Las contraseñas no coinciden",
				statusCode: 400
			};
		}

		// Verificar si el usuario ya existe
		const existing = await db
			.select()
			.from(schema.usuario)
			.where(eq(schema.usuario.email, usuario.email))
			.limit(1);

		if (existing.length > 0)
		{
			return {
				success: false,
				message: "El usuario ya existe",
				statusCode: 409
			};
		}

		// Hashear la contraseña
		const bcryptHash = await Bun.password.hash(usuario.password.trim(), {
			algorithm: "bcrypt",
			cost: 4,
		});

		// Crear el usuario en la base de datos
		await db.insert(schema.usuario).values({
			username: usuario.username,
			email: usuario.email,
			password: bcryptHash,
		});

		return {
			success: true,
			message: "Usuario creado correctamente",
			statusCode: 201
		};

	} catch (error)
	{
		console.error("Error en crearUsuario:", error);

		// Manejar errores específicos de la base de datos
		if (error instanceof Error)
		{
			if (error.message.includes("unique constraint") || error.message.includes("duplicate key"))
			{
				return {
					success: false,
					message: "El usuario ya existe",
					statusCode: 409
				};
			}
		}

		return {
			success: false,
			message: "Error interno del servidor al crear el usuario",
			statusCode: 500
		};
	}
};




