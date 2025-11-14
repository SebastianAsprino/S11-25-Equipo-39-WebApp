import { jwt } from '@elysiajs/jwt'

const key: string = process.env.JWT || "Fischl von Luftschloss Narfidort";

export const JWT = jwt({
	name: 'jwt',
	secret: key
});
