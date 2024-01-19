import { BasePageStore, ImmerStateCreator } from "../../abstractions/BaseStore";
import NewAccountModel from "../../models/NewAccountModel";
import authApi from "../../apis/authApi";
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
    errors: [],
    currentForm: "login",
    actions: {
      formToggle: (toggle) =>
        set((state) => {
          state.pageLoginStore.currentForm = toggle;
        }),
      login: async (username: string, password: string, rememberMe: boolean) => {
        const response = await authApi.login(username, password);

        if (!response) {
          // set((state) => (state.pageLoginStore.errors = response!.client));

          return false;
        }

        usePersist.getState().auth_setToken(response!.token);

        set((state) => {
          if (rememberMe) {
            state.pageLoginStore.remembered = {
              username,
              password,
            };
          }
        });

        return true;
      },
      forgotPassword: async (email) => {},
      createAccount: async (form) => {},
    },
  },
});
