import { type SolicitarRecuperacionType, type VerificarTokenType, type ResetearPasswordType, type res } from "../../DTO";
import { db, schema } from "../../services";
import { eq, and, gt } from 'drizzle-orm';
import { Resend } from "resend";

type verificarToken = {
	usuarioId: number;
};


const resend = new Resend(process.env.RESEND_API_KEY);

export const recuperacionRepository = {
	async solicitarRecuperacion(email: SolicitarRecuperacionType): Promise<res<undefined>>
	{
		try
		{
			// Verificar si el usuario existe
			const usuario = await db
				.select()
				.from(schema.usuario)
				.where(eq(schema.usuario.email, email))
				.limit(1);

			if (usuario.length === 0)
			{
				// Por seguridad, no revelamos si el email existe o no
				return {
					success: true,
					message: "Si el email existe, se enviarán instrucciones de recuperación",
					statusCode: 200
				};
			}

			// Generar token único
			const token = Math.random().toString(36).substring(2) + Date.now().toString(36);
			const expiracion = new Date(Date.now() + 1 * 60 * 60 * 1000); // 1 hora

			// Guardar token en la base de datos
			await db.insert(schema.tokensRecuperacion).values({
				token,
				usuarioId: usuario[0].id,
				expiracion,
				usado: false
			}).onConflictDoUpdate({
				target: schema.tokensRecuperacion.usuarioId,
				set: {
					token,
					expiracion,
					usado: false,
					actualizado: new Date()
				}
			});

			// Enviar email con el enlace de recuperación
			const enlaceRecuperacion = `https://demo.asprino.dev/auth/recuperar/${token}`;

			await resend.emails.send({
				from: "Recuperación de Contraseña <noreply@tansactional.asprino.dev>",
				to: email,
				subject: "Recupera tu contraseña - Asprino",
				html: `
          <h2>Recuperación de Contraseña</h2>
          <p>Hemos recibido una solicitud para restablecer tu contraseña.</p>
          <p>Haz clic en el siguiente enlace para crear una nueva contraseña:</p>
          <a href="${enlaceRecuperacion}" style="background-color:#007bff;color:white;padding:12px 24px;text-decoration:none;border-radius:4px;display:inline-block;">
            Restablecer Contraseña
          </a>
          <p>Este enlace expirará en 1 hora.</p>
          <p style="font-size:12px;color:#999">Si no solicitaste este cambio, puedes ignorar este mensaje.</p>
        `,
			});
			return {
				success: true,
				message: "Si el email existe, se enviarán instrucciones de recuperación",
				statusCode: 200
			};

		} catch (error)
		{
			console.error("Error en solicitar recuperación:", error);
			return {
				success: false,
				message: "Error al procesar la solicitud",
				statusCode: 500
			};
		}
	},

	async verificarToken(token: VerificarTokenType): Promise<res<verificarToken>>
	{
		try
		{
			const tokenValido = await db
				.select()
				.from(schema.tokensRecuperacion)
				.where(
					and(
						eq(schema.tokensRecuperacion.token, token.token),
						eq(schema.tokensRecuperacion.usado, false),
						gt(schema.tokensRecuperacion.expiracion, new Date())
					)
				)
				.limit(1);

			if (tokenValido.length === 0)
			{
				return {
					success: false,
					message: "Token inválido o expirado",
					statusCode: 400
				};
			}

			return {
				success: true,
				message: "Token válido",
				payload: { usuarioId: tokenValido[0].usuarioId },
				statusCode: 200
			};

		} catch (error)
		{
			console.error("Error al verificar token:", error);
			return {
				success: false,
				message: "Error al verificar el token",
				statusCode: 500
			};
		}
	},

	async resetearPassword(token: string, data: ResetearPasswordType): Promise<res<undefined>>
	{
		try
		{
			// Verificar que las contraseñas coincidan
			if (data.password !== data.confirmPassword)
			{
				return {
					success: false,
					message: "Las contraseñas no coinciden",
					statusCode: 400
				};
			}

			// Verificar token
			const tokenValido = await db
				.select()
				.from(schema.tokensRecuperacion)
				.where(
					and(
						eq(schema.tokensRecuperacion.token, token),
						eq(schema.tokensRecuperacion.usado, false),
						gt(schema.tokensRecuperacion.expiracion, new Date())
					)
				)
				.limit(1);

			if (tokenValido.length === 0)
			{
				return {
					success: false,
					message: "Token inválido o expirado",
					statusCode: 400
				};
			}

			// Hashear nueva contraseña
			const bcryptHash = await Bun.password.hash(data.password.trim(), {
				algorithm: "bcrypt",
				cost: 4,
			});

			// Actualizar contraseña del usuario
			await db
				.update(schema.usuario)
				.set({ password: bcryptHash })
				.where(eq(schema.usuario.id, tokenValido[0].usuarioId));

			// Marcar token como usado
			await db
				.update(schema.tokensRecuperacion)
				.set({ usado: true })
				.where(eq(schema.tokensRecuperacion.token, token));

			return {
				success: true,
				message: "Contraseña actualizada correctamente",
				statusCode: 200
			};

		} catch (error)
		{
			console.error("Error al resetear contraseña:", error);
			return {
				success: false,
				message: "Error al actualizar la contraseña",
				statusCode: 500
			};
		}
	}
};
