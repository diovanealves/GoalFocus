import api from "../lib/axios";

type ITransactionsService = {
  accessToken: string;
};

export const GetTransactionsService = async ({
  accessToken,
}: ITransactionsService) => {
  const transactionsResponse = await api.get("/transactions/me", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  return transactionsResponse.data;
};
