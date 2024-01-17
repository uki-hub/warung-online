import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { AuthSlice, createAuthSlice } from "./persistSlices/sliceAuth";
import { CartSlice, createCartSlice } from "./persistSlices/sliceCart";
import { Draft } from "immer";
import { WishlistSlice, createWishlistSlice } from "./persistSlices/sliceWishlist";

interface PersistStore extends AuthSlice, CartSlice, WishlistSlice {
  set: (
    nextStateOrUpdater: PersistStore | Partial<PersistStore> | ((state: Draft<PersistStore>) => void),
    shouldReplace?: boolean | undefined
  ) => void;
}

const usePersist = create<PersistStore>()(
  persist(
    immer((...a) => {
      const [set] = a;

      return {
        ...createAuthSlice(...a),
        ...createCartSlice(...a),
        ...createWishlistSlice(...a),
        set: set,
      };
    }),
    {
      version: 1,
      name: "STORE",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default usePersist;
