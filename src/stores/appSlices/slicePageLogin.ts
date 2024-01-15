import { BasePageStore, ImmerStateCreator } from "../../abstractions/BaseStore";
import NewAccountModel from "../../models/NewAccountModel";
import authApi from "../../services/api/authApi";
import usePersist from "../usePersist";

export interface PageLoginStore extends BasePageStore {
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

export interface PageLoginSlice {
  pageLoginStore: PageLoginStore;
}

type formToggles = "login" | "forgot" | "new";

export const createPageLoginSlice: ImmerStateCreator<PageLoginSlice> = (set, get) => ({
  pageLoginStore: {
    loading: false,
    loaded: true,
    error: false,
    errors: [],
    currentForm: "login",
    actions: {
      formToggle: (toggle) =>
        set((state) => {
          state.pageLoginStore.currentForm = toggle;
        }),
      login: async (username: string, password: string, rememberMe: boolean) => {
        set((state) => {
          state.pageLoginStore.loading = true;
        });

        const response = await authApi.login(username, password);

        if (!response.success) {
          set((state) => (state.pageLoginStore.errors = response!.errors.client));

          return false;
        }

        usePersist.getState().auth_setToken(response.data!.token);

        set((state) => {
          if (rememberMe) {
            state.pageLoginStore.remembered = {
              username,
              password,
            };
          }

          state.pageLoginStore.loading = false;
        });

        return true;
      },
      forgotPassword: async (email) => {},
      createAccount: async (form) => {},
    },
  },
});
