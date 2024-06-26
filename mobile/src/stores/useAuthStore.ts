import { create } from "zustand";

import { storage } from "../lib/storage";

interface AuthState {
  access_token: string | null;
  refresh_token: string | null;
  setTokens: (access_token: string, refresh_token: string) => void;
  clearTokens: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  access_token: storage.getString("access_token") || null,
  refresh_token: storage.getString("refresh_token") || null,
  setTokens: (access_token, refresh_token) => {
    storage.set("access_token", access_token);
    storage.set("refresh_token", refresh_token);
    set({ access_token, refresh_token });
  },
  clearTokens: () => {
    storage.delete("access_token");
    storage.delete("refresh_token");
    set({ access_token: null, refresh_token: null });
  },
}));
