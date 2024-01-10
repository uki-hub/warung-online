import { create } from "zustand";
import authApi from "../../services/api/authApi";
import BasePageState from "../../models/bases/BasePageState";
import useAuthStore from "../app/useAuthStore";
import { persist, createJSONStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import CONSTS from "../../consts/const";
import createCustomStore from "../customeStore";
import { NewAccountModel } from "../../models/NewAccountModel";

type formToggles = "login" | "forgot" | "new";

interface LoginPageState extends BasePageState {
  currentForm: formToggles;
  remembered?: {
    username: string;
    password: string;
  };
  actions: {
    formToggle: (toggle: formToggles) => void;
    login: (username: string, password: string, rememberMe: boolean) => Promise<boolean>;
    forgotPassword: (email: string) => Promise<void>;
    createAccount: (form: NewAccountModel) => Promise<void>;
  };
}

const useLoginPageStore = create(
  persist(
    immer<LoginPageState>((set) => ({
      loading: false,
      loaded: true,
      error: false,
      errors: [],
      currentForm: "login",
      actions: {
        formToggle: (toggle) =>
          set((state) => {
            state.currentForm = toggle;
          }),
        login: async (username: string, password: string, rememberMe: boolean) => {
          set((state) => {
            state.loading = true;
          });

          const response = await authApi.login(username, password);

          if (!response.success) {
            set((state) => (state.errors = response!.errors.client));

            return false;
          }

          useAuthStore.getState().actions.setToken(response.data!.token);

          set((state) => {
            if (rememberMe) {
              state.remembered = {
                username,
                password,
              };
            }

            state.loading = false;
          });

          return true;
        },
        forgotPassword: async (email) => {},
        createAccount: async (form) => {},
      },
    })),
    createCustomStore({
      name: CONSTS.STORAGE.loginPage,
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => state.remembered,
    })
  )
);

export default useLoginPageStore;
