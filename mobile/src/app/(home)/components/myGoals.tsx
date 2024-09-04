import { Loading } from "@/src/components/loading";
import { ShowMyToast } from "@/src/components/toast";
import { UseGetGoals } from "@/src/hooks/useGetGoals";
import { Feather } from "@expo/vector-icons";
import { FlatList, Text, View } from "react-native";
import { Card } from "./card";

export function MyGoals() {
  const { data: goals = [], isError, isLoading } = UseGetGoals();

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    ShowMyToast({ type: "error", text: "Erro ao carregar dados" });
  }

  return (
    <View>
      <Text className="text-white text-base font-subtitle leading-relaxed">
        Minhas Metas
      </Text>

      {goals.length > 0 ? (
        <FlatList
          data={goals}
          keyExtractor={(item) => item.id}
          horizontal
          contentContainerStyle={{ gap: 10 }}
          renderItem={({ item }) => (
            <Card className="w-48 h-36 bg-neutral-900 py-2 px-3 rounded-xl mt-3">
              <Card.Text className="text-white text-lg font-title">
                {item.title.slice(0, 14) + "..."}
              </Card.Text>

              <Card.TextCurrency
                className="text-white text-base font-subtitle mt-2"
                value={item.currentValue}
              />

              <Card.Text className="text-zinc-400 font-normal text-base mb-2">
                de <Card.TextCurrency value={item.finalValue} />
              </Card.Text>

              <Card.Progress
                currentValue={item.currentValue}
                finalValue={item.finalValue}
              >
                <Card.ProgressText
                  className="absolute right-1 text-white z-10 font-subtitle"
                  currentValue={item.currentValue}
                  finalValue={item.finalValue}
                />
              </Card.Progress>
            </Card>
          )}
        />
      ) : (
        <View className="h-36 items-center justify-center">
          <Feather name="clipboard" size={46} color={"#FFF"} />
          <Text className="text-white text-base font-body leading-tight">
            Não tem nenhuma meta cadastrada
          </Text>
        </View>
      )}
    </View>
  );
}
