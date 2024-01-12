import { Divider, Loader, Space } from "@mantine/core";
import CartRow from "./components/CartRow";
import useKeranjangPageStore from "../../../stores/pages/useKeranjangPageStore";
import { useEffect } from "react";
import CartHeader from "./components/CartHeader";
import CartAction from "./components/CartAction";

const KeranjangPage = () => {
  const state = useKeranjangPageStore();

  useEffect(() => {
    const { load, clear } = useKeranjangPageStore.getState().pageActions!;

    load!();

    return clear!;
  }, []);

  if (!state.loaded && state.loading) return <Loader />;

  return (
    <div className="flex gap-12 h-full">
      <div className="flex flex-col w-[60%]">
        <CartHeader />
        <Space h={5} />
        <Divider size="md" />
        <Space h={20} />
        <div className="flex flex-col gap-5">
          {state.cartProducts.map((c, i) => (
            <CartRow key={i} data={c} />
          ))}
        </div>
      </div>
      <CartAction />
    </div>
  );
};

export default KeranjangPage;
