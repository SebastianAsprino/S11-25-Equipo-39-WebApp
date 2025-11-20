import { login } from "./auth/login";
import { recuperacionRepository } from "./auth/recuperacioncontrasena";

import { crearUsuario } from "./usuario/crear";
import { actualizarUsuario } from "./usuario/actualizar";
import { eliminarUsuario } from "./usuario/eliminar";

import { crearMascota } from "./mascota/crear";
import { listarMascotasPorUsuario } from "./mascota/listar";
import { actualizarMascota } from "./mascota/actualizar";
import { eliminarMascota } from "./mascota/eliminar";
import { obtenerFotoMascota } from "./mascota/getFotoMascota";


export const REPOauth = {
	login,
	recuperacionRepository
};

export const REPOusuario = {
	crearUsuario,
	actualizarUsuario,
	eliminarUsuario,
};

export const REPOMascota = {
	crearMascota,
	listarMascotasPorUsuario,
	actualizarMascota,
	eliminarMascota,
	obtenerFotoMascota
};
