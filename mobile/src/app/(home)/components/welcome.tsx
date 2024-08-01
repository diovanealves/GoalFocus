import { FontAwesome } from "@expo/vector-icons";
import { Text, View } from "react-native";

import { Avatar } from "./avatar";
import { Button } from "@/src/components/button";

import { useSignOut } from "@/src/hooks/useSignOut";

type WelcomeProps = {
  name: string;
};

export function Welcome({ name }: WelcomeProps) {
  const firstName = name.split(" ")[0];

  function useHandleSignOut() {
    useSignOut();
  }
  return (
    <View className="flex-row items-center justify-between p-4">
      <View className="flex-row space-x-3">
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

      <Button className="bg-transparent" onPress={useHandleSignOut}>
        <Button.Icon>
          <FontAwesome name="sign-out" color="#FFFFFF" size={23} />
        </Button.Icon>
      </Button>
    </View>
  );
}
