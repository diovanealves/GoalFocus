import clsx from "clsx";
import { Text, TextInput, TextInputProps, View } from "react-native";

type InputProps = TextInputProps & {
  title?: string;
  hasError?: boolean;
};

export function Input({ title, hasError, ...rest }: InputProps) {
  return (
    <View>
      <Text className="text-white leading-7">{title}</Text>
      <TextInput
        className={clsx(
          "border-2 border-white bg-white rounded-lg px-2 py-2 my-1",
          hasError && "border-red-500",
        )}
        blurOnSubmit={true}
        {...rest}
      />
    </View>
  );
}
