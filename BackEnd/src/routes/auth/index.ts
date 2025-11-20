import { Elysia } from "elysia";
import { Login } from "./login";
import { Logout } from "./logout";
import { recuperacionRoutes } from "./recovery";

export const AuthRoutes = new Elysia({ prefix: "/auth", tags: ['Auth'] })
	.use(Login)
	.use(Logout)
	.use(recuperacionRoutes);