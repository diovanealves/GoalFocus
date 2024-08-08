import clsx from "clsx";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Text, TextInput, TextInputProps, View, ViewProps } from "react-native";
import { TextInputMask } from "react-native-masked-text";

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

type FormInputProps<T extends FieldValues> = ControllerProps<T> &
  TextInputProps & {};

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

function FormInput<T extends FieldValues>({
  control,
  name,
  errors,
  ...rest
}: FormInputProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value } }) => (
        <TextInput
          className={clsx(
            "border-2 border-white bg-white rounded-lg p-2",
            !!errors?.[name] && "border-red-500",
          )}
          onChangeText={onChange}
          onBlur={onBlur}
          value={value}
          {...rest}
        />
      )}
    />
  );
}

function FormInputCurrency<T extends FieldValues>({
  control,
  name,
  errors,
  ...rest
}: FormInputProps<T>) {
  function parseCurrency(value: string) {
    const numericValue = value
      .replace("R$", "")
      .replace(/\./g, "")
      .replace(",", ".");

    return parseFloat(numericValue);
  }

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value } }) => (
        <TextInputMask
          className={clsx(
            "border-2 border-white bg-white rounded-lg p-2",
            !!errors?.[name] && "border-red-500",
          )}
          type="money"
          options={{
            precision: 2,
            separator: ",",
            delimiter: ".",
            unit: "R$",
            suffixUnit: "",
          }}
          onChangeText={(text) => {
            onChange(parseCurrency(text));
          }}
          onBlur={onBlur}
          value={value || "R$ 0,00"}
          {...rest}
        />
      )}
    />
  );
}

Form.Input = FormInput;
Form.InputWithLabel = FormInputWithLabel;
Form.InputCurrency = FormInputCurrency;

export { Form };
