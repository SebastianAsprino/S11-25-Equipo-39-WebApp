import { z } from 'zod';

export const registerSchema = z.object({
    username: z.string({ error: 'usuario obligatorio' }).min(3, 'el nombre debe tener al menos 3 caracteres').max(20).regex(/[A-Za-z][A-Za-z0-9\-]*/),
    email: z.string({ error: 'correo obligatorio' }).email('correo inválido').min(1, 'correo obligatorio'),
    password: z.string({ error: 'contraseña obligatoria' }).min(6, 'contraseña debe tener al menos 6 caracteres').max(12),
    confirmPassword: z.string({ error: 'confirmación obligatoria' }).min(6, 'la confirmacion debe tener al menos 6 caracteres').max(12),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'las contraseñas no coinciden',
    path: ['confirmPassword'],
});

export type RegisterSchema = z.infer<typeof registerSchema>;