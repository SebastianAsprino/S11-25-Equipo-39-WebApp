import { Elysia } from "elysia";          // Framework Elysia
import { mascotaPOST } from "./post";     // Ruta para crear mascota
import { mascotaGET } from "./get";       // Ruta para listar mascotas
import { mascotaPUT } from "./put";       // Ruta para actualizar mascota
import { mascotaDELETE } from "./delete"; // Ruta para eliminar mascota

// Agrupa todas las rutas de mascotas en un solo plugin
export const MascotaRoutes = new Elysia()
  .use(mascotaPOST)                       // Monta POST /mascotas
  .use(mascotaGET)                        // Monta GET /mascotas
  .use(mascotaPUT)                        // Monta PUT /mascotas/:id
  .use(mascotaDELETE);                    // Monta DELETE /mascotas/:id
