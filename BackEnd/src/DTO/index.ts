import { DTOcrearUsuario, type crearUsuarioType } from "./usuario/crear";
import { DTOactualizarUsuario, type actualizarUsuarioType } from "./usuario/actualizar";
import { DTOeliminarUsuario, type eliminarUsuarioType } from "./usuario/eliminar";

import { DTOlogin, type loginType } from "./auth/login";

import { Respond, type res } from "./respond";

export const DTO = {
	DTOcrearUsuario,
	DTOactualizarUsuario,
	DTOeliminarUsuario,
	DTOlogin,
	Respond
};

export type {
	crearUsuarioType,
	actualizarUsuarioType,
	eliminarUsuarioType,
	loginType,
	res
};