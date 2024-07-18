import { useAuthStore } from "../stores/useAuthStore";

export const useSignOut = () => {
  useAuthStore.getState().clearTokens();
};
