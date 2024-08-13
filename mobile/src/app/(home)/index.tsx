import { View } from "react-native";

import { Loading } from "@/src/components/loading";
import { ShowMyToast } from "@/src/components/toast";
import { CreateNewGoal } from "./components/createNewGoal";
import { Divider } from "./components/divider";
import { Welcome } from "./components/welcome";

import { useUserData } from "@/src/hooks/useUserData";
import { MyGoals } from "./components/myGoals";

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
      <MyGoals />

      <CreateNewGoal />
    </View>
  );
}
