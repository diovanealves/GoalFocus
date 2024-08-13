import { Slot, router } from "expo-router";
import { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

import { Loading } from "@/src/components/loading";

import { useAuthStore } from "@/src/stores/useAuthStore";

export default function HomeLayout() {
  const { access_token, refresh_token } = useAuthStore((state) => ({
    access_token: state.access_token,
    refresh_token: state.refresh_token,
  }));
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);

    if (mounted && (!access_token || !refresh_token)) {
      router.replace("/signIn");
    }
  }, [mounted, access_token, refresh_token]);

  if (!mounted) {
    return <Loading />;
  }
  return (
    <GestureHandlerRootView>
      <SafeAreaView className="flex-1 bg-black">
        <Slot />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
