import { t, type Static } from 'elysia';

export const DTOcrearUsuario = t.Object({
	username: t.String(),
	email: t.String(),
	password: t.String(),
	confirmPassword: t.String()
});

export type crearUsuarioType = Static<typeof DTOcrearUsuario>;