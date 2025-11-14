import { Elysia } from "elysia";
import { usuarioPOST } from "./post";
import { usuarioPUT } from "./put";
import { usuarioDELETE } from "./delete";


export const usuarioRoutes = new Elysia({ prefix: "/user", tags: ['User'] })
	.use(usuarioPOST)
	.use(usuarioPUT)
	.use(usuarioDELETE);
