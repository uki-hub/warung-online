import BaseState from "./BaseState.ts";

export default interface BasePageState extends BaseState {
  loaded: boolean;
  loading: boolean;
  error: boolean;
  errors: string[];
  pageActions?:
    | {
        load?: (arg?: any) => Promise<void>;
        refresh?: () => Promise<void>;
        clear?: () => void;
      }
    | undefined;
}
