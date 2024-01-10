import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import BasePageState from "../../models/bases/BasePageState";
import { ProductModel } from "../../models/ProductModel";
import productApi from "../../services/api/productApi";

interface BerandaPageState extends BasePageState {
  products: ProductModel[];
}

const useBerandaPageStore = create(
  immer<BerandaPageState>((set, get) => ({
    products: [],
    loading: true,
    loaded: false,
    error: false,
    errors: [],
    pageActions: {
      load: async () => {      
        const response = await productApi.getProducts();

        if (!response.success) {
          set((state) => {
            state.errors = response.errors.client;
          });

          return;
        }

        set((state) => {
          state.products = response.data?.products ?? [];
          state.loaded = true;
          state.loading = false;
        });
      },
      refresh: async () => await get().pageActions!.load!(),
    },
    actions: {},
  }))
);

export default useBerandaPageStore;
