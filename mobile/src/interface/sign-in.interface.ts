import { z } from "zod";

export const SignInSchema = z.object({
  email: z
    .string()
    .email("O email não é válido")
    .min(1, "O email é obrigatório"),
  password: z.string(),
});
