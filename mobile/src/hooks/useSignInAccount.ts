import { InferType } from "yup";

import { ShowMyToast } from "../components/toast";

import { SignInSchema } from "../interface/sign-in.interface";
import api from "../lib/axios";
import { useAuthStore } from "../stores/useAuthStore";
import { extractTokensFromResponse } from "../utils/extractTokensFromResponse";

export const useSignInAccount = () => {
  const setTokens = useAuthStore((state) => state.setTokens);

  async function signInAccount(data: InferType<typeof SignInSchema>) {
    try {
      await SignInSchema.validate(data, { abortEarly: false });

      const userSignInResult = await api.post("/auth/login", {
        email: data.email,
        password: data.password,
      });

      const { access_token, refresh_token } = extractTokensFromResponse(
        userSignInResult.headers["set-cookie"],
      );

      if (access_token && refresh_token) {
        setTokens(access_token, refresh_token);
        ShowMyToast({ type: "success", text: "Login efetuado com sucesso!" });
        return true;
      }
    } catch (error) {
      ShowMyToast({
        type: "error",
        text: "Erro ao efetuar login. Verifique suas credenciais",
      });
    }
  }

  return { signInAccount };
};
