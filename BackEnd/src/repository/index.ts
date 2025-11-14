import { login } from "./auth/login";
import { crearUsuario } from "./usuario/crear";
import { actualizarUsuario } from "./usuario/actualizar";
import { eliminarUsuario } from "./usuario/eliminar";

export const REPOauth = {
	login
};

export const REPOusuario = {
	crearUsuario,
	actualizarUsuario,
	eliminarUsuario
};