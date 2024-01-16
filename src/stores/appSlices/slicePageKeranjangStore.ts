import { BasePageStore, ImmerStateCreator } from "../../abstractions/BaseStore";
import CartProductModel from "../../models/CartProductModel";
import productApi from "../../services/api/productApi";
import usePersist from "../usePersist";

export interface PageKeranjangStore extends BasePageStore {
  cartProducts: CartProductModel[];
  actions: {
    isAllChecked: () => boolean;
    hasChecked: () => boolean;
    hasProducts: () => boolean;
    getSelectedProducts: () => CartProductModel[];

    mapPersistCartData: () => void;

    check: (id: number) => void;
    checkAll: () => void;
    clear: (id: number) => void;
    clearSelected: () => void;
    clearAll: () => void;
    addCount: (id: number, value: number) => void;
    countOnChange: (id: number, value: number) => void;
    buy: () => Promise<void>;
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
      isAllChecked: () => {
        const carts = usePersist.getState().CartStore.carts;

        if (carts.length == 0) return false;

        return carts.reduce((p, c) => p && c.checked == true, true);
      },
      hasChecked: () => {
        let checked = false;

        usePersist.getState().CartStore.carts.forEach((c) => {
          if (c.checked) {
            checked = true;
            return;
          }
        });

        return checked;
      },
      hasProducts: () => get().pageKeranjangStore.cartProducts.length > 0,
      getSelectedProducts: () => get().pageKeranjangStore.cartProducts.filter((c) => c.cart.checked),

      mapPersistCartData: () => {
        const updatedCarts = usePersist.getState().CartStore.carts;

        const updatedCartProducts: CartProductModel[] = [];

        get().pageKeranjangStore.cartProducts.forEach((c, i) => {
          const cart = updatedCarts[i];

          if (cart) {
            updatedCartProducts.push({
              cart,
              product: c.product,
            });
          }
        });

        set((state) => {
          state.pageKeranjangStore.cartProducts = updatedCartProducts;
        });
      },
      check: (id) => {
        usePersist.getState().cart_check(id);

        get().pageKeranjangStore.actions.mapPersistCartData();
      },
      checkAll: () => {
        usePersist.getState().cart_checkAll();

        get().pageKeranjangStore.actions.mapPersistCartData();
      },
      clear: (id) => {
        usePersist.getState().cart_clear([id]);

        get().pageKeranjangStore.actions.mapPersistCartData();
      },
      clearSelected: () => {
        const selectedCartIds = get()
          .pageKeranjangStore.actions.getSelectedProducts()
          .map((c) => c.cart.id);

        usePersist.getState().cart_clear(selectedCartIds);

        get().pageKeranjangStore.actions.mapPersistCartData();
      },
      clearAll: () => {
        usePersist.getState().cart_clearAll();

        set((state) => {
          state.pageKeranjangStore.cartProducts = [];
        });
      },

      addCount: (id, value) => {
        usePersist.getState().cart_setCount(id, (count) => count + value);

        get().pageKeranjangStore.actions.mapPersistCartData();
      },
      countOnChange: (id, value) => {
        usePersist.getState().cart_setCount(id, () => value);

        get().pageKeranjangStore.actions.mapPersistCartData();
      },
      buy: async () => {
        set((state) => {
          state.pageKeranjangStore.loading = true;
        });

        await new Promise((res) => setTimeout(res, 2000));
        
        set((state) => {
          state.pageKeranjangStore.loading = false;
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
