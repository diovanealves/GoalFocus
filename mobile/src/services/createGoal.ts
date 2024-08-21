import { InferType } from "yup";

import { createNewGoalSchema } from "../interface/create-new-goal";
import api from "../lib/axios";

export async function CreateGoalService(
  data: InferType<typeof createNewGoalSchema>,
) {
  await createNewGoalSchema.validate(data, { abortEarly: false });

  await api.post("/goals", {
    title: data.name,
    description: data.description,
    finalValue: data.value.toFixed(2),
  });

  return true;
}
