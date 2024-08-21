import { useQuery } from "@tanstack/react-query";
import { GetTransactionsService } from "../services/getTransactions";
import { useAuthStore } from "../stores/useAuthStore";

type TransactionsProps = {
  id: string;
  value: string;
  type: "INCOME" | "EXPENSE";
  goalId: string;
  createdAt: Date;
  updatedAt: Date;
};

export const UseGetTransactions = () => {
  const { access_token } = useAuthStore((state) => ({
    access_token: state.access_token,
  }));

  return useQuery<TransactionsProps[]>({
    queryKey: ["transactions"],
    queryFn: () =>
      GetTransactionsService({ accessToken: access_token as string }),
    retry: 1,
  });
};
