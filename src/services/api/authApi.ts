import BaseResponseModel from "../../abstractions/BaseResponseModel";
import AuthResponseModel from "../../models/responses/authResponseModel";
import ApiService from "../apiService";

const login = async (username: string, password: string): Promise<BaseResponseModel<AuthResponseModel>> =>
  await ApiService.POST<AuthResponseModel>("https://dummyjson.com/auth/login", {
    username: username,
    password: password,
  });

const authApi = {
  login,
};

export default authApi;
