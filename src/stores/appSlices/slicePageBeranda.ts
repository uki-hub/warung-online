import ProductModel from "../../models/ProductModel";
import productApi from "../../services/api/productApi";
import { BasePageStore, ImmerStateCreator } from "../../abstractions/BaseStore";


export interface PageBerandaStore extends BasePageStore {
  products: ProductModel[];
}

export interface PageBerandaSlice {
  pageBerandaStore: PageBerandaStore;
}

export const createPageBerandaSlice: ImmerStateCreator<PageBerandaSlice> = (set, get) => ({
  pageBerandaStore: {
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
            state.pageBerandaStore.errors = response.errors.client;
          });

          return;
        }

        set((state) => {
          state.pageBerandaStore.products = response.data?.products ?? [];
          state.pageBerandaStore.loaded = true;
          state.pageBerandaStore.loading = false;
        });
      },
      refresh: async () => await get().pageBerandaStore.pageActions!.load!(),
    },
    actions: {},
  },
});
