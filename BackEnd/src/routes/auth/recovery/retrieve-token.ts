import { Elysia } from "elysia";
import { REPOauth } from "../../../repository";
import { DTO } from "../../../DTO";

export const retrieveTokenRoutes = new Elysia()
	.get("/recuperar/:token", async ({ params, set }) =>
	{
		const result = await REPOauth.recuperacionRepository.verificarToken(params);

		if (!result.success)
		{
			set.status = 400;
			set.headers["Content-Type"] = "text/html; charset=utf-8";
			return `
			<!DOCTYPE html>
			<html>
				<head>
					<meta charset="UTF-8">
					<title>Enlace inválido</title>
				</head>
				<body style="font-family: sans-serif; text-align: center; padding: 40px;">
					<h2>Enlace inválido o expirado</h2>
					<p>Solicita un nuevo enlace de recuperación.</p>
				</body>
			</html>`;
		}

		set.headers["Content-Type"] = "text/html; charset=utf-8";
		return `
		<!DOCTYPE html>
		<html>
			<head>
				<meta charset="UTF-8" />
				<title>Cambiar contraseña</title>
				<style>
					body { font-family: sans-serif; padding: 40px; background:#f7f7f7; }
					form { max-width: 400px; margin: auto; background: white; padding: 30px; border-radius: 8px; }
					input[type=password] { width: 100%; padding: 10px; margin: 10px 0; }
					button { width: 100%; padding: 12px; background:#007bff; color:white; border:none; border-radius:4px; }
					.error { color:red; margin-top:10px; }
				</style>
			</head>
			<body>
				<form id="resetForm">
					<h2>Crea tu nueva contraseña</h2>
					<input type="password" id="password" placeholder="Nueva contraseña" required />
					<input type="password" id="confirmPassword" placeholder="Repite la contraseña" required />
					<button type="submit">Cambiar contraseña</button>
					<div id="message" class="error"></div>
				</form>

				<script>
					document.getElementById("resetForm").addEventListener("submit", async (e) => {
						e.preventDefault();
						const password = document.getElementById("password").value;
						const confirmPassword = document.getElementById("confirmPassword").value;

						if (password !== confirmPassword) {
							document.getElementById("message").textContent = "Las contraseñas no coinciden";
							return;
						}
						const datasend = JSON.stringify({ password, confirmPassword });

						const res = await fetch("/auth/resetear-password/${params.token}", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: datasend
						});

						const data = await res.json();

						if (data.success) {
							alert("Contraseña actualizada correctamente");
							window.location.href = "https://pethealthtracker.asprino.dev/login/"; // o a tu login
						} else {
							document.getElementById("message").textContent = data.message;
						}
					});
				</script>
			</body>
		</html>`;
	}, {
		params: DTO.DTOVerificarToken,
		detail: {
			summary: "Formulario HTML para cambiar contraseña",
			description: "Sirve una página HTML para que el usuario cambie su contraseña con el token"
		}
	});