import { Elysia } from "elysia";
import { AuthRoutes } from "./auth";
import { usuarioRoutes } from "./usuarios";


export const Routes = new Elysia()
	.use(AuthRoutes)
	.use(usuarioRoutes);
