import { db, schema } from "../../services";
import { type loginType, type res } from "../../DTO";
import { eq } from 'drizzle-orm';

export const login = async (login: loginType): Promise<res<string>> =>
{
	const user = await db.select()
		.from(schema.usuario)
		.where(eq(schema.usuario.email, login.email))
		.limit(1)
		.execute()
		.then(rows => rows[0]);

	if (!user)
	{
		return {
			success: false,
			message: "Credenciales inválidas",
			statusCode: 401
		};
	}

	const passwordMatch = await Bun.password.verify(login.password, user.password);
	if (!passwordMatch)
	{
		return {
			success: false,
			message: "Credenciales inválidas",
			statusCode: 401
		};
	}

	return {
		success: true,
		message: "Inicio de sesion exitoso.",
		payload: user.username,
		statusCode: 200
	};
};