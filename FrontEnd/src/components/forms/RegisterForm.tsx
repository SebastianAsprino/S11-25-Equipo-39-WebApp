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

  const onSubmit: SubmitHandler<RegisterSchema> = (data) => {
    console.log(data);
  };

  return (
    <form className="flex flex-col items-center" onSubmit={handleSubmit(onSubmit)}>
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
