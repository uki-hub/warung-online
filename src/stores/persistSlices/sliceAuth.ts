import { ImmerStateCreator } from "../../abstractions/BaseStore";

export interface AuthStore {
  token?: string | undefined;
}

export interface AuthSlice {
  authStore: AuthStore;
  auth_isAuthenticated: () => boolean;
  auth_setToken: (token: string) => void;
}

export const createAuthSlice: ImmerStateCreator<AuthSlice> = (set, get) => ({
  authStore: {},
  auth_isAuthenticated: () => get().authStore.token != undefined,
  auth_setToken: (token) => {
    set((state) => {
      state.authStore.token = token;
    });
  },
});
