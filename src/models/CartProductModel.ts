import CartModel from "./CartModel";
import ProductModel from "./ProductModel";

export default interface CartProductModel {
  product: ProductModel;
  cart: CartModel;
}
