import ResponseGetProductModel from "../models/responses/ResponseGetProductModel.ts";
import ResponseGetProductsModel from "../models/responses/ResponseGetProductsModel.ts";
import apiService from "../services/apiService.ts";

const getProducts = async (): Promise<ResponseGetProductsModel> => {
  const response = await apiService.GET<ResponseGetProductsModel>("https://dummyjson.com/products");

  return response;
};

const getProduct = async (id: number): Promise<ResponseGetProductModel> => {
  const response = await apiService.GET<ResponseGetProductModel>(`https://dummyjson.com/product/${id}`);

  return response;
};

const productApi = {
  getProducts,
  getProduct,
};

export default productApi;
