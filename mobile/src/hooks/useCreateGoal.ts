import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ShowMyToast } from "../components/toast";
import { CreateGoalService } from "../services/createGoal";

export const useCreateGoal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: CreateGoalService,
    onSuccess: () => {
      ShowMyToast({ type: "success", text: "Meta criada com sucesso." });
      queryClient.invalidateQueries({ queryKey: ["goals"] });
    },
    onError: () => {
      ShowMyToast({
        type: "error",
        text: "Erro ao criar meta. Tente novamente mais tarde.",
      });
    },
  });
};
