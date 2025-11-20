import { t, type Static } from "elysia";

export const DTOeliminarMascota = t.Object({
	id: t.Number({
		description: "ID de la mascota a eliminar",
	}),
});

export type eliminarMascotaType = Static<typeof DTOeliminarMascota>;
