import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Text, View } from "react-native";
import { z } from "zod";

import { Feather } from "@expo/vector-icons";
import { Button } from "../components/button";
import { Input } from "../components/input";
import { SignInSchema } from "../interface/sign-in.interface";

export default function Index() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
  });

  function onSubmit(data: any) {
    console.log(data);
  }

  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-white text-xl font-title">Login</Text>
      <Text className="text-white/75 text-sm leading-relaxed">
        Insira seus dados para acessar sua conta.
      </Text>

      <View className="w-4/5 mt-5 space-y-2">
        <Controller
          control={control}
          rules={{ required: true }}
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
          rules={{ required: true }}
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

        <Button onPress={handleSubmit(onSubmit)}>
          <Button.Text>Entrar</Button.Text>
          <Button.Icon>
            <Feather name="arrow-right" color="#000" size={16} />
          </Button.Icon>
        </Button>
      </View>
    </View>
  );
}
