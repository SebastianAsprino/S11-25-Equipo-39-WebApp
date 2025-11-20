import { pgTable, serial, text, integer, customType } from "drizzle-orm/pg-core";
import { usuario } from "./usuario";


const bytea = customType<{ data: Buffer; }>({
	dataType()
	{
		return "bytea";
	},
});

export const mascota = pgTable("mascota", {
	id: serial("id").primaryKey(),
	nombre: text("nombre").notNull(),
	especie: text("especie").notNull(),
	raza: text("raza"),
	edad: integer("edad").notNull(),
	peso: integer("peso").notNull(),
	foto: bytea("foto"),
	usuarioId: integer("usuario_id").notNull().references(() => usuario.id)
});
