import { BasePageStore, ImmerStateCreator } from "../../abstractions/BaseStore";
import CartProductModel from "../../models/CartProductModel";
import productApi from "../../services/api/productApi";
import usePersist from "../usePersist";

export interface PageKeranjangStore extends BasePageStore {
  cartProducts: CartProductModel[];
  actions: {
    delete: (id: number) => void;
  };
}

export interface PageKeranjangSlice {
  pageKeranjangStore: PageKeranjangStore;
}

const initialState = { loading: true, loaded: false, error: false, errors: [], cartProducts: [] };

export const createPageKeranjangSlice: ImmerStateCreator<PageKeranjangSlice> = (set, get) => ({
  pageKeranjangStore: {
    ...initialState,
    actions: {
      delete: (id) => {
        set((state) => {
          usePersist.getState().cart_clear([id]);

          const updatedCartProducts = state.pageKeranjangStore.cartProducts.filter((s) => s.cart.id != id);
          state.pageKeranjangStore.cartProducts = updatedCartProducts;
        });
      },
    },
    pageActions: {
      load: async () => {
        const { carts } = usePersist.getState().CartStore;

        const cartProducts: CartProductModel[] = [];

        for (let i = 0; i < carts.length; i++) {
          const cart = carts[i];

          const product = await productApi.getProduct(cart.id);

          cartProducts.push({
            cart: cart,
            product: product.data!,
          });
        }

        set((state) => {
          state.pageKeranjangStore.cartProducts = cartProducts;
          state.pageKeranjangStore.loading = false;
          state.pageKeranjangStore.loaded = true;
        });
      },
      refresh: async () => {
        await get().pageKeranjangStore.pageActions?.load!();
      },
      clear: () =>
        set((state) => {
          state.pageKeranjangStore = {
            ...state.pageKeranjangStore,
            ...initialState,
          };
        }),
    },
  },
});
