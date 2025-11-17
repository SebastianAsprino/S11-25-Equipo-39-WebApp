import { t, type Static } from 'elysia';

export const DTOSolicitarRecuperacion = t.String({ format: 'email' });

export const DTOVerificarToken = t.Object({
	token: t.String()
});

export const DTOResetearPassword = t.Object({
	password: t.String({ minLength: 6 }),
	confirmPassword: t.String()
});

export type SolicitarRecuperacionType = Static<typeof DTOSolicitarRecuperacion>;
export type VerificarTokenType = Static<typeof DTOVerificarToken>;
export type ResetearPasswordType = Static<typeof DTOResetearPassword>;