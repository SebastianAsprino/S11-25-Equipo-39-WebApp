import { t } from 'elysia';

export const Respond = <S>(schema: S) =>
	t.Object({
		success: t.Boolean(),
		message: t.String(),
		payload: (schema as any).optional()
	});


export type res<T> = {
	success: boolean;
	message: string;
	payload?: T;
	statusCode: number;
};
