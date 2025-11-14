import { t, type Static } from 'elysia';

export const DTOlogin = t.Object({
	email: t.String(),
	password: t.String()
});

export type loginType = Static<typeof DTOlogin>;