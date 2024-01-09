import BaseResponseModel from "../../models/bases/baseResponseModel";
import { GetProductsResponseModel } from "../../models/responses/getProductsResponseModel";
import ApiService from "../apiService";

const getProducts = async (): Promise<BaseResponseModel<GetProductsResponseModel>> => {
  const response = await ApiService.GET<GetProductsResponseModel>("https://dummyjson.com/products");
  
  return response;
};

const productApi = {
  getProducts,
};

export default productApi;
