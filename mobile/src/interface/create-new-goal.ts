import * as yup from "yup";

export const createNewGoalSchema = yup.object().shape({
  name: yup
    .string()
    .min(5, "Precisa ter no minimo 5 caracteres")
    .required("O campo nome é obrigatório")
    .trim(),

  description: yup
    .string()
    .min(5, "Precisa ter no minimo 5 caracteres")
    .required("O campo descrição é obrigatório")
    .trim(),

  value: yup
    .number()
    .positive("O valor precisa ser positivo")
    .min(0, "O valor precisa ser maior que 0")
    .required("O campo valor é obrigatório"),
});
