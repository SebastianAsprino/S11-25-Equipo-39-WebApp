import { db, schema } from "../../services";
import { type actualizarUsuarioType, type res } from "../../DTO";
import { eq } from 'drizzle-orm';

export const actualizarUsuario = async (usuario: actualizarUsuarioType, id: number): Promise<res<boolean>> =>
{
	try
	{
		const existingUser = await db
			.select()
			.from(schema.usuario)
			.where(eq(schema.usuario.id, id))
			.limit(1);

		if (existingUser.length === 0)
		{
			return {
				success: false,
				message: "Usuario no encontrado",
				statusCode: 404
			};
		}

		if (usuario.password)
		{
			if (!usuario.confirmPassword)
			{
				return {
					success: false,
					message: "Se requiere confirmar la contraseña",
					statusCode: 400
				};
			}

			if (usuario.password !== usuario.confirmPassword)
			{
				return {
					success: false,
					message: "Las contraseñas no coinciden",
					statusCode: 400
				};
			}
		}

		const updateData: any = {};

		if (usuario.username)
		{
			updateData.username = usuario.username;
		}

		if (usuario.email)
		{
			if (usuario.email !== existingUser[0].email)
			{
				const emailExists = await db
					.select()
					.from(schema.usuario)
					.where(eq(schema.usuario.email, usuario.email))
					.limit(1);

				if (emailExists.length > 0)
				{
					return {
						success: false,
						message: "El email ya está en uso por otro usuario",
						statusCode: 409
					};
				}
			}
			updateData.email = usuario.email;
		}

		if (usuario.password)
		{
			const bcryptHash = await Bun.password.hash(usuario.password.trim(), {
				algorithm: "bcrypt",
				cost: 4,
			});
			updateData.password = bcryptHash;
		}

		// Actualizar solo si hay campos para actualizar
		if (Object.keys(updateData).length > 0)
		{
			await db
				.update(schema.usuario)
				.set(updateData)
				.where(eq(schema.usuario.id, id));

			return {
				success: true,
				message: "Usuario actualizado correctamente",
				statusCode: 200
			};
		} else
		{
			return {
				success: false,
				message: "No se proporcionaron datos para actualizar",
				statusCode: 400
			};
		}

	} catch (error)
	{
		console.error("Error al actualizar usuario:", error);
		return {
			success: false,
			message: "Error interno del servidor",
			statusCode: 500
		};
	}
};