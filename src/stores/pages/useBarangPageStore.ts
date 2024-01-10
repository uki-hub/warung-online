import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import BasePageState from "../../models/bases/BasePageState";
import { ProductModel } from "../../models/ProductModel";
import productApi from "../../services/api/productApi";

interface BarangPageState extends BasePageState {
  product: ProductModel | undefined;
  indexImage: number;
  actions: {
    setIndexImage: (index: number) => void;
  };
}

const initialState = {
  product: undefined,
  indexImage: 0,
  loading: true,
  loaded: false,
  error: false,
  errors: [],
};

const useBarangPageStore = create(
  immer<BarangPageState>((set, get) => ({
    ...initialState,
    pageActions: {
      load: async (id: number) => {     
        const response = await productApi.getProduct(id);

        if (!response.success) {
          set((state) => {
            state.errors = response.errors.client;
          });

          return;
        }

        set((state) => {
          state.product = response.data;
          state.loaded = true;
          state.loading = false;
        });
      },
      refresh: async () => await get().pageActions!.load!(),
      clear: () => set(initialState),
    },
    actions: {
      setIndexImage: (index: number) => {
        set((state) => {
          state.indexImage = index;
        });
      },
    },
  }))
);

export default useBarangPageStore;
