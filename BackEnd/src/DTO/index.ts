import { DTOcrearUsuario, type crearUsuarioType } from "./usuario/crear";
import { DTOactualizarUsuario, type actualizarUsuarioType } from "./usuario/actualizar";
import { DTOeliminarUsuario, type eliminarUsuarioType } from "./usuario/eliminar";

import { DTOlogin, type loginType } from "./auth/login";
import { DTOSolicitarRecuperacion, DTOVerificarToken, DTOResetearPassword, type SolicitarRecuperacionType, type VerificarTokenType, type ResetearPasswordType } from "./auth/recuperarcontrasena";

import { DTOactualizarMascota, type actualizarMascotaType } from "./mascota/actualizar";
import { DTOcrearMascota, type crearMascotaType } from "./mascota/crear";
import { DTOeliminarMascota, type eliminarMascotaType } from "./mascota/eliminar";

import { Respond, type res } from "./respond";

export const DTO = {
	DTOcrearUsuario,
	DTOactualizarUsuario,
	DTOeliminarUsuario,
	DTOlogin,
	DTOSolicitarRecuperacion,
	DTOVerificarToken,
	DTOResetearPassword,
	DTOactualizarMascota,
	DTOcrearMascota,
	DTOeliminarMascota,
	Respond
};

export type {
	crearUsuarioType,
	actualizarUsuarioType,
	eliminarUsuarioType,
	loginType,
	SolicitarRecuperacionType,
	VerificarTokenType,
	ResetearPasswordType,
	actualizarMascotaType,
	crearMascotaType,
	eliminarMascotaType,
	res
};