import { Controller, type Control, type FieldError } from "react-hook-form";
import type { LoginSchema } from "src/lib/schemas/loginSchema";

interface Props {
  name: keyof LoginSchema;
  control: Control<LoginSchema>;
  label: string;
  type?: string;
  errors?: FieldError;
}

const InputsLogin = ({ name, control, label, type = "text", errors }: Props) => {
  return (
    <div className="flex flex-col mx-auto w-full mb-4">
      <div className="flex justify-between mb-1">
        <label htmlFor={name} className="font-medium">
          {label}
        </label>
        {errors && (
          <p className="validator-message text-red-200 text-sm">
            {errors.message ?? ""}
          </p>
        )}
      </div>

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <input
            {...field}
            id={name}
            type={type}
            value={field.value ?? ""}
            className={`w-full input ${errors ? "border border-red-200" : ""}`}
          />
        )}
      />
    </div>
  );
};

export default InputsLogin;
