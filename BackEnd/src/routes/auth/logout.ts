import { Elysia, t } from 'elysia';
import { plugins } from '../../plugins';

export const Logout = new Elysia()
	.use(plugins)
	.post('/logout', ({ cookie: { auth }, status }) =>
	{
		auth.remove();

		return status(200, {
			success: true,
			message: "Sesión cerrada exitosamente"
		});
	}, {
		cookie: t.Cookie({
			auth: t.String({
				description: "JWT token para autenticación",
			}),
		}),
		detail: {
			summary: "Cerrar sesión de usuario",
			description: "Elimina la cookie de autenticación JWT cerrando la sesión del usuario"
		},
		response: {
			200: t.Object({
				success: t.Boolean({ default: true }),
				message: t.String()
			}, {
				description: "OK - Sesión cerrada y cookie eliminada",
				examples: [{
					success: true,
					message: "Sesión cerrada exitosamente"
				}]
			})
		}
	});