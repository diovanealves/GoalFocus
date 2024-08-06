import { Control, Controller, FieldValues, Path } from "react-hook-form";

import { Input } from "./input";

type FormProps<T extends FieldValues> = {
  control: Control<T>;
  errors?: Partial<Record<Path<T>, string>>;
  name: Path<T>;
  title?: string;
  placeholder: string;
  secureTextEntry?: boolean;
  keyboardType?: "email-address" | "numeric" | "default";
};

export function Form<T extends FieldValues>({
  control,
  errors,
  name,
  title,
  placeholder,
  secureTextEntry,
  keyboardType,
}: FormProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value } }) => (
        <Input
          title={title}
          placeholder={placeholder}
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
          hasError={!!errors?.[name]}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
        />
      )}
    />
  );
}
