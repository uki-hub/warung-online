import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import BasePageState from "../../models/bases/BasePageState";
import CartProductModel from "../../models/CartProductModel";
import useCartStore from "../app/useCartStore";
import productApi from "../../services/api/productApi";

interface keranjangPageState extends BasePageState {
  cartProducts: CartProductModel[];
}

const initialState = { loading: true, loaded: false, error: false, errors: [], cartProducts: [] };

const useKeranjangPageStore = create(
  immer<keranjangPageState>((set, get) => ({
    ...initialState,
    actions: {},
    pageActions: {
      load: async () => {
        const { carts } = useCartStore.getState();

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
          state.cartProducts = cartProducts;
          state.loading = false;
          state.loaded = true;
        });
      },
      refresh: async () => {
        await get().pageActions?.load!();
      },
      clear: () => set(initialState),
    },
  }))
);

export default useKeranjangPageStore;
