import { Elysia } from "elysia";
import { cors } from '@elysiajs/cors';
import { openapi } from '@elysiajs/openapi';
import { Routes } from "./routes";

const app = new Elysia()
	.use(cors())
	.use(openapi({
		documentation: {
			info: {
				title: "PET HEALTH TRACKER API",
				description: "Api pet health tracker.",
				version: "0.0.1"
			},
			tags: [
				{ name: 'User', description: 'User endpoints' },
				{ name: 'Auth', description: 'Auth endpoints' }
			]
		}
	}))
	.use(Routes)
	.listen(8000);

console.log(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
