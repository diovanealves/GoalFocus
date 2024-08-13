import api from "../lib/axios";

type IGoalService = {
  accessToken: string;
};

export async function GetGoalsService({ accessToken }: IGoalService) {
  const response = await api.get("/goals/me", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  return response.data;
}
