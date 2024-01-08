import { create } from "zustand";
import authApi from "../../services/api/authApi";
import BasePageState from "../../models/bases/basePageState";
import useAuthStore from "../app/useAuthStore";
import NewAccountModel from "../../models/new_account_model";

type formToggles = "login" | "forgot" | "new";

interface LoginStoreType extends BasePageState {
  currentForm: formToggles;
  actions: {
    formToggle: (toggle: formToggles) => void;
    login: (username: string, password: string, rememberMe: boolean) => Promise<boolean>;
    forgotPassword: (email: string) => Promise<void>;
    createAccount: (form: NewAccountModel) => Promise<void>;
  };
}

const useLoginPageStore = create<LoginStoreType>((set) => ({
  loading: false,
  errors: [],
  currentForm: "login",
  actions: {
    formToggle: (toggle) => set(() => ({ currentForm: toggle })),
    login: async (username: string, password: string, rememberMe: boolean) => {
      set(() => ({ loading: true }));

      const response = await authApi.login(username, password);

      if (!response.success) {
        set(() => ({ errors: response!.errors.client }));

        return false;
      }

      useAuthStore.getState().actions.setToken(response.data!.token);

      set(() => ({ loading: false }));

      return true;
    },
    forgotPassword: async (email) => {},
    createAccount: async (form) => {},
  },
}));

export default useLoginPageStore;
