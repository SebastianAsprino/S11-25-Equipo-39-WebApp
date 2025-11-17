import { Elysia, t } from "elysia";
import { requestRecoveryRoutes } from "./request-recovery";
import { verifyTokenRoutes } from "./verify-token";
import { resetPasswordRoutes } from "./reset-password";
import { retrieveTokenRoutes } from "./retrieve-token";

export const recuperacionRoutes = new Elysia()
	.use(requestRecoveryRoutes)
	.use(verifyTokenRoutes)
	.use(resetPasswordRoutes)
	.use(retrieveTokenRoutes);