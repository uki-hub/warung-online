export default interface BasePageState {
  loaded: boolean;
  loading: boolean;
  error: boolean;
  errors: Array<string>;
  actions: Record<string, any>;
  pageActions?: {
    load?: () => Promise<void>
    refresh?: () => Promise<void>;
  } | undefined;
}
