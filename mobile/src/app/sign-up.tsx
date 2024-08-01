import { Feather } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Text, View } from "react-native";
import { InferType } from "yup";

import { Button } from "../components/button";
import { Input } from "../components/input";
import { LinkButton } from "../components/link-button";
import { ShowMyToast } from "../components/toast";
import { Form } from "../components/form";

import { useCreateAccount } from "../hooks/useCreateAccount";

import { SignUpSchema } from "../interface/sign-up.interface";

export default function SignUp() {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SignUpSchema),
  });

  async function useCreateAccountHandler(data: InferType<typeof SignUpSchema>) {
    const userCreated = await useCreateAccount(data);

    if (userCreated) {
      router.navigate("/sign-in");
    }
  }

  useEffect(() => {
    if (errors.name) {
      return ShowMyToast({ type: "error", text: errors.name.message });
    }

    if (errors.email) {
      return ShowMyToast({ type: "error", text: errors.email.message });
    }

    if (errors.password) {
      return ShowMyToast({ type: "error", text: errors.password.message });
    }

    if (errors.confirmPassword) {
      return ShowMyToast({
        type: "error",
        text: errors.confirmPassword.message,
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
        <Form
          control={control}
          name="name"
          title="Nome"
          placeholder="Digite seu nome"
          errors={{ name: errors.name?.message }}
        />

        <Form
          control={control}
          name="email"
          title="Email"
          placeholder="m@example.com"
          errors={{ email: errors.email?.message }}
        />

        <Form
          control={control}
          name="password"
          title="Senha"
          placeholder="Digite sua senha"
          errors={{ password: errors.password?.message }}
          secureTextEntry
        />

        <Form
          control={control}
          name="confirmPassword"
          title="Confirme sua senha"
          placeholder="Repira sua senha"
          errors={{ confirmPassword: errors.confirmPassword?.message }}
          secureTextEntry
        />

        <Button onPress={handleSubmit(useCreateAccountHandler)}>
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
