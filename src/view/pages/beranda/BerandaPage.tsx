import { useEffect } from "react";
import useBerandaPageStore from "../../../stores/pages/useBerandaPageStore";
import { Loader } from "@mantine/core";
import ProductCard from "./components/ProductCard";
import OrderBar from "./components/OrderBar";

const BerandaPage = () => {
  const state = useBerandaPageStore();

  useEffect(() => {
    state.pageActions!.load!();
  }, []);

  if (state.loading) return <Loader />;

  if (state.loaded) {
    return (
      <div className="-mx-2">
        <OrderBar />
        <div className="grid grid-flow-row grid-cols-5">
          {state.products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    );
  }
};

export default BerandaPage;
