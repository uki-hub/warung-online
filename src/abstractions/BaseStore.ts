import { StateCreator } from "zustand";

export interface BaseStore {
  actions: Record<string, any>;
}

export interface BasePageStore extends BaseStore {
  errors: string[];
  pageActions?:
    | {
        load?: (arg?: any) => void;
        refresh?: () => Promise<void>;
        clear?: () => void;
      }
    | undefined;
}

export type ImmerStateCreator<T> = StateCreator<T, [["zustand/immer", never], never], [], T>;
