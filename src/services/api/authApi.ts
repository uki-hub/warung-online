import { AuthResponseModel } from "../../models/responses/AuthResponseModel";
import ApiService from "../apiService";
import BaseResponseModel from "../../models/bases/BaseResponseModel";

const login = async (username: string, password: string): Promise<BaseResponseModel<AuthResponseModel>> =>
  await ApiService.POST<AuthResponseModel>("https://dummyjson.com/auth/login", {
    username: username,
    password: password,
  });

const authApi = {
  login,
};

export default authApi;
