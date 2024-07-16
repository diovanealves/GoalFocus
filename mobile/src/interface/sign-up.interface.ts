import * as yup from "yup";

export const SignUpSchema = yup.object().shape({
  name: yup.string().required("O campo de nome é obrigatório"),
  email: yup
    .string()
    .email("Digite um email válido")
    .required("O campo de email é obrigatório"),
  password: yup
    .string()
    .required("O campo de senha é obrigatório")
    .matches(
      /^(?=.*?[A-Z])/,
      "A senha precisa ter pelo menos uma letra maiúscula",
    )
    .matches(
      /^(?=.*?[a-z])/,
      "A senha precisa ter pelo menos uma letra minúscula",
    )
    .matches(/^(?=.*?[0-9])/, "A senha precisa ter pelo menos um número")
    .matches(
      /^(?=.*?[#?!@$%^&*-])/,
      "A senha precisa ter pelo menos um caractere especial",
    )
    .matches(/^.{8,}$/, "A senha precisa ter no mínimo 8 caracteres"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "As senhas devem corresponder")
    .required("Confirmação de senha é obrigatória"),
});
