import Toast from "react-native-toast-message";

type ToastTypes = {
  text?: string;
  type: "error" | "success" | "info";
};

export function ShowMyToast({ text, type }: ToastTypes) {
  Toast.show({
    type,
    text1: text,
    position: "top",
    visibilityTime: 4000,
    autoHide: true,
  });
}
