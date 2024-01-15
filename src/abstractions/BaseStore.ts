import { StateCreator } from "zustand";

export interface BaseStore {
  actions: Record<string, any>;
}

export interface BasePageStore extends BaseStore {
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

export type ImmerStateCreator<T> = StateCreator<T, [["zustand/immer", never], never], [], T>;
