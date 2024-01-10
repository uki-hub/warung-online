import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import CONSTS from "../../consts/const";
import createCustomStore from "../customeStore";

interface AuthState extends BaseState {
  token?: string | undefined;
  actions: {
    isAuthenticated: () => boolean;
    setToken: (token: string) => void;
  };
}

const useAuthStore = create(
  persist(
    immer<AuthState>((set, get) => ({
      actions: {
        isAuthenticated: () => get().token != undefined,
        setToken: (token) => {
          set((state) => {
            state.token = token;
          });
        },
      },
    })),
    createCustomStore({
      name: CONSTS.STORAGE.auth,
      storage: createJSONStorage(() => sessionStorage),
    })
  )
);

export default useAuthStore;
