import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import {
  registerSchema,
  type RegisterSchema,
} from "src/lib/schemas/registerSchema";
import InputsRegister from "./InputsRegister";

const RegisterForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({ resolver: zodResolver(registerSchema as any) });

  const onSubmit: SubmitHandler<RegisterSchema> = async (data) => {
    try {
      const response = await fetch(
        `${import.meta.env.PUBLIC_BASE_URL}/user/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: data.username,
            email: data.email,
            password: data.password,
            confirmPassword: data.confirmPassword,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Error en el registro");
      }
      window.location.href = "/login";
    } catch (error) {
      console.error("Error al registrar el usuario:", error);
    } finally {
      console.log("Registro finalizado");
    }
  };

  return (
    <form
      className="flex flex-col items-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <InputsRegister
        name="username"
        control={control}
        type="text"
        label="nombre de usuario"
        errors={errors.username}
      />
      <InputsRegister
        name="email"
        control={control}
        type="text"
        label="correo electrónico"
        errors={errors.email}
      />
      <InputsRegister
        name="password"
        control={control}
        type="password"
        label="contraseña"
        errors={errors.password}
      />
      <InputsRegister
        name="confirmPassword"
        control={control}
        type="password"
        label="confirmar contraseña"
        errors={errors.confirmPassword}
      />
      <button type="submit" className="btn btn-primary w-full mt-4 text-lg">
        Registrarse
      </button>
    </form>
  );
};

export default RegisterForm;
