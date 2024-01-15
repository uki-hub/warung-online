import CartModel from "../../models/CartModel";
import { ImmerStateCreator } from "../../abstractions/BaseStore";


export interface CartStore {
  carts: CartModel[];
}

export interface CartSlice {
  CartStore: CartStore;

  cart_getCartById: (id: number) => CartModel;
  cart_getCartIndexById: (id: number) => number;

  cart_add: (cart: CartModel) => void;
  cart_updateCount: (id: number, count: number) => void;
  cart_updateNote: (id: number, note: string) => void;
  cart_clear: (ids: number[]) => void;
  cart_clearAll: () => void;
}

export const createCartSlice: ImmerStateCreator<CartSlice> = (set, get) => ({
  CartStore: {
    carts: [],
  },
  cart_getCartById: (id) => {
    const { carts } = get().CartStore;

    return carts.find((c) => c.id == id)!;
  },
  cart_getCartIndexById: (id) => {
    const { carts } = get().CartStore;

    return carts.findIndex((c) => c.id == id);
  },
  cart_add: (cart) => {
    const cartIndex = get().cart_getCartIndexById(cart.id);

    if (cartIndex == -1) {
      set((state) => {
        state.CartStore.carts.push(cart);
      });
    } else {
      set((state) => {
        state.CartStore.carts[cartIndex].count = cart.count;
      });
    }
  },

  cart_updateCount: (id, count) => {
    const cartIndex = get().cart_getCartIndexById(id);

    set((state) => {
      state.CartStore.carts[cartIndex].count = state.CartStore.carts[cartIndex].count + count;
    });
  },
  cart_updateNote: (id, note) => {
    const cartIndex = get().cart_getCartIndexById(id);

    set((state) => {
      state.CartStore.carts[cartIndex].note = note;
    });
  },
  cart_clear: (ids) => {
    const { carts } = get().CartStore;

    const filteredCarts = carts.filter((c) => !ids.includes(c.id));

    set((state) => {
      state.CartStore.carts = filteredCarts;
    });
  },
  cart_clearAll: () => {
    set((state) => {
      state.CartStore.carts = [];
    });
  },
});
