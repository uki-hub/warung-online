import useAuthStore from "./app/useAuthStore";
import useLoginPageStore from "./pages/useLoginPageStore";

const Stores = {
  app: {
    auth: useAuthStore,
  },
  pages: {
    login: useLoginPageStore,
  },
};

export default Stores;
