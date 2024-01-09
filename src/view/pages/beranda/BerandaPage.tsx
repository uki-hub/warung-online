import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../../stores/app/useAuthStore";
import AppBar from "../../components/AppBar";
import useBerandaPageStore from "../../../stores/pages/useBerandaPageStore";
import { Loader } from "@mantine/core";
import ProductCard from "./components/ProductCard";
import OrderBar from "./components/OrderBar";

const BerandaPage = () => {
  const navigate = useNavigate();
  const state = useBerandaPageStore();

  useEffect(() => {
    if (!useAuthStore.getState().actions.isAuthenticated()) {
      navigate("/masuk");
      return;
    }

    state.pageActions!.load!();
  }, []);

  const buildContent = () => {
    if (state.loading) return <Loader />;

    if (state.loaded) {
      return (
        <>
          <OrderBar />
          <div className="flex flex-wrap">
            {state.products.map((p) => (
              <ProductCard product={p} />
            ))}
          </div>
        </>
      );
    }
  };

  return (
    <div className="flex flex-col items-center">
      <AppBar />
      <div className="flex flex-col max-w-[1200px] rounded w-[80%] bg-white py-5 px-3 overflow-hidden">{buildContent()}</div>
    </div>
  );
};

export default BerandaPage;
