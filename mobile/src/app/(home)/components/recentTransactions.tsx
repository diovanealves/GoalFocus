import { Feather } from "@expo/vector-icons";
import { Text, View } from "react-native";

import { Loading } from "@/src/components/loading";
import { ShowMyToast } from "@/src/components/toast";
import { Card } from "./card";
import { Divider } from "./divider";

import { UseGetTransactions } from "@/src/hooks/useGetTransactions";
import clsx from "clsx";
import colors from "tailwindcss/colors";

export function RecentTransactions() {
  const {
    data: TransactionsData = [],
    isError,
    isLoading,
  } = UseGetTransactions();

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    ShowMyToast({ type: "error", text: "Erro ao carregar dados" });
  }

  return (
    <View className="flex-1 mt-4">
      <Text className="text-white text-base font-subtitle leading-relaxed mb-2">
        Transações recentes
      </Text>

      <Divider />

      {TransactionsData.length > 0 ? (
        TransactionsData.map((transaction) => (
          <Card
            key={transaction.id}
            className={clsx(
              "bg-neutral-900 rounded-lg px-4 py-3 flex flex-row items-center justify-between my-1",
            )}
          >
            <Card.TextCurrency
              value={transaction.value}
              className={clsx(
                "text-base font-subtitle leading-7",
                transaction.type === "INCOME" && "text-green-500",
                transaction.type === "EXPENSE" && "text-red-500",
              )}
            />
            <Card.Icon
              type={transaction.type}
              color={
                transaction.type === "INCOME"
                  ? colors.green[500]
                  : colors.red[500]
              }
              size={30}
            />
          </Card>
        ))
      ) : (
        <View className="flex-1 items-center justify-center gap-2">
          <Feather name="feather" size={46} color={"#FFF"} />
          <Text className="text-white text-base font-body leading-tight">
            Não há transações recentes
          </Text>
        </View>
      )}
    </View>
  );
}
