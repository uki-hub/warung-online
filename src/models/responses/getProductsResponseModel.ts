import { ProductModel } from "../ProductModel";

export interface GetProductsResponseModel {
  products: ProductModel[];
  total: number;
  skip: number;
  limit: number;
}
