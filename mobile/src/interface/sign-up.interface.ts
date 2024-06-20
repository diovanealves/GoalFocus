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
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
      "Maiúsculas, minúsculas, números e especiais.",
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "As senhas devem corresponder")
    .required("Confirmação de senha é obrigatória"),
});
