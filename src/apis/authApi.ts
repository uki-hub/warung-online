import ResponseAuthModel from "../models/responses/ResponseAuthModel";
import apiService from "../services/apiService";

const login = async (username: string, password: string): Promise<ResponseAuthModel> =>
  await apiService.POST<ResponseAuthModel>("https://dummyjson.com/auth/login", {
    username: username,
    password: password,
  });

const authApi = {
  login,
};

export default authApi;
