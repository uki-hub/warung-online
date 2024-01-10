import BaseResponseModel from "../../models/bases/BaseResponseModel";
import { GetProductResponseModel } from "../../models/responses/getProductResponseModel";
import { GetProductsResponseModel } from "../../models/responses/getProductsResponseModel";
import ApiService from "../apiService";

const getProducts = async (): Promise<BaseResponseModel<GetProductsResponseModel>> => {
  const response = await ApiService.GET<GetProductsResponseModel>("https://dummyjson.com/products");

  return response;
};

const getProduct = async (id: number): Promise<BaseResponseModel<GetProductResponseModel>> => {
  const response = await ApiService.GET<GetProductResponseModel>(`https://dummyjson.com/product/${id}`);

  return response;
};

const productApi = {
  getProducts,
  getProduct,
};

export default productApi;
