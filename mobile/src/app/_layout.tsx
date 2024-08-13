import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_700Bold,
  useFonts,
} from "@expo-google-fonts/inter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
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
    <QueryClientProvider client={new QueryClient()}>
      <SafeAreaView className="flex-1 bg-black">
        <StatusBar translucent />
        <Slot />
      </SafeAreaView>
      <Toast />
    </QueryClientProvider>
  );
}
