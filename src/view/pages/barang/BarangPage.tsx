import { useEffect } from "react";
import useBarangPageStore from "../../../stores/pages/useBarangPageStore";
import { useParams } from "react-router-dom";
import { Loader } from "@mantine/core";
import SideSection from "./components/SideSection";
import ProductImage from "./components/ProductImage";

const BarangPage = () => {
  const state = useBarangPageStore();
  const { id } = useParams();

  useEffect(() => {
    const { load, clear } = useBarangPageStore.getState().pageActions!;

    load!(id);

    return clear!;
  }, [id]);

  if (!state.loaded) return <Loader />;

  const product = state.product!;

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
