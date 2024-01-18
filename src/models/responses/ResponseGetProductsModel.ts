import ProductModel from "../ProductModel";

export default interface ResponseGetProductsModel {
  products: ProductModel[];
  total: number;
  skip: number;
  limit: number;
}
