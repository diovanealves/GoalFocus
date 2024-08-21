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
    .typeError("O valor deve ser um número válido")
    .test(
      "is-decimal",
      "O valor deve ter no máximo duas casas decimais",
      (value) => !!value && /^\d+(\.\d{1,2})?$/.test(value.toString()),
    )
    .min(0, "O valor deve ser maior que 0")
    .max(999999999, "O valor deve ser menor que 999999999")
    .required("O valor final é obrigatório"),
});
