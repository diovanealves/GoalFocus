import { useQuery } from "@tanstack/react-query";

import { GetGoalsService } from "../services/getGoals";
import { useAuthStore } from "../stores/useAuthStore";

interface IGoal {
  id: string;
  title: string;
  description: string;
  currentValue: string;
  finalValue: string;
  createdAt: Date;
  updatedAt: Date;
}

export const UseGetGoals = () => {
  const { access_token } = useAuthStore((state) => ({
    access_token: state.access_token,
  }));

  return useQuery<IGoal[]>({
    queryKey: ["goals"],
    queryFn: () => GetGoalsService({ accessToken: access_token as string }),
    retry: 1,
  });
};
