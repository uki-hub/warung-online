import { useEffect } from "react";
import { Loader } from "@mantine/core";
import ProductCard from "../../components/ProductCard/ProductCard";
import OrderBar from "./components/OrderBar";
import useApp from "../../../stores/useApp";
import { useQuery } from "react-query";
import productApi from "../../../services/api/productApi";

const BerandaPage = () => {
  const { isLoading, data } = useQuery("products", productApi.getProducts, {
    onSuccess: (data) => {
      console.log(data);
    },
    staleTime: 5000,
    
  });

  // const store = useApp((state) => state.pageBerandaStore);

  // useEffect(() => {
  //   const { load } = store.pageActions!;

  //   load!();
  // }, []);

  console.log("rendering");

  if (isLoading) return <Loader />;

  return (
    <div className="-mx-2">
      <OrderBar />
      <div className="grid grid-flow-row grid-cols-5">
        {data?.data!.products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
};

export default BerandaPage;
