import { useEffect } from "react";
import { Loader } from "@mantine/core";
import ProductCard from "./components/ProductCard";
import OrderBar from "./components/OrderBar";
import useApp from "../../../stores/useApp";

const BerandaPage = () => {
  const store = useApp((state) => state.pageBerandaStore);

  useEffect(() => {
    const { load } = store.pageActions!;

    load!();
  }, []);

  if (store.loading) return <Loader />;

  if (store.loaded) {
    return (
      <div className="-mx-2">
        <OrderBar />
        <div className="grid grid-flow-row grid-cols-5">
          {store.products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    );
  }
};

export default BerandaPage;
