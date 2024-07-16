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
    .matches(/^(?=.*?[A-Z])(?=.*?[a-z])/, "Precisa de maiúscula e minúscula")

    .matches(
      /^(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/,
      "Precisa de número e caractere especial",
    )
    .matches(/^.{8,}$/, "Mínimo de 8 caracteres"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "As senhas devem corresponder")
    .required("Confirmação de senha é obrigatória"),
});
