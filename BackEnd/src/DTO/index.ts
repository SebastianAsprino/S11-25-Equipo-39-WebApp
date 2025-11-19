import { DTOcrearUsuario, type crearUsuarioType } from "./usuario/crear";          // DTO y tipo para crear usuario
import { DTOactualizarUsuario, type actualizarUsuarioType } from "./usuario/actualizar"; // DTO y tipo para actualizar usuario
import { DTOeliminarUsuario, type eliminarUsuarioType } from "./usuario/eliminar"; // DTO y tipo para eliminar usuario

import { DTOlogin, type loginType } from "./auth/login";                           // DTO y tipo de login

import { Respond, type res } from "./respond";                                      // DTO genérico de respuesta

// 👇 NUEVOS IMPORTS DE MASCOTA
import {
  DTOcrearMascota,
  type crearMascotaType,
} from "./mascota/crear";
import {
  DTOactualizarMascota,
  type actualizarMascotaType,
} from "./mascota/actualizar";
import {
  DTOeliminarMascota,
  type eliminarMascotaType,
} from "./mascota/eliminar";

// Objeto DTO que agrupa todos los esquemas
export const DTO = {
  DTOcrearUsuario,
  DTOactualizarUsuario,
  DTOeliminarUsuario,
  DTOlogin,
  Respond,
  // 👇 Agregamos los DTO de mascota
  DTOcrearMascota,
  DTOactualizarMascota,
  DTOeliminarMascota,
};

// Exportamos todos los tipos para usarlos en el resto del proyecto
export type {
  crearUsuarioType,
  actualizarUsuarioType,
  eliminarUsuarioType,
  loginType,
  res,
  // 👇 Nuevos tipos de mascota
  crearMascotaType,
  actualizarMascotaType,
  eliminarMascotaType,
};
