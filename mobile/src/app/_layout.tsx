import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_700Bold,
  useFonts,
} from "@expo-google-fonts/inter";
import { Slot } from "expo-router";
import { SafeAreaView, StatusBar } from "react-native";
import Toast from "react-native-toast-message";
import { Loading } from "../components/loading";

export default function Root() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return <Loading />;
  }

  return (
    <>
      <SafeAreaView className="flex-1 bg-backgroud">
        <StatusBar backgroundColor="#0E0F11" />
        <Slot />
      </SafeAreaView>
      <Toast />
    </>
  );
}
