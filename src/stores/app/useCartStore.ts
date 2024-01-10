import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import createCustomStore from "../customeStore";
import CONSTS from "../../consts/const";
import { CartModel } from "../../models/CartModel";

interface CartState extends BaseState {
  carts: CartModel[];
  actions: {
    getCartIndexById: (id: number) => number;

    add: (cart: CartModel) => void;
    updateCount: (id: number, count: number) => void;
    updateNote: (id: number, note: string) => void;
    clear: (ids: number[]) => void;
    clearAll: () => void;
  };
}

const useCartStore = create(
  persist(
    immer<CartState>((set, get) => ({
      carts: [],
      actions: {
        getCartIndexById: (id) => {
          const { carts } = get();

          return carts.findIndex((c) => c.id == id);
        },
        add: (cart) => {
          const cartIndex = get().actions.getCartIndexById(cart.id);

          if (cartIndex == -1) {
            set((state) => {
              state.carts.push(cart);
            });
          } else {
            set((state) => {
              state.carts[cartIndex].count = cart.count;
            });
          }
        },

        updateCount: (id, count) => {
          const cartIndex = get().actions.getCartIndexById(id);

          set((state) => {
            state.carts[cartIndex].count = state.carts[cartIndex].count + count;
          });
        },
        updateNote: (id, note) => {
          const cartIndex = get().actions.getCartIndexById(id);

          set((state) => {
            state.carts[cartIndex].note = note;
          });
        },
        clear: (ids) => {
          const { carts } = get();

          const filteredCarts = carts.filter((c) => !ids.includes(c.id));

          set((state) => {
            state.carts = filteredCarts;
          });
        },
        clearAll: () => {
          set((state) => {
            state.carts = [];
          });
        },
      },
    })),
    createCustomStore({
      name: CONSTS.STORAGE.cart,
      storage: createJSONStorage(() => localStorage),
    })
  )
);

export default useCartStore;
