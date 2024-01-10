import { CartModel } from "./CartModel";
import { ProductModel } from "./ProductModel";

export interface CartProductModel {
  product: ProductModel;
  cart: CartModel;
}
