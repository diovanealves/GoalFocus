import { Button } from "@/src/components/button";
import { Form } from "@/src/components/form";
import { createNewGoalSchema } from "@/src/interface/create-new-goal";
import { Feather } from "@expo/vector-icons";
import BottomSheet from "@gorhom/bottom-sheet";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { View } from "react-native";
import { InferType } from "yup";
import { Sheet } from "./sheet";

export function CreateNewGoal() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createNewGoalSchema),
  });
  const sheetRef = useRef<BottomSheet>(null);

  async function useCreateNewGoal(data: InferType<typeof createNewGoalSchema>) {
    console.log(data);
  }

  return (
    <View className="flex-1 -m-3">
      <Button
        className="rounded-full w-12 absolute bottom-6 right-4"
        onPress={() => sheetRef.current?.expand()}
      >
        <Button.Icon>
          <Feather name="plus" size={20} />
        </Button.Icon>
      </Button>

      <Sheet sheetRef={sheetRef}>
        <Sheet.Header className="flex flex-row justify-between items-center px-6">
          <Sheet.Text className="font-subtitle text-xl text-white leading-relaxed">
            Nova Meta
          </Sheet.Text>
          <Sheet.Button onPress={() => sheetRef.current?.close()}>
            <Feather name="x" size={24} color="#7C7C8A" />
          </Sheet.Button>
        </Sheet.Header>
        <Sheet.Body className="mx-auto w-11/12">
          <Form
            control={control}
            name="name"
            placeholder="Nome da meta"
            errors={{ name: errors.name?.message }}
          />

          <Form
            control={control}
            name="value"
            placeholder="Valor da meta"
            errors={{ value: errors.value?.message }}
            keyboardType="numeric"
          />

          <Button className=" mt-3" onPress={handleSubmit(useCreateNewGoal)}>
            <Button.Text className="text-white font-subtitle leading-tight">
              Criar
            </Button.Text>
          </Button>
        </Sheet.Body>
      </Sheet>
    </View>
  );
}
