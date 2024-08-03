import { Text, View } from "react-native";

import { Divider } from "./components/divider";
import { Loading } from "@/src/components/loading";
import { ShowMyToast } from "@/src/components/toast";
import { Welcome } from "./components/welcome";
import { CreateNewGoal } from "./components/createNewGoal";

import { useUserData } from "@/src/hooks/useUserData";

export default function Index() {
  const { data, isError, isLoading } = useUserData();

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return ShowMyToast({ type: "error", text: "Erro ao carregar dados" });
  }

  return (
    <View className="flex-1 px-3">
      <Welcome name={data.name} />

      <Divider />

      <Text className="text-white text-base font-subtitle leading-relaxed">
        Minhas Metas
      </Text>

      <CreateNewGoal />
    </View>
  );
}
