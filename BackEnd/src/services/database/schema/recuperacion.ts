import { pgTable, serial, varchar, integer, timestamp, boolean, index } from "drizzle-orm/pg-core";

import { usuario } from "./usuario";

export const tokensRecuperacion = pgTable("tokens_recuperacion", {
	id: serial("id").primaryKey(),
	token: varchar("token", { length: 255 }).notNull().unique(),
	usuarioId: integer("usuario_id")
		.notNull()
		.unique()
		.references(() => usuario.id, { onDelete: "cascade" }),
	expiracion: timestamp("expiracion").notNull(),
	usado: boolean("usado").notNull().default(false),
	creado: timestamp("creado").defaultNow(),
	actualizado: timestamp("actualizado").defaultNow(),
},
	(table) => [
		index("idx_tokens_recuperacion_token").on(table.token),
		index("idx_tokens_recuperacion_expiracion").on(table.expiracion),
	]);