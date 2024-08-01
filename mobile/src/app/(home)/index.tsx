import { useRef } from "react";
import { Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import BottomSheet from "@gorhom/bottom-sheet";

import { Button } from "@/src/components/button";
import { Divider } from "@/src/components/divider";
import { Loading } from "@/src/components/loading";
import { ShowMyToast } from "@/src/components/toast";
import { Welcome } from "./components/welcome";
import { Sheet } from "@/src/components/Sheet";

import { useUserData } from "@/src/hooks/useUserData";

export default function Index() {
  const { data, isError, isLoading } = useUserData();
  const sheetRef = useRef<BottomSheet>(null);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return ShowMyToast({ type: "error", text: "Erro ao carregar dados" });
  }

  return (
    <View className="pt-2 px-5 flex-1">
      <Welcome name={data.name} />

      <Divider />

      <Text className="text-white text-base font-subtitle leading-relaxed">
        Minhas Metas
      </Text>

      <Button
        className="rounded-full w-12 absolute bottom-4 right-4"
        onPress={() => sheetRef.current?.expand()}
      >
        <Button.Icon>
          <Feather name="plus" size={20} />
        </Button.Icon>
      </Button>

      <Sheet sheetRef={sheetRef}>
        <Sheet.Header className="flex flex-row justify-between items-center px-6">
          <Sheet.Text className="font-subtitle text-xl text-white leading-relaxed">
            Nova Meta
          </Sheet.Text>
          <Sheet.Button onPress={() => sheetRef.current?.close()}>
            <Feather name="x" size={24} color="#7C7C8A" />
          </Sheet.Button>
        </Sheet.Header>
      </Sheet>
    </View>
  );
}
