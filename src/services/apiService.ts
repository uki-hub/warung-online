import BaseResponseModel from "../abstractions/BaseResponseModel";
import usePersist from "../stores/usePersist";
import logService from "./logService";

const headerBuilder = (): HeadersInit => {
  const persist = usePersist.getState();

  const header: Record<string, string> = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  if (persist.auth_isAuthenticated() && persist.authStore.token != undefined) {
    header["Authorization"] = persist.authStore.token;
  }

  return header;
};

const responseWrapper = async <T>(requestFn: () => Promise<Response>): Promise<BaseResponseModel<T>> => {
  let response: Response | undefined;
  let success: boolean = false;
  let data: T | undefined;

  const errorClient: string[] = [];
  const errorDev: string[] = [];

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

  return <BaseResponseModel<T>>{
    success: success,
    data: data,
    errors: {
      client: errorClient,
      dev: errorDev,
    },
  };
};

const POST = async <T>(url: string, body: Record<string, any>): Promise<BaseResponseModel<T>> =>
  responseWrapper(() =>
    fetch(url, {
      method: "POST",
      headers: headerBuilder(),
      body: JSON.stringify(body),
    })
  );

const GET = async <T>(url: string): Promise<BaseResponseModel<T>> =>
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
