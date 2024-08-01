import { Feather } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { router } from "expo-router";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Text, View } from "react-native";
import { InferType } from "yup";

import { Button } from "../components/button";
import { Input } from "../components/input";
import { LinkButton } from "../components/link-button";
import { ShowMyToast } from "../components/toast";

import { useSignInAccount } from "../hooks/useSignInAccount";
import { SignInSchema } from "../interface/sign-in.interface";

export default function SignIn() {
  const { signInAccount } = useSignInAccount();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SignInSchema),
  });

  async function useSignInAccountHandler(data: InferType<typeof SignInSchema>) {
    const userSignIn = await signInAccount(data);

    if (userSignIn) {
      router.replace("/(home)");
    }
  }

  useEffect(() => {
    if (errors.email) {
      return ShowMyToast({ type: "error", text: errors.email.message });
    }

    if (errors.password) {
      return ShowMyToast({ type: "error", text: errors.password.message });
    }
  }, [errors.email, errors.password]);

  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-white text-xl font-title">Login</Text>
      <Text className="text-white/75 text-sm leading-relaxed">
        Insira seus dados para acessar sua conta.
      </Text>

      <View className="w-4/5 mt-5 space-y-2">
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

        <Button onPress={handleSubmit(useSignInAccountHandler)}>
          <Button.Text>Entrar</Button.Text>
          <Button.Icon>
            <Feather name="arrow-right" color="#000" size={16} />
          </Button.Icon>
        </Button>

        <LinkButton title="Cadastrar" href="/sign-up" />
      </View>
    </View>
  );
}
