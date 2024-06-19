import * as yup from "yup";

export const SignInSchema = yup.object().shape({
  email: yup
    .string()
    .email("Digite um email válido")
    .required("O campo de email é obrigatório"),
  password: yup.string().required("O campo de senha é obrigatório"),
});
