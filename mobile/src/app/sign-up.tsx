import { Feather } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Text, View } from "react-native";
import Toast from "react-native-toast-message";
import { Button } from "../components/button";
import { Input } from "../components/input";
import { LinkButton } from "../components/link-button";
import { SignUpSchema } from "../interface/sign-up.interface";

export default function SignUp() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SignUpSchema),
  });

  function onSubmit(data: any) {
    console.log(data);
  }

  useEffect(() => {
    if (errors.name) {
      return Toast.show({ type: "error", text1: errors.name.message });
    }

    if (errors.email) {
      return Toast.show({ type: "error", text1: errors.email.message });
    }

    if (errors.password) {
      return Toast.show({
        type: "error",
        text1: errors.password.message,
      });
    }

    if (errors.confirmPassword) {
      return Toast.show({
        type: "error",
        text1: errors.confirmPassword.message,
      });
    }
  }, [errors.confirmPassword, errors.email, errors.name, errors.password]);

  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-white text-xl font-title">Cadastro</Text>
      <Text className="text-white/75 text-sm leading-relaxed">
        Preencha os campos abaixo para criar sua conta.
      </Text>

      <View className="w-4/5 mt-5 space-y-6">
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              title="Nome"
              placeholder="Digite seu nome"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              hasError={!!errors.name}
            />
          )}
        />

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              title="Email"
              placeholder="m@example.com"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              hasError={!!errors.email}
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              title="Senha"
              placeholder="Digite sua senha"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              hasError={!!errors.password}
              secureTextEntry
            />
          )}
        />

        <Controller
          control={control}
          name="confirmPassword"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              title="Confirme sua senha"
              placeholder="Repita sua senha"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              hasError={!!errors.confirmPassword}
              secureTextEntry
            />
          )}
        />

        <Button onPress={handleSubmit(onSubmit)}>
          <Button.Text>Cadastrar</Button.Text>
          <Button.Icon>
            <Feather name="arrow-right" color="#000" size={16} />
          </Button.Icon>
        </Button>

        <LinkButton title="Já possui uma conta?" href="/" />
      </View>
    </View>
  );
}
