import { login } from "./auth/login";                       // Función para login
import { crearUsuario } from "./usuario/crear";             // Crear usuario
import { actualizarUsuario } from "./usuario/actualizar";   // Actualizar usuario
import { eliminarUsuario } from "./usuario/eliminar";       // Eliminar usuario

// 👇 Imports de mascota
import { crearMascota } from "./mascota/crear";             // Crear mascota
import { listarMascotasPorUsuario } from "./mascota/listar";// Listar mascotas
import { actualizarMascota } from "./mascota/actualizar";   // Actualizar mascota
import { eliminarMascota } from "./mascota/eliminar";       // Eliminar mascota

export const REPOauth = {
  login,                                                    // Repositorio de auth
};

export const REPOusuario = {
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
};

// Nuevo repositorio para mascotas
export const REPOMascota = {
  crearMascota,
  listarMascotasPorUsuario,
  actualizarMascota,
  eliminarMascota,
};
