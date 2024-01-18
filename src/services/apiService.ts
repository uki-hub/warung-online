import usePersist from "../stores/usePersist";
import logService from "./logService";
import axios, { AxiosResponse } from "axios";

const headerBuilder = (): Record<string, string> => {
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

const responseWrapper = async <T>(requestFn: () => Promise<AxiosResponse<T>>): Promise<T> => {
  let response: AxiosResponse | undefined;
  let data: T | undefined;

  const errorClient: string[] = [];
  const errorDev: string[] = [];

  try {
    response = await requestFn();

    console.log(response);

    data = response.data;
  } catch (e) {
    errorClient.push(await response!.data);

    if (typeof e === "string") {
      errorDev.push(e.toUpperCase());
    } else if (e instanceof Error) {
      errorDev.push(e.message);
    }

    logService.logAll(errorDev);
  }

  return data!;
};

const POST = async <T>(url: string, body: Record<string, any>): Promise<T> =>
  responseWrapper(() =>
    axios.post(url, body, {
      headers: headerBuilder(),
    })
  );

const GET = async <T>(url: string): Promise<T> =>
  responseWrapper(() =>
    axios.get(url, {
      headers: headerBuilder(),
    })
  );

const apiService = {
  POST: POST,
  GET: GET,
};

export default apiService;
