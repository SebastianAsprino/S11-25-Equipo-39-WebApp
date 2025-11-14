import { Elysia, t } from "elysia";
import { REPOusuario } from "../../repository";
import { DTO } from "../../DTO";

export const usuarioPOST = new Elysia()
	.post("/register", async ({ body, status }) =>
	{
		const result = await REPOusuario.crearUsuario(body);

		return status(result.statusCode as 201 | 400 | 409 | 500, {
			success: result.success,
			message: result.message,
		});
	},
		{
			body: DTO.DTOcrearUsuario,
			detail: {
				summary: "Registrar un nuevo usuario",
				description: "Crea una nueva cuenta de usuario en el sistema"
			},
			response: {
				400: t.Object({
					success: t.Boolean({ default: false }),
					message: t.String()
				}, {
					description: "Bad Request - Datos inválidos",
					examples: [{
						success: false,
						message: "Las contraseñas no coinciden"
					}]
				}),
				409: t.Object({
					success: t.Boolean({ default: false }),
					message: t.String()
				}, {
					description: "Conflict - El usuario ya existe",
					examples: [{
						success: false,
						message: "El usuario ya existe"
					}]
				}),
				201: t.Object({
					success: t.Boolean({ default: true }),
					message: t.String()
				}, {
					description: "Created - Usuario registrado",
					examples: [{
						success: true,
						message: "Usuario creado correctamente"
					}]
				}),
				500: t.Object({
					success: t.Boolean({ default: false }),
					message: t.String()
				}, {
					description: "Internal Server Error",
					examples: [{
						success: false,
						message: "Error interno del servidor"
					}]
				})
			}
		}
	);