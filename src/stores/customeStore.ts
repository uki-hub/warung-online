import { PersistOptions } from "zustand/middleware";

interface createCustomStoreProps<T> extends PersistOptions<T, any> {}

const createCustomStore = <T>(props: createCustomStoreProps<T>): PersistOptions<T> => {
  return {
    ...props,
    partialize: (state) => {
      const partialized = (props.partialize == undefined ? state : props.partialize(state)) as any;

      if (partialized == undefined) return undefined;

      delete partialized["loading"];
      delete partialized["errors"];
      delete partialized["actions"];
      delete partialized["pageActions"];

      return partialized;
    },
  };
};

export default createCustomStore;
