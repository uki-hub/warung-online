import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Loader } from "@mantine/core";
import SideSection from "./components/SideSection";
import ProductImage from "./components/ProductImage";
import useApp from "../../../stores/useApp";

const BarangPage = () => {
  const store = useApp((state) => state.pageBarangStore);
  const { id } = useParams();

  useEffect(() => {
    const { load, clear } = store.pageActions!;

    load!(id);

    return clear!;
  }, [id]);

  if (!store.loaded) return <Loader />;

  const product = store.product!;

  return (
    <div className="flex flex-col">
      <div className="flex gap-6">
        <ProductImage />
        <SideSection product={product} />
      </div>
    </div>
  );
};

export default BarangPage;
