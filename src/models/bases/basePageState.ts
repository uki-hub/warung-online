export default interface BasePageState {
  loading: boolean;
  errors: Array<string>;
  actions: Record<string, any>;
  pageActions?: {
    refresh: () => Promise<void> | undefined;
  } | undefined;
}
