import clsx from "clsx";
import { Text, TextInput, TextInputProps, View } from "react-native";

type InputProps = TextInputProps & {
  title?: string;
  hasError?: boolean;
  keyboardType?: "email-address" | "numeric" | "default";
};

export function Input({ title, hasError, keyboardType, ...rest }: InputProps) {
  return (
    <View>
      <Text className="text-white leading-7">{title}</Text>
      <TextInput
        className={clsx(
          "border-2 border-white bg-white rounded-lg px-2 py-2",
          hasError && "border-red-500",
        )}
        keyboardType={keyboardType}
        blurOnSubmit={true}
        {...rest}
      />
    </View>
  );
}
