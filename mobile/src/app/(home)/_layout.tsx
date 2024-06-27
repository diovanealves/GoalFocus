import { Loading } from "@/src/components/loading";
import { useAuthStore } from "@/src/stores/useAuthStore";
import { Slot, router } from "expo-router";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeLayout() {
  const { access_token, refresh_token } = useAuthStore((state) => ({
    access_token: state.access_token,
    refresh_token: state.refresh_token,
  }));
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);

    if (mounted && (!access_token || !refresh_token)) {
      router.replace("/sign-in");
    }
  }, [mounted, access_token, refresh_token]);

  if (!mounted) {
    return <Loading />;
  }
  return (
    <SafeAreaView className="flex-1">
      <Slot />
    </SafeAreaView>
  );
}
