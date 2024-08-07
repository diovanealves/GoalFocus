import clsx from "clsx";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Text, TextInput, TextInputProps, View, ViewProps } from "react-native";

type FormProps = ViewProps & {};

type ControllerProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  errors?: Partial<Record<Path<T>, string>>;
};

type FormInputWithLabelProps<T extends FieldValues> = ControllerProps<T> &
  TextInputProps & {
    label: string;
  };

function Form({ children, ...rest }: FormProps) {
  return <View {...rest}>{children}</View>;
}

function FormInputWithLabel<T extends FieldValues>({
  control,
  name,
  errors,
  label,
  placeholder,
  secureTextEntry,
  keyboardType,
  ...rest
}: FormInputWithLabelProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value } }) => (
        <View>
          <Text className="text-white leading-7">{label}</Text>
          <TextInput
            className={clsx(
              "border-2 border-white bg-white rounded-lg p-2",
              !!errors?.[name] && "border-red-500",
            )}
            placeholder={placeholder}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            {...rest}
          />
        </View>
      )}
    />
  );
}

Form.InputWithLabel = FormInputWithLabel;

export { Form };
