import { InferType } from "yup";

import { ShowMyToast } from "../components/toast";

import { SignUpSchema } from "../interface/sign-up.interface";
import api from "../lib/axios";

export const useCreateAccount = async (
  data: InferType<typeof SignUpSchema>,
) => {
  try {
    await SignUpSchema.validate(data, { abortEarly: false });
    await api.post("/user", {
      name: data.name,
      email: data.email,
      password: data.password,
    });

    ShowMyToast({ type: "success", text: "Conta criada com sucesso." });
    return true;
  } catch (error: any) {
    if (error.response && error.response.status === 409) {
      ShowMyToast({
        type: "error",
        text: "Email já está em uso. Por favor escolha outro",
      });
    } else {
      ShowMyToast({
        type: "error",
        text: "Erro ao criar conta. Tente novamente mais tarde.",
      });
    }
  }
};
