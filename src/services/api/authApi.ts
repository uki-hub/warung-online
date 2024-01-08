import { AuthResponseModel } from "../../models/responses/authResponseModel";
import ApiService from "../apiService";
import BaseResponseModel from "../../models/bases/baseResponseModel";

const login = async (username: string, password: string): Promise<BaseResponseModel<AuthResponseModel>> =>
  await ApiService.POST<AuthResponseModel>("https://dummyjson.com/auth/login", {
    username: username,
    password: password,
  });

const authApi = {
  login,
};

export default authApi;
