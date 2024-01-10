export default interface BaseResponseModel<T> {
  success: boolean;
  data?: T | undefined;
  errors: {
    client: string[];
    dev: string[];
  };
}
