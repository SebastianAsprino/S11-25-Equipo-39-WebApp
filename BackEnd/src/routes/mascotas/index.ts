import { Elysia } from "elysia";
import { mascotaPOST } from "./post";
import { mascotaGET } from "./get";
import { mascotaPUT } from "./put";
import { mascotaDELETE } from "./delete";
import { mascotaIMG } from "./getImg";


export const MascotaRoutes = new Elysia({ prefix: "/pet", tags: ['Pets'] })
	.use(mascotaPOST)
	.use(mascotaGET)
	.use(mascotaPUT)
	.use(mascotaDELETE)
	.use(mascotaIMG);
