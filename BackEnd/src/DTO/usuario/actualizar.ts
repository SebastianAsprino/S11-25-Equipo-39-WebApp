import { t, type Static } from 'elysia';

export const DTOactualizarUsuario = t.Object({
	username: t.Optional(t.String()),
	email: t.Optional(t.String()),
	password: t.Optional(t.String()),
	confirmPassword: t.Optional(t.String())
});

export type actualizarUsuarioType = Static<typeof DTOactualizarUsuario>;