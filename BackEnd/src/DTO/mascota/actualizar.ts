import { t, type Static } from "elysia";

export const DTOactualizarMascota = t.Object({
	nombre: t.Optional(
		t.String({
			description: "Nuevo nombre de la mascota",
		})
	),
	especie: t.Optional(
		t.String({
			description: "Nueva especie de la mascota",
		})
	),
	raza: t.Optional(
		t.String({
			description: "Nueva raza de la mascota",
		})
	),
	edad: t.Optional(
		t.Number({
			description: "Nueva edad de la mascota",
		})
	),
	peso: t.Optional(
		t.Number({
			description: "Nuevo peso de la mascota",
		})
	),
	foto: t.Optional(
		t.String({
			description: "Nueva imagen en formato BASE64",
		})
	),
});

export type actualizarMascotaType = Static<typeof DTOactualizarMascota>;
