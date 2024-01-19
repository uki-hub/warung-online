import { Loader } from "@mantine/core";
import ProductCard from "../../components/ProductCard/ProductCard";
import OrderBar from "./components/OrderBar";
import useApp from "../../../stores/useApp";
import { useQuery } from "react-query";
import productApi from "../../../apis/productApi";
import useQuerykey from "../../../hooks/useQueryKey";

const BerandaPage = () => {
  const store = useApp((state) => state.pageBerandaStore);
  const queryKey = useQuerykey();

  const { isLoading, data } = useQuery(queryKey.builder(queryKey.keys.pageBeranda, "getProducts"), productApi.getProducts);

  return (
    <div className="-mx-2">
      <OrderBar />
      <div className="grid grid-flow-row grid-cols-5">
        {isLoading ? <Loader /> : data!.products.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  );
};

export default BerandaPage;
