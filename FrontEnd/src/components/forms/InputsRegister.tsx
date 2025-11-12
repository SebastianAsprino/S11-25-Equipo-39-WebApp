import { Controller, type Control, type FieldError } from "react-hook-form";

interface Props {
  name: string;
  control: Control<any>;
  label: string;
  type?: string;
  errors?: FieldError | undefined;
}

const InputsRegister = ({
  name,
  control,
  label,
  type = "text",
  errors,
}: Props) => {
  return (
    <div className="flex flex-col mx-auto w-full mb-4">
      <div className="flex justify-between">
        <label htmlFor={name}>{label}</label>
        {errors && <p className="validator-message text-red-200 text-sm">{errors.message ?? ""}</p>}
      </div>
      <Controller
        render={({ field }) => (
          <input
            className={`w-full input ${
              errors ? "border-red-200" : ""
            }`}
            {...field}
            value={field.value ?? ""}
            type={type}
          />
        )}
        control={control}
        name={name}
      />
    </div>
  );
};

export default InputsRegister;
