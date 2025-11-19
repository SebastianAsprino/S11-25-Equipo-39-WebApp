import { MascotaRoutes } from "./mascotas";

export const Routes = new Elysia()
  .use(AuthRoutes)
  .use(UsuarioRoutes)
  .use(MascotaRoutes); // 👈 Montamos las rutas de mascota
