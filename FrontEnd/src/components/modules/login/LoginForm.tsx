// LoginForm.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { loginSchema, type LoginSchema } from "src/lib/schemas/loginSchema";
import InputsLogin from "src/components/forms/InputsLogin";

const LoginForm = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<LoginSchema>({
resolver: zodResolver(loginSchema as any), defaultValues: {
    email: "",
    password: "",
  },
  });

  const onSubmit: SubmitHandler<LoginSchema> = (data) => {
    console.log("Login data:", data);
  };

  return (
    <div className="w-full min-h-screen flex flex-col justify-center bg-base-100 text-base-content">
      <div className="w-full max-w-md mx-auto p-8 lg:p-12">

        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-primary">
            Inicia sesión
          </h1>
          <p className="text-base-content mt-1 opacity-90">
            Gestiona la salud de tus mascotas de manera fácil y rápida
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <InputsLogin
            name="email"
            control={control}
            type="text"
            label="Correo"
            errors={errors.email}
          />

          <InputsLogin
            name="password"
            control={control}
            type="password"
            label="Contraseña"
            errors={errors.password}
          />

          <div className="flex justify-end text-sm mt-1">
            <a href="#" className="text-primary hover:underline">
              ¿Olvidaste tu contraseña?
            </a>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full mt-4 text-lg normal-case"
          >
            Iniciar sesión
          </button>
        </form>

        <p className="mt-6 text-center text-base-content opacity-90">
          ¿No tienes cuenta?{" "}
          <a href="/register" className="font-semibold text-primary hover:underline">
            Regístrate
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
