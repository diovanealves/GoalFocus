import { Feather } from "@expo/vector-icons";
import BottomSheet from "@gorhom/bottom-sheet";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { Keyboard, View } from "react-native";
import { InferType } from "yup";

import { Button } from "@/src/components/button";
import { Form } from "@/src/components/form";
import { ShowMyToast } from "@/src/components/toast";
import { Sheet } from "./sheet";

import { useCreateGoal } from "@/src/hooks/useCreateGoal";
import { createNewGoalSchema } from "@/src/interface/create-new-goal";

export function CreateNewGoal() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(createNewGoalSchema),
  });
  const { mutate } = useCreateGoal();

  const sheetRef = useRef<BottomSheet>(null);

  async function useCreateNewGoal(data: InferType<typeof createNewGoalSchema>) {
    mutate(data, {
      onSuccess: () => {
        Keyboard.dismiss();
        setTimeout(() => {
          sheetRef.current?.close();
        }, 100);
      },
    });

    reset({ description: "", name: "", value: 0 });
  }

  async function closeSheet() {
    sheetRef.current?.close();
    Keyboard.dismiss();
  }

  function sheetHandleFocus() {
    sheetRef.current?.snapToIndex(0);
  }

  useEffect(() => {
    if (errors.name)
      return ShowMyToast({ type: "error", text: errors.name.message });

    if (errors.description)
      return ShowMyToast({ type: "error", text: errors.description.message });

    if (errors.value)
      return ShowMyToast({ type: "error", text: errors.value.message });

    Keyboard.addListener("keyboardDidHide", () => {
      sheetRef.current?.snapToIndex(1);
    });
  }, [errors.name, errors.description, errors.value]);

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
        <Sheet.Header className="flex flex-row justify-between items-center">
          <Sheet.Text className="font-subtitle text-xl text-white leading-relaxed">
            Nova Meta
          </Sheet.Text>
          <Sheet.Button onPress={closeSheet}>
            <Sheet.Icon>
              <Feather name="x" size={24} color="#7C7C8A" />
            </Sheet.Icon>
          </Sheet.Button>
        </Sheet.Header>
        <Sheet.Body className="mx-auto w-full">
          <Form className="flex space-y-3 mt-3 mb-2">
            <Form.Input
              control={control}
              name="name"
              placeholder="Nome da meta"
              errors={{ name: errors.name?.message }}
              onFocus={sheetHandleFocus}
            />

            <Form.Input
              control={control}
              name="description"
              placeholder="Descreva sua meta"
              errors={{ description: errors.description?.message }}
              onFocus={sheetHandleFocus}
            />

            <Form.InputCurrency
              control={control}
              name="value"
              errors={{ value: errors.value?.message }}
              onFocus={sheetHandleFocus}
            />
          </Form>

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
