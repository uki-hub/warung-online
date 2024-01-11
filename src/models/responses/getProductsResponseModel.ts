import ProductModel from "../ProductModel";

export default interface GetProductsResponseModel {
  products: ProductModel[];
  total: number;
  skip: number;
  limit: number;
}
