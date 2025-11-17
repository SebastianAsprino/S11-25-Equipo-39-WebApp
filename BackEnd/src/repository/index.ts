import { login } from "./auth/login";
import { recuperacionRepository } from "./auth/recuperacioncontrasena";
import { crearUsuario } from "./usuario/crear";
import { actualizarUsuario } from "./usuario/actualizar";
import { eliminarUsuario } from "./usuario/eliminar";

export const REPOauth = {
	login,
	recuperacionRepository
};

export const REPOusuario = {
	crearUsuario,
	actualizarUsuario,
	eliminarUsuario
};