import { t, type Static } from 'elysia';

export const DTOeliminarUsuario = t.Object({
	id: t.Number({ description: "ID del usuario a eliminar" })
});

export type eliminarUsuarioType = Static<typeof DTOeliminarUsuario>;