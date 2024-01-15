import ProductModel from "../../models/ProductModel";
import productApi from "../../services/api/productApi";
import { BasePageStore, ImmerStateCreator } from "../../abstractions/BaseStore";

export interface PageBarangStore extends BasePageStore {
  product: ProductModel | undefined;
  indexImage: number;
  actions: {
    setIndexImage: (index: number) => void;
  };
}

export interface PageBarangSlice {
  pageBarangStore: PageBarangStore;
}

const initialState = {
  product: undefined,
  indexImage: 0,
  loading: true,
  loaded: false,
  error: false,
  errors: [],
};

export const createPageBarangSlice: ImmerStateCreator<PageBarangSlice> = (set, get) => ({
  pageBarangStore: {
    ...initialState,
    pageActions: {
      load: async (id: number) => {
        const response = await productApi.getProduct(id);

        if (!response.success) {
          set((state) => {
            state.pageBarangStore.errors = response.errors.client;
          });

          return;
        }

        set((state) => {
          state.pageBarangStore.product = response.data;
          state.pageBarangStore.loaded = true;
          state.pageBarangStore.loading = false;
        });
      },
      refresh: async () => await get().pageBarangStore.pageActions!.load!(),
      clear: () =>
        set((state) => {
          state.pageBarangStore = { ...state.pageBarangStore, ...initialState };
        }),
    },
    actions: {
      setIndexImage: (index: number) => {
        set((state) => {
          state.pageBarangStore.indexImage = index;
        });
      },
    },
  },
});
