import { useQuery } from "@tanstack/react-query";
import api from "../lib/axios";
import { useAuthStore } from "../stores/useAuthStore";

export const useUserData = () => {
  const { access_token } = useAuthStore((state) => ({
    access_token: state.access_token,
  }));

  return useQuery({
    queryKey: ["UserData"],
    queryFn: async () => {
      const response = await api.get("/user/me", {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
      });

      return response.data;
    },
  });
};
