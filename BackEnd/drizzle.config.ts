import { defineConfig } from 'drizzle-kit';

const database: string = process.env.DATABASE_URL || "valor_por_defecto";

export default defineConfig({
	out: './drizzle',
	schema: './src/services/database/schema',
	dialect: 'postgresql',
	dbCredentials: {
		url: database
	}
});
