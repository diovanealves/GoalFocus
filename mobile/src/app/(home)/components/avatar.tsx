import { Text, View } from "react-native";

type AvatarProps = {
  name: string;
};

export function Avatar({ name }: AvatarProps) {
  const initials = name.substring(0, 2).toUpperCase();

  return (
    <View className="bg-black w-10 h-10 rounded-full justify-center items-center">
      <Text className="text-white text-lg font-title">{initials}</Text>
    </View>
  );
}
