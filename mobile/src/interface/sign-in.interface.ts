import * as yup from "yup";

export const SignInSchema = yup.object().shape({
  email: yup.string().email("Email invalido").required("Email é obrigatório"),
  password: yup.string().required("Password é obrigatório"),
});
