export default interface BaseResponseModel<T> {
  success: boolean;
  data?: T | undefined;
  errors: {
    client: Array<string>;
    dev: Array<string>;
  };
}
