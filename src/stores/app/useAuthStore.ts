import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import CONSTS from "../../consts/const";

type AuthStoreType = {
  token: string | undefined;

  actions: {
    isAuthenticated: () => boolean;
    setToken: (token: string) => void;
  };
};

const useAuthStore = create(
  persist<AuthStoreType>(
    (set, get) => ({
      token: undefined,
      actions: {
        isAuthenticated: () => get().token != undefined,
        setToken: (token) => {
          set(() => ({
            token: token,
          }));
        },
      },
    }),
    {
      name: CONSTS.STORAGE.auth,
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useAuthStore;
