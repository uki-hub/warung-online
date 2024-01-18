import ProductModel from "../../models/ProductModel";
import { BasePageStore, ImmerStateCreator } from "../../abstractions/BaseStore";
import productApi from "../../apis/productApi";

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
