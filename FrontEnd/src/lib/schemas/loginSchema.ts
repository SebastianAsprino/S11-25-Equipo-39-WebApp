import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string({ error: 'correo requerido' }).email("Correo inválido")
    .min(1, "Correo o usuario obligatorio"),
  password: z
    .string({ error: 'contraseña obligatoria' })
    .min(6, "mínimo 6 caracteres")
});

export type LoginSchema = z.infer<typeof loginSchema>;
