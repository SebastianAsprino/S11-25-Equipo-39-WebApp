import { drizzle } from 'drizzle-orm/node-postgres';
import { schema } from './schema';

const database: string = process.env.DATABASE_URL || "";

export const db = drizzle(database, { schema });