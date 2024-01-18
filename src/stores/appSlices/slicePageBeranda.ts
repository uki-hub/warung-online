import ProductModel from "../../models/ProductModel";
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
    errors: [],
    pageActions: {},
    actions: {},
  },
});
