import { Elysia } from "elysia";
import { AuthRoutes } from "./auth";
import { usuarioRoutes } from "./usuarios";
import { MascotaRoutes } from "./mascotas";


export const Routes = new Elysia()
	.use(AuthRoutes)
	.use(usuarioRoutes)
	.use(MascotaRoutes);