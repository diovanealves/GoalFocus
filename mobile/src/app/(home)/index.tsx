import { View } from "react-native";

import { Welcome } from "@/src/components/welcome";

import { Loading } from "@/src/components/loading";
import { ShowMyToast } from "@/src/components/toast";
import { Divider } from "@/src/components/divider";

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
    <View className="mt-8 mx-5">
      <Welcome name={data.name} />

      <Divider />
    </View>
  );
}
