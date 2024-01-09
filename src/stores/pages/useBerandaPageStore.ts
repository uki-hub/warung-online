import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import BasePageState from "../../models/bases/basePageState";
import { ProductModel } from "../../models/ProductModel";
import productApi from "../../services/api/productApi";

interface berandaPageState extends BasePageState {
  products: ProductModel[];
}

const useBerandaPageStore = create(
  immer<berandaPageState>((set, get) => ({
    products: [],
    loading: false,
    loaded: false,
    error: false,
    errors: [],
    pageActions: {
      load: async () => {
        set((state) => {
          state.loading = true;
        });

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
