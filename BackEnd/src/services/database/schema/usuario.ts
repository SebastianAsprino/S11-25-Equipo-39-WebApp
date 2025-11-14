import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const usuario = pgTable("usuario", {
	id: serial("id").primaryKey(),
	username: text("username").notNull(),
	email: text("email").notNull().unique(),
	password: text("password").notNull(),
});
