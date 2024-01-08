import BaseResponse from "../models/bases/baseResponseModel";
import useAuthStore from "../stores/app/useAuthStore";
import logService from "./logService";

const headerBuilder = (): HeadersInit => {
  const authStore = useAuthStore.getState();

  const header: Record<string, string> = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  if (authStore.actions.isAuthenticated() && authStore.token != undefined) {
    header["Authorization"] = authStore.token;
  }

  return header;
};

const responseWrapper = async <T>(requestFn: () => Promise<Response>): Promise<BaseResponse<T>> => {
  let response: Response | undefined;
  let success: boolean = false;
  let data: T | undefined;

  const errorClient: Array<string> = [];
  const errorDev: Array<string> = [];

  try {
    response = await requestFn();

    success = response.ok;

    if (success) data = (await response.json()) as T;
  } catch (e) {
    errorClient.push(await response!.text());

    if (typeof e === "string") {
      errorDev.push(e.toUpperCase());
    } else if (e instanceof Error) {
      errorDev.push(e.message);
    }

    logService.logAll(errorDev);
  }

  return <BaseResponse<T>>{
    success: success,
    data: data,
    errors: {
      client: errorClient,
      dev: errorDev,
    },
  };
};

const POST = async <T>(url: string, body: Record<string, any>): Promise<BaseResponse<T>> =>
  responseWrapper(() =>
    fetch(url, {
      method: "POST",
      headers: headerBuilder(),
      body: JSON.stringify(body),
    })
  );

const GET = async <T>(url: string): Promise<BaseResponse<T>> =>
  responseWrapper(() =>
    fetch(url, {
      method: "GET",
      headers: headerBuilder(),
    })
  );

const ApiService = {
  POST: POST,
  GET: GET,
};

export default ApiService;
