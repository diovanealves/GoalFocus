import { Text, View } from "react-native";
import { Avatar } from "./avatar";

type WelcomeProps = {
  name: string;
};

export function Welcome({ name }: WelcomeProps) {
  const firstName = name.split(" ")[0];
  return (
    <View className="flex flex-row items-center space-x-3 p-4">
      <Avatar name={firstName} />
      <View>
        <Text className="text-white text-base font-title">
          Bem-vindo de volta, {firstName}!
        </Text>
        <Text className="opacity-60 text-white text-sm">
          Vamos começar com seus objetivos.
        </Text>
      </View>
    </View>
  );
}
