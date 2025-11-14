import { Elysia, t } from 'elysia';
import { plugins } from '../../plugins';
import { REPOauth } from '../../repository';
import { DTO } from '../../DTO';

export const Login = new Elysia()
	.use(plugins)
	.post('/login', async ({ jwt, body, status, cookie: { auth } }) =>
	{
		const result = await REPOauth.login(body);

		if (result.statusCode !== 200)
		{
			return status(result.statusCode as 401, {
				success: result.success,
				message: result.message,
			});
		}

		const token = await jwt.sign({
			username: result.payload,
		});

		auth.set({
			value: token,
			httpOnly: true,
			maxAge: 7 * 86400, // 7 días en segundos
			path: '/',
			sameSite: 'lax'
		});

		return status(result.statusCode as 200, {
			success: result.success,
			message: result.message,
		});
	}, {
		body: DTO.DTOlogin,
		detail: {
			summary: "Iniciar sesión de usuario",
			description: "Autentica a un usuario y establece una cookie **auth** de sesión JWT",
		},
		response: {
			401: t.Object({
				success: t.Boolean({ default: false }),
				message: t.String()
			}, {
				description: "Unauthorized - Credenciales inválidas",
				examples: [{
					success: false,
					message: "Credenciales inválidas"
				}, {
					success: false,
					message: "Usuario no encontrado"
				}]
			}),
			200: t.Object({
				success: t.Boolean({ default: true }),
				message: t.String()
			}, {
				description: "OK - Login exitoso",
				examples: [{
					success: true,
					message: "Inicio de sesión exitoso"
				}]
			})
		}
	});